import { t as supabase } from "./supabase-DUsUuZXg.js";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/hooks/useAuth.ts
function useAuth() {
	const queryClient = useQueryClient();
	const { data: session, isLoading: isSessionLoading } = useQuery({
		queryKey: ["auth_session"],
		queryFn: async () => {
			const { data: { session } } = await supabase.auth.getSession();
			return session;
		},
		staleTime: Infinity
	});
	const { data: user, isLoading: isUserLoading } = useQuery({
		queryKey: ["auth_user", session?.user?.id],
		queryFn: async () => {
			const sessionUser = session?.user;
			if (!sessionUser) return null;
			try {
				let profile = null;
				const { data, error } = await supabase.from("profiles").select("role, display_name, academy_name, academy_slogan, academy_color, approved, academy_plan, academy_logo").eq("id", sessionUser.id).maybeSingle();
				if (error && error.message.includes("academy_logo")) {
					const fallback = await supabase.from("profiles").select("role, display_name, academy_name, academy_slogan, academy_color, approved, academy_plan").eq("id", sessionUser.id).maybeSingle();
					if (fallback.error) throw fallback.error;
					profile = fallback.data;
				} else if (error) throw error;
				else profile = data;
				return {
					id: sessionUser.id,
					email: sessionUser.email,
					displayName: profile?.display_name || sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split("@")[0] || "Utilisateur",
					role: profile?.role || "student",
					academyName: profile?.academy_name || null,
					academySlogan: profile?.academy_slogan || null,
					academyColor: profile?.academy_color || "#6366f1",
					approved: profile?.approved !== false,
					academyPlan: profile?.academy_plan || null,
					academyLogo: profile?.academy_logo || null
				};
			} catch (e) {
				console.error("Error fetching profile:", e);
				return {
					id: sessionUser.id,
					email: sessionUser.email,
					displayName: sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split("@")[0] || "Utilisateur",
					role: "student",
					academyName: null,
					academySlogan: null,
					academyColor: "#6366f1",
					approved: true,
					academyPlan: null,
					academyLogo: null
				};
			}
		},
		enabled: session !== void 0 && !!session?.user?.id,
		staleTime: 300 * 1e3
	});
	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
			queryClient.setQueryData(["auth_session"], newSession);
			if (!newSession) {
				queryClient.setQueryData(["auth_user", void 0], null);
				queryClient.invalidateQueries({ queryKey: ["auth_user"] });
			} else queryClient.invalidateQueries({ queryKey: ["auth_user", newSession.user.id] });
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [queryClient]);
	const login = () => {};
	const logout = async () => {
		await supabase.auth.signOut();
		queryClient.clear();
	};
	const isLoading = isSessionLoading || session !== void 0 && !!session?.user?.id && isUserLoading;
	return {
		user: user || null,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout
	};
}
//#endregion
export { useAuth as t };
