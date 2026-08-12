import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as useAcademiesList } from "./useStats-Cf7USm9u.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, CardContent, EmptyState, Input, Skeleton, toast } from "@blinkdotnew/ui";
import { Building, Mail, Search, ShieldAlert, UserCheck, UserX } from "lucide-react";
//#region src/routes/_app/academies.tsx?tsr-split=component
function AcademiesPage() {
	const { user: currentUser } = useAuth();
	const { data: academies, isLoading } = useAcademiesList();
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [updatingId, setUpdatingId] = useState(null);
	const filtered = (academies || []).filter((a) => {
		const name = a.academyName || "";
		const rep = a.displayName || "";
		const email = a.email || "";
		return name.toLowerCase().includes(search.toLowerCase()) || rep.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase());
	});
	const handleApprove = async (id, approve) => {
		if (!approve && !confirm("Êtes-vous sûr de vouloir suspendre cette académie ? L'accès sera bloqué mais les données seront conservées.")) return;
		setUpdatingId(id);
		try {
			const updatePayload = { approved: approve };
			if (approve) updatePayload.role = "teacher";
			const { error } = await supabase.from("profiles").update(updatePayload).eq("id", id);
			if (error) throw error;
			toast.success(approve ? "✅ L'académie a été approuvée et activée !" : "⏸️ L'académie a été suspendue. Ses données sont conservées.");
			queryClient.invalidateQueries({ queryKey: ["profiles", "academies"] });
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de la modification du statut : " + err.message);
		} finally {
			setUpdatingId(null);
		}
	};
	const handlePlanChange = async (id, plan) => {
		setUpdatingId(id);
		try {
			const { error } = await supabase.from("profiles").update({ academy_plan: plan }).eq("id", id);
			if (error) throw error;
			toast.success(`Plan d'abonnement mis à jour en : ${plan}`);
			queryClient.invalidateQueries({ queryKey: ["profiles"] });
		} catch (err) {
			console.error(err);
			toast.error("Erreur de modification de plan : " + err.message);
		} finally {
			setUpdatingId(null);
		}
	};
	if (currentUser?.role !== "admin") return /* @__PURE__ */ jsx("div", {
		className: "flex-1 flex items-center justify-center p-12 bg-background",
		children: /* @__PURE__ */ jsx(EmptyState, {
			icon: /* @__PURE__ */ jsx(ShieldAlert, { className: "h-10 w-10 text-destructive animate-pulse" }),
			title: "Accès Restreint",
			description: "Seuls les administrateurs généraux d'EduFlex ont accès à cette console de gestion B2B."
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 bg-background",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Console d'administration des Académies B2B"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-sm mt-1",
					children: isLoading ? "Chargement..." : `${filtered.length} demande(s) et académie(s) enregistrée(s)`
				})] })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Rechercher par nom d'académie, email...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-9"
					})]
				})
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "p-0",
				children: [/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-border text-left",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Académie / Couleur"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Responsable"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Plan"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Date inscription"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Validation / Actions"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: isLoading ? [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-border/50",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-16" })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-24" })
								})
							]
						}, i)) : filtered.map((academy) => {
							const statusBadge = academy.approved ? /* @__PURE__ */ jsx(Badge, {
								variant: "default",
								className: "bg-emerald-600 hover:bg-emerald-700 text-white border-none",
								children: "Actif & Approuvé"
							}) : /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								className: "border-amber-500 text-amber-500 bg-amber-500/10",
								children: "En Attente"
							});
							return /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3 text-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "h-3 w-3 rounded-full shrink-0",
												style: { backgroundColor: academy.academyColor || "#0d9488" },
												title: academy.academyColor || ""
											}), /* @__PURE__ */ jsx("span", {
												className: "font-semibold",
												children: academy.academyName || "Nom non spécifié"
											})]
										}), academy.academySlogan && /* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground block truncate max-w-xs",
											children: academy.academySlogan
										})]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3 text-sm",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-medium",
											children: academy.displayName || "Non renseigné"
										}), /* @__PURE__ */ jsxs("div", {
											className: "text-xs text-muted-foreground flex items-center gap-1",
											children: [
												/* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
												" ",
												academy.email
											]
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-sm",
										children: /* @__PURE__ */ jsxs("select", {
											value: academy.academyPlan,
											onChange: (e) => handlePlanChange(academy.id, e.target.value),
											disabled: updatingId === academy.id,
											className: "bg-background border border-input rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "Découverte",
													children: "Plan Découverte"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Pro",
													children: "Plan Pro"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Académie B2B",
													children: "Académie B2B (EduFlex+)"
												})
											]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-sm text-muted-foreground",
										children: new Date(academy.createdAt).toLocaleDateString("fr-FR")
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: statusBadge
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-sm",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [!academy.approved ? /* @__PURE__ */ jsxs(Button, {
												size: "xs",
												className: "bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1",
												onClick: () => handleApprove(academy.id, true),
												disabled: updatingId === academy.id,
												children: [/* @__PURE__ */ jsx(UserCheck, { className: "h-3.5 w-3.5" }), " Activer"]
											}) : /* @__PURE__ */ jsxs(Button, {
												size: "xs",
												variant: "outline",
												className: "border-destructive hover:bg-destructive/10 text-destructive flex items-center gap-1",
												onClick: () => handleApprove(academy.id, false),
												disabled: updatingId === academy.id,
												children: [/* @__PURE__ */ jsx(UserX, { className: "h-3.5 w-3.5" }), " Suspendre"]
											}), /* @__PURE__ */ jsx(Button, {
												variant: "ghost",
												size: "xs",
												className: "h-7 w-7 p-0",
												asChild: true,
												children: /* @__PURE__ */ jsx("a", {
													href: `mailto:${academy.email}`,
													children: /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" })
												})
											})]
										})
									})
								]
							}, academy.id);
						}) })]
					})
				}), !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx("div", {
					className: "py-12",
					children: /* @__PURE__ */ jsx(EmptyState, {
						icon: /* @__PURE__ */ jsx(Building, { className: "h-8 w-8" }),
						title: "Aucune demande",
						description: "Aucune demande de création d'académie n'a été soumise."
					})
				})]
			}) })
		]
	});
}
//#endregion
export { AcademiesPage as component };
