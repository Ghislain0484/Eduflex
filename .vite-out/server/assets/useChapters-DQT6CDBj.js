import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/hooks/useChapters.ts
var mapChapter = (row) => ({
	id: Number(row.id),
	courseId: Number(row.course_id),
	title: row.title,
	content: row.content,
	videoUrl: row.video_url,
	sortOrder: Number(row.sort_order),
	quizData: row.quiz_data || null,
	chapterType: row.chapter_type || "standard",
	scheduledAt: row.scheduled_at || null,
	liveUrl: row.live_url || null,
	createdAt: row.created_at
});
var MOCK_CHAPTERS_MAP = {
	1: [
		{
			id: 101,
			courseId: 1,
			title: "Introduction au Marketing Digital",
			content: "Dans ce chapitre, nous allons définir ce qu'est le marketing digital et présenter les différents canaux d'acquisition.",
			videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
			sortOrder: 1,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 102,
			courseId: 1,
			title: "Les fondamentaux du référencement naturel (SEO)",
			content: "Le référencement naturel (SEO) is l'art de positionner son site dans les premiers résultats organiques de Google.",
			videoUrl: null,
			sortOrder: 2,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 103,
			courseId: 1,
			title: "Google Ads & Acquisition payante",
			content: "Configurez votre première campagne publicitaire payante sur les moteurs de recherche pour acquérir des clients instantanément.",
			videoUrl: null,
			sortOrder: 3,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 104,
			courseId: 1,
			title: "Stratégies d'emailing avancées",
			content: "Découvrez comment récolter des leads qualifiés et mettre en place des séquences d'email automatisées performantes.",
			videoUrl: null,
			sortOrder: 4,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 105,
			courseId: 1,
			title: "🔴 Classe en Direct : Atelier Pratique & Session Q&A",
			content: "Session interactive de questions-réponses en direct avec l'enseignant. Préparez vos questions !",
			videoUrl: null,
			sortOrder: 5,
			quizData: null,
			chapterType: "live",
			scheduledAt: new Date(Date.now() + 864e5).toISOString(),
			liveUrl: "https://meet.jit.si/eduflex-marketing-direct"
		}
	],
	2: [
		{
			id: 201,
			courseId: 2,
			title: "Fondations de l'entrepreneuriat",
			content: "Validez votre idée de produit, réalisez votre étude de marché et formulez votre proposition de valeur unique.",
			videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
			sortOrder: 1,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 202,
			courseId: 2,
			title: "Planification financière et Trésorerie",
			content: "Apprenez à dresser un bilan prévisionnel, à anticiper votre trésorerie et à calculer votre point mort.",
			videoUrl: null,
			sortOrder: 2,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 203,
			courseId: 2,
			title: "Recrutement et Management d'équipe",
			content: "Comment attirer les meilleurs profils, gérer la motivation des équipes et piloter la performance collective.",
			videoUrl: null,
			sortOrder: 3,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 204,
			courseId: 2,
			title: "🔴 Live Coaching : Analyse de Business Plans",
			content: "Présentez votre pitch et votre business plan en direct pour une séance de revue par vos pairs et votre tuteur.",
			videoUrl: null,
			sortOrder: 4,
			quizData: null,
			chapterType: "live",
			scheduledAt: new Date(Date.now() + 1728e5).toISOString(),
			liveUrl: "https://meet.jit.si/eduflex-business-coaching"
		}
	],
	3: [
		{
			id: 301,
			courseId: 3,
			title: "Algorithme Google et Crawlability",
			content: "Comprendre comment fonctionnent les robots de Google pour indexer efficacement vos pages web.",
			videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
			sortOrder: 1,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 302,
			courseId: 3,
			title: "Recherche de mots-clés stratégiques",
			content: "Apprenez à utiliser Semrush, Ubersuggest et Ahrefs pour trouver des opportunités à fort volume.",
			videoUrl: null,
			sortOrder: 2,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 303,
			courseId: 3,
			title: "Stratégie de Netlinking et Autorité",
			content: "Développez la popularité de votre nom de domaine en obtenant des backlinks thématisés de haute qualité.",
			videoUrl: null,
			sortOrder: 3,
			quizData: null,
			chapterType: "standard"
		},
		{
			id: 304,
			courseId: 3,
			title: "🔴 Live : Audit SEO en Direct de vos Sites",
			content: "Audit SEO de vos sites web soumis en direct. Nous analysons l'UX, la vitesse de chargement et le contenu.",
			videoUrl: null,
			sortOrder: 4,
			quizData: null,
			chapterType: "live",
			scheduledAt: new Date(Date.now() + 5e4).toISOString(),
			liveUrl: "https://meet.jit.si/eduflex-seo-audit"
		}
	],
	4: [{
		id: 401,
		courseId: 4,
		title: "Formules logiques et conditions complexes",
		content: "Maîtrisez les fonctions SI, ET, OU, et les imbrications complexes.",
		videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
		sortOrder: 1,
		quizData: null,
		chapterType: "standard"
	}, {
		id: 402,
		courseId: 4,
		title: "Tableaux Croisés Dynamiques (TCD)",
		content: "Structurez et analysez des milliers de lignes de données en quelques clics.",
		videoUrl: null,
		sortOrder: 2,
		quizData: null,
		chapterType: "standard"
	}],
	5: [{
		id: 501,
		courseId: 5,
		title: "Découverte de l'écosystème React",
		content: "Comprendre le DOM virtuel, JSX et la structure d'un projet React moderne.",
		videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
		sortOrder: 1,
		quizData: null,
		chapterType: "standard"
	}, {
		id: 502,
		courseId: 5,
		title: "State et Props : La gestion des données",
		content: "Apprenez à faire communiquer vos composants et à gérer les états locaux.",
		videoUrl: null,
		sortOrder: 2,
		quizData: null,
		chapterType: "standard"
	}],
	6: [{
		id: 601,
		courseId: 6,
		title: "Introduction aux LLM et invites (Prompts)",
		content: "Optimisez vos requêtes pour obtenir des résultats professionnels de ChatGPT et Claude.",
		videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
		sortOrder: 1,
		quizData: null,
		chapterType: "standard"
	}, {
		id: 602,
		courseId: 6,
		title: "Automatiser ses workflows avec Make et Zapier",
		content: "Connectez vos applications pour automatiser vos tâches administratives et marketing.",
		videoUrl: null,
		sortOrder: 2,
		quizData: null,
		chapterType: "standard"
	}]
};
function useChapters(courseId) {
	return useQuery({
		queryKey: [
			"chapters",
			"course",
			courseId
		],
		queryFn: async () => {
			if (typeof window === "undefined") return (MOCK_CHAPTERS_MAP[Number(courseId)] || MOCK_CHAPTERS_MAP[1]).map((ch) => ({
				...ch,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}));
			try {
				const { data, error } = await supabase.from("chapters").select("*").eq("course_id", courseId).order("sort_order", { ascending: true });
				if (error) throw error;
				return (data || []).map(mapChapter);
			} catch (err) {
				console.warn("Backend chapters error, using mock fallback data:", err);
				return (MOCK_CHAPTERS_MAP[Number(courseId)] || MOCK_CHAPTERS_MAP[1]).map((ch) => ({
					...ch,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}));
			}
		},
		enabled: courseId != null
	});
}
function useCompletedChapters(courseId) {
	const { user } = useAuth();
	return useQuery({
		queryKey: [
			"completed_chapters",
			courseId,
			user?.id
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("completed_chapters").select("chapter_id").eq("course_id", courseId).eq("user_id", user.id);
			if (error) throw error;
			return (data || []).map((row) => Number(row.chapter_id));
		},
		enabled: courseId != null && !!user?.id
	});
}
function useToggleChapterCompletion(courseId) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ chapterId, isCompleted }) => {
			if (isCompleted) {
				const { error } = await supabase.from("completed_chapters").insert([{
					user_id: user.id,
					course_id: courseId,
					chapter_id: chapterId
				}]);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("completed_chapters").delete().eq("user_id", user.id).eq("chapter_id", chapterId);
				if (error) throw error;
			}
			return {
				chapterId,
				isCompleted
			};
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [
				"completed_chapters",
				courseId,
				user?.id
			] });
			queryClient.invalidateQueries({ queryKey: ["enrollments", user?.id] });
		}
	});
}
function useManageChapters(courseId) {
	const queryClient = useQueryClient();
	return {
		createChapter: useMutation({
			mutationFn: async (chapter) => {
				try {
					const { data, error } = await supabase.from("chapters").insert([{
						course_id: chapter.courseId,
						title: chapter.title,
						content: chapter.content,
						video_url: chapter.videoUrl,
						sort_order: chapter.sortOrder,
						quiz_data: chapter.quizData || null,
						chapter_type: chapter.chapterType || "standard",
						scheduled_at: chapter.scheduledAt || null,
						live_url: chapter.liveUrl || null
					}]).select().single();
					if (error) throw error;
					return mapChapter(data);
				} catch (err) {
					if (err.code === "42703" || err.message && (err.message.includes("column") || err.message.includes("schema cache"))) {
						console.warn("DB schema drift detected on chapters table. Retrying with original basic columns only.");
						const { data, error } = await supabase.from("chapters").insert([{
							course_id: chapter.courseId,
							title: chapter.title,
							content: chapter.content,
							video_url: chapter.videoUrl,
							sort_order: chapter.sortOrder
						}]).select().single();
						if (error) throw error;
						return mapChapter(data);
					}
					throw err;
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [
					"chapters",
					"course",
					courseId
				] });
			}
		}),
		updateChapter: useMutation({
			mutationFn: async (chapter) => {
				try {
					const { data, error } = await supabase.from("chapters").update({
						title: chapter.title,
						content: chapter.content,
						video_url: chapter.videoUrl,
						sort_order: chapter.sortOrder,
						quiz_data: chapter.quizData,
						chapter_type: chapter.chapterType,
						scheduled_at: chapter.scheduledAt,
						live_url: chapter.liveUrl
					}).eq("id", chapter.id).select().single();
					if (error) throw error;
					return mapChapter(data);
				} catch (err) {
					if (err.code === "42703" || err.message && (err.message.includes("column") || err.message.includes("schema cache"))) {
						console.warn("DB schema drift detected on chapters update. Retrying with original basic columns only.");
						const { data, error } = await supabase.from("chapters").update({
							title: chapter.title,
							content: chapter.content,
							video_url: chapter.videoUrl,
							sort_order: chapter.sortOrder
						}).eq("id", chapter.id).select().single();
						if (error) throw error;
						return mapChapter(data);
					}
					throw err;
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [
					"chapters",
					"course",
					courseId
				] });
			}
		}),
		deleteChapter: useMutation({
			mutationFn: async (id) => {
				const { error } = await supabase.from("chapters").delete().eq("id", id);
				if (error) throw error;
				return id;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [
					"chapters",
					"course",
					courseId
				] });
			}
		})
	};
}
//#endregion
export { useToggleChapterCompletion as i, useCompletedChapters as n, useManageChapters as r, useChapters as t };
