import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent } from "@blinkdotnew/ui";
import { CheckCircle, HelpCircle, Sparkles } from "lucide-react";
//#region src/routes/tarifs.tsx?tsr-split=component
function TarifsPage() {
	const [currency, setCurrency] = useState("FCFA");
	const [billingCycle, setBillingCycle] = useState("monthly");
	const featuresList = [
		{
			name: "Nombre d'élèves",
			free: "Illimité",
			pro: "Illimité",
			b2b: "Illimité"
		},
		{
			name: "Nombre de formations",
			free: "Jusqu'à 2",
			pro: "Illimité",
			b2b: "Illimité"
		},
		{
			name: "Mobile Money & Cartes bancaires",
			free: "Oui (Commission 5%)",
			pro: "Oui (Commission 2%)",
			b2b: "Oui (Commission 0% - Direct)"
		},
		{
			name: "Classes Virtuelles Jitsi",
			free: "Non",
			pro: "Oui (50 part. max)",
			b2b: "Oui (Illimité)"
		},
		{
			name: "Branding Personnalisé",
			free: "Non (Logo EduFlex)",
			pro: "Partiel (Logo + Couleurs)",
			b2b: "Total (Marque Blanche 100%)"
		},
		{
			name: "Nom de domaine propre",
			free: "Non",
			pro: "Non (sous-domaine)",
			b2b: "Oui (ex: cours.votre-ecole.com)"
		},
		{
			name: "Support de modules SCORM / H5P",
			free: "Non",
			pro: "Non",
			b2b: "Oui (Inclus)"
		},
		{
			name: "Rapports d'assiduité avancés",
			free: "Non",
			pro: "Oui",
			b2b: "Oui"
		},
		{
			name: "Support technique",
			free: "Standard (Email)",
			pro: "Prioritaire (Email/Chat)",
			b2b: "Dédié 24/7 (Téléphone & WhatsApp)"
		}
	];
	const getProPrice = () => {
		if (billingCycle === "monthly") return currency === "FCFA" ? "15 000 FCFA" : "25 €";
		else return currency === "FCFA" ? "12 000 FCFA" : "20 €";
	};
	const getB2bPrice = () => {
		if (billingCycle === "monthly") return currency === "FCFA" ? "65 000 FCFA" : "99 €";
		else return currency === "FCFA" ? "52 000 FCFA" : "79 €";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "max-w-7xl mx-auto flex items-center justify-between h-16 px-6",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-white" })
						}), /* @__PURE__ */ jsxs("span", {
							className: "font-bold text-lg tracking-tight text-white flex items-center gap-1",
							children: ["EduFlex", /* @__PURE__ */ jsx("span", {
								className: "text-teal-400 font-extrabold text-xs",
								children: "TARIFS"
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "text-sm font-medium text-slate-300 hover:text-white transition-colors",
							children: "Retour au site"
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							className: "bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-500/20 border-none",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/register",
								children: "Démarrer gratuitement"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden pt-20 pb-16",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.06),transparent_60%)]" }), /* @__PURE__ */ jsxs("div", {
					className: "max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10",
					children: [
						/* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							className: "border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full",
							children: "Tarification Flexible"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-5xl font-black tracking-tight text-white leading-tight",
							children: [
								"Des tarifs transparents, ",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent",
									children: "sans frais cachés"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed",
							children: "Hébergez vos formations, vendez vos cours et créez votre propre académie virtuelle avec des plans adaptés à vos objectifs."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center gap-4 pt-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 bg-slate-905 bg-slate-900 border border-slate-800 p-1 rounded-full",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => setCurrency("FCFA"),
									className: `text-xs font-bold px-3 py-1 rounded-full transition-all ${currency === "FCFA" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"}`,
									children: "FCFA (XOF/XAF)"
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => setCurrency("EUR"),
									className: `text-xs font-bold px-3 py-1 rounded-full transition-all ${currency === "EUR" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"}`,
									children: "Euros (€)"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: `text-xs font-bold ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`,
										children: "Facturation Mensuelle"
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setBillingCycle((prev) => prev === "monthly" ? "yearly" : "monthly"),
										className: "relative inline-flex h-6 w-11 items-center rounded-full bg-slate-800 transition-colors focus:outline-none",
										children: /* @__PURE__ */ jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-teal-500 transition-transform ${billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"}` })
									}),
									/* @__PURE__ */ jsxs("span", {
										className: `text-xs font-bold ${billingCycle === "yearly" ? "text-white" : "text-slate-400"} flex items-center gap-1.5`,
										children: ["Facturation Annuelle", /* @__PURE__ */ jsx("span", {
											className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-black px-2 py-0.5 rounded-full",
											children: "-20% d'économie"
										})]
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "max-w-7xl mx-auto px-6 pb-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 md:grid-cols-3 max-w-6xl mx-auto",
					children: [
						/* @__PURE__ */ jsxs(Card, {
							className: "border-slate-800/80 bg-slate-900/20 text-left flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs(CardContent, {
								className: "pt-8 space-y-6 flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "border-slate-700 text-slate-400",
											children: "Plan Découverte"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-3xl font-black text-white",
											children: "Gratuit"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[11px] text-slate-400",
											children: "Pour tester les fonctionnalités d'EduFlex sans limite de temps."
										})
									]
								}), /* @__PURE__ */ jsxs("ul", {
									className: "space-y-3 text-[11px] text-slate-300",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Jusqu'à 2 cours en ligne"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Inscriptions d'élèves illimitées"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Support standard par e-mail"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2 text-slate-500",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-slate-700 shrink-0" }), " Personnalisation de marque"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2 text-slate-500",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-slate-700 shrink-0" }), " Nom de domaine propre"]
										})
									]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-6 pt-0",
								children: /* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "outline",
									className: "w-full border-slate-800 text-slate-300 hover:bg-slate-900 h-10",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										children: "Démarrer gratuitement"
									})
								})
							})]
						}),
						/* @__PURE__ */ jsxs(Card, {
							className: "border-slate-850 bg-slate-900/40 text-left flex flex-col justify-between relative",
							children: [/* @__PURE__ */ jsxs(CardContent, {
								className: "pt-8 space-y-6 flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "border-teal-500/20 text-teal-400 bg-teal-500/5",
											children: "Plan Pro"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-3xl font-black text-white",
											children: [
												getProPrice(),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-normal text-slate-400",
													children: "/ mois"
												})
											]
										}),
										billingCycle === "yearly" && /* @__PURE__ */ jsxs("p", {
											className: "text-[10px] text-emerald-400 font-semibold font-mono",
											children: [
												"Facturé ",
												currency === "FCFA" ? "144 000 FCFA" : "240 €",
												" par an"
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[11px] text-slate-400",
											children: "Parfait pour les formateurs, coachs et consultants indépendants."
										})
									]
								}), /* @__PURE__ */ jsxs("ul", {
									className: "space-y-3 text-[11px] text-slate-300",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Nombre de cours illimités"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Sous-domaine personnalisé"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Logo & thème couleur modifiables"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Classes Jitsi live (50 part. max)"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Mobile Money (Wave, Orange, MTN)"]
										})
									]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-6 pt-0",
								children: /* @__PURE__ */ jsx(Button, {
									asChild: true,
									className: "w-full bg-slate-850 hover:bg-slate-800 text-white h-10 border border-slate-700",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										search: { plan: "Pro" },
										children: "Choisir le plan Pro"
									})
								})
							})]
						}),
						/* @__PURE__ */ jsxs(Card, {
							className: "border-teal-500/40 bg-teal-950/10 text-left flex flex-col justify-between relative shadow-lg shadow-teal-500/5",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-0 right-6 -translate-y-1/2 bg-teal-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full",
									children: "EduFlex+"
								}),
								/* @__PURE__ */ jsxs(CardContent, {
									className: "pt-8 space-y-6 flex-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Badge, {
												className: "bg-teal-500/15 text-teal-400 border-teal-500/30",
												children: "Académie B2B (Marque Blanche)"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "text-3xl font-black text-teal-400",
												children: [
													getB2bPrice(),
													" ",
													/* @__PURE__ */ jsx("span", {
														className: "text-xs font-normal text-slate-400",
														children: "/ mois"
													})
												]
											}),
											billingCycle === "yearly" && /* @__PURE__ */ jsxs("p", {
												className: "text-[10px] text-emerald-400 font-semibold font-mono",
												children: [
													"Facturé ",
													currency === "FCFA" ? "624 000 FCFA" : "948 €",
													" par an"
												]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[11px] text-slate-400",
												children: "Conçu pour les écoles d'enseignement supérieur, lycées, et grands cabinets."
											})
										]
									}), /* @__PURE__ */ jsxs("ul", {
										className: "space-y-3 text-[11px] text-slate-300",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Marque blanche totale (100% neutre)"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Propre nom de domaine (ex: cours.ecole.com)"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Jitsi Meet Live illimité"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Intégration de modules interactifs SCORM"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-teal-500 shrink-0" }), " Support technique dédié 24/7 (WhatsApp)"]
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "p-6 pt-0",
									children: /* @__PURE__ */ jsx(Button, {
										asChild: true,
										className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold h-10 border-none shadow-lg shadow-teal-500/20",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/register",
											search: { plan: "B2B" },
											children: "Activer EduFlex+"
										})
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "max-w-7xl mx-auto px-6 py-12 border-t border-slate-900",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-4xl mx-auto space-y-8",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-white text-center",
						children: "Comparatif complet des fonctionnalités"
					}), /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full border-collapse text-left",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-slate-800 text-xs font-bold text-slate-400 uppercase bg-slate-900/50",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Fonctionnalité"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Découverte"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Pro"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4 text-teal-400",
										children: "EduFlex+"
									})
								]
							}) }), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-slate-900 text-xs",
								children: featuresList.map((f, i) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-slate-900/20 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-medium text-slate-200",
											children: f.name
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-slate-400",
											children: f.free
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-slate-300",
											children: f.pro
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-semibold text-teal-400",
											children: f.b2b
										})
									]
								}, i))
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-3xl mx-auto px-6 py-24 space-y-12",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-2xl font-extrabold text-white text-center flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-6 w-6 text-teal-500" }), " Questions Fréquentes sur les Abonnements"]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 sm:grid-cols-2 text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "font-bold text-white text-sm",
							children: "Puis-je changer d'abonnement à tout moment ?"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Oui, tout à fait. Vous pouvez passer à un forfait supérieur ou résilier votre abonnement mensuel directement depuis vos réglages, sans engagement."
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "font-bold text-white text-sm",
							children: "Comment récupérer l'argent des ventes de cours ?"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Pour chaque vente effectuée via Mobile Money (Orange Money, Wave, MTN), l'argent est sécurisé sur notre passerelle puis reversé automatiquement sur votre compte Mobile Money ou compte bancaire."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500",
				children: /* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" EduFlex. Tous droits réservés. Tarifs indicatifs."
				] })
			})
		]
	});
}
//#endregion
export { TarifsPage as component };
