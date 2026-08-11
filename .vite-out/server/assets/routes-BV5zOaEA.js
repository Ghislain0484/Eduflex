import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { n as useCourses } from "./useCourses-B9-zxIvH.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, Skeleton } from "@blinkdotnew/ui";
import { ArrowRight, BookOpen, CheckCircle, ChevronDown, Heart, HelpCircle, Sparkles, Zap } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function LandingPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const { data: courses, isLoading: coursesLoading } = useCourses();
	const [openFaqIdx, setOpenFaqIdx] = useState(null);
	const [priceCurrency, setPriceCurrency] = useState("CFA");
	const [platformName, setPlatformName] = useState("EduFlex");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.name) setPlatformName(parsed.name);
			} catch {}
		}
	}, []);
	const publishedCourses = (courses || []).filter((c) => c.status === "publie").slice(0, 3);
	const faqs = [
		{
			q: "Comment fonctionne la double devise ?",
			a: "Toutes les formations sont affichées à la fois en Euros (€) et en Francs CFA (XOF). Les paiements en Francs CFA activent automatiquement les services de Mobile Money (Orange Money, MTN, Wave, Moov) pour éviter les frais bancaires internationaux de conversion."
		},
		{
			q: "Quelles sont les méthodes de paiement acceptées ?",
			a: "Nous prenons en charge les paiements par carte bancaire internationale via Flutterwave, ainsi que les solutions de Mobile Money les plus populaires en Afrique de l'Ouest et Centrale."
		},
		{
			q: "Comment fonctionne l'obtention du certificat ?",
			a: "Dès que vous terminez une formation à 100% (validation de tous les chapitres et quiz), un bouton de téléchargement de certificat haute définition s'affiche dans votre espace d'étude."
		},
		{
			q: "Puis-je gagner de l'argent en parrainant des amis ?",
			a: "Oui ! Chaque formation achetée vous donne accès à un lien de parrainage unique. Si un contact achète la formation via votre lien, vous gagnez immédiatement 15% de commission sur la vente."
		}
	];
	if (!isLoading && isAuthenticated) return /* @__PURE__ */ jsx(DashboardRedirect, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh flex flex-col bg-background text-foreground transition-colors duration-200",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 bg-[#061d1d] border-b border-teal-950/40 shadow-md",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "max-w-7xl mx-auto flex items-center justify-between h-20 px-6",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-950/50",
								children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5 text-white" })
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
									children: [/* @__PURE__ */ jsxs("button", {
										className: "flex items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2",
										children: ["Services ", /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 text-slate-450 group-hover:text-teal-400" })]
									}), /* @__PURE__ */ jsxs("div", {
										className: "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] rounded-2xl border border-teal-900/60 bg-[#072424] p-6 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-3 gap-6 text-left",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-3.5",
												children: [/* @__PURE__ */ jsx("h4", {
													className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
													children: "Solutions"
												}), /* @__PURE__ */ jsxs("ul", {
													className: "space-y-2.5 text-xs text-slate-300",
													children: [
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Créer une formation"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Vendre en Francs CFA"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Digitaliser les écoles"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Suivi Mobile Money"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Classes en Direct"
														}) })
													]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-3.5",
												children: [/* @__PURE__ */ jsx("h4", {
													className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
													children: "Fonctionnalités"
												}), /* @__PURE__ */ jsxs("ul", {
													className: "space-y-2.5 text-xs text-slate-300",
													children: [
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/courses",
															className: "hover:text-teal-400 block transition-colors",
															children: "• LMS Localisé"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Créateur de Quiz"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Vidéos économes data"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Affiliation 15%"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Certificats HD"
														}) })
													]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-3.5",
												children: [/* @__PURE__ */ jsx("h4", {
													className: "text-[11px] font-bold text-teal-400 uppercase tracking-wider",
													children: "Secteurs"
												}), /* @__PURE__ */ jsxs("ul", {
													className: "space-y-2.5 text-xs text-slate-300",
													children: [
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Écoles & Universités"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Organismes de formation"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Formateurs indépendants"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Coachs & Experts"
														}) }),
														/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
															to: "/register",
															className: "hover:text-teal-400 block transition-colors",
															children: "• Entreprises locales"
														}) })
													]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/tarifs",
									className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2",
									children: "Fonctionnalités & Tarifs"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/eduflex-plus",
									className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2",
									children: "EduFlex+ Entreprises"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-5",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/login",
								className: "text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors",
								children: "Connexion"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/register",
								className: "border-2 border-teal-400/80 hover:border-teal-355 text-white hover:bg-teal-500/10 rounded-full px-6 py-1.5 text-[13px] font-semibold tracking-wide transition-all shadow-sm",
								children: "Inscription"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1 overflow-x-hidden",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "relative overflow-hidden py-24 md:py-32",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" }),
							/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative max-w-7xl mx-auto px-6 text-center space-y-8",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary",
										children: [/* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5" }), "LMS Premium & Double Devise Intégrée"]
									}),
									/* @__PURE__ */ jsxs("h1", {
										className: "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1] text-foreground",
										children: ["Vendez et suivez vos ", /* @__PURE__ */ jsx("span", {
											className: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent",
											children: "formations en ligne"
										})]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed",
										children: [
											"La plateforme de e-learning nouvelle génération qui connecte l'Europe et l'Afrique. Support complet du ",
											/* @__PURE__ */ jsx("b", { children: "Mobile Money" }),
											" local, quiz de validation, certificats HD automatisés et affiliation."
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col sm:flex-row gap-4 justify-center pt-4",
										children: [/* @__PURE__ */ jsx(Button, {
											asChild: true,
											size: "lg",
											className: "text-base px-8 bg-primary hover:bg-primary/90 shadow-md",
											children: /* @__PURE__ */ jsxs(Link, {
												to: "/register",
												children: ["Commencer gratuitement", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
											})
										}), /* @__PURE__ */ jsx(Button, {
											asChild: true,
											variant: "outline",
											size: "lg",
											className: "text-base px-8 hover:bg-accent/10",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/login",
												children: "Découvrir le catalogue"
											})
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-[#0b2626] border-y border-teal-950/60 py-3 text-center text-[10px] md:text-xs text-teal-300 font-semibold tracking-wide flex flex-wrap justify-center items-center gap-x-8 gap-y-2 px-6",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "flex items-center gap-1.5",
								children: "⚡ Sans engagement"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-teal-900/50 hidden md:inline",
								children: "|"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex items-center gap-1.5",
								children: "📱 Mobile Money local intégré (Wave, Orange, MTN, Moov)"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-teal-900/50 hidden md:inline",
								children: "|"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex items-center gap-1.5",
								children: "🌍 Conforme ministères de l'enseignement régionaux"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-teal-900/50 hidden md:inline",
								children: "|"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex items-center gap-1.5",
								children: "📡 Optimisé pour connexions bas-débit (3G/4G)"
							})
						]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "border-y border-border/50 bg-muted/20 py-10",
						children: /* @__PURE__ */ jsx("div", {
							className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center",
							children: [
								{
									val: "15 000+",
									label: "Apprenants formés"
								},
								{
									val: "100%",
									label: "Mobile Money local"
								},
								{
									val: "98%",
									label: "Taux de satisfaction"
								},
								{
									val: "15%",
									label: "Affiliation parrain"
								}
							].map((s, i) => /* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-3xl font-extrabold tracking-tight text-primary",
									children: s.val
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground font-medium uppercase tracking-wider",
									children: s.label
								})]
							}, i))
						})
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "max-w-7xl mx-auto px-6 py-24 border-b border-border/40",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-16 space-y-2",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-3xl md:text-4xl font-bold tracking-tight",
								children: "Comment fonctionne la plateforme ?"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground max-w-lg mx-auto",
								children: "Une expérience d'apprentissage et de vente simplifiée au maximum en 4 étapes clés."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-4 gap-8 relative",
							children: [
								{
									step: "01",
									title: "Création du cours",
									desc: "Le formateur crée son cours et structure ses chapitres avec du texte, des vidéos et des quiz interactifs."
								},
								{
									step: "02",
									title: "Achat sécurisé",
									desc: "L'élève s'inscrit et paye en ligne par Carte Bancaire ou via son compte Mobile Money local en Francs CFA."
								},
								{
									step: "03",
									title: "Apprentissage",
									desc: "L'élève progresse chapitre après chapitre, participe aux discussions communautaires et valide ses acquis."
								},
								{
									step: "04",
									title: "Certification & Gain",
									desc: "L'élève obtient son certificat de complétion Canvas HD et peut parrainer d'autres élèves pour toucher 15%."
								}
							].map((s, i) => /* @__PURE__ */ jsxs("div", {
								className: "space-y-3 relative group",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors",
										children: s.step
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-foreground",
										children: s.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: s.desc
									})
								]
							}, i))
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "max-w-7xl mx-auto px-6 py-24",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-14 space-y-2",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-3xl md:text-4xl font-bold tracking-tight",
								children: "Formations à la une"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground max-w-md mx-auto",
								children: "Accédez aux fiches détaillées des formations pour découvrir le syllabus complet."
							})]
						}), coursesLoading ? /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-8",
							children: [
								1,
								2,
								3
							].map((i) => /* @__PURE__ */ jsxs(Card, {
								className: "overflow-hidden",
								children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-44 w-full" }), /* @__PURE__ */ jsxs(CardContent, {
									className: "p-5 space-y-3",
									children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-3/4" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })]
								})]
							}, i))
						}) : publishedCourses.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "text-center py-10 border border-dashed rounded-xl",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Aucune formation publiée disponible pour le moment."
							})
						}) : /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
							children: publishedCourses.map((course) => {
								const priceXof = Math.round(course.price / 100 * 655.957);
								return /* @__PURE__ */ jsxs(Card, {
									className: "overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-border/80 bg-card",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "h-44 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden shrink-0",
										children: [course.imageUrl ? /* @__PURE__ */ jsx("img", {
											src: course.imageUrl,
											alt: course.title,
											className: "w-full h-full object-cover"
										}) : /* @__PURE__ */ jsx("div", {
											className: "flex items-center justify-center h-full",
											children: /* @__PURE__ */ jsx(BookOpen, { className: "h-10 w-10 text-primary/20" })
										}), /* @__PURE__ */ jsx(Badge, {
											className: "absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm",
											variant: "secondary",
											children: course.category
										})]
									}), /* @__PURE__ */ jsxs(CardContent, {
										className: "p-5 flex-1 flex flex-col justify-between space-y-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "font-bold text-base leading-snug line-clamp-1",
												children: course.title
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
												children: course.description
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "pt-4 border-t border-border/50 flex items-center justify-between",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
												className: "text-lg font-extrabold text-primary",
												children: [((course.price || 0) / 100).toLocaleString("fr-FR"), " €"]
											}), /* @__PURE__ */ jsxs("p", {
												className: "text-[10px] text-muted-foreground font-semibold",
												children: [
													"~ ",
													priceXof.toLocaleString("fr-FR"),
													" F CFA"
												]
											})] }), /* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												className: "text-xs",
												children: /* @__PURE__ */ jsx(Link, {
													to: "/courses/$id",
													params: { id: String(course.id) },
													children: "En savoir plus"
												})
											})]
										})]
									})]
								}, course.id);
							})
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "max-w-4xl mx-auto px-6 py-20 border-t border-border/40",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-14 space-y-2",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-bold tracking-tight",
								children: "Pourquoi choisir EduFlex ?"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Une comparaison rapide face aux solutions LMS américaines ou traditionnelles."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto rounded-xl border border-border bg-card",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full text-left text-xs border-collapse",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-border bg-muted/30 font-bold text-foreground",
									children: [
										/* @__PURE__ */ jsx("th", {
											className: "p-4",
											children: "Fonctionnalité"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "p-4 text-primary font-black",
											children: "EduFlex"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "p-4 text-muted-foreground",
											children: "LMS Classique (Teachable, etc.)"
										})
									]
								}) }), /* @__PURE__ */ jsxs("tbody", {
									className: "divide-y divide-border/60",
									children: [
										/* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-semibold",
												children: "Paiement Mobile Money local (Afrique)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-emerald-600 font-bold",
												children: "Oui (Wave, Orange, MTN, Moov)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-red-500",
												children: "Non (Stripe/PayPal uniquement)"
											})
										] }),
										/* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-semibold",
												children: "Double Devise dynamique (EUR/XOF)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-emerald-600 font-bold",
												children: "Oui (Conversion intégrée)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-red-500",
												children: "Non (Frais bancaires élevés)"
											})
										] }),
										/* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-semibold",
												children: "Certificats de réussite Canvas HD"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-emerald-600 font-bold",
												children: "Oui (Inclus)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-muted-foreground",
												children: "Payant / Modules tiers"
											})
										] }),
										/* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-semibold",
												children: "Commission d'Affiliation Directe (15%)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-emerald-600 font-bold",
												children: "Oui (Tableau de bord parrain)"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-muted-foreground",
												children: "Paramétrage complexe"
											})
										] })
									]
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						id: "eduflex-plus",
						className: "max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center space-y-3",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-xs font-semibold text-teal-400",
										children: "🚀 EduFlex+ Solutions Entreprises"
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "text-3xl md:text-5xl font-extrabold tracking-tight",
										children: "Quel est votre projet de digitalisation ?"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground max-w-2xl mx-auto",
										children: "Des processus d'amélioration continue au développement des compétences de vos équipes... EduFlex+ répond à vos besoins !"
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-8",
								children: [
									{
										icon: "💻",
										title: "Académie clients",
										desc: "Accompagnez vos clients dans l'utilisation de vos produits et services via une académie en accès libre ou payant selon votre modèle."
									},
									{
										icon: "📱",
										title: "Formation salariés",
										desc: "Renforcez l'engagement de vos équipes locales avec la formation continue sur tous les sujets et y compris sur mobile."
									},
									{
										icon: "⚡",
										title: "Parcours réglementaire & RSE",
										desc: "Actualisez les compétences : sensibilisez vos apprenants aux enjeux réglementaires et de développement durable."
									},
									{
										icon: "👥",
										title: "Onboarding (intégration)",
										desc: "Optimisez l'intégration de vos nouveaux collaborateurs en construisant une expérience RH moderne et engageante."
									},
									{
										icon: "🤝",
										title: "Formation des partenaires",
										desc: "Systématisez la transmission de savoir-faire avec votre réseau de distributeurs, franchisés et partenaires régionaux."
									},
									{
										icon: "🏫",
										title: "Écoles & Lycées Supérieurs",
										desc: "Gérez vos apprenants et donnez accès à vos contenus académiques (cours, quiz, classes lives) tout au long de leur parcours."
									}
								].map((p, i) => /* @__PURE__ */ jsxs(Card, {
									className: "bg-card/40 border-border/60 hover:border-teal-900/35 transition-all p-6 space-y-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "text-3xl",
											children: p.icon
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "text-base font-bold text-foreground",
											children: p.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: p.desc
										})
									]
								}, i))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-teal-950/10 border border-teal-900/20 rounded-2xl p-8 md:p-12",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-2xl md:text-3xl font-bold tracking-tight",
											children: "Pourquoi choisir EduFlex+ ?"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs md:text-sm text-muted-foreground leading-relaxed",
											children: "Nous ne limitons pas votre réussite : toutes nos offres incluent des apprenants et des contenus en illimité !"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex gap-4",
												children: [/* @__PURE__ */ jsx("div", {
													className: "h-8 w-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
													children: "✨"
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
													className: "text-sm font-bold text-foreground",
													children: "Prise en main ultra-rapide"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Notre outil auteur intuitif vous permet de structurer vos cursus et vos classes virtuelles en quelques heures."
												})] })]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex gap-4",
												children: [/* @__PURE__ */ jsx("div", {
													className: "h-8 w-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0",
													children: "👑"
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
													className: "text-sm font-bold text-foreground",
													children: "Expérience premium White-Label"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: "Injectez vos propres couleurs et votre logo. Vos apprenants étudient dans un espace entièrement personnalisé à votre effigie."
												})] })]
											})]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative rounded-xl overflow-hidden border border-teal-900/30 aspect-video shadow-2xl",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-teal-950/80 to-transparent z-10" }),
										/* @__PURE__ */ jsxs("div", {
											className: "absolute inset-0 flex flex-col justify-end p-6 z-20 space-y-2",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-lg font-bold text-white",
												children: "L'écosystème de formation leader"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-teal-300",
												children: "Intégration Mobile Money native et visioconférences sécurisées."
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "w-full h-full bg-[#051c1c] flex items-center justify-center",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-6xl",
												children: "🌍"
											})
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "max-w-7xl mx-auto px-6 py-20 border-t border-border/40",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-14 space-y-2",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-bold tracking-tight",
								children: "Ils font confiance à EduFlex"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Découvrez les retours d'expérience de nos apprenants et formateurs certifiés."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-8",
							children: [
								{
									name: "Dr. Jean-Marc Koffi",
									role: "Enseignant Business",
									quote: "La double devise et le paiement par Mobile Money ont multiplié mes inscriptions par 4 en Côte d'Ivoire et au Sénégal !"
								},
								{
									name: "Awa Diop",
									role: "Apprenante Marketing",
									quote: "J'ai adoré le système de certificat. Dès que j'ai fini mon quiz de fin d'étude, j'ai pu télécharger mon diplôme en HD d'un clic."
								},
								{
									name: "Salif Traoré",
									role: "Formateur Dev Web",
									quote: "L'affiliation à 15% est un outil marketing de fou. Mes élèves partagent leur lien et gagnent des commissions. C'est gagnant-gagnant !"
								}
							].map((t, i) => /* @__PURE__ */ jsx(Card, {
								className: "bg-card/50 border-border/80",
								children: /* @__PURE__ */ jsxs(CardContent, {
									className: "p-6 space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex gap-0.5 text-amber-500",
											children: [
												/* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-current" }),
												/* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-current" }),
												/* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-current" }),
												/* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-current" }),
												/* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-current" })
											]
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "text-xs text-muted-foreground italic leading-relaxed",
											children: [
												"\"",
												t.quote,
												"\""
											]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-foreground",
											children: t.name
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-primary font-medium",
											children: t.role
										})] })
									]
								})
							}, i))
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						id: "features",
						className: "max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center space-y-3",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-3xl md:text-5xl font-bold tracking-tight",
									children: "Découvrez nos tarifs transparents"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground max-w-xl mx-auto",
									children: "Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-center gap-3 pt-6",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: `text-xs font-semibold ${priceCurrency === "CFA" ? "text-foreground" : "text-muted-foreground"}`,
											children: "Francs CFA (XOF/XAF)"
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => setPriceCurrency(priceCurrency === "CFA" ? "EUR" : "CFA"),
											className: "w-12 h-6.5 rounded-full bg-teal-900/40 p-1 flex items-center transition-colors relative",
											children: /* @__PURE__ */ jsx("div", { className: `w-4.5 h-4.5 rounded-full bg-teal-400 transition-all ${priceCurrency === "EUR" ? "translate-x-5.5" : "translate-x-0"}` })
										}),
										/* @__PURE__ */ jsx("span", {
											className: `text-xs font-semibold ${priceCurrency === "EUR" ? "text-foreground" : "text-muted-foreground"}`,
											children: "Euros (€)"
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch",
							children: [
								/* @__PURE__ */ jsxs(Card, {
									className: "border-border/80 flex flex-col justify-between hover:border-teal-900/30 transition-all relative overflow-hidden bg-card/60",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "p-6 md:p-8 space-y-6",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-bold text-foreground",
												children: "Découverte"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground mt-1",
												children: "Pour lancer votre premier produit et tester l'écosystème."
											})] }),
											/* @__PURE__ */ jsxs("div", {
												className: "pt-2",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-3xl md:text-4xl font-extrabold text-foreground",
														children: priceCurrency === "CFA" ? "0 CFA" : "0 €"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-xs text-muted-foreground font-semibold",
														children: " / mois"
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-[10px] text-teal-500 font-bold mt-1",
														children: "Gratuit à vie · Sans engagement"
													})
												]
											}),
											/* @__PURE__ */ jsxs("ul", {
												className: "space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/40",
												children: [
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2",
														children: "✓ Jusqu'à 3 formations"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2",
														children: "✓ 50 apprenants enregistrés"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2",
														children: "✓ Quiz de validation basiques"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2",
														children: "✓ Certificats de réussite standards"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2",
														children: "✓ Frais de transaction : 10%"
													})
												]
											})
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "p-6 md:p-8 pt-0",
										children: /* @__PURE__ */ jsx(Button, {
											asChild: true,
											className: "w-full bg-secondary hover:bg-secondary/90 text-foreground",
											size: "lg",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/register",
												children: "Commencer gratuitement"
											})
										})
									})]
								}),
								/* @__PURE__ */ jsxs(Card, {
									className: "border-teal-500/50 shadow-lg shadow-teal-950/10 flex flex-col justify-between hover:border-teal-500/80 transition-all relative overflow-hidden bg-[#072424]/40",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "absolute top-0 right-0 bg-teal-500 text-teal-950 text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-lg",
											children: "Populaire"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "p-6 md:p-8 space-y-6",
											children: [
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
													className: "text-lg font-bold text-foreground",
													children: "Pro"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground mt-1",
													children: "Le tout inclus pour les formateurs, coachs et infopreneurs."
												})] }),
												/* @__PURE__ */ jsxs("div", {
													className: "pt-2",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "text-3xl md:text-4xl font-extrabold text-teal-400",
															children: priceCurrency === "CFA" ? "19 000 CFA" : "29 €"
														}),
														/* @__PURE__ */ jsx("span", {
															className: "text-xs text-muted-foreground font-semibold",
															children: " / mois"
														}),
														/* @__PURE__ */ jsx("p", {
															className: "text-[10px] text-teal-500 font-bold mt-1",
															children: "2 mois offerts en paiement annuel"
														})
													]
												}),
												/* @__PURE__ */ jsxs("ul", {
													className: "space-y-3 text-xs text-muted-foreground pt-4 border-t border-teal-950/40",
													children: [
														/* @__PURE__ */ jsx("li", {
															className: "flex items-center gap-2 text-foreground font-medium",
															children: "✓ Formations illimitées"
														}),
														/* @__PURE__ */ jsx("li", {
															className: "flex items-center gap-2 text-foreground font-medium",
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
															children: "✓ Visioconférences en Direct (1h/live)"
														}),
														/* @__PURE__ */ jsx("li", {
															className: "flex items-center gap-2",
															children: "✓ Support prioritaire 24h/7j"
														}),
														/* @__PURE__ */ jsx("li", {
															className: "flex items-center gap-2 text-teal-400 font-bold",
															children: "✓ Frais de transaction : 5%"
														})
													]
												})
											]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "p-6 md:p-8 pt-0",
											children: /* @__PURE__ */ jsx(Button, {
												asChild: true,
												className: "w-full bg-teal-600 hover:bg-teal-500 text-white",
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
									className: "border-border/80 flex flex-col justify-between hover:border-teal-900/30 transition-all relative overflow-hidden bg-card/60",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "p-6 md:p-8 space-y-6",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-bold text-foreground",
												children: "Académie B2B"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground mt-1",
												children: "Pour les universités, lycées et centres de formation officiels."
											})] }),
											/* @__PURE__ */ jsxs("div", {
												className: "pt-2",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-3xl md:text-4xl font-extrabold text-foreground",
														children: priceCurrency === "CFA" ? "59 000 CFA" : "89 €"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-xs text-muted-foreground font-semibold",
														children: " / mois"
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-[10px] text-teal-500 font-bold mt-1",
														children: "Support d'intégration sur-mesure inclus"
													})
												]
											}),
											/* @__PURE__ */ jsxs("ul", {
												className: "space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/40",
												children: [
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2 text-foreground font-semibold",
														children: "✓ Personnalisation White-Label (Marque)"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2 text-foreground font-semibold",
														children: "✓ Visioconférences Jitsi illimitées"
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
														className: "flex items-center gap-2",
														children: "✓ Hébergement dédié réseaux bas-débit"
													}),
													/* @__PURE__ */ jsx("li", {
														className: "flex items-center gap-2 text-teal-500 font-bold",
														children: "✓ Frais de transaction : 2%"
													})
												]
											})
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "p-6 md:p-8 pt-0",
										children: /* @__PURE__ */ jsx(Button, {
											asChild: true,
											className: "w-full bg-secondary hover:bg-secondary/90 text-foreground",
											size: "lg",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/register",
												children: "Contacter le service Académie"
											})
										})
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "max-w-3xl mx-auto px-6 py-24 border-t border-border/40",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-12 space-y-2",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-bold tracking-tight",
								children: "Questions fréquentes"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Tout ce que vous devez savoir sur la plateforme LMS EduFlex."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: faqs.map((faq, idx) => {
								const isOpen = openFaqIdx === idx;
								return /* @__PURE__ */ jsxs("div", {
									className: "border border-border/60 rounded-xl overflow-hidden bg-card transition-all",
									children: [/* @__PURE__ */ jsxs("button", {
										onClick: () => setOpenFaqIdx(isOpen ? null : idx),
										className: "w-full flex items-center justify-between p-4 text-left font-semibold text-xs md:text-sm text-foreground hover:bg-muted/30 transition-colors",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4.5 w-4.5 text-primary shrink-0" }), faq.q]
										}), /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` })]
									}), isOpen && /* @__PURE__ */ jsx("div", {
										className: "p-4 pt-1 border-t border-border/30 text-xs md:text-sm text-muted-foreground leading-relaxed bg-muted/5 animate-fade-in",
										children: faq.a
									})]
								}, idx);
							})
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "border-t border-border/50 bg-gradient-to-b from-transparent to-primary/5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "max-w-7xl mx-auto px-6 py-24 text-center space-y-6",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-3xl md:text-5xl font-bold tracking-tight",
									children: "Rejoignez l'avenir du e-learning"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed",
									children: "Prêt à vendre et diffuser des formations de manière professionnelle et sans restriction ? Créez votre compte gratuitement."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "pt-4",
									children: /* @__PURE__ */ jsx(Button, {
										asChild: true,
										size: "lg",
										className: "text-base px-10 bg-primary hover:bg-primary/95 shadow-lg",
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/register",
											children: ["Créer mon compte gratuitement", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
										})
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-border/50 bg-card",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(Sparkles, { className: "h-4.5 w-4.5 text-primary" }),
							/* @__PURE__ */ jsx("span", {
								className: "font-bold text-foreground",
								children: platformName
							}),
							/* @__PURE__ */ jsx("span", { children: "© 2026. Tous droits réservés." })
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex gap-4",
						children: /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-emerald-600" }), " Plateforme LMS Premium"]
						})
					})]
				})
			})
		]
	});
}
function DashboardRedirect() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-dvh bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center space-y-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto shadow-md",
					children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary-foreground" })
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground font-medium text-sm",
					children: "Redirection vers votre tableau de bord..."
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "bg-primary hover:bg-primary/95",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/_app/dashboard",
						children: "Accéder au tableau de bord"
					})
				})
			]
		})
	});
}
//#endregion
export { LandingPage as component };
