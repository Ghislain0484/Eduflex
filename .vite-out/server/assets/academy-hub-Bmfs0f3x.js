import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@blinkdotnew/ui";
import { Award, Copy, FileText, PlayCircle, Video } from "lucide-react";
//#region src/routes/_app/academy-hub.tsx?tsr-split=component
function AcademyHubPage() {
	const [activeLessonId, setActiveLessonId] = useState(1);
	const [copiedTextId, setCopiedTextId] = useState(null);
	const lessons = [
		{
			id: 1,
			title: "Créer sa première formation rentable : Ingénierie & Structure",
			duration: "25 min",
			videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
			description: "Apprenez à structurer votre programme en chapitres progressifs, à formuler des objectifs pédagogiques clairs et à intégrer des quiz pour maximiser le taux de complétion.",
			speaker: "Ghislain (Fondateur EduFlex)",
			category: "Pedagogy"
		},
		{
			id: 2,
			title: "Copywriting : Rédiger une page de vente qui convertit à 10%",
			duration: "18 min",
			videoUrl: "https://www.w3schools.com/html/movie.mp4",
			description: "Techniques d'écriture persuasive pour capter l'attention de vos prospects, formuler votre offre unique de valeur, et lever les objections pour vendre vos formations.",
			speaker: "Sarah K. (Copywriter Senior)",
			category: "Marketing"
		},
		{
			id: 3,
			title: "Technique : Réussir et enregistrer ses classes live Jitsi",
			duration: "12 min",
			videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
			description: "Tutoriel pas-à-pas pour planifier des visio Jitsi interactives, configurer le partage d'écran HD, et uploader automatiquement le Replay pour vos étudiants.",
			speaker: "Équipe Produit EduFlex",
			category: "Tech"
		},
		{
			id: 4,
			title: "Conformité administrative : Qualiopi et CPF en 2026",
			duration: "30 min",
			videoUrl: "https://www.w3schools.com/html/movie.mp4",
			description: "Guide pour les formateurs francophones afin de structurer leurs rapports d'assiduité d'élèves et rendre leurs formations finançables CPF/OPCO ou équivalents régionaux.",
			speaker: "Marc A. (Auditeur Qualité)",
			category: "Legal"
		}
	];
	const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
	const copyToClipboard = (text, id) => {
		navigator.clipboard.writeText(text);
		setCopiedTextId(id);
		toast.success("Copié dans le presse-papier !");
		setTimeout(() => setCopiedTextId(null), 2500);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden rounded-2xl border border-teal-500/20 bg-slate-900 p-6 md:p-8 space-y-4 shadow-lg shadow-teal-950/10",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.15),transparent_70%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 relative z-10 max-w-3xl",
				children: [
					/* @__PURE__ */ jsx(Badge, {
						className: "bg-teal-500/10 text-teal-400 border-none text-[10px] uppercase font-bold py-1 px-3",
						children: "🎓 ACADÉMIE DES FORMATEURS"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl md:text-3xl font-black text-white tracking-tight",
						children: "Espace Pédagogie & Succès"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs md:text-sm text-slate-400 leading-relaxed",
						children: "Profitez de nos cours exclusifs et outils pratiques pour optimiser vos parcours d'apprentissage, rédiger vos pages de vente et booster l'engagement de vos étudiants."
					})
				]
			})]
		}), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "courses",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "bg-slate-900 border-slate-800 p-1 w-full max-w-md grid grid-cols-2",
					children: [/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "courses",
						className: "text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white",
						children: [/* @__PURE__ */ jsx(Video, { className: "h-3.5 w-3.5 mr-1.5" }), " Formations & Lives"]
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "resources",
						className: "text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white",
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5 mr-1.5" }), " Boîte à Outils"]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "courses",
					className: "space-y-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-2 space-y-4",
							children: /* @__PURE__ */ jsxs(Card, {
								className: "border-slate-800 bg-slate-900/40 text-left overflow-hidden",
								children: [/* @__PURE__ */ jsx("div", {
									className: "relative aspect-video bg-black flex items-center justify-center border-b border-slate-800",
									children: activeLesson.videoUrl ? /* @__PURE__ */ jsx("video", {
										src: activeLesson.videoUrl,
										controls: true,
										className: "w-full h-full object-contain",
										poster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
									}, activeLesson.id) : /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center text-slate-500 gap-2",
										children: [/* @__PURE__ */ jsx(PlayCircle, { className: "h-12 w-12 text-teal-500 animate-pulse" }), /* @__PURE__ */ jsx("span", {
											className: "text-xs",
											children: "Chargement du cours vidéo..."
										})]
									})
								}), /* @__PURE__ */ jsxs(CardContent, {
									className: "p-6 space-y-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Badge, {
												className: "bg-teal-500/10 text-teal-400 border-none text-[9px] font-bold uppercase",
												children: activeLesson.category
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[10px] text-slate-400 font-medium",
												children: ["Durée : ", activeLesson.duration]
											})]
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "text-base font-bold text-white",
											children: activeLesson.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-400 leading-relaxed",
											children: activeLesson.description
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex items-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500",
											children: /* @__PURE__ */ jsxs("span", { children: ["Intervenant : ", /* @__PURE__ */ jsx("strong", {
												className: "text-slate-300",
												children: activeLesson.speaker
											})] })
										})
									]
								})]
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx("h4", {
									className: "text-xs font-bold uppercase tracking-wider text-slate-400",
									children: "Programme de formation"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "space-y-2",
									children: lessons.map((lesson) => /* @__PURE__ */ jsxs("button", {
										onClick: () => setActiveLessonId(lesson.id),
										className: `w-full text-left p-3.5 rounded-xl border transition-all flex gap-3.5 items-start ${activeLessonId === lesson.id ? "border-teal-500 bg-teal-500/5 shadow-sm shadow-teal-500/5" : "border-slate-800 bg-slate-900/20 hover:border-slate-700"}`,
										children: [/* @__PURE__ */ jsx("div", {
											className: `h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${activeLessonId === lesson.id ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400"}`,
											children: /* @__PURE__ */ jsx(PlayCircle, { className: "h-4 w-4" })
										}), /* @__PURE__ */ jsxs("div", {
											className: "space-y-1 min-w-0",
											children: [/* @__PURE__ */ jsx("p", {
												className: `text-xs font-semibold leading-snug truncate ${activeLessonId === lesson.id ? "text-teal-400" : "text-slate-200"}`,
												children: lesson.title
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5 text-[9px] text-slate-400",
												children: [
													/* @__PURE__ */ jsx("span", { children: lesson.duration }),
													/* @__PURE__ */ jsx("span", { children: "·" }),
													/* @__PURE__ */ jsx("span", { children: lesson.speaker })
												]
											})]
										})]
									}, lesson.id))
								}),
								/* @__PURE__ */ jsx(Card, {
									className: "border-teal-500/25 bg-teal-950/10 text-left",
									children: /* @__PURE__ */ jsxs(CardContent, {
										className: "p-4 space-y-2 text-xs",
										children: [/* @__PURE__ */ jsxs("h5", {
											className: "font-bold text-white flex items-center gap-1",
											children: [/* @__PURE__ */ jsx(Award, { className: "h-4 w-4 text-teal-400" }), " Qualité de Formation"]
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-slate-400 leading-relaxed",
											children: "EduFlex intègre des rapports d'assiduité exportables (durée de connexion et logs d'étapes) indispensables pour vos dossiers qualité."
										})]
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "resources",
					className: "space-y-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [{
							id: "email_inactive",
							title: "Modèle d'Email de relance (Élèves Inactifs)",
							description: "Email à envoyer automatiquement aux élèves qui n'ont pas progressé dans la formation depuis 7 jours.",
							content: `Sujet : Des progrès vers votre objectif, [Prénom] ? 👋

Bonjour [Prénom],

Je passais prendre des nouvelles de votre progression dans la formation "[Nom de la Formation]".

Il y a quelques jours, vous avez décidé d'investir sur vous-même en rejoignant ce programme. C'est une excellente décision, mais la clé de la réussite réside dans la régularité.

Besoin d'un coup de pouce ou bloqué sur un chapitre ?
Répondez simplement à ce mail, je suis là pour vous aider !

👉 Cliquez ici pour reprendre là où vous vous étiez arrêté : [Lien de l'espace d'étude]

À très vite,
[Votre Nom / Académie]`
						}, {
							id: "sales_page_structure",
							title: "Structure type d'une Page de Vente High-Ticket",
							description: "Plan étape par étape pour construire la structure de votre landing page de cours dans EduFlex.",
							content: `1. ACCROCHE (Promesse forte : résultat + délai + sans la frustration)
2. PROBLÈMES (Décrire la situation actuelle douloureuse du prospect)
3. SOLUTION (Présentation de votre formation et bénéfices immédiats)
4. PROGRAMME DÉTAILLÉ (Contenu des chapitres et modules)
5. BONUS (Offres complémentaires gratuites)
6. PREUVES SOCIALES (Témoignages de premiers élèves satisfaits)
7. TARIFS & PAIEMENT (Option en 1x ou X fois avec Mobile Money)
8. GARANTIE (Garantie de satisfaction 14 jours)
9. FAQ (Questions fréquentes avec réponses rapides)`
						}].map((tmpl) => /* @__PURE__ */ jsxs(Card, {
							className: "border-slate-800 bg-slate-900/30 text-left flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs(CardHeader, {
								className: "pb-3 border-b border-slate-800",
								children: [/* @__PURE__ */ jsx(CardTitle, {
									className: "text-xs font-bold text-slate-300 uppercase tracking-wide",
									children: tmpl.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-slate-400 mt-1",
									children: tmpl.description
								})]
							}), /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-4 flex-1 flex flex-col justify-between space-y-4",
								children: [/* @__PURE__ */ jsx("pre", {
									className: "p-4 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all max-h-56",
									children: tmpl.content
								}), /* @__PURE__ */ jsx(Button, {
									onClick: () => copyToClipboard(tmpl.content, tmpl.id),
									className: "w-full h-8 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-800/40",
									children: copiedTextId === tmpl.id ? /* @__PURE__ */ jsx(Fragment, { children: "✓ Modèle Copié !" }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Copy, { className: "h-3 w-3 mr-1.5" }), " Copier le modèle textuel"] })
								})]
							})]
						}, tmpl.id))
					})
				})
			]
		})]
	});
}
//#endregion
export { AcademyHubPage as component };
