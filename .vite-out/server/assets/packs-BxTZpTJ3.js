import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, toast } from "@blinkdotnew/ui";
import { Layers, Plus } from "lucide-react";
//#region src/routes/_app/packs.tsx?tsr-split=component
function PacksPage() {
	const [packs, setPacks] = useState([{
		id: 1,
		title: "Pack Bundle Marketing & Vente",
		coursesCount: 2,
		price: 59900,
		originalPrice: 79800,
		sales: 14
	}]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-black text-white flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Layers, { className: "h-6 w-6 text-teal-400" }), "Packs & Offres Bundles"]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-slate-400",
					children: "Regroupez plusieurs formations dans une offre combinée à prix préférentiel."
				})]
			}), /* @__PURE__ */ jsxs(Button, {
				onClick: () => toast.info("Formulaire de création de pack prêt."),
				className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
				children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }), " Créer un Pack"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: packs.map((pack) => /* @__PURE__ */ jsxs(Card, {
				className: "border border-border/80 bg-card p-5 space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ jsxs(Badge, {
							className: "bg-teal-500/10 text-teal-400 border-none text-[9px] font-bold",
							children: [pack.coursesCount, " Formations incluses"]
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-sm font-bold text-white leading-snug",
							children: pack.title
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xl font-black text-teal-400",
							children: [pack.price.toLocaleString("fr-FR"), " FCFA"]
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-xs text-slate-500 line-through",
							children: [pack.originalPrice.toLocaleString("fr-FR"), " FCFA"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "pt-2 border-t border-border/40 text-xs text-muted-foreground flex justify-between",
						children: [/* @__PURE__ */ jsxs("span", { children: [pack.sales, " ventes générées"] }), /* @__PURE__ */ jsx(Button, {
							size: "xs",
							variant: "ghost",
							className: "text-teal-400 font-bold p-0 h-auto",
							children: "Éditer →"
						})]
					})
				]
			}, pack.id))
		})]
	});
}
//#endregion
export { PacksPage as component };
