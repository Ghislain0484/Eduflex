import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as uploadToStorage } from "./storage-C1qQgG9P.js";
import { n as canCustomizeBranding } from "./planGuards-CEA_Rvtn.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@blinkdotnew/ui";
import { Bell, CheckCircle, Clock, DollarSign, Key, Percent, Shield, User } from "lucide-react";
//#region src/routes/_app/settings.tsx?tsr-split=component
function SettingsPage() {
	const { user } = useAuth();
	const [referrals, setReferrals] = useState([]);
	const [referralsLoading, setReferralsLoading] = useState(false);
	const fetchReferrals = async () => {
		if (!user) return;
		setReferralsLoading(true);
		try {
			const { data, error } = await supabase.from("affiliate_referrals").select(`
          id,
          referred_email,
          commission_amount,
          status,
          created_at,
          courses (
            title
          )
        `).eq("referrer_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			setReferrals(data || []);
		} catch (err) {
			console.error(err);
		} finally {
			setReferralsLoading(false);
		}
	};
	useEffect(() => {
		fetchReferrals();
	}, [user]);
	const totalEarningsFcfa = referrals.reduce((sum, r) => sum + (r.commission_amount || 0), 0);
	const totalEarningsEur = Math.round(totalEarningsFcfa / 655.957);
	const paidEarnings = referrals.filter((r) => r.status === "paye").reduce((sum, r) => sum + (r.commission_amount || 0), 0);
	const pendingEarnings = referrals.filter((r) => r.status === "en_attente").reduce((sum, r) => sum + (r.commission_amount || 0), 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Paramètres"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground text-sm mt-1",
			children: "Gérez votre profil, vos préférences et votre affiliation."
		})] }), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "profil",
			children: [
				/* @__PURE__ */ jsxs(TabsList, { children: [
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "profil",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(User, { className: "h-4 w-4" }), "Profil"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "securite",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }), "Sécurité"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "affiliation",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Percent, { className: "h-4 w-4" }), "Affiliation"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "notifications",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }), "Notifications"]
					})
				] }),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "profil",
					children: /* @__PURE__ */ jsx(ProfilTab, { user })
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "securite",
					children: /* @__PURE__ */ jsx(SecuriteTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "affiliation",
					children: /* @__PURE__ */ jsx(AffiliationTab, {
						referrals,
						loading: referralsLoading,
						totalFcfa: totalEarningsFcfa,
						totalEur: totalEarningsEur,
						paidFcfa: paidEarnings,
						pendingFcfa: pendingEarnings
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "notifications",
					children: /* @__PURE__ */ jsx(NotificationsTab, {})
				})
			]
		})]
	});
}
function ProfilTab({ user }) {
	const [name, setName] = useState(user?.displayName || "");
	const [academyName, setAcademyName] = useState(user?.academyName || "");
	const [academySlogan, setAcademySlogan] = useState(user?.academySlogan || "");
	const [academyColor, setAcademyColor] = useState(user?.academyColor || "#6366f1");
	const [academyLogo, setAcademyLogo] = useState(user?.academyLogo || "");
	const [academyJitsiDomain, setAcademyJitsiDomain] = useState("meet.jit.si");
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (user) {
			setName(user.displayName || "");
			setAcademyName(user.academyName || "");
			setAcademySlogan(user.academySlogan || "");
			setAcademyColor(user.academyColor || "#6366f1");
			setAcademyLogo(user.academyLogo || "");
			const savedJitsi = localStorage.getItem("academy_jitsi_domain");
			if (savedJitsi) setAcademyJitsiDomain(savedJitsi);
			else if (user.academyJitsiDomain) setAcademyJitsiDomain(user.academyJitsiDomain);
		}
	}, [user]);
	const userRole = {
		student: "Élève",
		teacher: "Enseignant",
		admin: "Administrateur"
	}[user?.role || "student"] || "Élève";
	const handleLogoUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Veuillez sélectionner un fichier image (PNG ou JPEG).");
			return;
		}
		try {
			const toastId = toast.loading("Téléversement du logo...");
			setAcademyLogo(await uploadToStorage(file, "academy-branding", user?.id || "anonymous"));
			toast.dismiss(toastId);
			toast.success("Logo téléversé ! Enregistrez pour appliquer.");
		} catch (err) {
			toast.error("Erreur de téléversement.");
		}
	};
	const previewCertificate = async () => {
		const canvas = document.createElement("canvas");
		canvas.width = 1600;
		canvas.height = 1130;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.fillStyle = "#fdfbf7";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = academyColor || "#ca8a04";
		ctx.lineWidth = 15;
		ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
		ctx.strokeStyle = "#c5a880";
		ctx.lineWidth = 2;
		ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
		ctx.fillStyle = "#c5a880";
		ctx.fillRect(50, 50, 40, 4);
		ctx.fillRect(50, 50, 4, 40);
		ctx.fillRect(canvas.width - 90, 50, 40, 4);
		ctx.fillRect(canvas.width - 54, 50, 4, 40);
		ctx.fillRect(50, canvas.height - 54, 40, 4);
		ctx.fillRect(50, canvas.height - 90, 4, 40);
		ctx.fillRect(canvas.width - 90, canvas.height - 54, 40, 4);
		ctx.fillRect(canvas.width - 54, canvas.height - 90, 4, 40);
		ctx.textAlign = "center";
		ctx.fillStyle = "#1e293b";
		ctx.font = "600 24px Arial, sans-serif";
		ctx.fillText((academyName || "MON ACADEMIE").toUpperCase().split("").join(" "), canvas.width / 2, 180);
		ctx.font = "italic 62px Georgia, serif";
		ctx.fillStyle = academyColor || "#ca8a04";
		ctx.fillText("Certificat de Réussite", canvas.width / 2, 290);
		ctx.font = "italic 16px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText(academySlogan || "L'excellence par la formation en ligne", canvas.width / 2, 335);
		ctx.font = "22px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText("Ce diplôme officiel est fièrement décerné à", canvas.width / 2, 420);
		ctx.font = "bold italic 68px Georgia, serif";
		ctx.fillStyle = "#0f172a";
		ctx.fillText("Jean Dupont (Exemple)", canvas.width / 2, 530);
		ctx.strokeStyle = "#cbd5e1";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2 - 250, 560);
		ctx.lineTo(canvas.width / 2 + 250, 560);
		ctx.stroke();
		ctx.font = "22px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText("pour avoir complété avec succès la formation en ligne", canvas.width / 2, 630);
		ctx.font = "bold 46px Georgia, serif";
		ctx.fillStyle = "#1e293b";
		ctx.fillText("Exemple de Formation Branded", canvas.width / 2, 720);
		const today = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
		ctx.font = "italic 20px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText(`Délivré le ${today}`, canvas.width / 2, 810);
		const sigX = canvas.width / 2 + 280;
		const sigY = 930;
		ctx.strokeStyle = "#94a3b8";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(sigX - 120, 950);
		ctx.lineTo(sigX + 120, 950);
		ctx.stroke();
		ctx.font = "16px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText(`La Direction ${academyName || "Mon Académie"}`, sigX, 975);
		ctx.font = "italic 34px Georgia, serif";
		ctx.fillStyle = "#1e3a8a";
		ctx.fillText(academyName || "Mon Académie", sigX, sigY - 5);
		const loadJsPDF = () => {
			return new Promise((resolve, reject) => {
				if (window.jspdf) {
					resolve(window.jspdf);
					return;
				}
				const script = document.createElement("script");
				script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
				script.onload = () => {
					resolve(window.jspdf);
				};
				script.onerror = () => {
					reject(/* @__PURE__ */ new Error("Erreur de chargement du générateur PDF."));
				};
				document.body.appendChild(script);
			});
		};
		try {
			const toastId = toast.loading("Génération de l'aperçu PDF...");
			const { jsPDF } = await loadJsPDF();
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [canvas.width, canvas.height]
			});
			pdf.addImage(canvas.toDataURL("image/jpeg", .95), "JPEG", 0, 0, canvas.width, canvas.height);
			pdf.save(`Apercu_Certificat_${(academyName || "Academie").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
			toast.dismiss(toastId);
			toast.success("Aperçu du certificat PDF téléchargé !");
		} catch (err) {
			toast.error("Erreur de génération.");
		}
	};
	const previewReceipt = async () => {
		const canvas = document.createElement("canvas");
		canvas.width = 1200;
		canvas.height = 1e3;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = academyColor || "#0d9488";
		ctx.fillRect(0, 0, canvas.width, 180);
		ctx.fillStyle = "#ffffff";
		ctx.font = "bold 36px Arial, sans-serif";
		ctx.fillText(academyName || "Mon Académie", 80, 105);
		ctx.textAlign = "right";
		ctx.font = "28px Arial, sans-serif";
		ctx.fillText("REÇU DE PAIEMENT", canvas.width - 80, 105);
		ctx.textAlign = "left";
		ctx.fillStyle = "#1e293b";
		ctx.font = "bold 20px Arial, sans-serif";
		ctx.fillText("Facturé à :", 80, 260);
		ctx.font = "16px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText("Nom: Jean Dupont", 80, 300);
		ctx.fillText("Email: jean.dupont@gmail.com", 80, 330);
		ctx.textAlign = "right";
		ctx.fillStyle = "#1e293b";
		ctx.font = "bold 20px Arial, sans-serif";
		ctx.fillText("Détails du reçu :", canvas.width - 80, 260);
		ctx.font = "16px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText("Reçu N°: #REC-884920", canvas.width - 80, 300);
		ctx.fillText("Date: " + (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"), canvas.width - 80, 330);
		ctx.fillText("Méthode: Mobile Money (Wave/Orange)", canvas.width - 80, 360);
		ctx.fillStyle = "#f8fafc";
		ctx.fillRect(80, 460, canvas.width - 160, 50);
		ctx.textAlign = "left";
		ctx.fillStyle = "#475569";
		ctx.font = "bold 16px Arial, sans-serif";
		ctx.fillText("Description de la formation", 100, 492);
		ctx.textAlign = "right";
		ctx.fillText("Montant", canvas.width - 100, 492);
		ctx.textAlign = "left";
		ctx.fillStyle = "#1e293b";
		ctx.font = "16px Arial, sans-serif";
		ctx.fillText("Formation Complète en Intelligence Artificielle", 100, 570);
		ctx.textAlign = "right";
		ctx.fillText("15 000 FCFA", canvas.width - 100, 570);
		ctx.strokeStyle = "#e2e8f0";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(80, 635);
		ctx.lineTo(canvas.width - 80, 635);
		ctx.stroke();
		ctx.textAlign = "right";
		ctx.fillStyle = "#1e293b";
		ctx.font = "bold 20px Arial, sans-serif";
		ctx.fillText("Total Payé : 15 000 FCFA", canvas.width - 80, 700);
		ctx.textAlign = "center";
		ctx.fillStyle = "#94a3b8";
		ctx.font = "14px Arial, sans-serif";
		ctx.fillText("Merci pour votre confiance. Ce document sert de preuve officielle de paiement.", canvas.width / 2, 850);
		const loadJsPDF = () => {
			return new Promise((resolve, reject) => {
				if (window.jspdf) {
					resolve(window.jspdf);
					return;
				}
				const script = document.createElement("script");
				script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
				script.onload = () => {
					resolve(window.jspdf);
				};
				script.onerror = () => {
					reject(/* @__PURE__ */ new Error("Erreur de chargement du générateur PDF."));
				};
				document.body.appendChild(script);
			});
		};
		try {
			const toastId = toast.loading("Génération du reçu PDF...");
			const { jsPDF } = await loadJsPDF();
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "px",
				format: [canvas.width, canvas.height]
			});
			pdf.addImage(canvas.toDataURL("image/jpeg", .95), "JPEG", 0, 0, canvas.width, canvas.height);
			pdf.save(`Apercu_Recu_${(academyName || "Academie").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
			toast.dismiss(toastId);
			toast.success("Aperçu du reçu PDF téléchargé avec succès !");
		} catch (err) {
			toast.error("Erreur de génération.");
		}
	};
	const handleSave = async () => {
		if (!name.trim() || !user) return;
		setSaving(true);
		try {
			const { error: authError } = await supabase.auth.updateUser({ data: { display_name: name.trim() } });
			if (authError) throw authError;
			try {
				localStorage.setItem("academy_jitsi_domain", academyJitsiDomain.trim());
				const { error: dbError } = await supabase.from("profiles").update({
					display_name: name.trim(),
					academy_name: academyName.trim() || null,
					academy_slogan: academySlogan.trim() || null,
					academy_color: academyColor || "#6366f1",
					academy_logo: academyLogo.trim() || null,
					academy_jitsi_domain: academyJitsiDomain.trim() || null
				}).eq("id", user.id);
				if (dbError) throw dbError;
			} catch (err) {
				if (err.code === "42703" || err.message && (err.message.includes("column") || err.message.includes("schema cache"))) {
					console.warn("academy_logo or academy_jitsi_domain column might be missing. Trying fallback profile update.");
					const { error: fallbackError } = await supabase.from("profiles").update({
						display_name: name.trim(),
						academy_name: academyName.trim() || null,
						academy_slogan: academySlogan.trim() || null,
						academy_color: academyColor || "#6366f1"
					}).eq("id", user.id);
					if (fallbackError) {
						console.warn("Academy columns might be missing entirely. Trying basic profile update.");
						const { error: basicError } = await supabase.from("profiles").update({ display_name: name.trim() }).eq("id", user.id);
						if (basicError) throw basicError;
					}
				} else throw err;
			}
			toast.success("Modifications enregistrées ! Actualisation de l'interface...");
			setTimeout(() => {
				window.location.reload();
			}, 800);
		} catch (err) {
			toast.error(err.message || "Erreur lors de la sauvegarde.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Informations personnelles" }) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Nom complet"
						}), /* @__PURE__ */ jsx(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Votre nom"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Adresse email"
						}), /* @__PURE__ */ jsx(Input, {
							value: user?.email || "",
							disabled: true,
							className: "opacity-60"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium",
						children: "Rôle sur la plateforme"
					}), /* @__PURE__ */ jsx(Input, {
						value: userRole,
						disabled: true,
						className: "opacity-60 font-semibold"
					})]
				}),
				(user?.role === "teacher" || user?.role === "admin" || !!user?.academyName) && /* @__PURE__ */ jsxs("div", {
					className: "border-t border-border/80 pt-6 mt-6 space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-bold text-foreground",
							children: "Personnalisation de l'Académie (White-Label)"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-muted-foreground mt-0.5",
							children: "Configurez l'image de marque de votre école ou académie en ligne."
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-medium",
									children: "Nom de l'Académie"
								}), /* @__PURE__ */ jsx(Input, {
									value: academyName,
									onChange: (e) => setAcademyName(e.target.value),
									placeholder: "Ex: Académie du Numérique"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-medium",
									children: "Slogan / Message de bienvenue"
								}), /* @__PURE__ */ jsx(Input, {
									value: academySlogan,
									onChange: (e) => setAcademySlogan(e.target.value),
									placeholder: "Ex: Formez-vous aux métiers du futur avec nos experts."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-medium",
										children: "Logo de l'Académie (Format PNG ou JPEG)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [academyLogo ? /* @__PURE__ */ jsx("div", {
											className: "h-16 w-16 rounded-xl border border-border bg-slate-800 overflow-hidden flex items-center justify-center p-1.5 shrink-0",
											children: /* @__PURE__ */ jsx("img", {
												src: academyLogo,
												alt: "Logo Académie",
												className: "w-full h-full object-contain rounded-lg"
											})
										}) : /* @__PURE__ */ jsx("div", {
											className: "h-16 w-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0 bg-slate-900 text-xs font-bold",
											children: "Logo"
										}), /* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5 flex-1",
											children: [
												/* @__PURE__ */ jsx("input", {
													type: "file",
													accept: "image/png, image/jpeg",
													id: "logo-upload",
													className: "hidden",
													disabled: !canCustomizeBranding(user?.academyPlan),
													onChange: handleLogoUpload
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													className: "h-8 text-xs font-semibold",
													disabled: !canCustomizeBranding(user?.academyPlan),
													onClick: () => {
														if (!canCustomizeBranding(user?.academyPlan)) {
															toast.error("Logo personnalisé réservé aux abonnements Pro et B2B (EduFlex+).");
															return;
														}
														document.getElementById("logo-upload")?.click();
													},
													children: "Sélectionner un fichier"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[9px] text-muted-foreground block mt-0.5",
													children: "PNG transparent ou JPG carré recommandé."
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-medium",
										children: "Couleur d'accentuation de la marque"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("input", {
											type: "color",
											value: academyColor,
											disabled: !canCustomizeBranding(user?.academyPlan),
											onChange: (e) => setAcademyColor(e.target.value),
											className: "w-10 h-10 rounded-md border border-input cursor-pointer bg-transparent disabled:opacity-50"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-semibold text-foreground block",
											children: academyColor
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[9px] text-muted-foreground",
											children: "Appliquée aux boutons, en-têtes et thèmes de lecture."
										})] })]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-medium",
											children: "Serveur Visioconférence Jitsi (Optionnel)"
										}),
										/* @__PURE__ */ jsx(Input, {
											value: academyJitsiDomain,
											disabled: !canCustomizeBranding(user?.academyPlan),
											onChange: (e) => setAcademyJitsiDomain(e.target.value),
											placeholder: canCustomizeBranding(user?.academyPlan) ? "Ex: meet.jit.si ou visio.monacademie.com" : "🔒 Option réservée aux membres Pro et B2B",
											className: "h-9 text-xs disabled:opacity-55"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[9px] text-muted-foreground mt-0.5",
											children: "Laissez vide ou meet.jit.si pour utiliser le serveur par défaut."
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-4 rounded-xl border border-border bg-slate-950/20 space-y-3 col-span-1 md:col-span-2",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[9px] uppercase tracking-wider text-muted-foreground font-bold block",
												children: "Prévisualisation Dynamique du Thème"
											}), !canCustomizeBranding(user?.academyPlan) && /* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "border-amber-500/30 text-amber-500 bg-amber-500/5 text-[9px] font-bold",
												children: "Plan Découverte Limité"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap items-center gap-4",
											children: [
												/* @__PURE__ */ jsx("button", {
													style: { backgroundColor: academyColor },
													className: "px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow transition-transform active:scale-95",
													children: "Bouton Primaire"
												}),
												/* @__PURE__ */ jsx("div", {
													style: {
														borderColor: academyColor + "30",
														backgroundColor: academyColor + "10",
														color: academyColor
													},
													className: "border px-2.5 py-0.5 rounded text-[10px] font-bold",
													children: "Badge d'Académie"
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "text-xs flex items-center gap-1.5 font-medium",
													children: [/* @__PURE__ */ jsx("span", {
														className: "h-2.5 w-2.5 rounded-full animate-pulse",
														style: { backgroundColor: academyColor }
													}), "Session Active"]
												})
											]
										}),
										!canCustomizeBranding(user?.academyPlan) && /* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-1",
											children: "🔒 La personnalisation de la couleur, du logo et du serveur de visioconférence requiert l'offre Pro ou B2B."
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "border-t border-border/60 pt-6 mt-6 space-y-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-xs font-bold text-foreground",
								children: "Aperçu & Modèles de Documents officiels"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Visualisez instantanément vos documents personnalisés aux couleurs et nom de votre académie."
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "p-4 rounded-lg bg-accent/40 border border-border/80 space-y-3 flex flex-col justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20",
												children: "Modèle de Reçu"
											}),
											/* @__PURE__ */ jsx("h5", {
												className: "font-semibold text-xs mt-1 text-white",
												children: "Reçu de paiement élève"
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-[9px] text-muted-foreground leading-relaxed",
												children: [
													"Génère un reçu PDF officiel affichant le logo et la couleur primaire de ",
													/* @__PURE__ */ jsx("strong", { children: academyName || "Votre Académie" }),
													"."
												]
											})
										]
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "w-full text-[10px] h-8 font-semibold bg-slate-900 border-slate-800 hover:bg-slate-800",
										onClick: previewReceipt,
										children: "👁️ Télécharger l'aperçu du reçu"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-4 rounded-lg bg-accent/40 border border-border/80 space-y-3 flex flex-col justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20",
												children: "Modèle de Diplôme"
											}),
											/* @__PURE__ */ jsx("h5", {
												className: "font-semibold text-xs mt-1 text-white",
												children: "Certificat de fin de formation"
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-[9px] text-muted-foreground leading-relaxed",
												children: [
													"Délivre un diplôme numérique officiel signé par ",
													/* @__PURE__ */ jsx("strong", { children: academyName || "Votre Académie" }),
													" avec sa couleur de marque."
												]
											})
										]
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "w-full text-[10px] h-8 font-semibold bg-slate-900 border-slate-800 hover:bg-slate-800",
										onClick: previewCertificate,
										children: "👁️ Télécharger l'aperçu du certificat"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-end pt-2 border-t border-border/40",
							children: /* @__PURE__ */ jsx(Button, {
								type: "button",
								onClick: handleSave,
								disabled: saving,
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md",
								children: saving ? "Enregistrement..." : "Enregistrer les modifications"
							})
						})
					]
				})
			]
		})]
	});
}
function SecuriteTab() {
	const [newP, setNewP] = useState("");
	const [confP, setConfP] = useState("");
	const [changing, setChanging] = useState(false);
	const [sessions, setSessions] = useState([]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const userAgent = navigator.userAgent;
		let browser = "Navigateur Inconnu";
		if (userAgent.indexOf("Chrome") > -1) browser = "Google Chrome";
		else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
		else if (userAgent.indexOf("Firefox") > -1) browser = "Mozilla Firefox";
		else if (userAgent.indexOf("Edge") > -1) browser = "Microsoft Edge";
		let os = "Système Inconnu";
		if (userAgent.indexOf("Windows") > -1) os = "Windows";
		else if (userAgent.indexOf("Mac") > -1) os = "macOS";
		else if (userAgent.indexOf("Linux") > -1) os = "Linux";
		else if (userAgent.indexOf("Android") > -1) os = "Android";
		else if (userAgent.indexOf("iPhone") > -1) os = "iOS";
		setSessions([
			{
				id: "1",
				device: `${browser} sur ${os} (Session actuelle)`,
				ip: "192.168.1.45 (Actif)",
				active: true,
				lastUsed: "Maintenant"
			},
			{
				id: "2",
				device: "Safari sur iPhone",
				ip: "102.89.23.11",
				active: false,
				lastUsed: "Il y a 3 heures"
			},
			{
				id: "3",
				device: "Chrome sur Android",
				ip: "102.89.23.45",
				active: false,
				lastUsed: "Il y a 2 jours"
			}
		]);
	}, []);
	const handleDisconnectOthers = () => {
		setSessions((prev) => prev.filter((s) => s.active));
		toast.success("Toutes les autres sessions ont été fermées avec succès.");
	};
	const handleChange = async (e) => {
		e.preventDefault();
		if (!newP || !confP) return;
		if (newP !== confP) {
			toast.error("Les mots de passe ne correspondent pas");
			return;
		}
		setChanging(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: newP });
			if (error) throw error;
			toast.success("Mot de passe modifié avec succès !");
			setNewP("");
			setConfP("");
		} catch (err) {
			toast.error(err.message || "Erreur lors du changement de mot de passe.");
		} finally {
			setChanging(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs(Card, {
			className: "mt-6",
			children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Changer le mot de passe" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: handleChange,
				className: "space-y-4 max-w-md",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Nouveau mot de passe"
						}), /* @__PURE__ */ jsx(Input, {
							type: "password",
							required: true,
							value: newP,
							onChange: (e) => setNewP(e.target.value),
							placeholder: "Minimum 6 caractères"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Confirmer le nouveau mot de passe"
						}), /* @__PURE__ */ jsx(Input, {
							type: "password",
							required: true,
							value: confP,
							onChange: (e) => setConfP(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: changing,
						children: changing ? "Modification..." : "Modifier le mot de passe"
					})
				]
			}) })]
		}), /* @__PURE__ */ jsxs(Card, {
			className: "bg-card border border-border/60 mt-6",
			children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
				className: "text-sm font-semibold flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Key, { className: "h-4.5 w-4.5 text-primary" }), " Historique des Sessions et Appareils Actifs"]
			}) }), /* @__PURE__ */ jsxs(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Voici les appareils et adresses IP qui se sont connectés à votre compte. Vous pouvez révoquer à tout moment l'accès de l'un de ces terminaux."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60 bg-muted/5",
						children: sessions.map((s) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between p-3.5 text-xs",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 font-semibold text-foreground",
									children: [s.device, s.active && /* @__PURE__ */ jsx(Badge, {
										className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] uppercase font-bold py-0.5 px-2",
										children: "Actif"
									})]
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-[10px] text-muted-foreground",
									children: [
										"Adresse IP : ",
										s.ip,
										" · Dernière activité : ",
										s.lastUsed
									]
								})]
							}), !s.active && /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "xs",
								onClick: () => setSessions((prev) => prev.filter((sess) => sess.id !== s.id)),
								className: "text-destructive hover:bg-destructive/10 text-[10px] h-7",
								children: "Révoquer"
							})]
						}, s.id))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ jsx(Button, {
							onClick: handleDisconnectOthers,
							variant: "outline",
							size: "sm",
							className: "text-xs border-border/80 hover:bg-muted/40 font-semibold h-9",
							children: "Déconnecter les autres appareils"
						})
					})
				]
			})]
		})]
	});
}
function NotificationsTab() {
	const { user } = useAuth();
	const [email, setEmail] = useState(true);
	const [student, setStudent] = useState(true);
	const [payment, setPayment] = useState(true);
	const [newsletter, setNewsletter] = useState(false);
	useEffect(() => {
		if (user?.notification_prefs) {
			setEmail(!!user.notification_prefs.email);
			setStudent(!!user.notification_prefs.student);
			setPayment(!!user.notification_prefs.payment);
			setNewsletter(!!user.notification_prefs.newsletter);
		} else if (user?.id) {
			const fetchPrefs = async () => {
				const { data, error } = await supabase.from("profiles").select("notification_prefs").eq("id", user.id).maybeSingle();
				if (!error && data?.notification_prefs) {
					const prefs = data.notification_prefs;
					setEmail(!!prefs.email);
					setStudent(!!prefs.student);
					setPayment(!!prefs.payment);
					setNewsletter(!!prefs.newsletter);
				}
			};
			fetchPrefs();
		}
	}, [user]);
	const handleToggle = async (key, currentValue, setter) => {
		if (!user) return;
		const newValue = !currentValue;
		setter(newValue);
		const updatedPrefs = {
			email: key === "email" ? newValue : email,
			student: key === "student" ? newValue : student,
			payment: key === "payment" ? newValue : payment,
			newsletter: key === "newsletter" ? newValue : newsletter
		};
		try {
			const { error } = await supabase.from("profiles").update({ notification_prefs: updatedPrefs }).eq("id", user.id);
			if (error) throw error;
			toast.success("Préférences de notification enregistrées.");
		} catch (err) {
			console.warn("notification_prefs missing or schema error, saving in local storage fallback:", err.message);
			localStorage.setItem(`notification_prefs_${user.id}`, JSON.stringify(updatedPrefs));
			toast.success("Préférences enregistrées (localement).");
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Préférences de notification" }) }), /* @__PURE__ */ jsx(CardContent, {
			className: "space-y-5",
			children: [
				{
					label: "Notifications par email",
					desc: "Recevoir des notifications par email",
					value: email,
					onChange: () => handleToggle("email", email, setEmail)
				},
				{
					label: "Nouvelle inscription",
					desc: "Être notifié quand un élève s'inscrit",
					value: student,
					onChange: () => handleToggle("student", student, setStudent)
				},
				{
					label: "Paiements reçus",
					desc: "Confirmation à chaque paiement",
					value: payment,
					onChange: () => handleToggle("payment", payment, setPayment)
				},
				{
					label: "Newsletter EduFlex",
					desc: "Actualités et conseils",
					value: newsletter,
					onChange: () => handleToggle("newsletter", newsletter, setNewsletter)
				}
			].map((item, i) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between py-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium",
					children: item.label
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: item.desc
				})] }), /* @__PURE__ */ jsx("button", {
					onClick: item.onChange,
					className: `relative h-6 w-11 rounded-full transition-colors ${item.value ? "bg-primary" : "bg-muted"}`,
					children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.value ? "left-[22px]" : "left-0.5"}` })
				})]
			}, i))
		})]
	});
}
function AffiliationTab({ referrals, loading, totalFcfa, totalEur, paidFcfa, pendingFcfa }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 mt-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(Card, {
					className: "bg-amber-500/5 border-amber-500/20",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "pt-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-amber-800 dark:text-amber-400",
								children: "Total des gains cumulés"
							}), /* @__PURE__ */ jsx(DollarSign, { className: "h-4.5 w-4.5 text-amber-600" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-2.5",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-amber-900 dark:text-amber-300",
								children: [totalFcfa.toLocaleString("fr-FR"), " F CFA"]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-amber-700 dark:text-amber-500 font-medium",
								children: [
									"~ ",
									totalEur.toLocaleString("fr-FR"),
									" €"
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(Card, {
					className: "bg-emerald-500/5 border-emerald-500/20",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "pt-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-emerald-800 dark:text-emerald-400",
								children: "Gains payés / validés"
							}), /* @__PURE__ */ jsx(CheckCircle, { className: "h-4.5 w-4.5 text-emerald-600" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-2.5",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-emerald-900 dark:text-emerald-300",
								children: [paidFcfa.toLocaleString("fr-FR"), " F CFA"]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-emerald-700 dark:text-emerald-500 font-medium",
								children: [
									"~ ",
									Math.round(paidFcfa / 655.957).toLocaleString("fr-FR"),
									" €"
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(Card, {
					className: "bg-blue-500/5 border-blue-500/20",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "pt-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-blue-800 dark:text-blue-400",
								children: "Gains en attente de validation"
							}), /* @__PURE__ */ jsx(Clock, { className: "h-4.5 w-4.5 text-blue-600" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-2.5",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-blue-900 dark:text-blue-300",
								children: [pendingFcfa.toLocaleString("fr-FR"), " F CFA"]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-blue-700 dark:text-blue-500 font-medium",
								children: [
									"~ ",
									Math.round(pendingFcfa / 655.957).toLocaleString("fr-FR"),
									" €"
								]
							})]
						})]
					})
				})
			]
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
			className: "text-base font-semibold",
			children: [
				"Historique de vos parrainages (",
				referrals.length,
				")"
			]
		}) }), /* @__PURE__ */ jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })]
		}) : referrals.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground italic text-center py-6",
			children: "Vous n'avez pas encore généré de vente par parrainage. Partagez vos liens de cours pour commencer à gagner des commissions !"
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
							children: "Email du Filleul"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-3 px-4",
							children: "Formation"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-3 px-4",
							children: "Commission (15%)"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-3 px-4",
							children: "Statut"
						})
					]
				}) }), /* @__PURE__ */ jsx("tbody", { children: referrals.map((ref) => {
					const date = new Date(ref.created_at).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "short",
						year: "numeric"
					});
					const commissionFcfa = ref.commission_amount || 0;
					const commissionEur = Math.round(commissionFcfa / 655.957);
					return /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-border/30 hover:bg-muted/10 transition-colors",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "py-3.5 px-4 text-muted-foreground",
								children: date
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-3.5 px-4 font-medium text-foreground",
								children: ref.referred_email
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-3.5 px-4 text-muted-foreground truncate max-w-xs",
								children: ref.courses?.title || "Formation"
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "py-3.5 px-4",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-semibold text-primary",
									children: [commissionFcfa.toLocaleString("fr-FR"), " F CFA"]
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[10px] text-muted-foreground block",
									children: [
										"~ ",
										commissionEur.toLocaleString("fr-FR"),
										" €"
									]
								})]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-3.5 px-4",
								children: /* @__PURE__ */ jsx(Badge, {
									variant: ref.status === "paye" ? "default" : "secondary",
									children: ref.status === "paye" ? "Payé" : "En attente"
								})
							})
						]
					}, ref.id);
				}) })]
			})
		}) })] })]
	});
}
//#endregion
export { SettingsPage as component };
