import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, Input, toast } from "@blinkdotnew/ui";
import { ChevronDown, ChevronUp, Copy, HelpCircle, PlayCircle } from "lucide-react";
//#region src/routes/_app/outils-marketing.tsx?tsr-split=component
function OutilsMarketingPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	const [activeTab, setActiveTab] = useState("tracking");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const tabParam = new URLSearchParams(window.location.search).get("tab");
			if (tabParam === "autoresponders" || tabParam === "automations" || tabParam === "emails" || tabParam === "tracking") setActiveTab(tabParam);
		}
	}, []);
	const [utmSource, setUtmSource] = useState("");
	const [utmMedium, setUtmMedium] = useState("");
	const [utmCampaign, setUtmCampaign] = useState("");
	const [generatedUtmUrl, setGeneratedUtmUrl] = useState("");
	const [gaCode, setGaCode] = useState("");
	const [metaPixelCode, setMetaPixelCode] = useState("");
	const [faqUtmOpen, setFaqUtmOpen] = useState(false);
	const [selectedEmailId, setSelectedEmailId] = useState("welcome");
	const emailTemplates = [
		{
			id: "welcome",
			title: "Email de bienvenue",
			desc: "Personnalisez l'email que reçoivent vos apprenants lorsqu'ils s'inscrivent à une de vos formations."
		},
		{
			id: "completion",
			title: "Email de fin de formation",
			desc: "Félicitez vos apprenants dès qu'ils terminent 100% des leçons d'un cours."
		},
		{
			id: "unsubscribe",
			title: "Email de désinscription",
			desc: "Envoyé lorsqu'un apprenant annule son inscription à une formation."
		},
		{
			id: "delete",
			title: "Email de suppression d'un apprenant",
			desc: "Notification envoyée lors de la suppression définitive du compte d'un apprenant."
		},
		{
			id: "abandon1",
			title: "1ère relance après un abandon d'achat",
			desc: "Relancez automatiquement les prospects ayant quitté la page de paiement avant d'avoir finalisé par Mobile Money ou Carte."
		},
		{
			id: "abandon2",
			title: "2ème relance après un abandon d'achat",
			desc: "Seconde relance incitative avec un code promo pour convertir les indécis."
		},
		{
			id: "invite_new",
			title: "Email d'invitation d'un nouvel apprenant",
			desc: "Email contenant les identifiants de connexion générés pour un nouvel élève."
		},
		{
			id: "invite_exist",
			title: "Email d'invitation d'un apprenant existant",
			desc: "Notification envoyée à un élève déjà inscrit pour lui donner accès à un nouveau cours."
		},
		{
			id: "lesson_new",
			title: "Email de leçon nouvellement accessible",
			desc: "Prévenez l'apprenant lorsqu'un nouveau chapitre ou leçon débloquée est disponible."
		},
		{
			id: "recap",
			title: "Email récapitulatif des formations en cours",
			desc: "Résumé hebdomadaire de la progression envoyée à l'apprenant."
		},
		{
			id: "access_mod",
			title: "Email de modification des accès à une formation",
			desc: "Informa l'apprenant d'un changement dans la durée d'accès à ses cours."
		},
		{
			id: "access_exp",
			title: "Email d'expiration des accès à une formation",
			desc: "Avertit l'apprenant quelques jours avant l'expiration de son accès."
		},
		{
			id: "churn1",
			title: "1ère relance après le décrochage d'un apprenant",
			desc: "Encouragez l'apprenant inactif depuis 14 jours à reprendre ses leçons."
		},
		{
			id: "churn2",
			title: "2ème relance après le décrochage d'un apprenant",
			desc: "Relance ultime pour réengager les étudiants inactifs."
		}
	];
	const selectedEmail = emailTemplates.find((e) => e.id === selectedEmailId) || emailTemplates[0];
	const handleGenerateUtm = (e) => {
		e.preventDefault();
		if (!utmSource.trim()) {
			toast.error("La source UTM est obligatoire (ex: whatsapp, facebook).");
			return;
		}
		setGeneratedUtmUrl(`${window.location.origin}/courses?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`);
		toast.success("Lien de suivi UTM généré avec succès !");
	};
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
				className: "flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("tracking"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "tracking" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Suivi / Tracking"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("autoresponders"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "autoresponders" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Autorépondeurs"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("automations"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "automations" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Automatisations (Zapier...)"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("emails"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "emails" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Emails & Relances"
					})
				]
			}),
			activeTab === "tracking" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 space-y-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
								children: "Créez vos liens de suivi UTM"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
								children: "Identifiez l'origine de vos inscriptions grâce à des liens de suivi UTM personnalisés. EduFlex vous permet d'analyser et d'optimiser vos canaux d'acquisition (Facebook, WhatsApp, TikTok, Google...)."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/40",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => setFaqUtmOpen(!faqUtmOpen),
									className: "w-full flex items-center justify-between p-4 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left",
									children: [/* @__PURE__ */ jsx("span", { children: "Qu'est-ce qu'un lien de suivi UTM ?" }), faqUtmOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4 text-slate-400" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-slate-400" })]
								}), faqUtmOpen && /* @__PURE__ */ jsx("div", {
									className: "p-4 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 space-y-2",
									children: /* @__PURE__ */ jsx("p", { children: "Un paramètre UTM est un petit bout de code ajouté à la fin de votre lien URL pour indiquer précisément d'où vient l'apprenant (ex: un statut WhatsApp, une pub Facebook ou un e-mail)." })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => toast.info("Guide UTM ouvert."),
									className: "text-xs h-8 gap-1.5 text-slate-600 dark:text-slate-300",
									children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-3.5 w-3.5" }), " Voir la page d'aide"]
								}), /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									onClick: () => toast.info("Lancement de la vidéo démo..."),
									className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8 gap-1.5",
									children: [/* @__PURE__ */ jsx(PlayCircle, { className: "h-3.5 w-3.5" }), " Regarder la démo"]
								})]
							})
						]
					}), /* @__PURE__ */ jsxs(Card, {
						className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "p-3 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500",
								children: "Vous n'avez aucun produit publié à intégrer pour le moment."
							}),
							/* @__PURE__ */ jsxs("form", {
								onSubmit: handleGenerateUtm,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Source (obligatoire)"
										}), /* @__PURE__ */ jsx(Input, {
											placeholder: "Ex: whatsapp, facebook, instagram, google",
											value: utmSource,
											onChange: (e) => setUtmSource(e.target.value),
											className: "text-xs h-9 bg-white dark:bg-slate-950"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Medium"
										}), /* @__PURE__ */ jsx(Input, {
											placeholder: "Ex: cpc, statut, story, newsletter",
											value: utmMedium,
											onChange: (e) => setUtmMedium(e.target.value),
											className: "text-xs h-9 bg-white dark:bg-slate-950"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Campagne"
										}), /* @__PURE__ */ jsx(Input, {
											placeholder: "Ex: promo_rentree, lancement_bootcamp",
											value: utmCampaign,
											onChange: (e) => setUtmCampaign(e.target.value),
											className: "text-xs h-9 bg-white dark:bg-slate-950"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex justify-end pt-2",
										children: /* @__PURE__ */ jsx(Button, {
											type: "submit",
											className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg",
											children: "Générer mon lien de suivi UTM"
										})
									})
								]
							}),
							generatedUtmUrl && /* @__PURE__ */ jsxs("div", {
								className: "p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl space-y-2 animate-in fade-in",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-teal-400 block",
									children: "Lien généré :"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2 items-center",
									children: [/* @__PURE__ */ jsx(Input, {
										readOnly: true,
										value: generatedUtmUrl,
										className: "text-xs font-mono bg-slate-950 text-teal-300 h-8"
									}), /* @__PURE__ */ jsx(Button, {
										size: "sm",
										onClick: () => {
											navigator.clipboard.writeText(generatedUtmUrl);
											toast.success("Lien UTM copié !");
										},
										className: "bg-teal-600 hover:bg-teal-500 text-white text-xs h-8 shrink-0",
										children: /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" })
									})]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base font-bold text-slate-900 dark:text-white",
								children: "Outils de suivi"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 leading-relaxed",
								children: [
									"Indiquez ici vos codes ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-slate-800 dark:text-slate-200",
										children: "Google Analytics 4"
									}),
									" ou ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-slate-800 dark:text-slate-200",
										children: "Pixel Meta (Facebook)"
									}),
									" pour suivre vos performances et piloter vos campagnes."
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-2 pt-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Code Google Analytics"
								}), /* @__PURE__ */ jsx(Input, {
									placeholder: "G-XXXXXXXXXX",
									value: gaCode,
									onChange: (e) => setGaCode(e.target.value),
									className: "text-xs font-mono h-9"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Pixel Meta (Facebook)"
								}), /* @__PURE__ */ jsx(Input, {
									placeholder: "XXXXXXXXXXXXXXX",
									value: metaPixelCode,
									onChange: (e) => setMetaPixelCode(e.target.value),
									className: "text-xs font-mono h-9"
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-end pt-2",
							children: /* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Codes de suivi enregistrés !"),
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg",
								children: "Mettre à jour"
							})
						})
					]
				})]
			}),
			activeTab === "autoresponders" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "p-4 bg-teal-50 dark:bg-slate-900 border border-teal-500/30 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-semibold",
						children: [
							"Pour alimenter vos listes et gérer vos autorépondeurs, connectez EduFlex à vos outils Marketing : ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-slate-900 dark:text-white",
								children: "Brevo, ActiveCampaign et/ou GetResponse"
							}),
							"."
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[11px] text-slate-500",
						children: "Vous devrez ensuite associer chacune de vos formations EduFlex avec une liste préalablement créée dans votre outil Marketing. Pour cela, rendez-vous dans l'onglet « Paramètres » de vos formations."
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx(Card, {
							className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-5 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "Brevo (ex Sendinblue)"
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: [
											"Où trouver votre clé API ? Dans la section « SMTP et API » de votre compte Brevo. ",
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => toast.info("Ouverture du tutoriel Brevo..."),
												className: "text-teal-500 hover:underline font-semibold",
												children: "Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici"
											})
										]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "md:col-span-7",
									children: isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
								})]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-5 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "ActiveCampaign"
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: [
											"Où trouver vos accès d'API ? Dans la section « Paramètres », puis « Développeur » de votre compte ActiveCampaign. ",
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => toast.info("Ouverture du tutoriel ActiveCampaign..."),
												className: "text-teal-500 hover:underline font-semibold",
												children: "Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici"
											})
										]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "md:col-span-7",
									children: isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
								})]
							})
						}),
						/* @__PURE__ */ jsx(Card, {
							className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-5 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "GetResponse"
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: [
											"Où trouver votre clé API ? Dans la section « Intégrations & API », puis « API » de votre compte GetResponse. ",
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("strong", {
												className: "text-slate-700 dark:text-slate-300",
												children: "Point d'attention : les clés API GetResponse expirent au bout de 90 jours"
											}),
											", charge à vous de faire le renouvellement avant expiration. ",
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => toast.info("Ouverture du tutoriel GetResponse..."),
												className: "text-teal-500 hover:underline font-semibold",
												children: "Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici"
											})
										]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "md:col-span-7",
									children: isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
								})]
							})
						})
					]
				})]
			}),
			activeTab === "automations" && /* @__PURE__ */ jsx("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
								children: "Zapier et Make"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500 leading-relaxed",
								children: "Vous voulez connecter EduFlex avec d'autres applications ?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed",
								children: "Connectez votre compte EduFlex à Zapier ou Make en générant une clé d'authentification (aussi appelée clé d'API)."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-bold",
									children: "Attention !"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] leading-relaxed",
									children: "Pour accéder à l'application EduFlex sur Zapier ou Make, vous devez impérativement passer par les liens privés ; l'application n'étant pas disponible publiquement sur les stores."
								})]
							})
						]
					}), /* @__PURE__ */ jsxs(Card, {
						className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-slate-900 dark:text-white",
								children: "Cette clé est secrète, ne la partagez pas !"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500 leading-relaxed",
								children: "Vous devez utiliser cette clé côté Zapier ou Make pour authentifier votre compte EduFlex, afin de recevoir et envoyer uniquement les données vous concernant."
							})]
						}), isFreePlan ? /* @__PURE__ */ jsx(YellowPlanGuardBox, {}) : /* @__PURE__ */ jsxs("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ jsx(Input, {
								readOnly: true,
								value: "ef_live_99a818172901fa910",
								className: "text-xs font-mono bg-slate-950 text-teal-400"
							}), /* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Clé d'API Zapier copiée !"),
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
								children: "Copier la clé Zapier"
							})]
						})]
					})]
				})
			}),
			activeTab === "emails" && /* @__PURE__ */ jsx("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 max-h-[600px] overflow-y-auto shadow-xs text-xs",
						children: emailTemplates.map((tpl) => /* @__PURE__ */ jsx("button", {
							onClick: () => setSelectedEmailId(tpl.id),
							className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-between ${selectedEmailId === tpl.id ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
							children: /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: tpl.title
							})
						}, tpl.id))
					}), /* @__PURE__ */ jsxs(Card, {
						className: "lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
									children: selectedEmail.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: selectedEmail.desc
								})]
							}),
							isFreePlan ? /* @__PURE__ */ jsx(YellowPlanGuardBox, {}) : /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Sujet de l'email"
										}), /* @__PURE__ */ jsx(Input, {
											defaultValue: `[${selectedEmail.title}] Bienvenue sur votre formation !`,
											className: "text-xs h-9"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsxs("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: [
												"Corps du message (Supporte le HTML et variables ",
												"{{prenom_apprenant}}",
												")"
											]
										}), /* @__PURE__ */ jsx("textarea", {
											rows: 6,
											className: "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs font-sans outline-none text-slate-900 dark:text-white",
											defaultValue: `Bonjour {{prenom_apprenant}},\n\nFélicitations pour votre inscription à la formation !`
										})]
									}),
									/* @__PURE__ */ jsx(Button, {
										onClick: () => toast.success("Modèle d'email sauvegardé !"),
										className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
										children: "Enregistrer le modèle"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-bold text-slate-900 dark:text-white",
									children: "Personnalisez les emails envoyés aux apprenants"
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-slate-500 leading-relaxed text-[11px]",
									children: [
										"Nous allons envoyer plusieurs emails à vos apprenants en votre nom : ",
										/* @__PURE__ */ jsx("strong", {
											className: "text-slate-700 dark:text-slate-300",
											children: "avant, pendant et après leur formation"
										}),
										". Vous avez ici la possibilité de les personnaliser."
									]
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { OutilsMarketingPage as component };
