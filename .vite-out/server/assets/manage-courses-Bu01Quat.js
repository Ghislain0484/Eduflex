import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { i as useUserCourses, r as useManageCourses } from "./useCourses-1dzTx_dt.js";
import { r as useManageChapters, t as useChapters } from "./useChapters-B767Kw6p.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, EmptyState, Input, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@blinkdotnew/ui";
import { ArrowLeft, Award, BookOpen, CheckCircle, Clock, DollarSign, Edit2, ListPlus, Loader2, Percent, Plus, Settings, Trash2 } from "lucide-react";
//#region src/utils/planGuards.ts
/**
* SaaS Plan Validation Rules.
* Defines structural limits for Free (Découverte), Pro, and B2B (EduFlex+) subscription tiers.
*/
function canCreateMoreCourses(currentCount, plan) {
	if (!plan) return currentCount < 2;
	const activePlan = plan.toLowerCase();
	if (activePlan === "free" || activePlan === "découverte" || activePlan === "decouverte") return currentCount < 2;
	return true;
}
//#endregion
//#region src/routes/_app/manage-courses.tsx?tsr-split=component
var CATEGORIES = [
	"Marketing Digital",
	"Business & Entrepreneuriat",
	"Productivité & Organisation",
	"Développement Web",
	"Intelligence Artificielle",
	"Langues & Communication",
	"Finance & Comptabilité",
	"Design Graphique",
	"Religion & Spiritualité",
	"Santé & Bien-être",
	"Éducation & Formation",
	"Autre"
];
var LEVELS = [
	{
		value: "debutant",
		label: "Débutant"
	},
	{
		value: "intermediaire",
		label: "Intermédiaire"
	},
	{
		value: "avance",
		label: "Avancé"
	}
];
function ManageCoursesPage() {
	const { data: courses, isLoading } = useUserCourses();
	const { createCourse, updateCourse, deleteCourse } = useManageCourses();
	const { user } = useAuth();
	const [view, setView] = useState("list");
	const [selectedCourseId, setSelectedCourseId] = useState(null);
	const [activeTab, setActiveTab] = useState("courses");
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	useEffect(() => {
		if (typeof window !== "undefined") {
			const tabParam = new URLSearchParams(window.location.search).get("tab");
			if ([
				"certificates",
				"settings",
				"commissions",
				"payouts"
			].includes(tabParam || "")) setActiveTab(tabParam);
		}
	}, []);
	const [allReferrals, setAllReferrals] = useState([]);
	const [referralsLoading, setReferralsLoading] = useState(false);
	const [payoutRequests, setPayoutRequests] = useState([]);
	const [payoutsLoading, setPayoutsLoading] = useState(false);
	const [payoutDetails, setPayoutDetails] = useState("");
	const [requestAmount, setRequestAmount] = useState("");
	const [instructorSales, setInstructorSales] = useState([]);
	const [salesLoading, setSalesLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("Marketing");
	const [level, setLevel] = useState("debutant");
	const [price, setPrice] = useState("");
	const [durationHours, setDurationHours] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [status, setStatus] = useState("publie");
	const fetchAllReferrals = async () => {
		if (!user) return;
		setReferralsLoading(true);
		try {
			const { data, error } = await supabase.from("affiliate_referrals").select(`
          id,
          referrer_id,
          referred_email,
          course_id,
          commission_amount,
          status,
          created_at,
          courses (
            title,
            user_id
          ),
          profiles:referrer_id (
            display_name,
            email
          )
        `).order("created_at", { ascending: false });
			if (error) throw error;
			setAllReferrals((data || []).filter((ref) => {
				return ref.courses?.user_id === user.id || user.role === "admin";
			}));
		} catch (err) {
			console.error(err);
		} finally {
			setReferralsLoading(false);
		}
	};
	useEffect(() => {
		if (view === "list" && activeTab === "commissions") fetchAllReferrals();
	}, [
		view,
		activeTab,
		user
	]);
	const handleMarkAsPaid = async (referralId) => {
		try {
			const { error } = await supabase.from("affiliate_referrals").update({ status: "paye" }).eq("id", referralId);
			if (error) throw error;
			toast.success("Commission marquée comme payée !");
			fetchAllReferrals();
		} catch (err) {
			toast.error(err.message || "Erreur lors de la modification.");
		}
	};
	const fetchPayoutRequests = async () => {
		if (!user) return;
		setPayoutsLoading(true);
		try {
			let query = supabase.from("payout_requests").select(`
          id,
          amount,
          payment_details,
          status,
          created_at,
          profiles (
            display_name,
            email
          )
        `).order("created_at", { ascending: false });
			if (user.role !== "admin") query = query.eq("user_id", user.id);
			const { data, error } = await query;
			if (error) throw error;
			setPayoutRequests(data || []);
		} catch (err) {
			console.error(err);
		} finally {
			setPayoutsLoading(false);
		}
	};
	const fetchInstructorSales = async () => {
		if (!user) return;
		setSalesLoading(true);
		try {
			const { data, error } = await supabase.from("enrollments").select(`
          id,
          enrolled_at,
          course_id,
          courses (
            title,
            price,
            user_id
          ),
          profiles (
            display_name,
            email
          )
        `);
			if (error) throw error;
			setInstructorSales((data || []).filter((item) => {
				return item.courses?.user_id === user.id || user.role === "admin";
			}));
		} catch (err) {
			console.error(err);
		} finally {
			setSalesLoading(false);
		}
	};
	useEffect(() => {
		if (view === "list" && activeTab === "payouts") {
			fetchPayoutRequests();
			fetchInstructorSales();
		}
	}, [
		view,
		activeTab,
		user
	]);
	const handleRequestPayout = async (e, maxAvailable) => {
		e.preventDefault();
		if (!user || !payoutDetails.trim()) return;
		const parsedAmount = Math.round(parseFloat(requestAmount) * 100);
		if (isNaN(parsedAmount) || parsedAmount <= 0) {
			toast.error("Montant de retrait invalide.");
			return;
		}
		if (parsedAmount > maxAvailable) {
			toast.error("Le montant demandé dépasse votre solde disponible.");
			return;
		}
		try {
			const { error } = await supabase.from("payout_requests").insert([{
				user_id: user.id,
				amount: parsedAmount,
				payment_details: payoutDetails.trim(),
				status: "en_attente"
			}]);
			if (error) throw error;
			toast.success("Demande de reversement soumise !");
			setPayoutDetails("");
			setRequestAmount("");
			fetchPayoutRequests();
		} catch (err) {
			toast.error(err.message || "Erreur lors de la soumission.");
		}
	};
	const handleValidatePayout = async (payoutId) => {
		try {
			const { error } = await supabase.from("payout_requests").update({ status: "valide" }).eq("id", payoutId);
			if (error) throw error;
			toast.success("Reversement validé avec succès !");
			fetchPayoutRequests();
		} catch (err) {
			toast.error(err.message || "Erreur lors de la validation.");
		}
	};
	const openCreateForm = () => {
		if (!canCreateMoreCourses(courses?.length || 0, user?.academyPlan)) {
			toast.error("Offre Découverte limitée à 2 formations. Veuillez passer à l'abonnement Pro ou B2B pour créer des cours de manière illimitée !");
			return;
		}
		setTitle("");
		setDescription("");
		setCategory("Marketing");
		setLevel("debutant");
		setPrice("");
		setDurationHours("");
		setImageUrl("");
		setStatus("publie");
		setView("create");
	};
	const openEditForm = (course) => {
		setSelectedCourseId(course.id);
		setTitle(course.title || "");
		setDescription(course.description || "");
		setCategory(course.category || "Marketing Digital");
		setLevel(course.level || "debutant");
		setPrice(String(course.price || 0));
		setDurationHours(String(course.durationHours || 0));
		setImageUrl(course.imageUrl || "");
		setStatus(course.status || "publie");
		setView("edit");
	};
	const openChaptersManager = (courseId) => {
		setSelectedCourseId(courseId);
		setView("chapters");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const parsedPrice = parseInt(price) || 0;
		if (parsedPrice < 0) {
			toast.error("Prix invalide. Veuillez entrer un prix en FCFA.");
			return;
		}
		const payload = {
			title,
			description: description || null,
			category,
			level,
			price: parsedPrice,
			durationHours: parseInt(durationHours) || 0,
			imageUrl: imageUrl || null,
			status
		};
		if (view === "create") {
			if (!canCreateMoreCourses(courses?.length || 0, user?.academyPlan)) {
				toast.error("Limite de création de formations atteinte sur le Plan Découverte.");
				return;
			}
			createCourse.mutate(payload, {
				onSuccess: () => {
					toast.success("Formation créée avec succès !");
					setView("list");
				},
				onError: (err) => {
					toast.error(err.message || "Erreur lors de la création.");
				}
			});
		} else if (view === "edit" && selectedCourseId != null) updateCourse.mutate({
			...payload,
			id: selectedCourseId
		}, {
			onSuccess: () => {
				toast.success("Formation mise à jour !");
				setView("list");
			},
			onError: (err) => {
				toast.error(err.message || "Erreur lors de la mise à jour.");
			}
		});
	};
	const handleDelete = (id) => {
		if (confirm("Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible.")) deleteCourse.mutate(id, {
			onSuccess: () => {
				toast.success("Formation supprimée.");
			},
			onError: (err) => {
				toast.error("Erreur lors de la suppression de la formation : " + err.message);
			}
		});
	};
	if (view === "chapters" && selectedCourseId != null) {
		const activeCourse = courses?.find((c) => c.id === selectedCourseId);
		return /* @__PURE__ */ jsx(ChaptersManagerSection, {
			course: activeCourse,
			onBack: () => setView("list")
		});
	}
	return /* @__PURE__ */ jsx("div", {
		className: "flex-1 space-y-6 p-6",
		children: view === "list" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Gestion Formateur"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "Gérez vos cours, planifiez vos modules et validez les commissions d'affiliation."
			})] }), activeTab === "courses" && /* @__PURE__ */ jsxs(Button, {
				onClick: openCreateForm,
				className: "gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold h-10 border-none shadow-md",
				children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Nouvelle formation"]
			})]
		}), /* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onValueChange: (v) => setActiveTab(v),
			children: [
				/* @__PURE__ */ jsxs(TabsList, { children: [
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "courses",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }), " Gérer les formations"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "certificates",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Award, { className: "h-4 w-4" }), " Certificat de réussite"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "settings",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), " Paramètres"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "commissions",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Percent, { className: "h-4 w-4" }), " Affiliation & Commissions"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "payouts",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }), " Gains & Reversements"]
					})
				] }),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "courses",
					className: "space-y-6 mt-6",
					children: isLoading ? /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsxs("div", {
							className: "border border-border rounded-xl overflow-hidden",
							children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" }), /* @__PURE__ */ jsxs("div", {
								className: "p-5 space-y-3",
								children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })]
							})]
						}, i))
					}) : !courses || courses.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
						icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8" }),
						title: "Aucune formation",
						description: "Vous n'avez pas encore créé de formation. Cliquez sur le bouton ci-dessus pour commencer.",
						action: /* @__PURE__ */ jsxs(Button, {
							onClick: openCreateForm,
							className: "gap-2",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Créer ma première formation"]
						})
					}) : /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: openCreateForm,
							className: "h-full min-h-[250px] border-2 border-dashed border-border/80 rounded-xl hover:border-teal-500/50 hover:bg-teal-500/5 transition-all flex flex-col items-center justify-center gap-3 p-6 text-center group bg-card",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors",
								children: /* @__PURE__ */ jsx(Plus, { className: "h-6 w-6 text-muted-foreground group-hover:text-teal-400" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-sm text-foreground",
								children: "Ajouter une formation"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto",
								children: "Créez un nouveau cours et ajoutez vos chapitres et supports."
							})] })]
						}), courses.map((course) => /* @__PURE__ */ jsxs(Card, {
							className: "overflow-hidden border border-border/80",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "h-40 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden",
								children: [course.imageUrl ? /* @__PURE__ */ jsx("img", {
									src: course.imageUrl,
									alt: course.title,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ jsx("div", {
									className: "flex items-center justify-center h-full text-muted-foreground/30",
									children: /* @__PURE__ */ jsx(BookOpen, { className: "h-10 w-10" })
								}), /* @__PURE__ */ jsx("div", {
									className: "absolute top-3 right-3 flex gap-1.5",
									children: /* @__PURE__ */ jsx(Badge, {
										variant: course.status === "publie" ? "default" : "secondary",
										children: course.status === "publie" ? "Publié" : "Brouillon"
									})
								})]
							}), /* @__PURE__ */ jsxs(CardContent, {
								className: "p-5 space-y-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "font-semibold text-base truncate",
									children: course.title
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: [
										(course.price || 0).toLocaleString("fr-FR"),
										" FCFA ·",
										" ",
										course.durationHours,
										"h"
									]
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pt-2 border-t border-border",
									children: [
										/* @__PURE__ */ jsxs(Button, {
											onClick: () => openEditForm(course),
											variant: "outline",
											size: "sm",
											className: "flex-1 gap-1.5",
											children: [/* @__PURE__ */ jsx(Edit2, { className: "h-3.5 w-3.5" }), " Modifier"]
										}),
										/* @__PURE__ */ jsxs(Button, {
											onClick: () => openChaptersManager(course.id),
											variant: "outline",
											size: "sm",
											className: "flex-1 gap-1.5",
											children: [/* @__PURE__ */ jsx(ListPlus, { className: "h-3.5 w-3.5" }), " Chapitres"]
										}),
										/* @__PURE__ */ jsx(Button, {
											onClick: () => handleDelete(course.id),
											variant: "ghost",
											size: "sm",
											className: "text-destructive hover:bg-destructive/10 h-8 w-8 p-0",
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								})]
							})]
						}, course.id))]
					})
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "commissions",
					className: "space-y-6 mt-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Card, {
							className: "bg-amber-500/5 border-amber-500/20",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-medium text-amber-800 dark:text-amber-400",
										children: "Commissions en attente de paiement"
									}), /* @__PURE__ */ jsx(Clock, { className: "h-4.5 w-4.5 text-amber-600" })]
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-2xl font-bold text-amber-900 dark:text-amber-300 mt-2.5",
									children: [(allReferrals.filter((r) => r.status === "en_attente").reduce((sum, r) => sum + (r.commission_amount || 0), 0) / 100).toLocaleString("fr-FR"), " €"]
								})]
							})
						}), /* @__PURE__ */ jsx(Card, {
							className: "bg-emerald-500/5 border-emerald-500/20",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-medium text-emerald-800 dark:text-emerald-400",
										children: "Commissions payées"
									}), /* @__PURE__ */ jsx(CheckCircle, { className: "h-4.5 w-4.5 text-emerald-600" })]
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-2xl font-bold text-emerald-900 dark:text-emerald-300 mt-2.5",
									children: [(allReferrals.filter((r) => r.status === "paye").reduce((sum, r) => sum + (r.commission_amount || 0), 0) / 100).toLocaleString("fr-FR"), " €"]
								})]
							})
						})]
					}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
						className: "text-base font-semibold",
						children: "Historique des ventes par parrainage"
					}) }), /* @__PURE__ */ jsx(CardContent, { children: referralsLoading ? /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })]
					}) : allReferrals.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground italic text-center py-6",
						children: "Aucune vente par affiliation n'a encore été enregistrée pour vos cours."
					}) : /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full border-collapse text-left text-xs",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-border/60 text-muted-foreground uppercase font-semibold text-[10px]",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Date"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Formation"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Parrain (Referrer)"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Filleul"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Commission (15%)"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Statut"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Action"
									})
								]
							}) }), /* @__PURE__ */ jsx("tbody", { children: allReferrals.map((ref) => {
								const date = new Date(ref.created_at).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "short",
									year: "numeric"
								});
								const amountEur = (ref.commission_amount || 0) / 100;
								const amountXof = Math.round(amountEur * 655.957);
								const parrainName = ref.profiles?.display_name || ref.profiles?.email?.split("@")[0] || "Inconnu";
								return /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-border/30 hover:bg-muted/10 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 text-muted-foreground",
											children: date
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 font-medium text-foreground truncate max-w-xs",
											children: ref.courses?.title
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "py-3.5 px-4",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-medium text-foreground",
												children: parrainName
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[10px] text-muted-foreground block",
												children: ref.profiles?.email
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 text-muted-foreground",
											children: ref.referred_email
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "py-3.5 px-4 font-semibold text-primary",
											children: [
												amountEur.toLocaleString("fr-FR"),
												" €",
												/* @__PURE__ */ jsxs("span", {
													className: "text-[10px] text-muted-foreground block",
													children: [
														"~ ",
														amountXof.toLocaleString("fr-FR"),
														" FCFA"
													]
												})
											]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ jsx(Badge, {
												variant: ref.status === "paye" ? "default" : "secondary",
												children: ref.status === "paye" ? "Payé" : "En attente"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4",
											children: ref.status === "en_attente" && /* @__PURE__ */ jsx(Button, {
												size: "sm",
												variant: "outline",
												className: "h-8 text-[10px]",
												onClick: () => handleMarkAsPaid(ref.id),
												children: "Valider le paiement"
											})
										})
									]
								}, ref.id);
							}) })]
						})
					}) })] })]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "payouts",
					className: "space-y-6 mt-6",
					children: (() => {
						const totalGrossSalesEur = instructorSales.reduce((sum, item) => sum + (item.courses?.price || 0), 0) / 100;
						const platformFeesEur = totalGrossSalesEur * .1;
						const affiliatePayoutsEur = allReferrals.reduce((sum, ref) => sum + (ref.commission_amount || 0), 0) / 100;
						const netInstructorEarningsEur = totalGrossSalesEur - platformFeesEur - affiliatePayoutsEur;
						const processedPayoutsEur = payoutRequests.filter((r) => r.status === "valide").reduce((sum, r) => sum + (r.amount || 0), 0) / 100;
						const availableSoldeEur = Math.max(0, netInstructorEarningsEur - processedPayoutsEur);
						const availableSoldeXof = Math.round(availableSoldeEur * 655.957);
						return /* @__PURE__ */ jsxs("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 md:grid-cols-4",
								children: [
									/* @__PURE__ */ jsx(Card, {
										className: "border-border/80",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "pt-6",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground font-medium",
													children: "Ventes brutes (100%)"
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-xl font-bold mt-1",
													children: [totalGrossSalesEur.toLocaleString("fr-FR"), " €"]
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-[10px] text-muted-foreground font-semibold",
													children: [
														"~ ",
														Math.round(totalGrossSalesEur * 655.957).toLocaleString("fr-FR"),
														" F CFA"
													]
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(Card, {
										className: "border-border/80 bg-red-500/5",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "pt-6",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-xs text-red-800 dark:text-red-400 font-medium",
													children: "Frais EduFlex (10%)"
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-xl font-bold mt-1 text-red-900 dark:text-red-300",
													children: [platformFeesEur.toLocaleString("fr-FR"), " €"]
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-[10px] text-muted-foreground font-semibold",
													children: [
														"~ ",
														Math.round(platformFeesEur * 655.957).toLocaleString("fr-FR"),
														" F CFA"
													]
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(Card, {
										className: "border-border/80 bg-blue-500/5",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "pt-6",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-xs text-blue-800 dark:text-blue-400 font-medium",
													children: "Retirés / Reversés"
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-xl font-bold mt-1 text-blue-900 dark:text-blue-300",
													children: [processedPayoutsEur.toLocaleString("fr-FR"), " €"]
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-[10px] text-muted-foreground font-semibold",
													children: [
														"~ ",
														Math.round(processedPayoutsEur * 655.957).toLocaleString("fr-FR"),
														" F CFA"
													]
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(Card, {
										className: "border-emerald-500/30 bg-emerald-500/5",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "pt-6",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-xs text-emerald-800 dark:text-emerald-400 font-medium",
													children: "Solde disponible (Net)"
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-xl font-bold mt-1 text-emerald-900 dark:text-emerald-300",
													children: [availableSoldeEur.toLocaleString("fr-FR"), " €"]
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "text-[10px] text-emerald-700 dark:text-emerald-500 font-medium",
													children: [
														"~ ",
														availableSoldeXof.toLocaleString("fr-FR"),
														" F CFA"
													]
												})
											]
										})
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-3",
								children: [user?.role !== "admin" && /* @__PURE__ */ jsxs(Card, {
									className: "md:col-span-1 border-border/80",
									children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
										className: "text-sm font-bold",
										children: "Demander un reversement"
									}) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
										onSubmit: (e) => handleRequestPayout(e, availableSoldeEur * 100),
										className: "space-y-4",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ jsx("label", {
													className: "text-xs font-semibold",
													children: "Montant (€)"
												}), /* @__PURE__ */ jsx(Input, {
													type: "number",
													step: "0.01",
													placeholder: "Ex: 50.00",
													required: true,
													value: requestAmount,
													onChange: (e) => setRequestAmount(e.target.value),
													className: "h-9 text-xs"
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ jsx("label", {
													className: "text-xs font-semibold",
													children: "Coordonnées de paiement (Mobile Money / RIB)"
												}), /* @__PURE__ */ jsx(Input, {
													placeholder: "Ex: Orange Money CI +225XXXXXXXXX",
													required: true,
													value: payoutDetails,
													onChange: (e) => setPayoutDetails(e.target.value),
													className: "h-9 text-xs"
												})]
											}),
											/* @__PURE__ */ jsx(Button, {
												type: "submit",
												size: "sm",
												className: "w-full text-xs",
												disabled: availableSoldeEur <= 0,
												children: "Envoyer la demande"
											})
										]
									}) })]
								}), /* @__PURE__ */ jsxs(Card, {
									className: user?.role === "admin" ? "md:col-span-3 border-border/80" : "md:col-span-2 border-border/80",
									children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
										className: "text-sm font-bold",
										children: user?.role === "admin" ? "Toutes les demandes de reversement" : "Mes demandes de reversement"
									}) }), /* @__PURE__ */ jsx(CardContent, { children: payoutsLoading ? /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })]
									}) : payoutRequests.length === 0 ? /* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground italic text-center py-6",
										children: "Aucune demande de reversement enregistrée."
									}) : /* @__PURE__ */ jsx("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ jsxs("table", {
											className: "w-full text-left text-xs border-collapse",
											children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-border/60 text-muted-foreground uppercase font-semibold text-[10px]",
												children: [
													/* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3",
														children: "Date"
													}),
													user?.role === "admin" && /* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3",
														children: "Formateur"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3",
														children: "Montant"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3",
														children: "Coordonnées"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3",
														children: "Statut"
													}),
													user?.role === "admin" && /* @__PURE__ */ jsx("th", {
														className: "py-2.5 px-3 text-right",
														children: "Action"
													})
												]
											}) }), /* @__PURE__ */ jsx("tbody", { children: payoutRequests.map((req) => {
												const date = new Date(req.created_at).toLocaleDateString("fr-FR", {
													day: "numeric",
													month: "short",
													year: "numeric"
												});
												const amountEur = (req.amount || 0) / 100;
												const name = req.profiles?.display_name || req.profiles?.email?.split("@")[0] || "Formateur";
												return /* @__PURE__ */ jsxs("tr", {
													className: "border-b border-border/30 hover:bg-muted/10 transition-colors",
													children: [
														/* @__PURE__ */ jsx("td", {
															className: "py-3 px-3 text-muted-foreground",
															children: date
														}),
														user?.role === "admin" && /* @__PURE__ */ jsxs("td", {
															className: "py-3 px-3",
															children: [/* @__PURE__ */ jsx("span", {
																className: "font-semibold",
																children: name
															}), /* @__PURE__ */ jsx("span", {
																className: "text-[10px] text-muted-foreground block",
																children: req.profiles?.email
															})]
														}),
														/* @__PURE__ */ jsxs("td", {
															className: "py-3 px-3 font-semibold text-primary",
															children: [amountEur.toLocaleString("fr-FR"), " €"]
														}),
														/* @__PURE__ */ jsx("td", {
															className: "py-3 px-3 text-muted-foreground max-w-xs truncate",
															children: req.payment_details
														}),
														/* @__PURE__ */ jsx("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ jsx(Badge, {
																variant: req.status === "valide" ? "default" : req.status === "rejete" ? "destructive" : "secondary",
																children: req.status === "valide" ? "Validé" : req.status === "rejete" ? "Rejeté" : "En attente"
															})
														}),
														user?.role === "admin" && /* @__PURE__ */ jsx("td", {
															className: "py-3 px-3 text-right",
															children: req.status === "en_attente" && /* @__PURE__ */ jsx(Button, {
																size: "sm",
																variant: "outline",
																className: "h-8 text-[10px]",
																onClick: () => handleValidatePayout(req.id),
																children: "Valider le reversement"
															})
														})
													]
												}, req.id);
											}) })]
										})
									}) })]
								})]
							})]
						});
					})()
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "certificates",
					className: "space-y-6 mt-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start text-left",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-4 space-y-3",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-bold text-slate-900 dark:text-white",
									children: "Choisissez le modèle du certificat de réussite"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: "Le certificat de réussite est un document que vos apprenants peuvent générer eux-mêmes, uniquement lorsqu'ils ont terminé toutes les leçons d'une formation."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-slate-400 italic",
									children: "Ce document est nominatif et est par conséquent à valeur légale."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "pt-6 space-y-2 border-t border-slate-200 dark:border-slate-800",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Désactivez les certificats de réussite"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-slate-500 leading-relaxed",
											children: "Vous ne souhaitez pas délivrer de certificats de réussite à vos apprenants ? Vous êtes au bon endroit !"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 pt-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "checkbox",
												id: "disableCert",
												className: "h-4 w-4 rounded accent-teal-600 cursor-pointer"
											}), /* @__PURE__ */ jsx("label", {
												htmlFor: "disableCert",
												className: "text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer",
												children: "Désactiver les certificats"
											})]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-8 space-y-4",
							children: [/* @__PURE__ */ jsxs(Card, {
								className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-lg relative text-left",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-4",
										children: /* @__PURE__ */ jsxs("p", {
											className: "text-xs font-semibold text-slate-500",
											children: [
												"Délivré par ",
												/* @__PURE__ */ jsx("strong", {
													className: "text-slate-900 dark:text-white",
													children: "{{nom de votre espace}}"
												}),
												" le ",
												/* @__PURE__ */ jsx("strong", {
													className: "text-slate-900 dark:text-white",
													children: "{{date du certificat}}"
												}),
												"."
											]
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "py-12 text-center space-y-4",
										children: [
											/* @__PURE__ */ jsx("h2", {
												className: "text-2xl font-black tracking-widest text-slate-900 dark:text-white",
												children: "CERTIFICAT DE RÉUSSITE"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-lg font-bold text-teal-600 dark:text-teal-400",
													children: "{{nom de l'apprenant}}"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-[11px] text-slate-400",
													children: "{{date de naissance}}"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-slate-500",
												children: "À obtenu le certificat :"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-base font-bold text-slate-900 dark:text-white",
												children: "{{nom de la formation}}"
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-end pt-4 border-t border-slate-100 dark:border-slate-800/80",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-[10px] text-slate-400",
											children: ["Formation effectuée sur ", /* @__PURE__ */ jsx("strong", {
												className: "text-teal-500",
												children: "eduflex"
											})]
										}), /* @__PURE__ */ jsx("div", {
											className: "w-20 h-14 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase",
											children: "VOTRE LOGO"
										})]
									})
								]
							}), isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "settings",
					className: "space-y-6 mt-6 text-left",
					children: [/* @__PURE__ */ jsx(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-base font-bold text-slate-900 dark:text-white",
									children: "Désactivez les commentaires"
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: [
										"Désactivez les commentaires pour toutes vos formations. ",
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("strong", {
											className: "text-slate-700 dark:text-slate-300",
											children: "Attention : vous pouvez également gérer les commentaires formation par formation."
										})
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									id: "disableAllComments",
									className: "h-5 w-5 rounded accent-teal-600 cursor-pointer"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "disableAllComments",
									className: "text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer",
									children: "Désactiver pour toutes les formations"
								})]
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3 pt-4",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-base font-bold text-slate-900 dark:text-white",
								children: "Logs et temps de connexion"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 leading-relaxed max-w-4xl",
								children: [
									"Configurez la façon dont les logs de connexion (aussi appelés temps de connexion) doivent être gérés. ",
									/* @__PURE__ */ jsx("br", {}),
									"Teachizy enregistre ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-slate-900 dark:text-white",
										children: "le temps passé sur chaque leçon et non le temps passé sur la plateforme"
									}),
									" en général. Par exemple, le temps passé par un apprenant sur son tableau de bord n'est pas pris en compte dans ses logs de connexion."
								]
							}),
							isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
						]
					})]
				})
			]
		})] }) : /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl mx-auto space-y-6",
			children: [/* @__PURE__ */ jsxs("button", {
				onClick: () => setView("list"),
				className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Retour à la liste"]
			}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: view === "create" ? "Créer une formation" : "Modifier la formation" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Titre de la formation *"
						}), /* @__PURE__ */ jsx(Input, {
							required: true,
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Ex: Apprendre React en 2026"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Description"
						}), /* @__PURE__ */ jsx("textarea", {
							rows: 4,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							className: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							placeholder: "Présentez le programme de votre formation..."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Catégorie"
							}), /* @__PURE__ */ jsx("select", {
								value: category,
								onChange: (e) => setCategory(e.target.value),
								className: "w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500",
								children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx("option", {
									value: cat,
									className: "bg-slate-800 text-slate-100",
									children: cat
								}, cat))
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Niveau"
							}), /* @__PURE__ */ jsx("select", {
								value: level,
								onChange: (e) => setLevel(e.target.value),
								className: "w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500",
								children: LEVELS.map((lvl) => /* @__PURE__ */ jsx("option", {
									value: lvl.value,
									className: "bg-slate-800 text-slate-100",
									children: lvl.label
								}, lvl.value))
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("label", {
									className: "text-sm font-semibold text-foreground",
									children: "Prix (FCFA) *"
								}),
								/* @__PURE__ */ jsx(Input, {
									required: true,
									type: "number",
									step: "100",
									min: "0",
									value: price,
									onChange: (e) => setPrice(e.target.value),
									placeholder: "Ex: 15000",
									className: "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-[9px] text-muted-foreground",
									children: "Valeur en FCFA. Ex: 15000 = 15 000 FCFA."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-semibold text-foreground",
								children: "Durée totale (heures)"
							}), /* @__PURE__ */ jsx(Input, {
								type: "number",
								min: "0",
								value: durationHours,
								onChange: (e) => setDurationHours(e.target.value),
								placeholder: "Ex: 12",
								className: "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "text-sm font-semibold text-foreground",
								children: "URL de l'image de couverture"
							}),
							/* @__PURE__ */ jsx(Input, {
								type: "url",
								value: imageUrl,
								onChange: (e) => setImageUrl(e.target.value),
								placeholder: "https://images.unsplash.com/...",
								className: "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-[9px] text-muted-foreground",
								children: "Laissez vide pour utiliser un visuel générique."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-semibold text-foreground",
							children: "Statut de publication"
						}), /* @__PURE__ */ jsxs("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							className: "w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500",
							children: [/* @__PURE__ */ jsx("option", {
								value: "publie",
								className: "bg-slate-800",
								children: "✅ Publiée — Visible sur le catalogue public"
							}), /* @__PURE__ */ jsx("option", {
								value: "brouillon",
								className: "bg-slate-800",
								children: "📝 Brouillon — Masquée (modifications en cours)"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-3 pt-4 border-t border-border/40",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: createCourse.isPending || updateCourse.isPending,
							className: "flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 border-none shadow-md text-sm",
							children: createCourse.isPending || updateCourse.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), " Enregistrement en cours..."] }) : view === "create" ? "✅ Créer la formation" : "💾 Mettre à jour la formation"
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							className: "h-11 px-6 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
							onClick: () => setView("list"),
							children: "Annuler"
						})]
					})
				]
			}) })] })]
		})
	});
}
function ChaptersManagerSection({ course, onBack }) {
	const { data: chapters, isLoading } = useChapters(course?.id);
	const { createChapter, updateChapter, deleteChapter } = useManageChapters(course?.id);
	const [formOpen, setFormOpen] = useState(false);
	const [editingChapterId, setEditingChapterId] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [sortOrder, setSortOrder] = useState("0");
	const [isQuiz, setIsQuiz] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [tempQuestion, setTempQuestion] = useState("");
	const [tempOpt1, setTempOpt1] = useState("");
	const [tempOpt2, setTempOpt2] = useState("");
	const [tempOpt3, setTempOpt3] = useState("");
	const [tempOpt4, setTempOpt4] = useState("");
	const [tempCorrectIdx, setTempCorrectIdx] = useState("0");
	const [chapterType, setChapterType] = useState("standard");
	const [scheduledAt, setScheduledAt] = useState("");
	const [liveUrl, setLiveUrl] = useState("");
	const openAddForm = () => {
		setEditingChapterId(null);
		setTitle("");
		setContent("");
		setVideoUrl("");
		setSortOrder(String((chapters?.length || 0) + 1));
		setIsQuiz(false);
		setQuestions([]);
		setChapterType("standard");
		setScheduledAt("");
		setLiveUrl("");
		setFormOpen(true);
	};
	const openEditForm = (chapter) => {
		setEditingChapterId(chapter.id);
		setTitle(chapter.title || "");
		setContent(chapter.content || "");
		setVideoUrl(chapter.videoUrl || "");
		setSortOrder(String(chapter.sortOrder || 0));
		const hasQuiz = Array.isArray(chapter.quizData) && chapter.quizData.length > 0;
		setIsQuiz(hasQuiz);
		setQuestions(hasQuiz ? chapter.quizData : []);
		setChapterType(chapter.chapterType || (hasQuiz ? "quiz" : "standard"));
		setScheduledAt(chapter.scheduledAt ? chapter.scheduledAt.substring(0, 16) : "");
		setLiveUrl(chapter.liveUrl || "");
		setFormOpen(true);
	};
	const addQuestion = () => {
		if (!tempQuestion.trim() || !tempOpt1.trim() || !tempOpt2.trim() || !tempOpt3.trim() || !tempOpt4.trim()) {
			toast.error("Veuillez renseigner la question et ses 4 options.");
			return;
		}
		const newQ = {
			question: tempQuestion.trim(),
			options: [
				tempOpt1.trim(),
				tempOpt2.trim(),
				tempOpt3.trim(),
				tempOpt4.trim()
			],
			correctOptionIndex: parseInt(tempCorrectIdx)
		};
		setQuestions([...questions, newQ]);
		setTempQuestion("");
		setTempOpt1("");
		setTempOpt2("");
		setTempOpt3("");
		setTempOpt4("");
		setTempCorrectIdx("0");
	};
	const removeQuestion = (index) => {
		setQuestions(questions.filter((_, i) => i !== index));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (chapterType === "quiz" && questions.length === 0) {
			toast.error("Un chapitre de type Quiz doit contenir au moins une question.");
			return;
		}
		if (chapterType === "live" && !scheduledAt) {
			toast.error("Une date et heure planifiée est obligatoire pour une classe en direct.");
			return;
		}
		const payload = {
			courseId: course.id,
			title,
			content: chapterType === "quiz" ? null : content || null,
			videoUrl: chapterType === "standard" || chapterType === "live" ? videoUrl || null : null,
			sortOrder: parseInt(sortOrder) || 0,
			quizData: chapterType === "quiz" ? questions : null,
			chapterType,
			scheduledAt: chapterType === "live" ? scheduledAt ? new Date(scheduledAt).toISOString() : null : null,
			liveUrl: chapterType === "live" ? liveUrl || null : null
		};
		if (editingChapterId == null) createChapter.mutate(payload, {
			onSuccess: () => {
				toast.success("Chapitre ajouté avec succès !");
				setFormOpen(false);
				setTitle("");
				setContent("");
				setVideoUrl("");
				setQuestions([]);
				setChapterType("standard");
				setScheduledAt("");
				setLiveUrl("");
			},
			onError: (err) => {
				toast.error("Erreur lors de la création du chapitre : " + err.message);
			}
		});
		else updateChapter.mutate({
			...payload,
			id: editingChapterId
		}, {
			onSuccess: () => {
				toast.success("Chapitre mis à jour !");
				setFormOpen(false);
			},
			onError: (err) => {
				toast.error("Erreur lors de la mise à jour : " + err.message);
			}
		});
	};
	const handleDelete = (id) => {
		if (confirm("Voulez-vous supprimer ce chapitre ?")) deleteChapter.mutate(id, {
			onSuccess: () => {
				toast.success("Chapitre supprimé.");
			},
			onError: (err) => {
				toast.error("Erreur lors de la suppression du chapitre : " + err.message);
			}
		});
	};
	const handleSwapOrder = async (idx1, idx2) => {
		if (!chapters || !chapters[idx1] || !chapters[idx2]) return;
		const ch1 = chapters[idx1];
		const ch2 = chapters[idx2];
		const originalSort1 = ch1.sortOrder || 0;
		const originalSort2 = ch2.sortOrder || 0;
		try {
			await Promise.all([updateChapter.mutateAsync({
				id: ch1.id,
				sortOrder: originalSort2
			}), updateChapter.mutateAsync({
				id: ch2.id,
				sortOrder: originalSort1
			})]);
			toast.success("Ordre des chapitres mis à jour !");
		} catch (err) {
			toast.error("Erreur de réorganisation : " + err.message);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ jsxs("button", {
				onClick: onBack,
				className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Retour aux formations"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-bold tracking-tight",
					children: course?.title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-0.5",
					children: "Constructeur de programme et chapitres de cours."
				})] }), !formOpen && /* @__PURE__ */ jsxs(Button, {
					onClick: openAddForm,
					size: "sm",
					className: "gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold border-none shadow-md",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Ajouter un chapitre"]
				})]
			}),
			formOpen ? /* @__PURE__ */ jsxs(Card, {
				className: "animate-fade-in",
				children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: editingChapterId == null ? "Nouveau Chapitre" : "Modifier le Chapitre" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Titre du chapitre *"
							}), /* @__PURE__ */ jsx(Input, {
								required: true,
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "Ex: 1. Présentation générale"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Format du chapitre"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-3",
								children: [
									{
										type: "standard",
										label: "📖 Standard (Vidéo / Texte)",
										desc: "Contenu pédagogique classique."
									},
									{
										type: "quiz",
										label: "❓ Quiz interactif",
										desc: "Évaluation des connaissances."
									},
									{
										type: "live",
										label: "🔴 Classe en Direct (Live)",
										desc: "Visioconférence Jitsi intégrée."
									}
								].map((opt) => {
									return /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											setChapterType(opt.type);
											setIsQuiz(opt.type === "quiz");
										},
										className: `p-3.5 rounded-xl border text-left transition-all ${chapterType === opt.type ? "border-primary bg-primary/5 text-primary font-medium" : "border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ jsx("span", {
											className: "block text-xs font-bold text-foreground",
											children: opt.label
										}), /* @__PURE__ */ jsx("span", {
											className: "block text-[10px] text-muted-foreground mt-0.5",
											children: opt.desc
										})]
									}, opt.type);
								})
							})]
						}),
						chapterType === "standard" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "URL de la vidéo (MP4, YouTube, Vimeo)"
							}), /* @__PURE__ */ jsx(Input, {
								type: "url",
								value: videoUrl,
								onChange: (e) => setVideoUrl(e.target.value),
								placeholder: "https://www.w3schools.com/html/mov_bbb.mp4"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Contenu textuel (Texte / Markdown)"
							}), /* @__PURE__ */ jsx("textarea", {
								rows: 6,
								value: content,
								onChange: (e) => setContent(e.target.value),
								className: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								placeholder: "Rédigez le texte du cours ici..."
							})]
						})] }),
						chapterType === "live" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Date & Heure de début planifiée *"
								}), /* @__PURE__ */ jsx(Input, {
									type: "datetime-local",
									required: true,
									value: scheduledAt,
									onChange: (e) => setScheduledAt(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Lien externe alternatif (Optionnel)"
								}), /* @__PURE__ */ jsx(Input, {
									type: "url",
									value: liveUrl,
									onChange: (e) => setLiveUrl(e.target.value),
									placeholder: "https://zoom.us/j/... (Si vide, Jitsi est intégré par défaut)"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Lien de la Rediffusion / Replay (Optionnel)"
								}), /* @__PURE__ */ jsx(Input, {
									type: "url",
									value: videoUrl,
									onChange: (e) => setVideoUrl(e.target.value),
									placeholder: "URL de la vidéo enregistrée (YouTube, Vimeo, ou .mp4) à afficher une fois le direct terminé"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Notes & Objectifs de la session"
								}), /* @__PURE__ */ jsx("textarea", {
									rows: 4,
									value: content,
									onChange: (e) => setContent(e.target.value),
									className: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									placeholder: "Ex: Dans cette session en direct, nous aborderons..."
								})]
							})
						] }),
						chapterType === "quiz" && /* @__PURE__ */ jsxs("div", {
							className: "border border-border/80 rounded-xl p-4 bg-muted/20 space-y-4",
							children: [
								/* @__PURE__ */ jsxs("h4", {
									className: "font-semibold text-sm",
									children: [
										"Gestion des questions du Quiz (",
										questions.length,
										" question(s))"
									]
								}),
								questions.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "space-y-2.5",
									children: questions.map((q, i) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between p-3 rounded-lg border border-border bg-card text-xs",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "font-semibold",
												children: [
													i + 1,
													". ",
													q.question
												]
											}), /* @__PURE__ */ jsx("div", {
												className: "grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground mt-1",
												children: q.options.map((opt, idx) => /* @__PURE__ */ jsxs("span", {
													className: idx === q.correctOptionIndex ? "text-emerald-600 font-medium" : "",
													children: [
														"• ",
														opt,
														" ",
														idx === q.correctOptionIndex ? "(Correct)" : ""
													]
												}, idx))
											})]
										}), /* @__PURE__ */ jsx(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											className: "text-destructive h-7 px-2 hover:bg-destructive/10 shrink-0",
											onClick: () => removeQuestion(i),
											children: "Supprimer"
										})]
									}, i))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "border-t border-border/50 pt-4 space-y-3",
									children: [/* @__PURE__ */ jsx("h5", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "Ajouter une question"
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Input, {
												placeholder: "Intitulé de la question (ex: Quel outil est utilisé pour...)",
												value: tempQuestion,
												onChange: (e) => setTempQuestion(e.target.value),
												className: "text-xs"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-2 gap-2",
												children: [
													/* @__PURE__ */ jsx(Input, {
														placeholder: "Option 1",
														value: tempOpt1,
														onChange: (e) => setTempOpt1(e.target.value),
														className: "text-xs"
													}),
													/* @__PURE__ */ jsx(Input, {
														placeholder: "Option 2",
														value: tempOpt2,
														onChange: (e) => setTempOpt2(e.target.value),
														className: "text-xs"
													}),
													/* @__PURE__ */ jsx(Input, {
														placeholder: "Option 3",
														value: tempOpt3,
														onChange: (e) => setTempOpt3(e.target.value),
														className: "text-xs"
													}),
													/* @__PURE__ */ jsx(Input, {
														placeholder: "Option 4",
														value: tempOpt4,
														onChange: (e) => setTempOpt4(e.target.value),
														className: "text-xs"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("label", {
														className: "text-xs font-medium text-muted-foreground shrink-0",
														children: "Bonne réponse :"
													}),
													/* @__PURE__ */ jsxs("select", {
														value: tempCorrectIdx,
														onChange: (e) => setTempCorrectIdx(e.target.value),
														className: "rounded-md border border-input bg-background px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
														children: [
															/* @__PURE__ */ jsx("option", {
																value: "0",
																children: "Option 1"
															}),
															/* @__PURE__ */ jsx("option", {
																value: "1",
																children: "Option 2"
															}),
															/* @__PURE__ */ jsx("option", {
																value: "2",
																children: "Option 3"
															}),
															/* @__PURE__ */ jsx("option", {
																value: "3",
																children: "Option 4"
															})
														]
													}),
													/* @__PURE__ */ jsx(Button, {
														type: "button",
														onClick: addQuestion,
														variant: "secondary",
														size: "sm",
														className: "ml-auto text-xs",
														children: "Ajouter la question"
													})
												]
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx(Input, {
								type: "number",
								min: "0",
								value: sortOrder,
								onChange: (e) => setSortOrder(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-2 pt-4 border-t border-border/40",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: createChapter.isPending || updateChapter.isPending,
								className: "flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 border-none shadow-md",
								children: createChapter.isPending || updateChapter.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), " Enregistrement..."] }) : editingChapterId == null ? "✅ Ajouter le chapitre" : "💾 Mettre à jour le chapitre"
							}), /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								className: "h-11 px-6 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
								onClick: () => setFormOpen(false),
								children: "Annuler"
							})]
						})
					]
				}) })]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "bg-teal-500/5 border border-teal-500/10 rounded-xl overflow-hidden shadow-sm",
					children: [/* @__PURE__ */ jsx(CardHeader, {
						className: "py-4",
						children: /* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-semibold flex items-center gap-2 text-teal-800 dark:text-teal-400",
							children: "💡 Guide : Comment programmer, lancer et enregistrer vos formations vidéo / direct"
						})
					}), /* @__PURE__ */ jsxs(CardContent, {
						className: "text-xs text-teal-850 dark:text-teal-300 leading-relaxed space-y-3 pb-5",
						children: [/* @__PURE__ */ jsx("p", { children: "EduFlex vous permet de combiner des cours préenregistrés et des classes virtuelles interactives. Voici la marche à suivre :" }), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-bold text-[10px] uppercase tracking-wider text-teal-700 dark:text-teal-400",
									children: "🎥 1. Programmation"
								}), /* @__PURE__ */ jsxs("ul", {
									className: "list-disc pl-4 space-y-1",
									children: [/* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Vidéo Classique :" }),
										" Ajoutez un chapitre ",
										/* @__PURE__ */ jsx("i", { children: "Standard" }),
										" et renseignez son adresse vidéo (ex: lien Vimeo ou YouTube)."
									] }), /* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Direct Live :" }),
										" Ajoutez un chapitre ",
										/* @__PURE__ */ jsx("i", { children: "Classe en Direct" }),
										", renseignez la date/heure planifiée. Le lien Jitsi est autogénéré par défaut."
									] })]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-bold text-[10px] uppercase tracking-wider text-teal-700 dark:text-teal-400",
									children: "🔴 2. Lancement & Replays"
								}), /* @__PURE__ */ jsxs("ul", {
									className: "list-disc pl-4 space-y-1",
									children: [/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Lancement :" }), " À l'heure du live, ouvrez la page d'étude du cours. L'API Jitsi s'active et vous attribue le rôle de modérateur."] }), /* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Enregistrer & Publier :" }),
										" Enregistrez la session avec Jitsi. Une fois fini, modifiez ce chapitre et ajoutez le lien d'enregistrement dans le champ ",
										/* @__PURE__ */ jsx("i", { children: "Lien de la Rediffusion" }),
										" pour archiver le replay."
									] })]
								})]
							})]
						})]
					})]
				}), isLoading ? /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: [1, 2].map((i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i))
				}) : !chapters || chapters.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
					icon: /* @__PURE__ */ jsx(Settings, { className: "h-8 w-8" }),
					title: "Aucun chapitre",
					description: "Cette formation n'a pas encore de chapitres. Ajoutez-en un pour commencer à l'étoffer."
				}) : /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: chapters.map((chapter, index) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between p-4 bg-card rounded-lg border border-border/60 hover:border-primary/20 transition-all",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1 shrink-0 bg-slate-900 border border-border/40 p-1.5 rounded-lg",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold",
									children: index + 1
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-0.5",
									children: [/* @__PURE__ */ jsx("button", {
										disabled: index === 0,
										onClick: () => handleSwapOrder(index, index - 1),
										className: "h-3 w-4 flex items-center justify-center rounded text-[9px] hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent",
										type: "button",
										title: "Monter le chapitre",
										children: "▲"
									}), /* @__PURE__ */ jsx("button", {
										disabled: index === chapters.length - 1,
										onClick: () => handleSwapOrder(index, index + 1),
										className: "h-3 w-4 flex items-center justify-center rounded text-[9px] hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent",
										type: "button",
										title: "Descendre le chapitre",
										children: "▼"
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-sm font-medium",
								children: chapter.title
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: [
									chapter.chapterType === "live" ? "🔴 Classe en Direct (Visioconférence)" : chapter.chapterType === "quiz" || Array.isArray(chapter.quizData) && chapter.quizData.length > 0 ? `❓ Quiz (${chapter.quizData?.length || 0} question(s))` : chapter.videoUrl ? "📖 Vidéo intégrée" : "📖 Texte uniquement",
									" · Ordre : ",
									chapter.sortOrder
								]
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Button, {
								onClick: () => openEditForm(chapter),
								variant: "ghost",
								size: "sm",
								className: "h-8 w-8 p-0",
								children: /* @__PURE__ */ jsx(Edit2, { className: "h-3.5 w-3.5" })
							}), /* @__PURE__ */ jsx(Button, {
								onClick: () => handleDelete(chapter.id),
								variant: "ghost",
								size: "sm",
								className: "h-8 w-8 p-0 text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
							})]
						})]
					}, chapter.id))
				})]
			})
		]
	});
}
//#endregion
export { ManageCoursesPage as component };
