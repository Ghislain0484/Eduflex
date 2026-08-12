import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, toast } from "@blinkdotnew/ui";
import { ExternalLink } from "lucide-react";
//#region src/routes/_app/integrations.tsx?tsr-split=component
function IntegrationsPage() {
	const { user } = useAuth();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans",
		children: [/* @__PURE__ */ jsxs("div", {
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
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-12 items-start",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-5 space-y-4",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
						children: "Intégrez vos formations et vos packs à un site externe"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
						children: "Vous avez un site existant ? Que vous utilisiez Wix, WordPress, Drupal, Ionos, Leadpages ou Instapage..."
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-slate-500 leading-relaxed",
						children: [
							"Nous avons développé cette fonctionnalité d'intégration externe pour vous permettre de ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-slate-800 dark:text-slate-200",
								children: "faciliter les inscriptions à vos formations depuis n'importe quel site web"
							}),
							" : sous forme de liens, de boutons ou de cartes."
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => toast.info("Ouverture du tutoriel d'intégration..."),
						className: "text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1",
						children: ["Vous pouvez suivre notre tutoriel sur le sujet en cliquant ici ", /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })]
					})
				]
			}), /* @__PURE__ */ jsx(Card, {
				className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs min-h-[140px] flex items-center justify-center",
				children: /* @__PURE__ */ jsx("div", {
					className: "p-4 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center w-full",
					children: "Vous n'avez aucun produit publié à intégrer pour le moment."
				})
			})]
		})]
	});
}
//#endregion
export { IntegrationsPage as component };
