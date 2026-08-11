import { t as supabase } from "./supabase-DUsUuZXg.js";
import { useQuery } from "@tanstack/react-query";
//#region src/hooks/useStats.ts
function mapProfile(data) {
	return {
		id: data.id,
		email: data.email,
		displayName: data.display_name,
		role: data.role || "student",
		createdAt: data.created_at
	};
}
function useDashboardStats() {
	return useQuery({
		queryKey: ["dashboard", "stats"],
		queryFn: async () => {
			const { count: studentsCount, error: studentsErr } = await supabase.from("profiles").select("*", {
				count: "exact",
				head: true
			}).eq("role", "student");
			if (studentsErr) throw studentsErr;
			const { count: coursesCount, error: coursesErr } = await supabase.from("courses").select("*", {
				count: "exact",
				head: true
			}).eq("status", "publie");
			if (coursesErr) throw coursesErr;
			const { data: enrollments, error: enrollmentsErr } = await supabase.from("enrollments").select("course_id, progress_percent");
			if (enrollmentsErr) throw enrollmentsErr;
			const { data: courses, error: coursesPriceErr } = await supabase.from("courses").select("id, price, category");
			if (coursesPriceErr) throw coursesPriceErr;
			let totalRevenue = 0;
			const categoryMap = /* @__PURE__ */ new Map();
			if (enrollments && courses) {
				const courseMap = new Map(courses.map((c) => [c.id, {
					price: c.price || 0,
					category: c.category || "Général"
				}]));
				enrollments.forEach((e) => {
					const courseInfo = courseMap.get(e.course_id);
					if (courseInfo) {
						totalRevenue += courseInfo.price;
						const current = categoryMap.get(courseInfo.category) || 0;
						categoryMap.set(courseInfo.category, current + courseInfo.price);
					}
				});
			}
			const categoryRevenue = Array.from(categoryMap.entries()).map(([categorie, revenus]) => ({
				categorie,
				revenus
			}));
			let averageProgress = 0;
			if (enrollments && enrollments.length > 0) {
				const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress_percent || 0), 0);
				averageProgress = Math.round(totalProgress / enrollments.length);
			}
			return {
				studentsCount: studentsCount || 0,
				coursesCount: coursesCount || 0,
				totalRevenue,
				averageProgress,
				categoryRevenue
			};
		}
	});
}
function useTeachersList() {
	return useQuery({
		queryKey: ["profiles", "teachers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("role", "teacher").order("created_at", { ascending: false });
			if (error) throw error;
			return (data || []).map(mapProfile);
		}
	});
}
function useAllEnrollments() {
	return useQuery({
		queryKey: ["enrollments", "all"],
		queryFn: async () => {
			const { data, error } = await supabase.from("enrollments").select(`
          id,
          enrolled_at,
          course_id,
          user_id,
          courses (
            title,
            price
          ),
          profiles (
            display_name,
            email
          )
        `).order("enrolled_at", { ascending: false });
			if (error) throw error;
			return (data || []).map((item) => ({
				id: item.id,
				enrolledAt: item.enrolled_at,
				courseTitle: item.courses?.title || "Formation supprimée",
				coursePrice: item.courses?.price || 0,
				studentName: item.profiles?.display_name || item.profiles?.email?.split("@")[0] || "Apprenant",
				studentEmail: item.profiles?.email || "",
				method: item.courses?.price > 0 ? "Mobile Money / CB" : "Gratuit",
				status: "Payé"
			}));
		}
	});
}
function useAcademiesList() {
	return useQuery({
		queryKey: ["profiles", "academies"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").not("academy_name", "is", null).order("created_at", { ascending: false });
			if (error) throw error;
			return (data || []).map((row) => ({
				id: row.id,
				email: row.email,
				displayName: row.display_name,
				role: row.role,
				academyName: row.academy_name,
				academySlogan: row.academy_slogan,
				academyColor: row.academy_color,
				approved: row.approved,
				academyPlan: row.academy_plan || "Découverte",
				academyLogo: row.academy_logo || null,
				createdAt: row.created_at
			}));
		}
	});
}
//#endregion
export { useTeachersList as i, useAllEnrollments as n, useDashboardStats as r, useAcademiesList as t };
