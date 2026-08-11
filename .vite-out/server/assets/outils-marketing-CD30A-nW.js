import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as FeatureLockGuard } from "./FeatureLockGuard-CaJDPeuW.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, toast } from "@blinkdotnew/ui";
import { Megaphone } from "lucide-react";
//#region src/routes/_app/outils-marketing.tsx?tsr-split=component
function OutilsMarketingPage() {
	const { user } = useAuth();
	return /* @__PURE__ */ jsx(FeatureLockGuard, {
		isLocked: !user?.subscriptionPlan || [
			"découverte",
			"decouverte",
			"free"
		].includes(user.subscriptionPlan.toLowerCase()),
		featureTitle: "Outils Marketing & Autorépondeurs",
		featureDescription: "Connectez votre académie à Brevo, ActiveCampaign et GetResponse pour envoyer des séquences automatiques d'emails et capturer vos leads.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-2xl font-black text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Megaphone, { className: "h-6 w-6 text-teal-400" }), "Outils Marketing & Conversion"]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-400",
						children: "Automatisez la relance d'abandon de panier et synchronisez vos contacts avec Brevo, ActiveCampaign et Mailchimp."
					})]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-border/80 bg-card p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center font-bold text-xs",
								children: "Brevo"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-white",
								children: "Brevo (ex-Sendinblue)"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400",
								children: "Synchronisez vos nouveaux élèves directement dans vos listes Brevo."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Intégration Brevo enregistrée."),
								className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8",
								children: "Connecter Brevo"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-border/80 bg-card p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center font-bold text-xs",
								children: "AC"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-white",
								children: "ActiveCampaign"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400",
								children: "Déclenchez des séquences d'emails automatiques lors de chaque inscription."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Intégration ActiveCampaign enregistrée."),
								className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8",
								children: "Connecter ActiveCampaign"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-border/80 bg-card p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xs",
								children: "GR"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-white",
								children: "GetResponse"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400",
								children: "Envoyez des tunnels de vente et des offres ciblées aux indécis."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: () => toast.success("Intégration GetResponse enregistrée."),
								className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8",
								children: "Connecter GetResponse"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { OutilsMarketingPage as component };
