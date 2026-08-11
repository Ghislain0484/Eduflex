import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as useCourse } from "./useCourses-B9-zxIvH.js";
import { n as useEnrollments, t as useEnroll } from "./useEnrollments-CwMYwCz4.js";
import { t as useChapters } from "./useChapters-DQT6CDBj.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, EmptyState, Input, Skeleton, toast } from "@blinkdotnew/ui";
import { ArrowLeft, BookOpen, CheckCircle, Clock, GraduationCap, Play, Users } from "lucide-react";
//#region src/hooks/useFlutterwave.ts
function useFlutterwave() {
	const makePayment = (options) => {
		return new Promise((resolve, reject) => {
			const checkoutFunc = window.FlutterwaveCheckout;
			if (!checkoutFunc) {
				const errMsg = "Le script de paiement Flutterwave n'a pas pu être chargé. Veuillez vérifier votre connexion internet.";
				toast.error(errMsg);
				reject(new Error(errMsg));
				return;
			}
			let publicKey = "FLWPUBK_TEST-YOUR_PUBLIC_KEY_HERE";
			if (typeof window !== "undefined") {
				const globalConfig = localStorage.getItem("global_platform_config");
				if (globalConfig) try {
					const parsed = JSON.parse(globalConfig);
					if (parsed.flutterwavePublicKey) publicKey = parsed.flutterwavePublicKey;
				} catch {}
			}
			if (!publicKey) {
				const errMsg = "La clé publique Flutterwave n'est pas configurée (Console Admin > Passerelle ou variable .env).";
				toast.error(errMsg);
				reject(new Error(errMsg));
				return;
			}
			try {
				checkoutFunc({
					public_key: publicKey,
					tx_ref: `flw-eduflex-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
					amount: options.amount / 100,
					currency: options.currency || "EUR",
					payment_options: "card,mobilemoney,ussd",
					customer: {
						email: options.userEmail,
						name: options.userName || options.userEmail.split("@")[0]
					},
					customizations: {
						title: "EduFlex",
						description: `Achat de la formation : ${options.courseTitle}`,
						logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80"
					},
					callback: function(data) {
						if (data.status === "successful" || data.status === "completed") resolve({
							transaction_id: String(data.transaction_id || data.id),
							tx_ref: data.tx_ref,
							status: data.status
						});
						else reject(/* @__PURE__ */ new Error(`Paiement non finalisé (statut: ${data.status})`));
					},
					onclose: function() {
						reject(/* @__PURE__ */ new Error("Fenêtre de paiement fermée par l'utilisateur."));
					}
				});
			} catch (err) {
				toast.error(`Erreur d'initialisation de Flutterwave : ${err.message}`);
				reject(err);
			}
		});
	};
	return { makePayment };
}
//#endregion
//#region src/routes/_app/courses.$id.tsx?tsr-split=component
var LEVEL_MAP = {
	debutant: "Débutant",
	intermediaire: "Intermédiaire",
	avance: "Avancé"
};
function CourseDetailPage() {
	const { id } = useParams({ strict: false });
	const { data: course, isLoading, error } = useCourse(Number(id));
	const { data: chapters } = useChapters(Number(id));
	const { data: enrollments } = useEnrollments();
	const { isAuthenticated, user } = useAuth();
	const enrollMutation = useEnroll();
	const { makePayment } = useFlutterwave();
	const [enrolled, setEnrolled] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const ref = new URLSearchParams(window.location.search).get("ref");
			if (ref) sessionStorage.setItem("affiliate_ref", ref);
		}
	}, []);
	const [promoCode, setPromoCode] = useState("");
	const [discountPercent, setDiscountPercent] = useState(0);
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoError, setPromoError] = useState("");
	const isUserEnrolled = enrolled || enrollments?.some((e) => Number(e.courseId) === Number(id));
	const handleApplyPromoCode = async () => {
		if (!promoCode.trim()) return;
		setPromoError("");
		try {
			const { data, error } = await supabase.from("promo_codes").select("*").eq("code", promoCode.toUpperCase().trim()).eq("is_active", true).single();
			if (error || !data) {
				setPromoError("Code promo invalide ou expiré.");
				setDiscountPercent(0);
				setPromoApplied(false);
				return;
			}
			setDiscountPercent(data.discount_percent);
			setPromoApplied(true);
			toast.success(`Code appliqué ! Réduction de ${data.discount_percent}%`);
		} catch (err) {
			setPromoError("Code promo incorrect.");
		}
	};
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "p-6 max-w-6xl mx-auto",
		children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-32 mb-6" }), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-4",
				children: [
					/* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
					/* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-3/4" }),
					/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
					/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6" })
				]
			}), /* @__PURE__ */ jsx(Skeleton, { className: "h-72 rounded-xl" })]
		})]
	});
	if (error || !course) return /* @__PURE__ */ jsx("div", {
		className: "p-6 max-w-6xl mx-auto",
		children: /* @__PURE__ */ jsx(EmptyState, {
			icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8" }),
			title: "Formation introuvable",
			description: "Cette formation n'existe pas ou n'est plus disponible."
		})
	});
	const discountMultiplier = (100 - discountPercent) / 100;
	const finalPrice = Math.round((course.price || 0) * discountMultiplier);
	const handleEnroll = async () => {
		if (!isAuthenticated || !user) return;
		if (isUserEnrolled) return;
		if (finalPrice <= 0) {
			enrollMutation.mutate(course.id, { onSuccess: () => setEnrolled(true) });
			return;
		}
		try {
			await makePayment({
				amount: finalPrice,
				currency: "XOF",
				courseTitle: course.title,
				userEmail: user.email || "",
				userName: user.displayName || user.email?.split("@")[0] || "Apprenant"
			});
			enrollMutation.mutate(course.id, { onSuccess: async () => {
				setEnrolled(true);
				toast.success("Paiement validé avec succès ! Bienvenue dans la formation.");
				if (typeof window !== "undefined") {
					const referrerId = sessionStorage.getItem("affiliate_ref");
					if (referrerId && referrerId !== user.id) {
						const commission = Math.round(finalPrice * .15);
						try {
							await supabase.from("affiliate_referrals").insert([{
								referrer_id: referrerId,
								referred_email: user.email || "",
								course_id: course.id,
								commission_amount: commission,
								status: "en_attente"
							}]);
							sessionStorage.removeItem("affiliate_ref");
						} catch (affErr) {
							console.error("Affiliate referral error:", affErr);
						}
					}
				}
			} });
		} catch (err) {
			toast.error(err.message || "Le paiement a échoué ou a été annulé.");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto p-6 space-y-8",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/_app/courses",
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
			children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Retour au catalogue"]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative",
						children: course.imageUrl ? /* @__PURE__ */ jsx("img", {
							src: course.imageUrl,
							alt: course.title,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full",
							children: /* @__PURE__ */ jsx(BookOpen, { className: "h-20 w-20 text-primary/20" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx(Badge, {
							variant: "secondary",
							children: course.category || "Général"
						}), /* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							children: LEVEL_MAP[course.level] || course.level
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight",
							children: course.title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap",
							children: course.description
						})]
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "p-6 space-y-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-base font-bold text-foreground",
								children: "Ce que vous allez apprendre dans ce cours"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm",
								children: [
									"Maîtriser les concepts fondamentaux de la thématique.",
									"Appliquer des cas pratiques réels pas-à-pas.",
									"Valider vos compétences grâce à des quiz interactifs.",
									"Obtenir un certificat de réussite professionnel.",
									"Rejoindre une communauté d'entraide dynamique.",
									"Accéder à des mises à jour gratuites à vie."
								].map((item, idx) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2.5 items-start",
									children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground leading-relaxed",
										children: item
									})]
								}, idx))
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsx(Card, {
							className: "border-border/80 bg-muted/10",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "p-5 space-y-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Prérequis"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "Aucun prérequis technique particulier n'est demandé. Une connexion internet et un ordinateur ou mobile suffisent pour suivre l'intégralité du syllabus."
								})]
							})
						}), /* @__PURE__ */ jsx(Card, {
							className: "border-border/80 bg-muted/10",
							children: /* @__PURE__ */ jsxs(CardContent, {
								className: "p-5 space-y-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Public idéal"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "Étudiants, professionnels en reconversion ou passionnés souhaitant acquérir des compétences concrètes et validées par un certificat."
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "p-6 space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-base font-bold text-foreground",
									children: "Programme détaillé de la formation"
								}), /* @__PURE__ */ jsxs(Badge, {
									variant: "secondary",
									className: "text-[10px] font-semibold",
									children: [chapters?.length || 0, " Chapitres"]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-3",
								children: chapters && chapters.length > 0 ? chapters.map((chapter, i) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/50 hover:bg-muted/10 transition-colors",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3.5 min-w-0",
										children: [/* @__PURE__ */ jsx("div", {
											className: "h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold",
											children: i + 1
										}), /* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs md:text-sm font-semibold text-foreground block truncate",
												children: chapter.title
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[10px] text-muted-foreground leading-relaxed truncate block",
												children: "Contenu vidéo & support interactif"
											})]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-2 shrink-0",
										children: /* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "text-[9px] px-2 py-0.5",
											children: "30-45 min"
										})
									})]
								}, chapter.id)) : /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground py-2 italic",
									children: "Aucun chapitre disponible pour le moment."
								})
							})]
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ jsx(Card, {
					className: "sticky top-20",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "p-6 space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center space-y-1",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-3xl font-bold text-primary",
										children: discountPercent > 0 ? /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-center",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-xs line-through text-muted-foreground",
												children: [((Number(course.price) || 0) / 100).toLocaleString("fr-FR"), " €"]
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-primary font-bold",
												children: [((finalPrice || 0) / 100).toLocaleString("fr-FR"), " €"]
											})]
										}) : `${((Number(course.price) || 0) / 100).toLocaleString("fr-FR")} €`
									}),
									finalPrice > 0 && /* @__PURE__ */ jsxs("p", {
										className: "text-sm font-semibold text-muted-foreground",
										children: [
											"~ ",
											Math.round(finalPrice / 100 * 655.957).toLocaleString("fr-FR"),
											" F CFA"
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Accès à vie"
									})
								]
							}),
							!enrolled && !isUserEnrolled && isAuthenticated && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2 pt-2 border-t border-border/50",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx(Input, {
											placeholder: "Code promo",
											value: promoCode,
											onChange: (e) => setPromoCode(e.target.value),
											disabled: promoApplied,
											className: "h-9 text-xs uppercase"
										}), /* @__PURE__ */ jsx(Button, {
											type: "button",
											onClick: handleApplyPromoCode,
											disabled: promoApplied,
											size: "sm",
											className: "h-9 px-3 text-xs",
											children: promoApplied ? "Appliqué" : "Valider"
										})]
									}),
									promoError && /* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-red-500",
										children: promoError
									}),
									promoApplied && /* @__PURE__ */ jsxs("p", {
										className: "text-[10px] text-emerald-500 font-medium",
										children: [
											"Remise de ",
											discountPercent,
											"% activée !"
										]
									})
								]
							}),
							enrolled || isUserEnrolled ? /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 justify-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
										children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium",
											children: "Inscription confirmée !"
										})]
									}),
									/* @__PURE__ */ jsx(Button, {
										asChild: true,
										className: "w-full",
										size: "lg",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/study/$id",
											params: { id: String(course.id) },
											children: "Continuer la formation"
										})
									}),
									isAuthenticated && user && /* @__PURE__ */ jsxs("div", {
										className: "border border-amber-500/30 rounded-xl p-4 bg-amber-500/5 dark:bg-amber-500/10 space-y-2 mt-4 text-left",
										children: [
											/* @__PURE__ */ jsx("h4", {
												className: "text-xs font-bold text-amber-800 dark:text-amber-400",
												children: "🔗 Programme de parrainage"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-muted-foreground leading-relaxed",
												children: "Gagnez 15% de commission en partageant ce cours avec vos contacts !"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx(Input, {
													readOnly: true,
													value: typeof window !== "undefined" ? `${window.location.origin}/courses/${course.id}?ref=${user.id}` : "",
													className: "h-8 text-[10px] bg-background/50"
												}), /* @__PURE__ */ jsx(Button, {
													type: "button",
													size: "sm",
													className: "h-8 text-[10px] shrink-0",
													onClick: () => {
														if (typeof window !== "undefined") {
															navigator.clipboard.writeText(`${window.location.origin}/courses/${course.id}?ref=${user.id}`);
															toast.success("Lien de parrainage copié !");
														}
													},
													children: "Copier"
												})]
											})
										]
									})
								]
							}) : isAuthenticated ? /* @__PURE__ */ jsx(Button, {
								className: "w-full",
								size: "lg",
								onClick: handleEnroll,
								disabled: enrollMutation.isPending,
								children: enrollMutation.isPending ? "Inscription..." : finalPrice <= 0 ? "S'inscrire à cette formation" : "Acheter cette formation"
							}) : /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Button, {
									asChild: true,
									className: "w-full",
									size: "lg",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/login",
										children: "Connectez-vous pour vous inscrire"
									})
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-xs text-center text-muted-foreground",
									children: ["Pas encore de compte ? ", /* @__PURE__ */ jsx(Link, {
										to: "/register",
										className: "text-primary hover:underline",
										children: "S'inscrire"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3 pt-4 border-t border-border/50",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 text-sm",
										children: [/* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsxs("span", { children: [course.durationHours || 0, " heures de contenu"] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 text-sm",
										children: [/* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsxs("span", { children: [Number(course.studentsCount) || 0, " apprenants inscrits"] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 text-sm",
										children: [/* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("span", { children: "Certificat de complétion" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 text-sm",
										children: [/* @__PURE__ */ jsx(Play, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("span", { children: "Accès illimité à vie" })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-3 text-[10px] text-muted-foreground leading-relaxed text-center mt-3",
								children: [
									"🛡️ ",
									/* @__PURE__ */ jsx("b", { children: "Garantie de satisfaction 30 jours" }),
									" : si le contenu ne vous convient pas, demandez un remboursement complet."
								]
							})
						]
					})
				})
			})]
		})]
	});
}
//#endregion
export { CourseDetailPage as component };
