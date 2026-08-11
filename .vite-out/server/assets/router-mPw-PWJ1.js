import { useState } from "react";
import { HeadContent, Scripts, createFileRoute, createRootRoute, createRouter as createRouter$1, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Badge, BlinkUIProvider, Button, Card, CardTitle, Input, Toaster, toast } from "@blinkdotnew/ui";
import { ExternalLink, Play, Video } from "lucide-react";
//#region src/index.css?url
var src_default = "/assets/index-BtothnbH.css";
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
var Route$28 = createRootRoute({
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
				darkMode: "system",
				children: [/* @__PURE__ */ jsx(Toaster, {}), children]
			})
		}), /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/tarifs.tsx
var $$splitComponentImporter$26 = () => import("./tarifs-C4P08f_u.js");
var Route$27 = createFileRoute("/tarifs")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
//#endregion
//#region src/routes/register.tsx
var $$splitComponentImporter$25 = () => import("./register-DBJSz4W4.js");
var Route$26 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Inscription — EduFlex" }, {
		name: "description",
		content: "Créez votre compte EduFlex et commencez à gérer vos formations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$24 = () => import("./login-DRxwfrWR.js");
var Route$25 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Connexion — EduFlex" }, {
		name: "description",
		content: "Connectez-vous à votre compte EduFlex."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
//#endregion
//#region src/routes/eduflex-plus.tsx
var $$splitComponentImporter$23 = () => import("./eduflex-plus-DWUtnf4K.js");
var Route$24 = createFileRoute("/eduflex-plus")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
//#endregion
//#region src/routes/_app.tsx
var $$splitComponentImporter$22 = () => import("./_app-B_O8fsj7.js");
var Route$23 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$21 = () => import("./routes-BV5zOaEA.js");
var Route$22 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "EduFlex — Plateforme LMS Premium et Innovante" }, {
		name: "description",
		content: "Créez, gérez et vendez vos formations en ligne avec EduFlex. Support du Mobile Money, double devise EUR/XOF, quiz et certificats de réussite inclus."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
//#endregion
//#region src/routes/_app/statistiques.tsx
var $$splitComponentImporter$20 = () => import("./statistiques-B6gcboZz.js");
var Route$21 = createFileRoute("/_app/statistiques")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
//#endregion
//#region src/routes/_app/settings.tsx
var $$splitComponentImporter$19 = () => import("./settings-44he4g7J.js");
var Route$20 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
//#endregion
//#region src/routes/_app/paiements.tsx
var $$splitComponentImporter$18 = () => import("./paiements-CC7kMLRS.js");
var Route$19 = createFileRoute("/_app/paiements")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
//#endregion
//#region src/routes/_app/packs.tsx
var $$splitComponentImporter$17 = () => import("./packs-BxTZpTJ3.js");
var Route$18 = createFileRoute("/_app/packs")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
//#endregion
//#region src/routes/_app/outils-marketing.tsx
var $$splitComponentImporter$16 = () => import("./outils-marketing-CD30A-nW.js");
var Route$17 = createFileRoute("/_app/outils-marketing")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
//#endregion
//#region src/routes/_app/manage-courses.tsx
var $$splitComponentImporter$15 = () => import("./manage-courses-ExAmYIXM.js");
var Route$16 = createFileRoute("/_app/manage-courses")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
//#endregion
//#region src/routes/_app/integrations.tsx
var $$splitComponentImporter$14 = () => import("./integrations-Dd4J3EMY.js");
var Route$15 = createFileRoute("/_app/integrations")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/_app/enseignants.tsx
var $$splitComponentImporter$13 = () => import("./enseignants-D484oN0t.js");
var Route$14 = createFileRoute("/_app/enseignants")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
//#endregion
//#region src/routes/_app/eleves.tsx
var $$splitComponentImporter$12 = () => import("./eleves-D8dDwAUC.js");
var Route$13 = createFileRoute("/_app/eleves")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/_app/dashboard.tsx
var $$splitComponentImporter$11 = () => import("./dashboard-Bou-BcrG.js");
var Route$12 = createFileRoute("/_app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
//#endregion
//#region src/routes/_app/courses.tsx
var $$splitComponentImporter$10 = () => import("./courses-37pPcffg.js");
var Route$11 = createFileRoute("/_app/courses")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/_app/communaute.tsx
var $$splitComponentImporter$9 = () => import("./communaute-BIv02MbK.js");
var Route$10 = createFileRoute("/_app/communaute")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/_app/codes-promo.tsx
var $$splitComponentImporter$8 = () => import("./codes-promo-Dzsd39rF.js");
var Route$9 = createFileRoute("/_app/codes-promo")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/_app/classes-virtuelles.tsx
var Route$8 = createFileRoute("/_app/classes-virtuelles")({ component: ClassesVirtuellesPage });
function ClassesVirtuellesPage() {
	const [roomName, setRoomName] = useState("Session-Live-EduFlex");
	const [activeMeeting, setActiveMeeting] = useState(false);
	const handleStartInstantMeeting = () => {
		setActiveMeeting(true);
		toast.success("Classe virtuelle lancée ! Rejoignez la salle de visioconférence.");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-2xl font-black text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Video, { className: "h-6 w-6 text-red-500 animate-pulse" }), "Classes Virtuelles & Visioconférence"]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-400",
						children: "Animez vos cours en direct, partagez votre écran et interagissez avec vos apprenants."
					})]
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: handleStartInstantMeeting,
					className: "bg-red-600 hover:bg-red-500 text-white font-bold text-xs h-9",
					children: [/* @__PURE__ */ jsx(Play, { className: "h-3.5 w-3.5 mr-1.5" }), " Démarrer un direct instantané"]
				})]
			}),
			activeMeeting && /* @__PURE__ */ jsxs(Card, {
				className: "border border-red-500/40 bg-slate-950 p-4 space-y-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx(Badge, {
						className: "bg-red-600 text-white text-xs font-bold animate-pulse",
						children: "● EN DIRECT"
					}), /* @__PURE__ */ jsx(Button, {
						size: "xs",
						variant: "outline",
						onClick: () => setActiveMeeting(false),
						className: "text-xs text-red-400 border-red-500/30",
						children: "Quitter la réunion"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-full h-96 bg-slate-900 rounded-xl flex flex-col items-center justify-center space-y-3 border border-slate-800",
					children: [
						/* @__PURE__ */ jsx(Video, { className: "h-12 w-12 text-teal-400" }),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-bold text-white",
							children: ["Salle Visioconférence EduFlex : ", roomName]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400",
							children: "Intégration directe Jitsi Meet / Google Meet opérationnelle."
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs",
							children: /* @__PURE__ */ jsxs("a", {
								href: `https://meet.jit.si/${roomName}`,
								target: "_blank",
								rel: "noreferrer",
								className: "flex items-center gap-1",
								children: ["Ouvrir dans une nouvelle fenêtre ", /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 ml-1" })]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "border border-border/80 bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "text-sm font-bold text-white",
						children: "Créer une classe programmée"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Nom du cours en direct"
								}), /* @__PURE__ */ jsx(Input, {
									placeholder: "Ex: Atelier Coaching individuel...",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Lien Google Meet / Zoom / Jitsi"
								}), /* @__PURE__ */ jsx(Input, {
									placeholder: "https://meet.google.com/abc-defg-hij",
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Classe virtuelle programmée !"),
								className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
								children: "Enregistrer la classe"
							})
						]
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "border border-border/80 bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "text-sm font-bold text-white",
						children: "Statistiques des Lives"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2 text-xs text-slate-400",
						children: [
							/* @__PURE__ */ jsxs("p", { children: [
								"• ",
								/* @__PURE__ */ jsx("strong", { children: "Heures de direct diffusées :" }),
								" 14h"
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								"• ",
								/* @__PURE__ */ jsx("strong", { children: "Taux de participation moyen :" }),
								" 84%"
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								"• ",
								/* @__PURE__ */ jsx("strong", { children: "Enregistrements replay archivés :" }),
								" 6 vidéos"
							] })
						]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/_app/calendrier.tsx
var $$splitComponentImporter$7 = () => import("./calendrier-LhvIk6rM.js");
var Route$7 = createFileRoute("/_app/calendrier")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/_app/assistants-ia.tsx
var $$splitComponentImporter$6 = () => import("./assistants-ia-BLrX04cN.js");
var Route$6 = createFileRoute("/_app/assistants-ia")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/_app/affiliation.tsx
var $$splitComponentImporter$5 = () => import("./affiliation-BNBZUgLN.js");
var Route$5 = createFileRoute("/_app/affiliation")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/_app/admin-settings.tsx
var $$splitComponentImporter$4 = () => import("./admin-settings-CRaNmOR9.js");
var Route$4 = createFileRoute("/_app/admin-settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/_app/academy-hub.tsx
var $$splitComponentImporter$3 = () => import("./academy-hub-Bmfs0f3x.js");
var Route$3 = createFileRoute("/_app/academy-hub")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/_app/academies.tsx
var $$splitComponentImporter$2 = () => import("./academies-CG0V6l-A.js");
var Route$2 = createFileRoute("/_app/academies")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/_app/study.$id.tsx
var $$splitComponentImporter$1 = () => import("./study._id-C390xsZO.js");
var Route$1 = createFileRoute("/_app/study/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/_app/courses.$id.tsx
var $$splitComponentImporter = () => import("./courses._id-wKI7Czir.js");
var Route = createFileRoute("/_app/courses/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var TarifsRoute = Route$27.update({
	id: "/tarifs",
	path: "/tarifs",
	getParentRoute: () => Route$28
});
var RegisterRoute = Route$26.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$28
});
var LoginRoute = Route$25.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$28
});
var EduflexPlusRoute = Route$24.update({
	id: "/eduflex-plus",
	path: "/eduflex-plus",
	getParentRoute: () => Route$28
});
var AppRoute = Route$23.update({
	id: "/_app",
	getParentRoute: () => Route$28
});
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$28
});
var AppStatistiquesRoute = Route$21.update({
	id: "/statistiques",
	path: "/statistiques",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$20.update({
	id: "/settings",
	path: "/settings",
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
	AppSettingsRoute,
	AppStatistiquesRoute,
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
var routeTree = Route$28._addFileChildren(rootRouteChildren)._addFileTypes();
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
