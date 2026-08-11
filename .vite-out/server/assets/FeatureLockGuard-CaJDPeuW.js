import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Button, Card } from "@blinkdotnew/ui";
import { ArrowRight, Gem, Lock, Sparkles } from "lucide-react";
//#region src/components/FeatureLockGuard.tsx
function FeatureLockGuard({ featureTitle, featureDescription, children, isLocked }) {
	if (!isLocked) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-[60vh] flex items-center justify-center p-6 text-left",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 opacity-20 blur-sm pointer-events-none overflow-hidden select-none",
			children
		}), /* @__PURE__ */ jsxs(Card, {
			className: "relative z-10 max-w-lg w-full border border-amber-500/40 bg-slate-950/90 shadow-2xl rounded-2xl p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300 backdrop-blur-md",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mx-auto h-16 w-16 bg-amber-500/10 text-amber-400 flex items-center justify-center rounded-2xl border border-amber-500/20 shadow-inner",
					children: /* @__PURE__ */ jsx(Lock, { className: "h-8 w-8 animate-bounce" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block",
							children: "Offre Découverte (Gratuite)"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "text-xl font-black text-white tracking-tight",
							children: [featureTitle, " — Fonctionnalité PRO"]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-300 leading-relaxed max-w-md mx-auto",
							children: featureDescription
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400 text-left",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-bold text-white flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx(Gem, { className: "h-4 w-4 text-emerald-400" }), " Inclus dans le plan PRO :"]
					}), /* @__PURE__ */ jsxs("ul", {
						className: "list-disc pl-5 space-y-1 text-[11px]",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Formations et apprenants illimités" }),
							/* @__PURE__ */ jsx("li", { children: "Autorépondeurs & Tracking Facebook Pixel / Google Analytics" }),
							/* @__PURE__ */ jsx("li", { children: "Affiliation, codes promo & visioconférences illimitées" }),
							/* @__PURE__ */ jsx("li", { children: "Accès complet aux clés API & Webhooks" })
						]
					})]
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black h-11 text-xs rounded-xl shadow-lg border-none",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/tarifs",
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
							" Passer à la version PRO ",
							/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
						]
					})
				})
			]
		})]
	});
}
//#endregion
export { FeatureLockGuard as t };
