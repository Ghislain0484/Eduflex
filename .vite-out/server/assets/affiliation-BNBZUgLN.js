import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, CardTitle, Input, toast } from "@blinkdotnew/ui";
import { Share2 } from "lucide-react";
//#region src/routes/_app/affiliation.tsx?tsr-split=component
function AffiliationPage() {
	const [commissionRate, setCommissionRate] = useState("20");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-black text-white flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Share2, { className: "h-6 w-6 text-teal-400" }), "Programme d'Affiliation & Ambassadeurs"]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-[#94a3b8]",
					children: "Récompensez vos élèves et partenaires lorsqu'ils recommandent vos formations."
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsxs(Card, {
				className: "border border-border/80 bg-card p-5 space-y-4",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-sm font-bold text-white",
					children: "Paramètres des commissions"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-bold text-muted-foreground",
							children: "Taux de commission par vente (%)"
						}), /* @__PURE__ */ jsx(Input, {
							type: "number",
							value: commissionRate,
							onChange: (e) => setCommissionRate(e.target.value),
							className: "text-xs"
						})]
					}), /* @__PURE__ */ jsx(Button, {
						onClick: () => toast.success(`Taux de commission mis à jour à ${commissionRate}% !`),
						className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
						children: "Enregistrer le taux"
					})]
				})]
			}), /* @__PURE__ */ jsxs(Card, {
				className: "lg:col-span-2 border border-border/80 bg-card p-5 space-y-4",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-sm font-bold text-white",
					children: "Tableau des apporteurs d'affaires"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-2 text-xs",
					children: /* @__PURE__ */ jsxs("div", {
						className: "p-3 bg-slate-950/40 border border-border/60 rounded-xl flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-bold text-white",
							children: "Moussa Diakité"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-muted-foreground",
							children: "Lien : eduflex.com/c/moussa?ref=aff_8842"
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "text-right",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold text-teal-400",
								children: "45 800 FCFA générés"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[9px] text-emerald-400 font-semibold",
								children: "3 ventes validées"
							})]
						})]
					})
				})]
			})]
		})]
	});
}
//#endregion
export { AffiliationPage as component };
