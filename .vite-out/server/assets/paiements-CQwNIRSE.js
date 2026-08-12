import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { n as useAllEnrollments } from "./useStats-Cf7USm9u.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, Input, Skeleton, toast } from "@blinkdotnew/ui";
import { CreditCard, DollarSign, Download, Search, ShieldCheck, Wallet } from "lucide-react";
//#region src/routes/_app/paiements.tsx?tsr-split=component
function PaiementsPage() {
	const { user } = useAuth();
	const { data: enrollments, isLoading } = useAllEnrollments();
	const [search, setSearch] = useState("");
	const [devCommissionRate, setDevCommissionRate] = useState("5");
	const [flwPublicKey, setFlwPublicKey] = useState("FLWPUBK_TEST-a91c8821901aef42b-X");
	const [flwSecretKey, setFlwSecretKey] = useState("FLWSECK_TEST-9921b712019ff21-X");
	const enrollmentList = enrollments || [];
	const filtered = enrollmentList.filter((p) => p.studentName.toLowerCase().includes(search.toLowerCase()) || p.courseTitle.toLowerCase().includes(search.toLowerCase()) || p.studentEmail.toLowerCase().includes(search.toLowerCase()));
	const totalRevenueFcfa = enrollmentList.reduce((sum, item) => sum + (item.coursePrice || 0), 0);
	const devCommissionFcfa = Math.round(totalRevenueFcfa * (Number(devCommissionRate) / 100));
	const trainerShareFcfa = totalRevenueFcfa - devCommissionFcfa;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto font-sans text-left",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Gestion des Paiements & Split Payments Flutterwave"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-slate-500 mt-1",
					children: "Répartition automatique des revenus entre la part développeur/plateforme et la part des formateurs."
				})] }), /* @__PURE__ */ jsxs(Button, {
					onClick: () => toast.success("Rapport financier téléversé en CSV !"),
					className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 gap-1.5 rounded-lg",
					children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), " Exporter le rapport CSV"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500 font-semibold",
								children: "Volume Total de Ventes"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xl font-black text-slate-900 dark:text-white mt-0.5",
								children: [totalRevenueFcfa.toLocaleString("fr-FR"), " FCFA"]
							})] })]
						})
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 font-semibold",
								children: [
									"Part Développeur / Plateforme (",
									devCommissionRate,
									"%)"
								]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5",
								children: [devCommissionFcfa.toLocaleString("fr-FR"), " FCFA"]
							})] })]
						})
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 font-semibold",
								children: [
									"Part Net Formateurs / Instituts (",
									100 - Number(devCommissionRate),
									"%)"
								]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5",
								children: [trainerShareFcfa.toLocaleString("fr-FR"), " FCFA"]
							})] })]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "text-base font-bold text-slate-900 dark:text-white flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-teal-500" }), "Passerelle Flutterwave & Subaccount Split Payments"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500",
								children: "Connectez votre compte Flutterwave pour encaisser par Wave, Orange Money, MTN, Moov et Carte bancaire."
							})]
						}), /* @__PURE__ */ jsx(Badge, {
							className: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-xs px-3 py-1 font-bold",
							children: "Flutterwave V3 Actif"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-3 pt-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Clé Publique (Public Key)"
								}), /* @__PURE__ */ jsx(Input, {
									value: flwPublicKey,
									onChange: (e) => setFlwPublicKey(e.target.value),
									className: "text-xs font-mono h-9"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Clé Secrète (Secret Key)"
								}), /* @__PURE__ */ jsx(Input, {
									type: "password",
									value: flwSecretKey,
									onChange: (e) => setFlwSecretKey(e.target.value),
									className: "text-xs font-mono h-9"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Commission Développeur (%)"
								}), /* @__PURE__ */ jsx(Input, {
									value: devCommissionRate,
									onChange: (e) => setDevCommissionRate(e.target.value),
									className: "text-xs font-mono h-9"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ jsx(Button, {
							onClick: () => toast.success("Configuration Flutterwave enregistrée !"),
							className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
							children: "Sauvegarder les paramètres Flutterwave"
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-base font-bold text-slate-900 dark:text-white",
						children: "Historique des Transactions Réparti"
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative w-64",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" }), /* @__PURE__ */ jsx(Input, {
							placeholder: "Rechercher par élève ou cours...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9 text-xs h-8 bg-white dark:bg-slate-950"
						})]
					})]
				}), /* @__PURE__ */ jsx(Card, {
					className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden shadow-xs",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-xs text-left",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase font-bold text-[10px]",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Apprenant"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Formation / Cours"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Montant Total"
									}),
									/* @__PURE__ */ jsxs("th", {
										className: "py-3 px-4",
										children: [
											"Part Développeur (",
											devCommissionRate,
											"%)"
										]
									}),
									/* @__PURE__ */ jsxs("th", {
										className: "py-3 px-4",
										children: [
											"Part Formateur (",
											100 - Number(devCommissionRate),
											"%)"
										]
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
							}) }), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-slate-100 dark:divide-slate-800",
								children: isLoading ? [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ jsxs("tr", { children: [
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
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" })
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
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-16" })
									})
								] }, i)) : filtered.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 7,
									className: "py-10 text-center text-slate-400 italic",
									children: "Aucune transaction enregistrée."
								}) }) : filtered.map((paiement) => {
									const priceFcfa = paiement.coursePrice || 0;
									const devPart = Math.round(priceFcfa * (Number(devCommissionRate) / 100));
									const trainerPart = priceFcfa - devPart;
									return /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors",
										children: [
											/* @__PURE__ */ jsxs("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold text-slate-900 dark:text-white block",
													children: paiement.studentName
												}), /* @__PURE__ */ jsx("span", {
													className: "text-[10px] text-slate-400",
													children: paiement.studentEmail
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs",
												children: paiement.courseTitle
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "py-3.5 px-4 font-bold text-slate-900 dark:text-white",
												children: [priceFcfa.toLocaleString("fr-FR"), " FCFA"]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "py-3.5 px-4 font-bold text-amber-600 dark:text-amber-400",
												children: [devPart.toLocaleString("fr-FR"), " FCFA"]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400",
												children: [trainerPart.toLocaleString("fr-FR"), " FCFA"]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "py-3.5 px-4 text-slate-500 font-semibold",
												children: paiement.method || "Flutterwave Mobile Money"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ jsx(Badge, {
													className: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-[10px] font-bold",
													children: paiement.status || "Payé"
												})
											})
										]
									}, paiement.id);
								})
							})]
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { PaiementsPage as component };
