import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Input } from "@blinkdotnew/ui";
import { ArrowRight, Check, Eye, EyeOff, Sparkles } from "lucide-react";
//#region src/routes/register.tsx?tsr-split=component
function RegisterPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();
	const [prenom, setPrenom] = useState("");
	const [nom, setNom] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [acceptCGV, setAcceptCGV] = useState(false);
	const [newsletter, setNewsletter] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [isAcademy, setIsAcademy] = useState(false);
	const [academyName, setAcademyName] = useState("");
	const [academySlogan, setAcademySlogan] = useState("");
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
		if (!acceptCGV) {
			setError("Vous devez accepter les conditions générales.");
			return;
		}
		if (password.length < 8) {
			setError("Le mot de passe doit contenir au moins 8 caractères.");
			return;
		}
		setLoading(true);
		try {
			const { data: signUpData, error: authError } = await supabase.auth.signUp({
				email,
				password,
				options: { data: {
					display_name: `${prenom} ${nom}`,
					full_name: `${prenom} ${nom}`
				} }
			});
			if (authError) throw authError;
			if (signUpData?.user && isAcademy) {
				await new Promise((resolve) => setTimeout(resolve, 800));
				await supabase.from("profiles").update({
					academy_name: academyName || `${prenom} ${nom} Académie`,
					academy_slogan: academySlogan || "Votre excellence en ligne",
					academy_color: "#0d9488",
					role: "student",
					approved: false,
					academy_plan: "Académie B2B"
				}).eq("id", signUpData.user.id);
			}
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err?.message || "Une erreur est survenue lors de l'inscription.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh flex",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 flex items-center justify-center p-6 lg:p-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md space-y-8",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex items-center gap-2.5 mb-10",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-primary flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" })
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-lg tracking-tight",
							children: "EduFlex"
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Créez votre compte"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-muted-foreground",
						children: "Commencez à gérer vos formations en quelques minutes."
					})
				] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "text-sm font-medium",
									children: ["Prénom ", /* @__PURE__ */ jsx("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ jsx(Input, {
									value: prenom,
									onChange: (e) => setPrenom(e.target.value),
									placeholder: "Jean",
									required: true
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "text-sm font-medium",
									children: ["Nom ", /* @__PURE__ */ jsx("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ jsx(Input, {
									value: nom,
									onChange: (e) => setNom(e.target.value),
									placeholder: "Dupont",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "text-sm font-medium",
								children: ["Adresse email ", /* @__PURE__ */ jsx("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ jsx(Input, {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "jean@exemple.fr",
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "text-sm font-medium",
								children: ["Mot de passe ", /* @__PURE__ */ jsx("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(Input, {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "8 caractères minimum",
									required: true,
									minLength: 8
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
									children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 pt-2 border-t border-border/40",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2.5 cursor-pointer",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: isAcademy,
									onChange: (e) => setIsAcademy(e.target.checked),
									className: "h-4 w-4 rounded border-border accent-teal-600"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-semibold text-teal-600",
									children: "Créer une Académie en marque blanche (Offre EduFlex+)"
								})]
							}), isAcademy && /* @__PURE__ */ jsxs("div", {
								className: "space-y-3 p-3 bg-teal-950/20 border border-teal-900/40 rounded-xl animate-fade-in",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-[11px] font-bold text-teal-700 uppercase tracking-wider",
										children: "Nom de votre Académie"
									}), /* @__PURE__ */ jsx(Input, {
										value: academyName,
										onChange: (e) => setAcademyName(e.target.value),
										placeholder: "Ex: HEC Abidjan, Académie Digitale...",
										required: isAcademy
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-[11px] font-bold text-teal-700 uppercase tracking-wider",
										children: "Slogan de l'académie"
									}), /* @__PURE__ */ jsx(Input, {
										value: academySlogan,
										onChange: (e) => setAcademySlogan(e.target.value),
										placeholder: "Ex: Votre avenir commence ici"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-start gap-2.5 cursor-pointer",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: acceptCGV,
									onChange: (e) => setAcceptCGV(e.target.checked),
									className: "mt-0.5 h-4 w-4 rounded border-border accent-primary"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: [
										"J'accepte les ",
										/* @__PURE__ */ jsx("span", {
											className: "underline",
											children: "conditions générales"
										}),
										" et la ",
										/* @__PURE__ */ jsx("span", {
											className: "underline",
											children: "politique de confidentialité"
										}),
										" d'EduFlex. ",
										/* @__PURE__ */ jsx("span", {
											className: "text-destructive",
											children: "*"
										})
									]
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex items-start gap-2.5 cursor-pointer",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: newsletter,
									onChange: (e) => setNewsletter(e.target.checked),
									className: "mt-0.5 h-4 w-4 rounded border-border accent-primary"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: [/* @__PURE__ */ jsx("strong", { children: "La Lettre EduFlex" }), " — Recevoir chaque mois des astuces et actualités."]
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
							children: [loading ? "Création en cours..." : "Créer mon compte", !loading && /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-center text-sm text-muted-foreground",
							children: ["Déjà un compte ? ", /* @__PURE__ */ jsx(Link, {
								to: "/login",
								className: "text-primary font-medium hover:underline",
								children: "Connectez-vous"
							})]
						})
					]
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 items-center justify-center p-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-md space-y-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(Sparkles, { className: "h-8 w-8 text-primary" })
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-bold tracking-tight",
						children: "Rejoignez la communauté EduFlex"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: [
							"Zéro installation — accessible partout",
							"Mises à jour gratuites et régulières",
							"Sans aucun engagement",
							"Transactions 100% sécurisées",
							"Entreprise 100% Française"
						].map((item, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" })
							}), /* @__PURE__ */ jsx("span", {
								className: "text-sm",
								children: item
							})]
						}, i))
					})
				]
			})
		})]
	});
}
//#endregion
export { RegisterPage as component };
