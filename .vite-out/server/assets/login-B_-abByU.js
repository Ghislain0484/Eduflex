import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Input } from "@blinkdotnew/ui";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
//#region src/routes/login.tsx?tsr-split=component
function LoginPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	if (!isLoading && isAuthenticated) {
		navigate({ to: "/dashboard" });
		return null;
	}
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-dvh",
		children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-2 border-primary/20 border-t-primary" })
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const { error: authError } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (authError) throw authError;
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err?.message || "Email ou mot de passe incorrect.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-dvh flex items-center justify-center p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-sm space-y-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "inline-flex items-center gap-2.5 mb-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-10 w-10 rounded-xl bg-primary flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" })
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-xl tracking-tight",
							children: "EduFlex"
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Connectez-vous"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Accédez à votre tableau de bord EduFlex."
					})
				]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Adresse email"
						}), /* @__PURE__ */ jsx(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "votre@email.fr",
							required: true,
							autoComplete: "email"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Mot de passe"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "text-xs text-primary hover:underline",
								children: "Mot de passe oublié ?"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Input, {
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								required: true,
								autoComplete: "current-password"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setShowPassword(!showPassword),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
								children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
							})]
						})]
					}),
					error && /* @__PURE__ */ jsx("p", {
						className: "text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2",
						children: error
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						className: "w-full",
						size: "lg",
						disabled: loading,
						children: [loading ? "Connexion en cours..." : "Se connecter", !loading && /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-center text-sm text-muted-foreground",
						children: ["Pas encore de compte ? ", /* @__PURE__ */ jsx(Link, {
							to: "/register",
							className: "text-primary font-medium hover:underline",
							children: "Inscrivez-vous"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
