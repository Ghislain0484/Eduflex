import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card } from "@blinkdotnew/ui";
//#region src/routes/_app/statistiques.tsx?tsr-split=component
function StatistiquesPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	const [dateRange, setDateRange] = useState("12/07/2026 - 10/08/2026");
	const [period, setPeriod] = useState("30d");
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
				className: "text-center space-y-4",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Statistiques récentes"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-center gap-3 pt-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs",
						children: dateRange
					}), /* @__PURE__ */ jsxs("select", {
						value: period,
						onChange: (e) => setPeriod(e.target.value),
						className: "h-9 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none shadow-xs cursor-pointer",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "7d",
								children: "7 derniers jours"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "30d",
								children: "30 derniers jours"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "90d",
								children: "90 derniers jours"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "year",
								children: "Cette année"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto",
				children: [
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium text-slate-500",
								children: "Apprenants"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-slate-900 dark:text-white",
								children: "0"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[11px] text-slate-400",
								children: ["Période précédente : ", /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "0"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium text-slate-500",
								children: "Ventes"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-slate-900 dark:text-white",
								children: "0"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[11px] text-slate-400",
								children: ["Période précédente : ", /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "0"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium text-slate-500",
								children: "Revenus"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-slate-900 dark:text-white",
								children: ["0,00 € ", /* @__PURE__ */ jsx("span", {
									className: "text-xs text-slate-400 font-normal",
									children: "(0 FCFA)"
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[11px] text-slate-400",
								children: ["Période précédente : ", /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "0,00 €"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium text-slate-500",
								children: "Abandonnés"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-slate-900 dark:text-white",
								children: "0"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[11px] text-slate-400",
								children: ["Période précédente : ", /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "0"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs divide-y divide-slate-100 dark:divide-slate-800",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center px-6 py-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium text-slate-600 dark:text-slate-400",
							children: "Dernière vente effectuée :"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-slate-900 dark:text-white",
							children: "N/A"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center px-6 py-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium text-slate-600 dark:text-slate-400",
							children: "Nombre d'apprenants ayant fini une formation :"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-slate-900 dark:text-white",
							children: "N/A"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center px-6 py-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium text-slate-600 dark:text-slate-400",
							children: "Nombre d'apprenants ayant commencé une formation :"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-slate-900 dark:text-white",
							children: "N/A"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto pt-6 space-y-4 text-left",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-bold text-slate-900 dark:text-white",
					children: "Graphiques"
				}), isFreePlan ? /* @__PURE__ */ jsx(YellowPlanGuardBox, { subtext: "Seuls ceux ayant un Forfait EXPERT ou supérieur peuvent bénéficier de cette fonctionnalité." }) : /* @__PURE__ */ jsx(Card, {
					className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-xl text-center text-slate-400 text-xs italic",
					children: "Graphiques d'évolution des ventes réelles en cours de chargement..."
				})]
			})
		]
	});
}
//#endregion
export { StatistiquesPage as component };
