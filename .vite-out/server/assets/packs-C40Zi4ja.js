import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, toast } from "@blinkdotnew/ui";
import { Plus } from "lucide-react";
//#region src/routes/_app/packs.tsx?tsr-split=component
function PacksPage() {
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
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Vos Packs"
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: () => {
						if (isFreePlan) toast.error("Veuillez passer au forfait PRO pour créer des packs de formations !");
						else toast.info("Création d'un pack de formations...");
					},
					className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 rounded-lg px-4 flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Ajouter un pack"]
				})]
			}),
			isFreePlan && /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto pt-4",
				children: /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
			})
		]
	});
}
//#endregion
export { PacksPage as component };
