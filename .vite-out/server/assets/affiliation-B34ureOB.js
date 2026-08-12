import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
//#region src/routes/_app/affiliation.tsx?tsr-split=component
function AffiliationPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	const [isAffiliateActive, setIsAffiliateActive] = useState(false);
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
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Votre programme d'affiliation"
				}), /* @__PURE__ */ jsx("span", {
					className: "bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full border border-slate-700 shadow-xs",
					children: isAffiliateActive ? "Activé" : "Fermé"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-6 bg-teal-50 dark:bg-slate-900/60 border border-teal-500/30 rounded-2xl text-slate-700 dark:text-slate-200 space-y-2 shadow-xs",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold leading-relaxed",
					children: "L'affiliation vous permet de vous faire connaître et de vendre plus de formations grâce à la puissance des recommandations."
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs leading-relaxed text-slate-600 dark:text-slate-300",
					children: "En activant votre propre programme d'affiliation, vous récompensez les personnes qui génèrent des ventes pour vous en leur rétribuant un pourcentage des revenus générés !"
				})]
			}),
			isFreePlan && /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto pt-2",
				children: /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
			})
		]
	});
}
//#endregion
export { AffiliationPage as component };
