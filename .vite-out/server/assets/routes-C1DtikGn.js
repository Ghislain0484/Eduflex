import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { n as useCourses } from "./useCourses-1dzTx_dt.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card } from "@blinkdotnew/ui";
import { ArrowRight, Award, BarChart3, BookOpen, Briefcase, Building2, CheckCircle2, ChevronDown, FileCheck, Globe, HelpCircle, Layers, Quote, Smartphone, TrendingUp, Users } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function LandingPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const { data: courses, isLoading: coursesLoading } = useCourses();
	const [openFaqIdx, setOpenFaqIdx] = useState(null);
	const [priceCurrency, setPriceCurrency] = useState("CFA");
	const [platformName, setPlatformName] = useState("EduFlex");
	const [servicesSubTab, setServicesSubTab] = useState("solutions");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.name) setPlatformName(parsed.name);
			} catch {}
		}
	}, []);
	(courses || []).filter((c) => c.status === "publie").slice(0, 3);
	const faqs = [
		{
			q: "Comment fonctionne l'intégration B2B pour les entreprises ?",
			a: "EduFlex s'intègre facilement à votre système d'information. Vous pouvez créer un espace dédié à votre entreprise avec nom de domaine propre, gérer les accès de vos collaborateurs et suivre les progrès en temps réel."
		},
		{
			q: "Quelles sont les méthodes de paiement acceptées ?",
			a: "Nous prenons en charge la facturation d'entreprise en FCFA (XOF/XAF) et Euros (€) via virement bancaire, carte et Mobile Money (Orange Money, Wave, MTN, Moov) pour s'adapter aux réalités régionales."
		},
		{
			q: "Les certificats délivrés sont-ils conformes aux exigences RH ?",
			a: "Oui ! Chaque certificat généré par EduFlex comporte un identifiant unique et un QR Code de vérification. Il atteste des compétences acquises et des heures d'apprentissage suivies."
		},
		{
			q: "Puis-je adapter la plateforme à l'identité visuelle de mon entreprise ?",
			a: "Absolument. Avec le forfait Académie B2B (EduFlex+), bénéficiez de la marque blanche 100% neutre avec votre logo, vos couleurs d'entreprise et votre nom de domaine personnalisé."
		}
	];
	if (!isLoading && isAuthenticated) return /* @__PURE__ */ jsx(DashboardRedirect, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh flex flex-col bg-[#051717] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 bg-[#061d1d]/90 backdrop-blur-md border-b border-teal-950/60 shadow-md",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "max-w-7xl mx-auto flex items-center justify-between h-20 px-6",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-950/50",
								children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5.5 w-5.5 text-white" })
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-extrabold text-xl tracking-tight text-white uppercase",
								children: [platformName, /* @__PURE__ */ jsx("span", {
									className: "text-teal-400",
									children: "."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "hidden md:flex items-center gap-8",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "relative group",
									onMouseLeave: () => setServicesSubTab("solutions"),
									children: [/* @__PURE__ */ jsxs("button", {
										className: "flex items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2",
										children: ["Services & Solutions ", /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 text-slate-400 group-hover:text-teal-400" })]
									}), /* @__PURE__ */ jsxs("div", {
										className: "absolute top-full left-0 mt-1 w-[560px] rounded-2xl border border-teal-900/60 bg-[#072424] p-0 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden flex text-left",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "w-[190px] bg-[#051a1a] border-r border-teal-950/60 p-2 space-y-1 shrink-0",
											children: [
												/* @__PURE__ */ jsxs("button", {
													onMouseEnter: () => setServicesSubTab("solutions"),
													onClick: () => setServicesSubTab("solutions"),
													className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === "solutions" ? "bg-teal-700 text-white shadow-xs" : "text-slate-300 hover:bg-teal-900/40 hover:text-teal-300"}`,
													children: [/* @__PURE__ */ jsx("span", { children: "Solutions B2B" }), /* @__PURE__ */ jsx("span", {
														className: "text-[10px]",
														children: "▶"
													})]
												}),
												/* @__PURE__ */ jsxs("button", {
													onMouseEnter: () => setServicesSubTab("features"),
													onClick: () => setServicesSubTab("features"),
													className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === "features" ? "bg-teal-700 text-white shadow-xs" : "text-slate-300 hover:bg-teal-900/40 hover:text-teal-300"}`,
													children: [/* @__PURE__ */ jsx("span", { children: "Fonctionnalités" }), /* @__PURE__ */ jsx("span", {
														className: "text-[10px]",
														children: "▶"
													})]
												}),
												/* @__PURE__ */ jsxs("button", {
													onMouseEnter: () => setServicesSubTab("sectors"),
													onClick: () => setServicesSubTab("sectors"),
													className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === "sectors" ? "bg-teal-700 text-white shadow-xs" : "text-slate-300 hover:bg-teal-900/40 hover:text-teal-300"}`,
													children: [/* @__PURE__ */ jsx("span", { children: "Secteurs & Métiers" }), /* @__PURE__ */ jsx("span", {
														className: "text-[10px]",
														children: "▶"
													})]
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex-1 p-5 bg-[#072424]",
											children: [
												servicesSubTab === "solutions" && /* @__PURE__ */ jsxs("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ jsx("h4", {
														className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
														children: "Solutions EduFlex B2B"
													}), /* @__PURE__ */ jsxs("ul", {
														className: "space-y-2 text-xs text-slate-200 font-medium",
														children: [
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Digitalisation de Plan de Formation RH"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Portail Académie d'Entreprise & Client"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Onboarding & Recyclage des compétences"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Gestion des Habilitations & Certificats"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Suivi & Reporting d'Assiduité RH"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/register",
																className: "hover:text-teal-400 block transition-colors",
																children: "Classes Virtuelles EduFlex Meet"
															}) })
														]
													})]
												}),
												servicesSubTab === "features" && /* @__PURE__ */ jsxs("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ jsx("h4", {
														className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
														children: "Fonctionnalités Incluses"
													}), /* @__PURE__ */ jsxs("ul", {
														className: "space-y-2 text-xs text-slate-200 font-medium",
														children: [
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/courses",
																className: "hover:text-teal-400 block transition-colors",
																children: "Plateforme LMS Multi-Appareils"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/assistants-ia",
																className: "hover:text-teal-400 block transition-colors",
																children: "Assistants IA de Génération de Cours"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/classes-virtuelles",
																className: "hover:text-teal-400 block transition-colors",
																children: "Visioconférences & Directs sécurisés"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/outils-marketing",
																className: "hover:text-teal-400 block transition-colors",
																children: "Autorépondeurs & Intégrations RH"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Marque blanche & Domaines Propres"
															}) })
														]
													})]
												}),
												servicesSubTab === "sectors" && /* @__PURE__ */ jsxs("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ jsx("h4", {
														className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
														children: "Secteurs Accompagnés"
													}), /* @__PURE__ */ jsxs("ul", {
														className: "space-y-2 text-xs text-slate-200 font-medium",
														children: [
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Directeurs & Responsables RH"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Centres de Formation & Académies"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Banques, Assurances & Telcos"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Mines, Industrie & BTP"
															}) }),
															/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
																to: "/eduflex-plus",
																className: "hover:text-teal-400 block transition-colors",
																children: "Écoles & Établissements Supérieurs"
															}) })
														]
													})]
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/eduflex-plus",
									className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors",
									children: "EduFlex+ Entreprises"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/tarifs",
									className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors",
									children: "Tarifs"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/courses",
									className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors",
									children: "Catalogue de Cours"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "ghost",
								className: "text-xs font-bold text-slate-200 hover:text-white hover:bg-teal-950/40",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/login",
									children: "Connexion"
								})
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-lg shadow-teal-950/50 border-none transition-transform hover:scale-[1.02]",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/register",
									children: "Démo Entreprise"
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "relative overflow-hidden pt-16 pb-24 border-b border-teal-950/40 bg-gradient-to-b from-[#061d1d] via-[#051717] to-[#041212]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-7 text-left space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-extrabold text-teal-300 shadow-sm",
								children: [/* @__PURE__ */ jsx(Building2, { className: "h-3.5 w-3.5 text-teal-400" }), /* @__PURE__ */ jsx("span", { children: "SOLUTION EDTECH B2B & ENTERPRISE UPSKILLING" })]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]",
								children: [
									"Formez vos équipes aux ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent",
										children: "compétences de demain"
									}),
									", en toute flexibilité."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal",
								children: "Accélérez la montée en compétences de vos collaborateurs, automatisez le suivi RH et certifiez les acquis de votre entreprise avec EduFlex — la plateforme LMS B2B ultra-flexible et adaptée aux enjeux régionaux."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2",
								children: [/* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "lg",
									className: "bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm h-12 px-8 rounded-xl shadow-xl shadow-teal-500/20 border-none transition-transform hover:scale-[1.02] flex items-center justify-center gap-2",
									children: /* @__PURE__ */ jsxs(Link, {
										to: "/register",
										children: ["Lancer une démo entreprise ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
									})
								}), /* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "outline",
									size: "lg",
									className: "border-teal-900/80 bg-teal-950/30 text-slate-200 hover:bg-teal-900/50 hover:text-white text-sm h-12 px-6 rounded-xl flex items-center justify-center gap-2",
									children: /* @__PURE__ */ jsxs(Link, {
										to: "/courses",
										children: [/* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-teal-400" }), " Découvrir l'Espace Apprenant"]
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-6 border-t border-teal-950/60 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-teal-400" }), /* @__PURE__ */ jsx("span", { children: "98% Taux de satisfaction RH" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-teal-400" }), /* @__PURE__ */ jsx("span", { children: "+15 000 Employés formés" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-teal-400" }), /* @__PURE__ */ jsx("span", { children: "Paiements FCFA & EUR" })]
									})
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-5 relative",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-teal-950/80 bg-slate-900 group",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: "/images/hero-b2b.png",
									alt: "Un cadre dirigeant africain satisfait utilisant la tablette EduFlex pour gérer la formation B2B de ses équipes dans un bureau moderne",
									className: "w-full h-[420px] sm:h-[480px] object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#051717] via-transparent to-transparent opacity-80" }),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-teal-500/40 p-4 rounded-2xl shadow-xl flex items-center justify-between text-left",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold",
											children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-white",
											children: "Progression Globale Équipe"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[11px] text-teal-300 font-semibold",
											children: "+84% de compétences certifiées"
										})] })]
									}), /* @__PURE__ */ jsx(Badge, {
										className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px] font-bold",
										children: "Actif"
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-12 border-b border-teal-950/40 bg-[#041414]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 text-center space-y-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-slate-400 uppercase tracking-widest",
						children: "Ils font confiance à EduFlex pour le développement de leurs talents"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider",
								children: [/* @__PURE__ */ jsx(Building2, { className: "h-5 w-5 text-teal-400" }), " TOTALENERGIES B2B"]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider",
								children: [/* @__PURE__ */ jsx(Globe, { className: "h-5 w-5 text-teal-400" }), " ORANGE BUSINESS"]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider",
								children: [/* @__PURE__ */ jsx(Briefcase, { className: "h-5 w-5 text-teal-400" }), " BANK OF AFRICA"]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider",
								children: [/* @__PURE__ */ jsx(Layers, { className: "h-5 w-5 text-teal-400" }), " SODECI GROUPE"]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider",
								children: [/* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-teal-400" }), " MTN ENTERPRISE"]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-24 border-b border-teal-950/40 bg-gradient-to-b from-[#051717] to-[#041212]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 space-y-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center space-y-3 max-w-3xl mx-auto",
						children: [
							/* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								className: "border-teal-500/30 text-teal-400 bg-teal-500/10 px-3.5 py-1 text-xs font-bold rounded-full",
								children: "EXPÉRIENCE ENTREPRISE SUR-MESURE"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl md:text-5xl font-black text-white tracking-tight",
								children: "Tout ce dont les RH et Managers ont besoin"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-slate-300 leading-relaxed font-normal",
								children: "Conçu pour simplifier la gestion des formations d'entreprise et maximiser l'engagement des collaborateurs."
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-3 gap-8 text-left",
						children: [
							/* @__PURE__ */ jsxs(Card, {
								className: "border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center",
										children: /* @__PURE__ */ jsx(BarChart3, { className: "h-6 w-6" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-black text-white",
											children: "Parcours sur-mesure & Adaptive Learning"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-300 leading-relaxed font-normal",
											children: "Concevez des parcours de formation personnalisés adaptés aux besoins réels de chaque poste. L'IA EduFlex ajuste le rythme d'apprentissage pour maximiser la rétention et l'efficacité métier."
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-teal-950 bg-slate-950 p-4 space-y-3 shadow-inner",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between text-[11px] text-slate-400 font-bold",
											children: [/* @__PURE__ */ jsx("span", { children: "Compétences Validées" }), /* @__PURE__ */ jsx("span", {
												className: "text-teal-400",
												children: "88%"
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "w-full bg-slate-800 h-2 rounded-full overflow-hidden",
											children: /* @__PURE__ */ jsx("div", { className: "bg-teal-400 h-full w-[88%]" })
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-slate-500 italic",
											children: "Tableau de bord de suivi de progression RH EduFlex"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center",
										children: /* @__PURE__ */ jsx(Smartphone, { className: "h-6 w-6" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-black text-white",
											children: "Apprentissage micro-learning & Terrain"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-300 leading-relaxed font-normal",
											children: "Permettez à vos employés sur le terrain et en déplacement d'accéder à des leçons courtes de 5 à 10 minutes sur smartphone, optimisées pour la faible consommation de données mobiles."
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl overflow-hidden border border-teal-900/40 shadow-md h-36 relative",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/images/feature-mobile.png",
										alt: "Un ingénieur/technicien africain consultant un cours micro-learning sur son smartphone pendant une pause",
										className: "w-full h-full object-cover"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute bottom-2 left-2 bg-slate-900/90 text-teal-300 text-[10px] font-bold px-2 py-1 rounded",
										children: "Format Mobile 3G/4G"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center",
										children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-black text-white",
											children: "Suivi RH & Certifications Digitales"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-300 leading-relaxed font-normal",
											children: "Téléchargez automatiquement des rapports d'assiduité conformes et délivrez des certificats digitaux vérifiables à vos collaborateurs dès la réussite de leurs évaluations."
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-teal-500/30 bg-teal-950/40 p-4 space-y-2 text-center",
									children: [
										/* @__PURE__ */ jsx(FileCheck, { className: "h-7 w-7 text-emerald-400 mx-auto" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-white",
											children: "Certificat Qualiopi / RH HD"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-teal-300",
											children: "Vérification QR Code sécurisée"
										})
									]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-24 border-b border-teal-950/40 bg-[#061e1e]",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-6xl mx-auto px-6",
					children: /* @__PURE__ */ jsx(Card, {
						className: "border border-teal-500/30 bg-gradient-to-r from-[#072424] via-[#051c1c] to-[#072424] rounded-3xl p-8 sm:p-12 shadow-2xl text-left",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid md:grid-cols-12 gap-8 items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "md:col-span-4 shrink-0",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative rounded-2xl overflow-hidden border-2 border-teal-400 shadow-xl max-w-xs mx-auto",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/images/testimonial-drh.png",
										alt: "Portrait professionnel de Marie-Laure Ehouman, Directrice des Ressources Humaines",
										className: "w-full h-72 object-cover object-top"
									}), /* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-sm p-2 rounded-xl text-center",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-white",
											children: "Marie-Laure Ehouman"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-teal-400 font-semibold",
											children: "DRH Groupe Distribution"
										})]
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "md:col-span-8 space-y-6",
								children: [
									/* @__PURE__ */ jsx(Quote, { className: "h-10 w-10 text-teal-500/40" }),
									/* @__PURE__ */ jsx("blockquote", {
										className: "text-base sm:text-xl font-bold text-white leading-relaxed italic",
										children: "\"Grâce à EduFlex, nous avons digitalisé l'onboarding et le recyclage des compétences de plus de 450 collaborateurs répartis sur 8 filiales. Le suivi en temps réel et la conformité des certificats nous ont permis d'économiser 40% sur notre budget de formation annuelle.\""
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "pt-4 border-t border-teal-950/80 flex items-center justify-between text-xs text-slate-400",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", {
											className: "text-white block",
											children: "Marie-Laure Ehouman"
										}), /* @__PURE__ */ jsx("span", { children: "Directrice des Ressources Humaines" })] }), /* @__PURE__ */ jsx(Badge, {
											className: "bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px] font-bold",
											children: "+450 Collaborateurs formés"
										})]
									})
								]
							})]
						})
					})
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "tarifs",
				className: "max-w-7xl mx-auto px-6 py-24 space-y-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center space-y-3",
					children: [
						/* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							className: "border-teal-500/30 text-teal-400 bg-teal-500/10 px-3.5 py-1 text-xs font-bold rounded-full",
							children: "TARIFS TRANSPARENTS"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-5xl font-black tracking-tight text-white",
							children: "Découvrez nos tarifs transparents"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-400 max-w-xl mx-auto",
							children: "Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-3 pt-4",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: `text-xs font-semibold ${priceCurrency === "CFA" ? "text-white" : "text-slate-500"}`,
									children: "Francs CFA (XOF/XAF)"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setPriceCurrency(priceCurrency === "CFA" ? "EUR" : "CFA"),
									className: "w-12 h-6.5 rounded-full bg-teal-900/40 p-1 flex items-center transition-colors relative",
									children: /* @__PURE__ */ jsx("div", { className: `w-4.5 h-4.5 rounded-full bg-teal-400 transition-all ${priceCurrency === "EUR" ? "translate-x-5.5" : "translate-x-0"}` })
								}),
								/* @__PURE__ */ jsx("span", {
									className: `text-xs font-semibold ${priceCurrency === "EUR" ? "text-white" : "text-slate-500"}`,
									children: "Euros (€)"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left",
					children: [
						/* @__PURE__ */ jsxs(Card, {
							className: "border-teal-950 flex flex-col justify-between hover:border-teal-900/40 transition-all relative overflow-hidden bg-[#061e1e]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "p-6 md:p-8 space-y-6",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold text-white",
										children: "Découverte"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 mt-1",
										children: "Pour lancer votre premier produit et tester l'écosystème."
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "pt-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-3xl md:text-4xl font-extrabold text-white",
												children: priceCurrency === "CFA" ? "0 CFA" : "0 €"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-slate-400 font-semibold",
												children: " / mois"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-teal-400 font-bold mt-1",
												children: "Gratuit à vie · Sans engagement"
											})
										]
									}),
									/* @__PURE__ */ jsxs("ul", {
										className: "space-y-3 text-xs text-slate-300 pt-4 border-t border-teal-950",
										children: [
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2",
												children: "✓ 1 formation active"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2",
												children: "✓ 50 apprenants enregistrés"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2",
												children: "✓ Quiz et certificats basiques"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 text-teal-400 font-bold",
												children: "✓ Frais de transaction : 5%"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 text-slate-500",
												children: "✕ Pas de visioconférence Live"
											})
										]
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-6 md:p-8 pt-0",
								children: /* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "outline",
									className: "w-full border-slate-800 text-slate-300 hover:bg-slate-900",
									size: "lg",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										children: "Commencer gratuitement"
									})
								})
							})]
						}),
						/* @__PURE__ */ jsxs(Card, {
							className: "border-2 border-teal-500/80 shadow-xl shadow-teal-950/40 flex flex-col justify-between hover:border-teal-400 transition-all relative overflow-hidden bg-[#072a2a]",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-0 right-0 bg-teal-500 text-slate-950 text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-lg",
									children: "Populaire"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-6 md:p-8 space-y-6",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-bold text-white",
											children: "Pro"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-400 mt-1",
											children: "Le tout inclus pour les formateurs, coachs et infopreneurs."
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "pt-2",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-3xl md:text-4xl font-extrabold text-teal-400",
													children: priceCurrency === "CFA" ? "32 000 CFA" : "49 €"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs text-slate-400 font-semibold",
													children: " / mois"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[10px] text-teal-400 font-bold mt-1",
													children: "2 mois offerts en paiement annuel"
												})
											]
										}),
										/* @__PURE__ */ jsxs("ul", {
											className: "space-y-3 text-xs text-slate-200 pt-4 border-t border-teal-900/60",
											children: [
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2 font-medium",
													children: "✓ Formations illimitées"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2 font-medium",
													children: "✓ Apprenants illimités"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2",
													children: "✓ Quiz et examens avancés"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2",
													children: "✓ Certificats Canvas HD automatisés"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2",
													children: "✓ Visioconférences Live (EduFlex Meet)"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2",
													children: "✓ Support prioritaire 24h/7j"
												}),
												/* @__PURE__ */ jsx("li", {
													className: "flex items-center gap-2 text-teal-400 font-bold",
													children: "✓ Frais de transaction : 3%"
												})
											]
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "p-6 md:p-8 pt-0",
									children: /* @__PURE__ */ jsx(Button, {
										asChild: true,
										className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold",
										size: "lg",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/register",
											children: "Lancer mon Académie Pro"
										})
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs(Card, {
							className: "border-teal-950 flex flex-col justify-between hover:border-teal-900/40 transition-all relative overflow-hidden bg-[#061e1e]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "p-6 md:p-8 space-y-6",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold text-white",
										children: "Académie B2B"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400 mt-1",
										children: "Pour les universités, lycées et centres de formation officiels."
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "pt-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-3xl md:text-4xl font-extrabold text-white",
												children: priceCurrency === "CFA" ? "59 000 CFA" : "89 €"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-slate-400 font-semibold",
												children: " / mois"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-teal-400 font-bold mt-1",
												children: "Support d'intégration sur-mesure inclus"
											})
										]
									}),
									/* @__PURE__ */ jsxs("ul", {
										className: "space-y-3 text-xs text-slate-300 pt-4 border-t border-teal-950",
										children: [
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 font-semibold text-white",
												children: "✓ Personnalisation White-Label (Marque)"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 font-semibold text-white",
												children: "✓ Nom de domaine propre (cours.ecole.com)"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2",
												children: "✓ Multi-comptes formateurs (jusqu'à 10)"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2",
												children: "✓ Rapports d'assiduité ministériels"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 font-bold text-amber-400",
												children: "✓ Support VIP WhatsApp & Tél 24/7"
											}),
											/* @__PURE__ */ jsx("li", {
												className: "flex items-center gap-2 text-teal-400 font-bold",
												children: "✓ Frais de transaction : 1%"
											})
										]
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-6 md:p-8 pt-0",
								children: /* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "outline",
									className: "w-full border-teal-800 text-teal-300 hover:bg-teal-950",
									size: "lg",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/register",
										children: "Activer l'Académie B2B"
									})
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-4xl mx-auto px-6 py-20 border-t border-teal-950/40 space-y-12 text-left",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center space-y-2",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl md:text-3xl font-extrabold text-white",
						children: "Foire aux Questions B2B"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-400",
						children: "Tout ce que vous devez savoir pour déployer EduFlex au sein de votre organisation."
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: faqs.map((faq, idx) => /* @__PURE__ */ jsxs("div", {
						className: "border border-teal-950 bg-[#061e1e] rounded-2xl p-5 cursor-pointer transition-all hover:border-teal-900/60",
						onClick: () => setOpenFaqIdx(openFaqIdx === idx ? null : idx),
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between font-bold text-sm text-white",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-teal-400 shrink-0" }), faq.q]
							}), /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 text-slate-400 transition-transform ${openFaqIdx === idx ? "rotate-180 text-teal-400" : ""}` })]
						}), openFaqIdx === idx && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-300 mt-3 pt-3 border-t border-teal-950/60 leading-relaxed",
							children: faq.a
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-teal-950 bg-[#041212] py-12 text-center text-xs text-slate-500",
				children: /* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" EduFlex B2B. Tous droits réservés. Digitalisation des compétences et entreprises."
				] })
			})
		]
	});
}
function DashboardRedirect() {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-slate-950 text-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4 text-center",
			children: [/* @__PURE__ */ jsx("div", { className: "h-10 w-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" }), /* @__PURE__ */ jsx("p", {
				className: "text-xs font-bold text-slate-400",
				children: "Redirection vers votre tableau de bord..."
			})]
		})
	});
}
//#endregion
export { LandingPage as component };
