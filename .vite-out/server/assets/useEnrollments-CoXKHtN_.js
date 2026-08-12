import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/hooks/useEnrollments.ts
var mapEnrollment = (row) => ({
	id: Number(row.id),
	userId: row.user_id,
	courseId: Number(row.course_id),
	progressPercent: Number(row.progress_percent),
	enrolledAt: row.enrolled_at
});
/**
* Fetch enrollments for the currently authenticated user.
* Requires auth — skipped while loading or unauthenticated.
*/
function useEnrollments() {
	const { user, isLoading: authLoading } = useAuth();
	return useQuery({
		queryKey: ["enrollments", user?.id],
		queryFn: async () => {
			if (!user?.id) return [];
			const { data, error } = await supabase.from("enrollments").select("*").eq("user_id", user.id).order("enrolled_at", { ascending: false });
			if (error) throw error;
			return (data || []).map(mapEnrollment);
		},
		enabled: !authLoading && !!user?.id
	});
}
/**
* Mutation to enroll the current user in a course.
* Requires auth — callers should guard with `isAuthenticated` before invoking.
* Uses upsert with onConflict to prevent duplicate enrollment records.
*
* @example
*   const enroll = useEnroll()
*   enroll.mutate(courseId)
*/
function useEnroll() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (courseId) => {
			if (!user?.id) throw new Error("Vous devez être connecté pour vous inscrire.");
			const { data: existing } = await supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
			if (existing) {
				const { data: existingFull, error: fetchErr } = await supabase.from("enrollments").select("*").eq("id", existing.id).single();
				if (fetchErr) throw fetchErr;
				return mapEnrollment(existingFull);
			}
			const { data, error } = await supabase.from("enrollments").insert([{
				user_id: user.id,
				course_id: courseId,
				progress_percent: 0
			}]).select().single();
			if (error) {
				if (error.code === "23505") {
					const { data: race } = await supabase.from("enrollments").select("*").eq("user_id", user.id).eq("course_id", courseId).single();
					if (race) return mapEnrollment(race);
				}
				throw error;
			}
			return mapEnrollment(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["enrollments", user?.id] });
		}
	});
}
//#endregion
export { useEnrollments as n, useEnroll as t };
