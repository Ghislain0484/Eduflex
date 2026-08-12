import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
//#region src/components/YellowPlanGuardBox.tsx
function YellowPlanGuardBox({ message = "Votre forfait actuel (Forfait DÉCOUVERTE) ne vous permet pas d'avoir accès à cette fonctionnalité.", subtext, btnText = "Activer cette fonctionnalité ! 💎" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-amber-100/70 dark:bg-amber-950/40 border border-amber-400/80 dark:border-amber-600/60 p-6 rounded-xl text-center space-y-3 shadow-xs my-4",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs font-bold text-amber-950 dark:text-amber-200 leading-relaxed max-w-xl mx-auto",
				children: message
			}),
			subtext && /* @__PURE__ */ jsx("p", {
				className: "text-[11px] text-amber-900/80 dark:text-amber-300 max-w-md mx-auto",
				children: subtext
			}),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2 rounded-lg shadow-md border-none transition-transform hover:scale-[1.02] active:scale-95",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/tarifs",
					children: btnText
				})
			}) })
		]
	});
}
//#endregion
export { YellowPlanGuardBox as t };
