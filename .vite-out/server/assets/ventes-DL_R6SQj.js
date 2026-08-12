import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, Input, toast } from "@blinkdotnew/ui";
import { ArrowDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
//#region src/routes/_app/ventes.tsx?tsr-split=component
function VentesPage() {
	const { user } = useAuth();
	const [searchFilter, setSearchFilter] = useState("");
	const [sortOrder, setSortOrder] = useState("created_at");
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
					children: "Ventes"
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: () => toast.info("Génération du rapport des ventes CSV..."),
					className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 rounded-lg px-4 flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), " Export CSV"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-12 items-end",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-8 space-y-1",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold text-slate-500",
						children: "Filtrer par"
					}), /* @__PURE__ */ jsx(Input, {
						placeholder: "email, prénom, nom, formation ou pack",
						value: searchFilter,
						onChange: (e) => setSearchFilter(e.target.value),
						className: "w-full bg-white dark:bg-slate-900 text-xs h-9"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:col-span-4 space-y-1",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold text-slate-500",
						children: "Trier par"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ jsxs("select", {
							value: sortOrder,
							onChange: (e) => setSortOrder(e.target.value),
							className: "flex-1 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none px-3 cursor-pointer",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "created_at",
									children: "Date d'achat"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "amount",
									children: "Montant payé"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "buyer",
									children: "Nom de l'acheteur"
								})
							]
						}), /* @__PURE__ */ jsx("button", {
							className: "h-9 w-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0",
							children: /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pt-1",
				children: /* @__PURE__ */ jsxs("span", {
					className: "text-xs font-bold text-slate-800 dark:text-slate-200",
					children: ["Résultat : ", /* @__PURE__ */ jsx("strong", {
						className: "text-teal-600 dark:text-teal-400",
						children: "0 vente"
					})]
				})
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-xl overflow-hidden shadow-xs",
				children: [/* @__PURE__ */ jsx("div", {
					className: "w-full overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6",
									children: "Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6",
									children: "Acheteur"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6",
									children: "Produit acheté"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6",
									children: "Moyen de Paiement"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6",
									children: "Reste à payer"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3.5 px-6 text-right",
									children: "Montant payé"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-slate-100 dark:divide-slate-800",
							children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 6,
								className: "py-16 text-center text-slate-400 text-xs italic",
								children: "Il n'y pas de résultat pour cette recherche"
							}) })
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-1",
					children: [/* @__PURE__ */ jsx("button", {
						disabled: true,
						className: "h-7 w-7 rounded border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ jsx("button", {
						disabled: true,
						className: "h-7 w-7 rounded border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed",
						children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
					})]
				})]
			})
		]
	});
}
//#endregion
export { VentesPage as component };
