import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useState } from "react";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter as createRouter$1, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlinkUIProvider, Button, Card, Input, Toaster, toast } from "@blinkdotnew/ui";
import { FileCheck2, LayoutGrid, Plus, ShieldCheck, Sparkles, Users, Video, X } from "lucide-react";
//#region src/index.css?url
var src_default = "/assets/index-DEmiBS4b.css";
//#endregion
//#region src/routes/__root.tsx
var queryClient = new QueryClient();
/**
* Root route — owns the HTML document (SSR), global <head> (SEO-ready),
* and the app-wide providers.
*
* NO app chrome (sidebar/top bar) is applied here by default, so every app —
* landing pages, marketing sites, content, games — renders FULL-BLEED.
* Building a SaaS / dashboard app? Opt into the sidebar shell by ADDING a
* `src/routes/_app.tsx` pathless layout route with pages under `src/routes/_app/`
* (a `_app.tsx` with no children conflicts with this index route). Keep this
* root bare — don't add chrome here.
*
* SEO/AEO: <HeadContent /> renders the merged head() output (title, meta,
* Open Graph, links) on the server, so crawlers and AI bots receive a
* fully-rendered, indexable document on the first request. Per-page routes
* override title/description via their own head().
*/
var Route$30 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			},
			{ title: "EduFlex — Plateforme LMS" },
			{
				name: "description",
				content: "EduFlex : la plateforme LMS moderne pour créer, gérer et vendre vos formations en ligne. Zéro installation, mises à jour gratuites, sans engagement."
			},
			{
				name: "theme-color",
				content: "#2251cc"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "EduFlex — Plateforme LMS"
			},
			{
				property: "og:description",
				content: "Créez, gérez et vendez vos formations en ligne avec EduFlex."
			},
			{
				property: "og:site_name",
				content: "EduFlex"
			},
			{
				property: "og:locale",
				content: "fr_FR"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: src_default
		}, {
			rel: "icon",
			type: "image/svg+xml",
			href: "/favicon.svg"
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "fr",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx(HeadContent, {}),
			/* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            ` } }),
			/* @__PURE__ */ jsx("script", { src: "https://checkout.flutterwave.com/v3.js" }),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify({
					"@context": "https://schema.org",
					"@graph": [{
						"@type": "WebSite",
						name: "EduFlex",
						url: "/"
					}, {
						"@type": "Organization",
						name: "EduFlex",
						url: "/",
						sameAs: []
					}]
				}) }
			})
		] }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsx(QueryClientProvider, {
			client: queryClient,
			children: /* @__PURE__ */ jsxs(BlinkUIProvider, {
				theme: "linear",
				darkMode: "class",
				children: [/* @__PURE__ */ jsx(Toaster, {}), children]
			})
		}), /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/tarifs.tsx
var $$splitComponentImporter$28 = () => import("./tarifs-8E8MEjME.js");
var Route$29 = createFileRoute("/tarifs")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
//#endregion
//#region src/routes/register.tsx
var $$splitComponentImporter$27 = () => import("./register-CLfVicoH.js");
var Route$28 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Inscription — EduFlex" }, {
		name: "description",
		content: "Créez votre compte EduFlex et commencez à gérer vos formations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$26 = () => import("./login-B_-abByU.js");
var Route$27 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Connexion — EduFlex" }, {
		name: "description",
		content: "Connectez-vous à votre compte EduFlex."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
//#endregion
//#region src/routes/eduflex-plus.tsx
var $$splitComponentImporter$25 = () => import("./eduflex-plus-Wd4GUcA0.js");
var Route$26 = createFileRoute("/eduflex-plus")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
//#endregion
//#region src/routes/_app.tsx
var $$splitComponentImporter$24 = () => import("./_app-DmqJCBDi.js");
var Route$25 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$23 = () => import("./routes-C1DtikGn.js");
var Route$24 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "EduFlex — Plateforme LMS B2B & Formation d'Entreprise" }, {
		name: "description",
		content: "Formez vos équipes aux compétences de demain en toute flexibilité. Solution EdTech B2B d'upskilling, suivi RH et certification."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
//#endregion
//#region src/routes/_app/ventes.tsx
var $$splitComponentImporter$22 = () => import("./ventes-DL_R6SQj.js");
var Route$23 = createFileRoute("/_app/ventes")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
//#endregion
//#region src/routes/_app/statistiques.tsx
var $$splitComponentImporter$21 = () => import("./statistiques-CQHothMj.js");
var Route$22 = createFileRoute("/_app/statistiques")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
//#endregion
//#region src/routes/_app/settings.tsx
var $$splitComponentImporter$20 = () => import("./settings-sDkMQFgu.js");
var Route$21 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
//#endregion
//#region src/routes/_app/personnalisation.tsx
var $$splitComponentImporter$19 = () => import("./personnalisation-SMKsk6Nl.js");
var Route$20 = createFileRoute("/_app/personnalisation")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
//#endregion
//#region src/routes/_app/paiements.tsx
var $$splitComponentImporter$18 = () => import("./paiements-CQwNIRSE.js");
var Route$19 = createFileRoute("/_app/paiements")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
//#endregion
//#region src/routes/_app/packs.tsx
var $$splitComponentImporter$17 = () => import("./packs-C40Zi4ja.js");
var Route$18 = createFileRoute("/_app/packs")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
//#endregion
//#region src/routes/_app/outils-marketing.tsx
var $$splitComponentImporter$16 = () => import("./outils-marketing-CGPKhK4a.js");
var Route$17 = createFileRoute("/_app/outils-marketing")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
//#endregion
//#region src/routes/_app/manage-courses.tsx
var $$splitComponentImporter$15 = () => import("./manage-courses-Bu01Quat.js");
var Route$16 = createFileRoute("/_app/manage-courses")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
//#endregion
//#region src/routes/_app/integrations.tsx
var $$splitComponentImporter$14 = () => import("./integrations-CTsrIhX9.js");
var Route$15 = createFileRoute("/_app/integrations")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/_app/enseignants.tsx
var $$splitComponentImporter$13 = () => import("./enseignants-D484oN0t.js");
var Route$14 = createFileRoute("/_app/enseignants")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
//#endregion
//#region src/routes/_app/eleves.tsx
var $$splitComponentImporter$12 = () => import("./eleves-C9GSQ36m.js");
var Route$13 = createFileRoute("/_app/eleves")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/_app/dashboard.tsx
var $$splitComponentImporter$11 = () => import("./dashboard-BGzK6ZCt.js");
var Route$12 = createFileRoute("/_app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
//#endregion
//#region src/routes/_app/courses.tsx
var $$splitComponentImporter$10 = () => import("./courses-CGPAgsrm.js");
var Route$11 = createFileRoute("/_app/courses")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/_app/communaute.tsx
var $$splitComponentImporter$9 = () => import("./communaute-p9qjhrfY.js");
var Route$10 = createFileRoute("/_app/communaute")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/_app/codes-promo.tsx
var $$splitComponentImporter$8 = () => import("./codes-promo-Dzsd39rF.js");
var Route$9 = createFileRoute("/_app/codes-promo")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/_app/classes-virtuelles.tsx
var Route$8 = createFileRoute("/_app/classes-virtuelles")({ component: ClassesVirtuellesPage });
function ClassesVirtuellesPage() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("classes");
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [connectModalOpen, setConnectModalOpen] = useState(false);
	const isPlanDecouverte = (user?.academyPlan || "DECOUVERTE").toUpperCase() === "DECOUVERTE";
	const [firstName, setFirstName] = useState(user?.displayName?.split(" ")[0] || "Ghislain");
	const [lastName, setLastName] = useState(user?.displayName?.split(" ")[1] || "Agohi-Nguessan");
	const [email, setEmail] = useState(user?.email || "gagohi06@gmail.com");
	const [subdomain, setSubdomain] = useState("55454618");
	const [isConnected, setIsConnected] = useState(false);
	const [virtualClasses, setVirtualClasses] = useState([]);
	const features = [
		{
			id: 1,
			title: "Sessions en direct",
			description: "Planifiez et lancez vos classes virtuelles en quelques clics, avec ou sans inscription préalable.",
			icon: /* @__PURE__ */ jsx(Video, { className: "h-5 w-5 text-teal-500" })
		},
		{
			id: 2,
			title: "Vos apprenants réunis",
			description: "Invitez automatiquement les apprenants inscrits à vos formations, sans saisie manuelle.",
			icon: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-teal-500" })
		},
		{
			id: 3,
			title: "Émargement & Qualiopi",
			description: "Feuilles d'émargement signées par les participants et enquêtes de satisfaction pour une conformité sans effort.",
			icon: /* @__PURE__ */ jsx(FileCheck2, { className: "h-5 w-5 text-teal-500" })
		},
		{
			id: 4,
			title: "Résumé & transcription IA",
			description: "Transcription automatique et résumé généré par l'IA à l'issue de chaque session, pour ne rien perdre de vos échanges.",
			icon: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-teal-500" })
		},
		{
			id: 5,
			title: "Hébergement 100% sécurisé",
			description: "Vos sessions, données et enregistrements sont hébergés en toute sécurité dans le respect du RGPD.",
			icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5 text-teal-500" })
		},
		{
			id: 6,
			title: "Tout au même endroit",
			description: "Retrouvez l'historique de vos sessions, les statistiques et le suivi de vos apprenants directement dans EduFlex.",
			icon: /* @__PURE__ */ jsx(LayoutGrid, { className: "h-5 w-5 text-teal-500" })
		}
	];
	const handleConnectSubmit = (e) => {
		e.preventDefault();
		setIsConnected(true);
		setConnectModalOpen(false);
		toast.success("Compte EduFlex Meet connecté avec succès !");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-teal-500/30 rounded-2xl shadow-xs gap-4",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200",
					children: [
						"Débloquer ",
						/* @__PURE__ */ jsx("strong", {
							className: "text-teal-600 dark:text-teal-400",
							children: "TOUTES"
						}),
						" les fonctionnalités pour profiter du meilleur de EduFlex"
					]
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs h-9 px-5 rounded-xl shadow-md border-none shrink-0",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/tarifs",
						children: "Débloquer 💎"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Vos classes virtuelles"
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: () => setCreateModalOpen(true),
					className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-md flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Créer une classe virtuelle"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => setActiveTab("classes"),
					className: `px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "classes" ? "bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`,
					children: "Mes classes virtuelles"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => setActiveTab("settings"),
					className: `px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "settings" ? "bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`,
					children: "Paramètres"
				})]
			}),
			activeTab === "classes" && /* @__PURE__ */ jsx("div", {
				className: "space-y-6",
				children: virtualClasses.length === 0 ? /* @__PURE__ */ jsxs(Card, {
					className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 rounded-3xl text-center space-y-4 shadow-xs",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-16 w-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ jsx(Video, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1 max-w-md mx-auto",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-slate-900 dark:text-white",
								children: "Vous n'avez pas encore de classes virtuelles"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500",
								children: "Cliquez sur le bouton ci-dessous pour en créer une dès maintenant."
							})]
						}),
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Button, {
							onClick: () => setCreateModalOpen(true),
							className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md",
							children: "Créer une classe virtuelle"
						}) })
					]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: virtualClasses.map((item) => /* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 p-5 rounded-2xl bg-white dark:bg-slate-900",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "font-bold text-sm text-slate-900 dark:text-white",
							children: item.title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-500 mt-1",
							children: item.date
						})]
					}, item.id))
				})
			}),
			activeTab === "settings" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-8",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "border border-teal-500/30 bg-gradient-to-b from-teal-500/10 via-slate-900/50 to-slate-900 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto shadow-xl",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 text-xl sm:text-2xl font-black text-teal-400",
							children: [/* @__PURE__ */ jsx(Video, { className: "h-7 w-7" }), " EduFlex Meet"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 max-w-2xl mx-auto",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight",
								children: "Organisez des classes virtuelles depuis EduFlex"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed",
								children: "Connectez gratuitement votre compte EduFlex Meet pour organiser et gérer vos sessions de visioconférence avec vos apprenants, sans quitter votre espace formateur."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap justify-center gap-3 pt-2",
							children: [/* @__PURE__ */ jsx(Button, {
								onClick: () => setConnectModalOpen(true),
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg",
								children: isConnected ? "Compte EduFlex Meet connecté ✓" : "Créer mon compte EduFlex Meet"
							}), /* @__PURE__ */ jsx(Button, {
								variant: "outline",
								onClick: () => setConnectModalOpen(true),
								className: "text-xs h-10 px-6 rounded-xl text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
								children: "Se connecter à EduFlex Meet"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap justify-center gap-4 text-[11px] text-slate-400 pt-2 font-medium",
							children: [
								/* @__PURE__ */ jsx("span", { children: "✓ Rapide" }),
								/* @__PURE__ */ jsx("span", { children: "•" }),
								/* @__PURE__ */ jsx("span", { children: "✓ Sécurisé" }),
								/* @__PURE__ */ jsx("span", { children: "•" }),
								/* @__PURE__ */ jsx("span", { children: "✓ Offre gratuite disponible" }),
								/* @__PURE__ */ jsx("span", { children: "•" }),
								/* @__PURE__ */ jsx("span", { children: "✓ Sans engagement" })
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto",
					children: features.map((item) => /* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3 text-left",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center",
								children: item.icon
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-slate-900 dark:text-white",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
								children: item.description
							})
						]
					}, item.id))
				})]
			}),
			createModalOpen && isPlanDecouverte && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-base font-black text-slate-900 dark:text-white",
							children: "Créer une classe virtuelle"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setCreateModalOpen(false),
							className: "text-slate-400 hover:text-slate-900 dark:hover:text-white",
							children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "p-6 space-y-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "bg-amber-100/70 dark:bg-amber-950/40 border border-amber-400/80 dark:border-amber-600/60 p-6 rounded-2xl text-center space-y-3 shadow-xs",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-extrabold text-amber-950 dark:text-amber-200 leading-relaxed max-w-sm mx-auto",
									children: "Votre forfait actuel (Forfait DÉCOUVERTE) ne vous permet pas d'avoir accès à cette fonctionnalité."
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs font-bold text-amber-900 dark:text-amber-300",
									children: [
										"Seuls ceux ayant un ",
										/* @__PURE__ */ jsx("strong", { children: "Forfait PRO ou supérieur" }),
										" peuvent bénéficier de cette fonctionnalité."
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "pt-2",
									children: /* @__PURE__ */ jsx(Button, {
										asChild: true,
										className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-md border-none transition-transform hover:scale-[1.02] active:scale-95",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/tarifs",
											onClick: () => setCreateModalOpen(false),
											children: "Activer cette fonctionnalité ! 💎"
										})
									})
								})
							]
						})
					})]
				})
			}),
			connectModalOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-black text-base shadow-md",
							children: "E"
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight",
							children: "EduFlex Meet × EduFlex"
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleConnectSubmit,
						className: "p-6 space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center space-y-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-lg font-black text-slate-900 dark:text-white",
									children: "Création de votre compte EduFlex Meet"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500",
									children: "Vérifiez et modifiez vos informations avant de créer votre compte."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Prénom"
									}), /* @__PURE__ */ jsx(Input, {
										value: firstName,
										onChange: (e) => setFirstName(e.target.value),
										className: "text-xs h-9",
										required: true
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Nom"
									}), /* @__PURE__ */ jsx(Input, {
										value: lastName,
										onChange: (e) => setLastName(e.target.value),
										className: "text-xs h-9",
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Email"
								}), /* @__PURE__ */ jsx(Input, {
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "text-xs h-9",
									type: "email",
									required: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-slate-700 dark:text-slate-300",
									children: "Sous-domaine"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx(Input, {
										value: subdomain,
										onChange: (e) => setSubdomain(e.target.value),
										className: "text-xs h-9 rounded-r-none font-mono",
										required: true
									}), /* @__PURE__ */ jsx("span", {
										className: "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-l-0 border-slate-200 dark:border-slate-800 text-xs px-3 h-9 flex items-center rounded-r-lg font-mono",
										children: ".eduflex-meet.com"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2 pt-3",
								children: [/* @__PURE__ */ jsx(Button, {
									type: "submit",
									className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 rounded-xl",
									children: "Créer mon compte"
								}), /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => setConnectModalOpen(false),
									className: "w-full text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white h-9",
									children: "Annuler"
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
//#region src/routes/_app/calendrier.tsx
var $$splitComponentImporter$7 = () => import("./calendrier-DUPnHE-g.js");
var Route$7 = createFileRoute("/_app/calendrier")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/_app/assistants-ia.tsx
var $$splitComponentImporter$6 = () => import("./assistants-ia-BFk9tpRA.js");
var Route$6 = createFileRoute("/_app/assistants-ia")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/_app/affiliation.tsx
var $$splitComponentImporter$5 = () => import("./affiliation-B34ureOB.js");
var Route$5 = createFileRoute("/_app/affiliation")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/_app/admin-settings.tsx
var $$splitComponentImporter$4 = () => import("./admin-settings-EDiSnh4A.js");
var Route$4 = createFileRoute("/_app/admin-settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/_app/academy-hub.tsx
var $$splitComponentImporter$3 = () => import("./academy-hub-Bmfs0f3x.js");
var Route$3 = createFileRoute("/_app/academy-hub")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/_app/academies.tsx
var $$splitComponentImporter$2 = () => import("./academies-C1lp5neu.js");
var Route$2 = createFileRoute("/_app/academies")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/_app/study.$id.tsx
var $$splitComponentImporter$1 = () => import("./study._id-DPW3pihr.js");
var Route$1 = createFileRoute("/_app/study/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/_app/courses.$id.tsx
var $$splitComponentImporter = () => import("./courses._id-DCxSfKp5.js");
var Route = createFileRoute("/_app/courses/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var TarifsRoute = Route$29.update({
	id: "/tarifs",
	path: "/tarifs",
	getParentRoute: () => Route$30
});
var RegisterRoute = Route$28.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$30
});
var LoginRoute = Route$27.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$30
});
var EduflexPlusRoute = Route$26.update({
	id: "/eduflex-plus",
	path: "/eduflex-plus",
	getParentRoute: () => Route$30
});
var AppRoute = Route$25.update({
	id: "/_app",
	getParentRoute: () => Route$30
});
var IndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$30
});
var AppVentesRoute = Route$23.update({
	id: "/ventes",
	path: "/ventes",
	getParentRoute: () => AppRoute
});
var AppStatistiquesRoute = Route$22.update({
	id: "/statistiques",
	path: "/statistiques",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$21.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppPersonnalisationRoute = Route$20.update({
	id: "/personnalisation",
	path: "/personnalisation",
	getParentRoute: () => AppRoute
});
var AppPaiementsRoute = Route$19.update({
	id: "/paiements",
	path: "/paiements",
	getParentRoute: () => AppRoute
});
var AppPacksRoute = Route$18.update({
	id: "/packs",
	path: "/packs",
	getParentRoute: () => AppRoute
});
var AppOutilsMarketingRoute = Route$17.update({
	id: "/outils-marketing",
	path: "/outils-marketing",
	getParentRoute: () => AppRoute
});
var AppManageCoursesRoute = Route$16.update({
	id: "/manage-courses",
	path: "/manage-courses",
	getParentRoute: () => AppRoute
});
var AppIntegrationsRoute = Route$15.update({
	id: "/integrations",
	path: "/integrations",
	getParentRoute: () => AppRoute
});
var AppEnseignantsRoute = Route$14.update({
	id: "/enseignants",
	path: "/enseignants",
	getParentRoute: () => AppRoute
});
var AppElevesRoute = Route$13.update({
	id: "/eleves",
	path: "/eleves",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$12.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppCoursesRoute = Route$11.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => AppRoute
});
var AppCommunauteRoute = Route$10.update({
	id: "/communaute",
	path: "/communaute",
	getParentRoute: () => AppRoute
});
var AppCodesPromoRoute = Route$9.update({
	id: "/codes-promo",
	path: "/codes-promo",
	getParentRoute: () => AppRoute
});
var AppClassesVirtuellesRoute = Route$8.update({
	id: "/classes-virtuelles",
	path: "/classes-virtuelles",
	getParentRoute: () => AppRoute
});
var AppCalendrierRoute = Route$7.update({
	id: "/calendrier",
	path: "/calendrier",
	getParentRoute: () => AppRoute
});
var AppAssistantsIaRoute = Route$6.update({
	id: "/assistants-ia",
	path: "/assistants-ia",
	getParentRoute: () => AppRoute
});
var AppAffiliationRoute = Route$5.update({
	id: "/affiliation",
	path: "/affiliation",
	getParentRoute: () => AppRoute
});
var AppAdminSettingsRoute = Route$4.update({
	id: "/admin-settings",
	path: "/admin-settings",
	getParentRoute: () => AppRoute
});
var AppAcademyHubRoute = Route$3.update({
	id: "/academy-hub",
	path: "/academy-hub",
	getParentRoute: () => AppRoute
});
var AppAcademiesRoute = Route$2.update({
	id: "/academies",
	path: "/academies",
	getParentRoute: () => AppRoute
});
var AppStudyIdRoute = Route$1.update({
	id: "/study/$id",
	path: "/study/$id",
	getParentRoute: () => AppRoute
});
var AppCoursesRouteChildren = { AppCoursesIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppCoursesRoute
}) };
var AppRouteChildren = {
	AppAcademiesRoute,
	AppAcademyHubRoute,
	AppAdminSettingsRoute,
	AppAffiliationRoute,
	AppAssistantsIaRoute,
	AppCalendrierRoute,
	AppClassesVirtuellesRoute,
	AppCodesPromoRoute,
	AppCommunauteRoute,
	AppCoursesRoute: AppCoursesRoute._addFileChildren(AppCoursesRouteChildren),
	AppDashboardRoute,
	AppElevesRoute,
	AppEnseignantsRoute,
	AppIntegrationsRoute,
	AppManageCoursesRoute,
	AppOutilsMarketingRoute,
	AppPacksRoute,
	AppPaiementsRoute,
	AppPersonnalisationRoute,
	AppSettingsRoute,
	AppStatistiquesRoute,
	AppVentesRoute,
	AppStudyIdRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	EduflexPlusRoute,
	LoginRoute,
	RegisterRoute,
	TarifsRoute
};
var routeTree = Route$30._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
/**
* TanStack Start entry — the framework imports this `createRouter` factory.
* `routeTree.gen.ts` is generated automatically by the TanStack Start Vite
* plugin from the files under `src/routes/` (do not edit it by hand).
*/
function createRouter() {
	return createRouter$1({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
var getRouter = createRouter;
//#endregion
export { createRouter, getRouter };
