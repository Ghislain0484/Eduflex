import { t as supabase } from "./supabase-DUsUuZXg.js";
import { i as useTeachersList } from "./useStats-Cf7USm9u.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, CardContent, EmptyState, Input, Skeleton, toast } from "@blinkdotnew/ui";
import { GraduationCap, Loader2, Mail, Plus } from "lucide-react";
//#region src/routes/_app/enseignants.tsx?tsr-split=component
function EnseignantsPage() {
	const { data: teachers, isLoading } = useTeachersList();
	const queryClient = useQueryClient();
	const [showAddForm, setShowAddForm] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [newName, setNewName] = useState("");
	const [adding, setAdding] = useState(false);
	const teacherList = teachers || [];
	const getInitials = (name) => {
		return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
	};
	const handleAddTeacher = async (e) => {
		e.preventDefault();
		if (!newEmail.trim() || !newName.trim()) return;
		setAdding(true);
		try {
			const tempPassword = crypto.randomUUID().replace(/-/g, "") + "Aa1!";
			const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
				email: newEmail.trim().toLowerCase(),
				password: tempPassword,
				options: { data: {
					display_name: newName.trim(),
					role: "teacher"
				} }
			});
			if (signUpError) throw signUpError;
			if (signUpData.user?.id) await supabase.from("profiles").upsert({
				id: signUpData.user.id,
				email: newEmail.trim().toLowerCase(),
				display_name: newName.trim(),
				role: "teacher",
				approved: true
			}, { onConflict: "id" });
			toast.success(`✅ L'enseignant a été ajouté ! Un email de bienvenue a été envoyé à ${newEmail.trim()}.`);
			setNewEmail("");
			setNewName("");
			setShowAddForm(false);
			queryClient.invalidateQueries({ queryKey: ["profiles", "teachers"] });
		} catch (err) {
			console.error(err);
			if (err.message?.includes("already registered")) toast.error("Cet email est déjà enregistré sur la plateforme.");
			else toast.error("Erreur lors de l'ajout : " + err.message);
		} finally {
			setAdding(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6",
		children: [
			showAddForm && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsx(Card, {
					className: "max-w-md w-full border-border/80 bg-slate-900 text-slate-100",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "pt-6 space-y-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg text-white",
							children: "Ajouter un enseignant"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Inscrivez un nouveau formateur dans l'académie pour lui donner accès au créateur de cours."
						})] }), /* @__PURE__ */ jsxs("form", {
							onSubmit: handleAddTeacher,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-300",
										children: "Nom Complet *"
									}), /* @__PURE__ */ jsx(Input, {
										required: true,
										value: newName,
										onChange: (e) => setNewName(e.target.value),
										placeholder: "Ex: Dr. Martin Luther",
										className: "h-9 text-xs bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-semibold text-slate-300",
											children: "Adresse Email *"
										}),
										/* @__PURE__ */ jsx(Input, {
											required: true,
											type: "email",
											value: newEmail,
											onChange: (e) => setNewEmail(e.target.value),
											placeholder: "Ex: martin.luther@ecole.com",
											className: "h-9 text-xs bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-slate-400",
											children: "Un email de bienvenue avec lien de connexion sera envoyé automatiquement."
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										className: "flex-1 text-xs h-9 border-slate-600 text-slate-300",
										onClick: () => setShowAddForm(false),
										children: "Annuler"
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										className: "flex-1 text-xs h-9 bg-teal-600 hover:bg-teal-500 text-white font-medium",
										disabled: adding,
										children: adding ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }), " Création..."] }) : "Ajouter"
									})]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Gestion des enseignants"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-sm mt-1",
					children: isLoading ? "Chargement..." : `${teacherList.length} enseignant(s) actif(s)`
				})] }), /* @__PURE__ */ jsxs(Button, {
					onClick: () => setShowAddForm(true),
					className: "gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Recruter un enseignant"]
				})]
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "pt-6 space-y-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), /* @__PURE__ */ jsxs("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-32" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })]
						})]
					}), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-48 mt-4" })]
				}) }, i))
			}) : teacherList.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				icon: /* @__PURE__ */ jsx(GraduationCap, { className: "h-8 w-8" }),
				title: "Aucun enseignant",
				description: "Aucun compte formateur n'est encore enregistré pour votre académie.",
				action: /* @__PURE__ */ jsxs(Button, {
					onClick: () => setShowAddForm(true),
					className: "gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Ajouter mon premier formateur"]
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: teacherList.map((enseignant) => {
					const name = enseignant.displayName || enseignant.email?.split("@")[0] || "Enseignant";
					return /* @__PURE__ */ jsx(Card, {
						className: "animate-fade-in hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "pt-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0",
											children: getInitials(name)
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ jsx("p", {
												className: "font-semibold truncate",
												children: name
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Formateur certifié"
											})]
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: "default",
											className: "shrink-0 bg-teal-500/10 text-teal-400 border-teal-500/20",
											children: "Actif"
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 flex items-center gap-4 text-sm text-muted-foreground border-t border-border/40 pt-3",
									children: /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5 truncate text-xs",
										children: [/* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: enseignant.email
										})]
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 flex gap-2",
									children: /* @__PURE__ */ jsx(Button, {
										variant: "outline",
										size: "sm",
										className: "flex-1 h-9 text-xs",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: `mailto:${enseignant.email}`,
											children: "Contacter par email"
										})
									})
								})
							]
						})
					}, enseignant.id);
				})
			})
		]
	});
}
//#endregion
export { EnseignantsPage as component };
