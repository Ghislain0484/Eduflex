import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardTitle, Input, toast } from "@blinkdotnew/ui";
import { Copy, Percent, Plus } from "lucide-react";
//#region src/routes/_app/codes-promo.tsx?tsr-split=component
function CodesPromoPage() {
	const [promos, setPromos] = useState([{
		id: 1,
		code: "BIENVENUE20",
		type: "Pourcentage",
		value: "-20%",
		uses: 42,
		maxUses: 100
	}, {
		id: 2,
		code: "LANCEMENT50",
		type: "Pourcentage",
		value: "-50%",
		uses: 15,
		maxUses: 50
	}]);
	const [codeName, setCodeName] = useState("");
	const [discountVal, setDiscountVal] = useState("20");
	const handleCreateCode = (e) => {
		e.preventDefault();
		if (!codeName.trim()) return;
		setPromos([...promos, {
			id: Date.now(),
			code: codeName.toUpperCase().replace(/\s+/g, ""),
			type: "Pourcentage",
			value: `-${discountVal}%`,
			uses: 0,
			maxUses: 100
		}]);
		setCodeName("");
		toast.success("Code promo créé et activé !");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-black text-white flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Percent, { className: "h-6 w-6 text-teal-400" }), "Codes Promo & Remises"]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-slate-400",
					children: "Créez des coupons de réduction pour booster vos ventes et fidéliser vos prospects."
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsxs(Card, {
				className: "border border-border/80 bg-card p-5 h-fit",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-sm font-bold text-white mb-4",
					children: "Nouveau code promo"
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleCreateCode,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Code (Ex: PROMO50)"
							}), /* @__PURE__ */ jsx(Input, {
								placeholder: "PROMO50",
								value: codeName,
								onChange: (e) => setCodeName(e.target.value),
								className: "text-xs font-mono uppercase"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Réduction (%)"
							}), /* @__PURE__ */ jsx(Input, {
								type: "number",
								value: discountVal,
								onChange: (e) => setDiscountVal(e.target.value),
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: !codeName.trim(),
							className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }), " Créer le code promo"]
						})
					]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-3",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
					children: "Codes promo actifs"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: promos.map((p) => /* @__PURE__ */ jsxs(Card, {
						className: "border border-border/70 bg-card p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-black font-mono text-teal-400",
									children: p.code
								}), /* @__PURE__ */ jsx(Badge, {
									className: "bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-bold",
									children: p.value
								})]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-slate-400",
								children: [
									p.uses,
									" utilisations sur ",
									p.maxUses,
									" autorisées"
								]
							})]
						}), /* @__PURE__ */ jsxs(Button, {
							size: "xs",
							variant: "outline",
							onClick: () => {
								navigator.clipboard.writeText(p.code);
								toast.success("Code copié dans le presse-papiers !");
							},
							className: "text-xs border-border",
							children: [/* @__PURE__ */ jsx(Copy, { className: "h-3 w-3 mr-1" }), " Copier"]
						})]
					}, p.id))
				})]
			})]
		})]
	});
}
//#endregion
export { CodesPromoPage as component };
