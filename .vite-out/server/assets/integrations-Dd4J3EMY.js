import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as FeatureLockGuard } from "./FeatureLockGuard-CaJDPeuW.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, CardTitle, Input, toast } from "@blinkdotnew/ui";
import { Code2, Copy, Globe, Key } from "lucide-react";
//#region src/routes/_app/integrations.tsx?tsr-split=component
function IntegrationsPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	const [apiKey] = useState("ef_live_88a91c7429b9104fa281c");
	const [pixelId, setPixelId] = useState("");
	return /* @__PURE__ */ jsx(FeatureLockGuard, {
		isLocked: isFreePlan,
		featureTitle: "APIs Développeur, Webhooks & Meta Pixel",
		featureDescription: "Accédez aux clés d'API REST, connectez vos webhooks avec Zapier/Make et suivez vos conversions avec le Meta Pixel.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-2xl font-black text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Code2, { className: "h-6 w-6 text-teal-400" }), "Intégrations Externes & API"]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-400",
						children: "Connectez votre académie EduFlex avec Zapier, Webhooks, Google Analytics 4 et Meta Pixel."
					})]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "border border-border/80 bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ jsxs(CardTitle, {
						className: "text-sm font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Key, { className: "h-4 w-4 text-teal-400" }), " Clé API EduFlex"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-bold text-muted-foreground",
							children: "Clé Secrète Production"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								readOnly: true,
								value: apiKey,
								className: "text-xs font-mono bg-slate-950"
							}), /* @__PURE__ */ jsx(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									navigator.clipboard.writeText(apiKey);
									toast.success("Clé API copiée !");
								},
								className: "text-xs border-border shrink-0",
								children: /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" })
							})]
						})]
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "border border-border/80 bg-card p-5 space-y-4",
					children: [/* @__PURE__ */ jsxs(CardTitle, {
						className: "text-sm font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-sky-400" }), " Facebook / Meta Pixel ID"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground",
								children: "ID du Pixel"
							}), /* @__PURE__ */ jsx(Input, {
								placeholder: "Ex: 123456789012345",
								value: pixelId,
								onChange: (e) => setPixelId(e.target.value),
								className: "text-xs font-mono"
							})]
						}), /* @__PURE__ */ jsx(Button, {
							onClick: () => toast.success("Pixel Meta configuré avec succès !"),
							className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9",
							children: "Enregistrer le Pixel"
						})]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { IntegrationsPage as component };
