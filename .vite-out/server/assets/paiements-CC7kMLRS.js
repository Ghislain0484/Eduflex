import { n as useAllEnrollments } from "./useStats-Cf7USm9u.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Card, CardContent, Input, Skeleton } from "@blinkdotnew/ui";
import { CreditCard, Euro, Search } from "lucide-react";
//#region src/routes/_app/paiements.tsx?tsr-split=component
function PaiementsPage() {
	const { data: enrollments, isLoading } = useAllEnrollments();
	const [search, setSearch] = useState("");
	const enrollmentList = enrollments || [];
	const filtered = enrollmentList.filter((p) => p.studentName.toLowerCase().includes(search.toLowerCase()) || p.courseTitle.toLowerCase().includes(search.toLowerCase()) || p.studentEmail.toLowerCase().includes(search.toLowerCase()));
	const totalRevenueFcfa = enrollmentList.reduce((sum, item) => sum + (item.coursePrice || 0), 0);
	const totalRevenueEur = Math.round(totalRevenueFcfa / 655.957);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Paiements"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-sm mt-1",
					children: "Historique des transactions de la plateforme"
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ jsx(Card, {
					className: "animate-fade-in border-border/80",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "pt-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 shrink-0",
								children: /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground font-medium",
								children: "Revenus cumulés (FCFA)"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold mt-0.5",
								children: [totalRevenueFcfa.toLocaleString("fr-FR"), " F CFA"]
							})] })]
						})
					})
				}), /* @__PURE__ */ jsx(Card, {
					className: "animate-fade-in border-border/80",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "pt-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shrink-0",
								children: /* @__PURE__ */ jsx(Euro, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground font-medium",
								children: "Revenus cumulés (Euros)"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold mt-0.5",
								children: [
									"~ ",
									totalRevenueEur.toLocaleString("fr-FR"),
									" €"
								]
							})] })]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-sm",
				children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					placeholder: "Rechercher par élève ou cours...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-border/80 text-muted-foreground uppercase font-semibold text-[10px]",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Élève"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Formation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Montant"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Méthode"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-3 px-4",
									children: "Statut"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: isLoading ? [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-border/50",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-48" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-16" })
								})
							]
						}, i)) : filtered.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 6,
							className: "py-10 text-center text-muted-foreground italic",
							children: "Aucune transaction enregistrée."
						}) }) : filtered.map((paiement) => {
							const priceEur = paiement.coursePrice / 100;
							Math.round(priceEur * 655.957);
							const date = new Date(paiement.enrolledAt).toLocaleDateString("fr-FR", {
								day: "numeric",
								month: "short",
								year: "numeric"
							});
							return /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-border/30 hover:bg-muted/10 transition-colors",
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "py-3.5 px-4",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-medium text-foreground block",
											children: paiement.studentName
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground",
											children: paiement.studentEmail
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3.5 px-4 text-muted-foreground truncate max-w-xs",
										children: paiement.courseTitle
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3.5 px-4",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-semibold text-foreground block",
											children: [(paiement.coursePrice || 0).toLocaleString("fr-FR"), " FCFA"]
										}), paiement.coursePrice > 0 && /* @__PURE__ */ jsxs("span", {
											className: "text-[10px] text-muted-foreground",
											children: [
												"~ ",
												Math.round((paiement.coursePrice || 0) / 655.957).toLocaleString("fr-FR"),
												" €"
											]
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3.5 px-4 text-muted-foreground",
										children: date
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3.5 px-4 text-muted-foreground",
										children: paiement.method
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsx(Badge, {
											variant: paiement.coursePrice > 0 ? "default" : "secondary",
											children: paiement.status
										})
									})
								]
							}, paiement.id);
						}) })]
					})
				})
			}) })
		]
	});
}
//#endregion
export { PaiementsPage as component };
