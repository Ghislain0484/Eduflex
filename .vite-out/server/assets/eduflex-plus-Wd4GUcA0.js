import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent } from "@blinkdotnew/ui";
import { Building, CheckCircle, DollarSign, GraduationCap, HelpCircle, Paintbrush, Smartphone, Sparkles, Users, Video } from "lucide-react";
//#region src/routes/eduflex-plus.tsx?tsr-split=component
function EduflexPlusPage() {
	const [currency, setCurrency] = useState("FCFA");
	const toggleCurrency = () => {
		setCurrency((prev) => prev === "FCFA" ? "EUR" : "FCFA");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 text-left",
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
							className: "font-bold text-lg tracking-tight text-white flex items-center gap-1.5",
							children: ["EduFlex", /* @__PURE__ */ jsx("span", {
								className: "text-teal-400 font-extrabold text-xs bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20",
								children: "PLUS"
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
								children: "Lancer mon académie"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden pt-24 pb-20",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.08),transparent_50%)]" }), /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10",
					children: [
						/* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							className: "border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full",
							children: "✨ Solution LMS Blanche pour Académies & Écoles"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto",
							children: [
								"Créez votre propre ",
								/* @__PURE__ */ jsx("span", {
									className: "bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent",
									children: "académie de formation"
								}),
								" en ligne"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed",
							children: "EduFlex+ offre aux établissements, universités, entreprises et formateurs la possibilité d'héberger leurs formations sous leur propre marque avec paiement Mobile Money et cartes en FCFA & Euros."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "lg",
								className: "w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold h-12 shadow-lg shadow-teal-500/25 border-none",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/register",
									children: "Commencer gratuitement"
								})
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "w-full sm:w-auto border-slate-800 text-slate-300 hover:bg-slate-900 h-12",
								children: /* @__PURE__ */ jsx("a", {
									href: "#tarifs",
									children: "Voir la grille de prix"
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-slate-900/60 border-y border-slate-900 py-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-xs font-bold text-slate-400 uppercase tracking-widest text-center",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500" }), " Sous-domaine personnalisé"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500" }), " Intégration Mobile Money"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500" }), " Salles virtuelles interactives"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500" }), " Support Dédié 24/7"]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-7xl mx-auto px-6 py-24 space-y-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center space-y-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl md:text-3xl font-extrabold text-white",
						children: "Une plateforme, des possibilités infinies"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-400 max-w-xl mx-auto",
						children: "Découvrez pourquoi les écoles leaders choisissent notre technologie."
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(Paintbrush, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Branding & Marque Blanche"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Configurez vos propres couleurs, logos, slogans et thème visuel. Vos élèves restent dans votre univers sans aucune mention d'EduFlex."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(Video, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Classes Virtuelles Live"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Lancez des sessions interactives en direct d'un clic. Partage d'écran, chat en temps réel et tableau blanc collaboratif intégrés."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Moyens de paiement locaux"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Vendez vos abonnements et cours en acceptant Wave, Orange Money, MTN, Moov et cartes bancaires avec virement automatique vers votre compte."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(Smartphone, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Faible consommation data"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Architecture de lecture optimisée pour les réseaux mobiles 3G/4G instables afin de garantir l'accessibilité à tous les apprenants."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Statistiques de présence"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Suivez la progression de vos élèves en temps réel, validez leur assiduité aux cours en direct et générez des rapports de présence automatiques."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border-slate-800/80 bg-slate-900/40 text-left",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg",
										children: /* @__PURE__ */ jsx(Building, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-white text-lg",
										children: "Multi-tenancy complet"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Hébergez votre école sur votre propre adresse (ex: `cours.mon-ecole.com`) avec sécurité SSL automatique."
									})
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-slate-900/40 border-y border-slate-900/80 py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 space-y-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center space-y-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-2xl md:text-3xl font-extrabold text-white",
							children: "Conçu pour tous les besoins pédagogiques"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-400 max-w-xl mx-auto",
							children: "Que vous soyez une grande école ou un formateur solo, EduFlex+ s'adapte à vous."
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid gap-8 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex gap-4 items-start p-6 bg-slate-900/60 rounded-2xl border border-slate-800",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-bold text-white text-lg",
									children: "Écoles, Académies et Universités"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400 leading-relaxed",
									children: "Digitalisez vos cursus académiques. Donnez à vos étudiants un portail d'étude moderne et interactif pour suivre les travaux dirigés, les live-classes et les évaluations à distance de manière rigoureuse."
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-4 items-start p-6 bg-slate-900/60 rounded-2xl border border-slate-800",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-bold text-white text-lg",
									children: "Cabinets de conseil & Entreprises"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400 leading-relaxed",
									children: "Formez vos équipes internes ou délivrez des certifications professionnelles à vos clients sous votre propre identité d'entreprise. Idéal pour optimiser les budgets de formation continue."
								})]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "tarifs",
				className: "max-w-7xl mx-auto px-6 py-24 space-y-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center space-y-6",
					children: [
						/* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							className: "border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full",
							children: "Tarifs Transparents"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-white",
							children: "Des abonnements simples, sans surprise"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-400 max-w-xl mx-auto",
							children: "Choisissez le plan adapté à la taille de votre académie."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-3 pt-4",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: `text-xs font-semibold ${currency === "FCFA" ? "text-teal-400" : "text-slate-400"}`,
									children: "FCFA (Afrique Centrale/Ouest)"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: toggleCurrency,
									className: "relative inline-flex h-6 w-11 items-center rounded-full bg-slate-800 transition-colors focus:outline-none",
									children: /* @__PURE__ */ jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-teal-500 transition-transform ${currency === "EUR" ? "translate-x-6" : "translate-x-1"}` })
								}),
								/* @__PURE__ */ jsx("span", {
									className: `text-xs font-semibold ${currency === "EUR" ? "text-teal-400" : "text-slate-400"}`,
									children: "Euros (Europe/International)"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 md:grid-cols-2 max-w-4xl mx-auto",
					children: [/* @__PURE__ */ jsx(Card, {
						className: "border-slate-800 bg-slate-900/30 text-left",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "pt-8 space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "border-slate-700 text-slate-300",
											children: "Plan Académie Pro"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-3xl font-black text-white",
											children: [
												currency === "FCFA" ? "32 000 FCFA" : "49 €",
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-normal text-slate-400",
													children: "/ mois"
												})
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-400",
											children: "Idéal pour les formateurs indépendants et petites académies."
										})
									]
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "space-y-3 text-xs text-slate-300",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Formations et élèves illimités"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Nom de domaine en `.eduflex.com`"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Logo et couleurs personnalisés"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Visioconférences Live (EduFlex Meet)"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Paiements Mobile Money configurés"]
										})
									]
								}),
								/* @__PURE__ */ jsx(Button, {
									asChild: true,
									className: "w-full bg-slate-800 hover:bg-slate-700 text-white h-11",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										children: "Démarrer le plan Pro"
									})
								})
							]
						})
					}), /* @__PURE__ */ jsxs(Card, {
						className: "border-teal-500/40 bg-teal-950/10 text-left relative shadow-lg shadow-teal-500/5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute top-0 right-6 -translate-y-1/2 bg-teal-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full",
							children: "Recommandé"
						}), /* @__PURE__ */ jsxs(CardContent, {
							className: "pt-8 space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Badge, {
											className: "bg-teal-500/10 text-teal-400 border-teal-500/20",
											children: "Plan Académie B2B (EduFlex+)"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-3xl font-black text-teal-400",
											children: [
												currency === "FCFA" ? "59 000 FCFA" : "89 €",
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-normal text-slate-400",
													children: "/ mois"
												})
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-400",
											children: "Pour les grandes écoles et cabinets de formation à forte visibilité."
										})
									]
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "space-y-3 text-xs text-slate-300",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Tout ce qui est dans le plan Pro"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " **Propre nom de domaine** (ex: `cours.votre-ecole.com`)"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Marque blanche 100% neutre"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Panel d'administration multi-comptes formateurs (10 accès)"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Support VIP WhatsApp & Téléphone 24/7"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-teal-500 shrink-0" }), " Frais de transaction ultra-bas: 1%"]
										})
									]
								}),
								/* @__PURE__ */ jsx(Button, {
									asChild: true,
									className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 border-none shadow-lg shadow-teal-500/20",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										children: "Activer EduFlex+"
									})
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-4xl mx-auto px-6 py-24 space-y-12",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-2xl md:text-3xl font-extrabold text-white text-center",
					children: "Foire aux questions"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 border-b border-slate-900 pb-4",
							children: [/* @__PURE__ */ jsxs("h4", {
								className: "font-bold text-white text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-teal-500" }), " Comment fonctionne la validation de mon académie ?"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400 leading-relaxed",
								children: "Une fois inscrit en spécifiant les informations de votre académie, notre équipe vérifie et active votre accès sous 24h. Vous recevez un e-mail dès que la console d'enseignement et votre domaine sont configurés."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 border-b border-slate-900 pb-4",
							children: [/* @__PURE__ */ jsxs("h4", {
								className: "font-bold text-white text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-teal-500" }), " Puis-je utiliser mon propre nom de domaine ?"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400 leading-relaxed",
								children: "Oui, avec l'offre EduFlex+, nous relions la plateforme à votre adresse personnalisée (ex: `ecole.votre-domaine.com`) avec certificat de sécurité HTTPS gratuit et automatique."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 pb-4",
							children: [/* @__PURE__ */ jsxs("h4", {
								className: "font-bold text-white text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-teal-500" }), " Quels sont les moyens de paiement acceptés pour mes formations ?"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400 leading-relaxed",
								children: "Vos élèves d'Afrique francophone peuvent s'inscrire en payant via Wave, Orange Money, MTN Mobile Money, Moov, ou par carte bancaire. Les fonds sont automatiquement centralisés et reversés sur votre compte."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500",
				children: /* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" EduFlex. Tous droits réservés. Digitalisation des écoles d'Afrique."
				] })
			})
		]
	});
}
//#endregion
export { EduflexPlusPage as component };
