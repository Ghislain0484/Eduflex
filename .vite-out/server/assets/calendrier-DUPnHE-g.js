import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card } from "@blinkdotnew/ui";
import { Flag, Laptop, MapPin, Trophy, Users, Video } from "lucide-react";
//#region src/routes/_app/calendrier.tsx?tsr-split=component
function CalendrierPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm font-semibold text-slate-800 dark:text-slate-200",
					children: [
						"Débloquer ",
						/* @__PURE__ */ jsx("strong", {
							className: "text-emerald-600 dark:text-emerald-400",
							children: "TOUTES"
						}),
						" les fonctionnalités pour profiter du meilleur de EduFlex"
					]
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/tarifs",
						children: "Débloquer 🫱"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Calendrier"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-5xl",
					children: [
						"Gérez vos événements (webinaires, sessions en direct, ateliers) et communiquez-les à vos apprenants. En plus de ces événements, le calendrier de chaque apprenant affiche automatiquement ",
						/* @__PURE__ */ jsx("strong", {
							className: "text-slate-900 dark:text-white",
							children: "ses dates personnalisées de déblocage des leçons ainsi que les classes virtuelles"
						}),
						" auxquelles il est inscrit."
					]
				})]
			}),
			isFreePlan && /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto",
				children: /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-6 md:grid-cols-2 max-w-6xl mx-auto pt-2",
				children: [
					{
						id: 1,
						title: "Blended learning",
						description: "Combinez des formations en ligne avec des sessions en présentiel pour offrir une expérience d'apprentissage enrichie.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Laptop, { className: "h-5 w-5" })
						})
					},
					{
						id: 2,
						title: "Événements physiques",
						description: "Organisez des ateliers, séminaires et sessions de travail en ajoutant l'adresse du lieu directement.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" })
						})
					},
					{
						id: 3,
						title: "Séances de coaching",
						description: "Planifiez des sessions d'accompagnement individuel ou collectif avec vos apprenants.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" })
						})
					},
					{
						id: 4,
						title: "Webinaires et sessions en direct",
						description: "Ajoutez un lien vers votre plateforme de visioconférence (Talkizy, Zoom, Meet...) pour des sessions en direct.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Video, { className: "h-5 w-5" })
						})
					},
					{
						id: 5,
						title: "Gamification",
						description: "Donnez à vos apprenants une raison de revenir régulièrement en planifiant des événements récurrents.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Trophy, { className: "h-5 w-5" })
						})
					},
					{
						id: 6,
						title: "Jalons de parcours",
						description: "Marquez les dates clés de vos formations pour guider la progression de vos apprenants.",
						icon: /* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Flag, { className: "h-5 w-5" })
						})
					}
				].map((item) => /* @__PURE__ */ jsxs(Card, {
					className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3 text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [item.icon, /* @__PURE__ */ jsx("h3", {
							className: "text-sm font-bold text-slate-900 dark:text-white",
							children: item.title
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
						children: item.description
					})]
				}, item.id))
			})
		]
	});
}
//#endregion
export { CalendrierPage as component };
