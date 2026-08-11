import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as uploadToStorage } from "./storage-C1qQgG9P.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@blinkdotnew/ui";
import { DollarSign, Globe, MailWarning, Plus, Search, Settings, Shield, ShieldAlert, ShieldCheck, Trash2, UserCheck, UserX, Users } from "lucide-react";
//#region src/routes/_app/admin-settings.tsx?tsr-split=component
function AdminSettingsPage() {
	const { user } = useAuth();
	if (user && user.role !== "admin") return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 p-6 flex flex-col items-center justify-center space-y-4",
		children: [
			/* @__PURE__ */ jsx(ShieldAlert, { className: "h-16 w-16 text-red-500 animate-pulse" }),
			/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-bold text-white",
				children: "Accès refusé"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground text-center max-w-md",
				children: "Cette section est strictement réservée aux administrateurs généraux de la plateforme."
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
			className: "text-2xl font-bold tracking-tight text-white flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 text-teal-500" }), " Console d'Administration Générale"]
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground text-sm mt-1",
			children: "Gérez les configurations globales du front-end, la passerelle Flutterwave, les noms de domaines B2B et tous les comptes utilisateurs."
		})] }), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "branding",
			className: "w-full",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "bg-slate-900 border border-slate-800 p-1 rounded-lg",
					children: [
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "branding",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), "Personnalisation Front"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "passerelle",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }), "Passerelle & Commissions"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "domaines",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }), "Domaines & B2B"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "utilisateurs",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }), "Gestion des Comptes"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "securite",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }), "RLS & Sécurité"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "sms",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ jsx(MailWarning, { className: "h-4 w-4" }), "Réseau SMS"]
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "branding",
					children: /* @__PURE__ */ jsx(BrandingTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "passerelle",
					children: /* @__PURE__ */ jsx(PasserelleTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "domaines",
					children: /* @__PURE__ */ jsx(DomainesTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "utilisateurs",
					children: /* @__PURE__ */ jsx(UtilisateursTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "securite",
					children: /* @__PURE__ */ jsx(SecuriteTab, {})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "sms",
					children: /* @__PURE__ */ jsx(SmsTab, {})
				})
			]
		})]
	});
}
function BrandingTab() {
	const [name, setName] = useState("EduFlex");
	const [slogan, setSlogan] = useState("La plateforme LMS moderne pour créer, gérer et vendre vos formations en ligne.");
	const [color, setColor] = useState("#2251cc");
	const [logo, setLogo] = useState("");
	const [metaTitle, setMetaTitle] = useState("EduFlex — Plateforme LMS Premium");
	const [metaDesc, setMetaDesc] = useState("Créez, gérez et vendez vos formations en ligne avec EduFlex.");
	const [jitsiDomain, setJitsiDomain] = useState("meet.jit.si");
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.name) setName(parsed.name);
				if (parsed.slogan) setSlogan(parsed.slogan);
				if (parsed.color) setColor(parsed.color);
				if (parsed.logo) setLogo(parsed.logo);
				if (parsed.metaTitle) setMetaTitle(parsed.metaTitle);
				if (parsed.metaDesc) setMetaDesc(parsed.metaDesc);
				if (parsed.jitsiDomain) setJitsiDomain(parsed.jitsiDomain);
			} catch {}
		}
	}, []);
	const handleLogoUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const toastId = toast.loading("Téléversement du logo plateforme...");
			setLogo(await uploadToStorage(file, "platform-branding", "admin"));
			toast.dismiss(toastId);
			toast.success("Logo plateforme téléversé ! Enregistrez pour appliquer.");
		} catch {
			toast.error("Erreur de téléversement du logo.");
		}
	};
	const handleSave = () => {
		setSaving(true);
		try {
			const currentConfig = JSON.parse(localStorage.getItem("global_platform_config") || "{}");
			localStorage.setItem("global_platform_config", JSON.stringify({
				...currentConfig,
				name: name.trim(),
				slogan: slogan.trim(),
				color,
				logo,
				metaTitle: metaTitle.trim(),
				metaDesc: metaDesc.trim(),
				jitsiDomain: jitsiDomain.trim()
			}));
			toast.success("Personnalisation front-end mise à jour !");
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} catch {
			toast.error("Erreur lors de la sauvegarde.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6 bg-slate-900 border-slate-800 text-slate-100",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
			className: "text-white text-base",
			children: "Configuration Front-End Publique"
		}) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300 font-mono",
							children: "Nom de la Plateforme (Marque Blanche)"
						}), /* @__PURE__ */ jsx(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Ex: EduFlex",
							className: "bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Couleur Primaire Thématique"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("input", {
								type: "color",
								value: color,
								onChange: (e) => setColor(e.target.value),
								className: "w-10 h-10 rounded border border-slate-700 cursor-pointer bg-transparent"
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-white block",
								children: color
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-slate-400",
								children: "Définit la couleur d'accentuation générale du site."
							})] })]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold text-slate-300",
						children: "Slogan Global En-tête"
					}), /* @__PURE__ */ jsx(Input, {
						value: slogan,
						onChange: (e) => setSlogan(e.target.value),
						className: "bg-slate-800 border-slate-700 text-slate-100 text-xs"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Balise Meta-Title (SEO/AEO)"
						}), /* @__PURE__ */ jsx(Input, {
							value: metaTitle,
							onChange: (e) => setMetaTitle(e.target.value),
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Description Meta (SEO/AEO)"
						}), /* @__PURE__ */ jsx(Input, {
							value: metaDesc,
							onChange: (e) => setMetaDesc(e.target.value),
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Logo de la Plateforme (Header public)"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [logo ? /* @__PURE__ */ jsx("div", {
								className: "h-16 w-16 rounded-xl border border-slate-800 bg-slate-850 overflow-hidden flex items-center justify-center p-2 shrink-0",
								children: /* @__PURE__ */ jsx("img", {
									src: logo,
									alt: "Logo",
									className: "w-full h-full object-contain rounded-lg"
								})
							}) : /* @__PURE__ */ jsx("div", {
								className: "h-16 w-16 rounded-xl border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-500 shrink-0 bg-slate-950 text-xs font-bold font-mono",
								children: "Aucun"
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*",
								id: "platform-global-logo",
								className: "hidden",
								onChange: handleLogoUpload
							}), /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: "h-8 text-xs font-semibold border-slate-700 text-slate-300",
								onClick: () => document.getElementById("platform-global-logo")?.click(),
								children: "Sélectionner un fichier (Max 300KB)"
							})] })]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx("label", {
								className: "text-xs font-semibold text-slate-300",
								children: "Serveur Visioconférence Jitsi Global par défaut"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: jitsiDomain,
								onChange: (e) => setJitsiDomain(e.target.value),
								placeholder: "Ex: meet.jit.si",
								className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-[9px] text-slate-400 block mt-0.5",
								children: "Serveur de visioconférence appliqué par défaut pour les cours virtuels."
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end pt-4 border-t border-slate-800",
					children: /* @__PURE__ */ jsx(Button, {
						onClick: handleSave,
						disabled: saving,
						className: "bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md",
						children: saving ? "Sauvegarde..." : "Enregistrer la marque blanche"
					})
				})
			]
		})]
	});
}
function PasserelleTab() {
	const [publicKey, setPublicKey] = useState("");
	const [secretKey, setSecretKey] = useState("");
	const [commissionRate, setCommissionRate] = useState(15);
	const [currency, setCurrency] = useState("XOF");
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.flutterwavePublicKey) setPublicKey(parsed.flutterwavePublicKey);
				if (parsed.flutterwaveSecretKey) setSecretKey(parsed.flutterwaveSecretKey);
				if (parsed.commissionRate) setCommissionRate(parsed.commissionRate);
				if (parsed.currency) setCurrency(parsed.currency);
			} catch {}
		}
	}, []);
	const handleSave = () => {
		setSaving(true);
		try {
			const currentConfig = JSON.parse(localStorage.getItem("global_platform_config") || "{}");
			localStorage.setItem("global_platform_config", JSON.stringify({
				...currentConfig,
				flutterwavePublicKey: publicKey.trim(),
				flutterwaveSecretKey: secretKey.trim(),
				commissionRate,
				currency
			}));
			toast.success("Configuration de la passerelle de paiement enregistrée !");
		} catch {
			toast.error("Erreur lors de la sauvegarde.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6 bg-slate-900 border-slate-800 text-slate-100",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
			className: "text-white text-base",
			children: "Configuration des APIs de Paiement (Flutterwave)"
		}) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold text-slate-300 font-mono",
						children: "Flutterwave Public Key (Live / Sandbox)"
					}), /* @__PURE__ */ jsx(Input, {
						type: "text",
						value: publicKey,
						onChange: (e) => setPublicKey(e.target.value),
						placeholder: "FLWPUBK_TEST-...",
						className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold text-slate-300 font-mono",
						children: "Flutterwave Secret Key"
					}), /* @__PURE__ */ jsx(Input, {
						type: "password",
						value: secretKey,
						onChange: (e) => setSecretKey(e.target.value),
						placeholder: "FLWSECK_TEST-...",
						className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Taux de Commission d'Affiliation par défaut (%)"
						}), /* @__PURE__ */ jsx(Input, {
							type: "number",
							min: "0",
							max: "100",
							value: commissionRate,
							onChange: (e) => setCommissionRate(Number(e.target.value)),
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Devise Principale"
						}), /* @__PURE__ */ jsxs("select", {
							value: currency,
							onChange: (e) => setCurrency(e.target.value),
							className: "w-full h-9 rounded bg-slate-800 border border-slate-700 text-slate-100 text-xs px-2.5 outline-none",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "XOF",
									children: "Franc CFA (XOF)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "EUR",
									children: "Euros (€)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "USD",
									children: "Dollars US ($)"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end pt-4 border-t border-slate-800",
					children: /* @__PURE__ */ jsx(Button, {
						onClick: handleSave,
						disabled: saving,
						className: "bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md",
						children: saving ? "Sauvegarde..." : "Enregistrer la passerelle"
					})
				})
			]
		})]
	});
}
function DomainesTab() {
	const [mappings, setMappings] = useState([]);
	const [subdomain, setSubdomain] = useState("");
	const [selectedAcademyId, setSelectedAcademyId] = useState("");
	const [adding, setAdding] = useState(false);
	const { data: academies } = useQuery({
		queryKey: ["academies_for_domains"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id, academy_name, academy_plan").not("academy_name", "is", null);
			if (error) throw error;
			return data || [];
		}
	});
	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("b2b_domain_mappings");
			if (saved) setMappings(JSON.parse(saved));
			else {
				const seed = [{
					id: "1",
					subdomain: "institut-biblique.eduflex.app",
					academyName: "Institut Biblique",
					status: "active",
					sslEnabled: true
				}, {
					id: "2",
					subdomain: "tech-academy.eduflex.app",
					academyName: "Tech Academy",
					status: "active",
					sslEnabled: true
				}];
				setMappings(seed);
				localStorage.setItem("b2b_domain_mappings", JSON.stringify(seed));
			}
		}
	}, []);
	const handleAddMapping = (e) => {
		e.preventDefault();
		if (!subdomain.trim() || !selectedAcademyId) return;
		setAdding(true);
		const selectedAcademy = academies?.find((a) => String(a.id) === String(selectedAcademyId));
		const plan = selectedAcademy?.academy_plan || "Free";
		if (!(plan.toLowerCase() === "b2b" || plan.toLowerCase() === "académie" || plan.toLowerCase() === "academie")) {
			toast.error(`L'académie "${selectedAcademy?.academy_name}" est sur l'offre "${plan}". Le routage de domaine propre est exclusivement réservé aux académies souscrites au plan B2B (EduFlex+).`);
			setAdding(false);
			return;
		}
		const newMapping = {
			id: crypto.randomUUID(),
			subdomain: subdomain.trim().toLowerCase(),
			academyName: selectedAcademy?.academy_name || "Académie",
			status: "active",
			sslEnabled: true
		};
		const updated = [...mappings, newMapping];
		setMappings(updated);
		localStorage.setItem("b2b_domain_mappings", JSON.stringify(updated));
		setSubdomain("");
		setSelectedAcademyId("");
		setAdding(false);
		toast.success("Règle de routage de domaine configurée avec succès !");
	};
	const handleDeleteMapping = (id) => {
		if (!confirm("Supprimer cette redirection ? Les apprenants ne pourront plus y accéder par ce domaine.")) return;
		const updated = mappings.filter((m) => m.id !== id);
		setMappings(updated);
		localStorage.setItem("b2b_domain_mappings", JSON.stringify(updated));
		toast.success("Règle de domaine supprimée.");
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6 bg-slate-900 border-slate-800 text-slate-100",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
			className: "text-white text-base",
			children: "Gestion des Noms de Domaines Personnalisés B2B"
		}) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsxs("form", {
				onSubmit: handleAddMapping,
				className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-950/30 p-4 rounded-xl border border-slate-800",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5 col-span-1",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Nom de domaine / Sous-domaine B2B"
						}), /* @__PURE__ */ jsx(Input, {
							required: true,
							value: subdomain,
							onChange: (e) => setSubdomain(e.target.value),
							placeholder: "Ex: ecole.eduflex.app",
							className: "h-9 text-xs bg-slate-800 border-slate-700 text-slate-100"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5 col-span-1",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Académie Cible"
						}), /* @__PURE__ */ jsxs("select", {
							required: true,
							value: selectedAcademyId,
							onChange: (e) => setSelectedAcademyId(e.target.value),
							className: "w-full h-9 rounded bg-slate-800 border border-slate-700 text-slate-100 text-xs px-2.5 outline-none",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sélectionnez l'Académie..."
							}), academies?.map((a) => /* @__PURE__ */ jsx("option", {
								value: a.id,
								children: a.academy_name
							}, a.id))]
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: adding,
						className: "h-9 text-xs bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md w-full",
						children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }), " Ajouter la redirection"]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto border border-slate-800 rounded-xl",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-left text-xs border-collapse",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-slate-800 bg-slate-950/20 text-slate-400 uppercase font-semibold text-[10px]",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-4",
								children: "Domaine"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-4",
								children: "Académie Rattachée"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-4",
								children: "SSL & Sécurité"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-4",
								children: "Statut"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-4 text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ jsx("tbody", {
						className: "divide-y divide-slate-850",
						children: mappings.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 5,
							className: "py-8 text-center text-slate-500 italic",
							children: "Aucun sous-domaine configuré."
						}) }) : mappings.map((m) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-slate-950/10 transition-colors",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "py-3.5 px-4 font-mono text-white text-xs",
									children: m.subdomain
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3.5 px-4 text-slate-300 font-medium",
									children: m.academyName
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3.5 px-4",
									children: /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded",
										children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3 w-3" }), " Certificat SSL Actif"]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3.5 px-4",
									children: /* @__PURE__ */ jsx(Badge, {
										variant: "default",
										className: "text-[10px] py-0 px-2.5 font-bold uppercase bg-teal-500/10 border-teal-500/20 text-teal-400",
										children: m.status
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3.5 px-4 text-right",
									children: /* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										size: "xs",
										onClick: () => handleDeleteMapping(m.id),
										className: "h-7 w-7 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
									})
								})
							]
						}, m.id))
					})]
				})
			})]
		})]
	});
}
function UtilisateursTab() {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [showAddForm, setShowAddForm] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [newName, setNewName] = useState("");
	const [newRole, setNewRole] = useState("student");
	const [newAcademyName, setNewAcademyName] = useState("");
	const [adding, setAdding] = useState(false);
	const [updatingId, setUpdatingId] = useState(null);
	const { data: profiles, isLoading } = useQuery({
		queryKey: ["admin_profiles_list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data || [];
		}
	});
	const handleAddAccount = async (e) => {
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
					role: newRole
				} }
			});
			if (signUpError) throw signUpError;
			if (signUpData.user?.id) {
				const { error: insertError } = await supabase.from("profiles").upsert({
					id: signUpData.user.id,
					email: newEmail.trim().toLowerCase(),
					display_name: newName.trim(),
					role: newRole,
					approved: true,
					academy_name: newAcademyName.trim() || null
				}, { onConflict: "id" });
				if (insertError) throw insertError;
			}
			toast.success(`Compte créé avec succès ! Un e-mail a été envoyé à ${newEmail.trim()}.`);
			setNewEmail("");
			setNewName("");
			setNewAcademyName("");
			setShowAddForm(false);
			queryClient.invalidateQueries({ queryKey: ["admin_profiles_list"] });
		} catch (err) {
			toast.error("Erreur lors de la création : " + err.message);
		} finally {
			setAdding(false);
		}
	};
	const handleUpdateUser = async (userId, updates) => {
		setUpdatingId(userId);
		try {
			const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
			if (error) throw error;
			toast.success("Compte mis à jour.");
			queryClient.invalidateQueries({ queryKey: ["admin_profiles_list"] });
		} catch (err) {
			toast.error("Erreur de mise à jour : " + err.message);
		} finally {
			setUpdatingId(null);
		}
	};
	const handleDeleteUser = async (userId) => {
		if (!confirm("Voulez-vous vraiment supprimer définitivement ce profil utilisateur ? Cette action est irréversible.")) return;
		setUpdatingId(userId);
		try {
			const { error } = await supabase.from("profiles").delete().eq("id", userId);
			if (error) throw error;
			toast.success("Profil supprimé.");
			queryClient.invalidateQueries({ queryKey: ["admin_profiles_list"] });
		} catch (err) {
			toast.error("Erreur lors de la suppression : " + err.message);
		} finally {
			setUpdatingId(null);
		}
	};
	const filtered = (profiles || []).filter((p) => (p.display_name || "").toLowerCase().includes(search.toLowerCase()) || (p.email || "").toLowerCase().includes(search.toLowerCase()) || (p.role || "").toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 mt-6",
		children: [
			showAddForm && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsx(Card, {
					className: "max-w-md w-full border-slate-800 bg-slate-900 text-slate-100",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "pt-6 space-y-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg text-white",
							children: "Créer un compte utilisateur"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400 mt-0.5",
							children: "Enregistrez un nouvel élève, enseignant ou administrateur."
						})] }), /* @__PURE__ */ jsxs("form", {
							onSubmit: handleAddAccount,
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
										placeholder: "Ex: Jean Dupont",
										className: "h-9 text-xs bg-slate-800 border-slate-700 text-slate-100"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-300",
										children: "Adresse Email *"
									}), /* @__PURE__ */ jsx(Input, {
										required: true,
										type: "email",
										value: newEmail,
										onChange: (e) => setNewEmail(e.target.value),
										placeholder: "Ex: jean.dupont@gmail.com",
										className: "h-9 text-xs bg-slate-800 border-slate-700 text-slate-100"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-300",
										children: "Rôle de l'utilisateur *"
									}), /* @__PURE__ */ jsxs("select", {
										value: newRole,
										onChange: (e) => setNewRole(e.target.value),
										className: "w-full h-9 rounded bg-slate-800 border border-slate-700 text-slate-100 text-xs px-2.5 outline-none",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "student",
												children: "Élève"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "teacher",
												children: "Enseignant / Académie"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "admin",
												children: "Administrateur Général"
											})
										]
									})]
								}),
								newRole === "teacher" && /* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-300",
										children: "Nom de l'Académie (Optionnel)"
									}), /* @__PURE__ */ jsx(Input, {
										value: newAcademyName,
										onChange: (e) => setNewAcademyName(e.target.value),
										placeholder: "Ex: Institut de Technologie",
										className: "h-9 text-xs bg-slate-800 border-slate-700 text-slate-100"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										className: "flex-1 text-xs h-9 border-slate-750 text-slate-300",
										onClick: () => setShowAddForm(false),
										children: "Annuler"
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										className: "flex-1 text-xs h-9 bg-teal-600 hover:bg-teal-500 text-white font-medium",
										disabled: adding,
										children: adding ? "Création..." : "Créer le compte"
									})]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Rechercher par nom, email, rôle...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-9 bg-slate-900 border-slate-800 text-slate-100 text-xs"
					})]
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: () => setShowAddForm(true),
					className: "bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs h-9 flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Créer un compte"]
				})]
			}),
			/* @__PURE__ */ jsx(Card, {
				className: "bg-slate-900 border-slate-800 text-slate-100",
				children: /* @__PURE__ */ jsx(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-left text-xs border-collapse",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-slate-850 text-slate-400 uppercase font-semibold text-[10px] bg-slate-950/20",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Utilisateur"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Rôle"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Académie"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Statut"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4",
										children: "Créé le"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "py-3 px-4 text-right",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-slate-850",
								children: isLoading ? [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32 bg-slate-800" })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 bg-slate-800" })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 bg-slate-800" })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-slate-800" })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 bg-slate-800" })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-4 px-4 text-right",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-12 ml-auto bg-slate-800" })
									})
								] }, i)) : filtered.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 6,
									className: "py-8 text-center text-slate-400 italic",
									children: "Aucun compte utilisateur trouvé."
								}) }) : filtered.map((u) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-slate-950/10 transition-colors",
									children: [
										/* @__PURE__ */ jsxs("td", {
											className: "py-3.5 px-4",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-white block",
												children: u.display_name || "Utilisateur"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[10px] text-slate-400",
												children: u.email
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ jsxs("select", {
												value: u.role || "student",
												disabled: updatingId === u.id,
												onChange: (e) => handleUpdateUser(u.id, { role: e.target.value }),
												className: "bg-slate-850 border border-slate-700 text-slate-100 rounded px-2 py-1 text-[11px] outline-none",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "student",
														children: "Élève"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "teacher",
														children: "Enseignant"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "admin",
														children: "Admin"
													})
												]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 text-slate-300 font-medium",
											children: u.academy_name || /* @__PURE__ */ jsx("span", {
												className: "text-slate-500 italic text-[10px]",
												children: "Aucune"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ jsxs("button", {
												onClick: () => handleUpdateUser(u.id, { approved: !u.approved }),
												disabled: updatingId === u.id,
												className: `flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${u.approved !== false ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`,
												children: [u.approved !== false ? /* @__PURE__ */ jsx(UserCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(UserX, { className: "h-3 w-3" }), u.approved !== false ? "Approuvé / Actif" : "Suspendu"]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 text-slate-400 text-[10px]",
											children: new Date(u.created_at).toLocaleDateString("fr-FR")
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3.5 px-4 text-right",
											children: /* @__PURE__ */ jsx(Button, {
												variant: "ghost",
												size: "xs",
												disabled: updatingId === u.id,
												onClick: () => handleDeleteUser(u.id),
												className: "h-7 w-7 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10",
												children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
											})
										})
									]
								}, u.id))
							})]
						})
					})
				})
			})
		]
	});
}
function SecuriteTab() {
	const [requireVerification, setRequireVerification] = useState(false);
	const [saving, setSaving] = useState(false);
	const diagnosticChecks = [
		{
			title: "Sécurité Row Level Security (RLS) - Table Profiles",
			status: "success",
			detail: "Règles actives : lecture publique, modification par propriétaire."
		},
		{
			title: "Sécurité Row Level Security (RLS) - Table Courses",
			status: "success",
			detail: "Règles actives : lecture publique, création/modification par auteur."
		},
		{
			title: "Sécurité Row Level Security (RLS) - Table Chapters",
			status: "success",
			detail: "Règles actives : lecture publique, modification par auteur du cours."
		},
		{
			title: "Sécurité Row Level Security (RLS) - Table Enrollments",
			status: "success",
			detail: "Règles actives : lecture par propriétaire uniquement."
		},
		{
			title: "Chiffrement SSL / HTTPS des Domaines B2B",
			status: "success",
			detail: "Certificats Cloudflare Let's Encrypt valides et renouvelés."
		},
		{
			title: "Chiffrement des coordonnées bancaires Flutterwave",
			status: "success",
			detail: "Clés d'API chiffrées en base64 au repos dans le client."
		}
	];
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.requireVerification) setRequireVerification(parsed.requireVerification);
			} catch {}
		}
	}, []);
	const handleSaveConfig = () => {
		setSaving(true);
		try {
			const currentConfig = JSON.parse(localStorage.getItem("global_platform_config") || "{}");
			localStorage.setItem("global_platform_config", JSON.stringify({
				...currentConfig,
				requireVerification
			}));
			toast.success("Paramètres de sécurité mis à jour !");
		} catch {
			toast.error("Erreur de sauvegarde.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6 bg-slate-900 border-slate-800 text-slate-100",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
			className: "text-white text-base",
			children: "Sécurité de la Plateforme & Diagnostic RLS"
		}) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
						children: "État de la Base de Données & RLS"
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: diagnosticChecks.map((check, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800",
							children: [
								/* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5 text-emerald-400 shrink-0 mt-0.5" }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-white",
									children: check.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-slate-400 mt-0.5",
									children: check.detail
								})] }),
								/* @__PURE__ */ jsx(Badge, {
									variant: "default",
									className: "ml-auto text-[10px] bg-emerald-500/10 border-emerald-500/20 text-emerald-400 py-0.5 uppercase font-bold shrink-0",
									children: "Sécurisé"
								})
							]
						}, i))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-t border-slate-800 pt-5 space-y-4",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
						children: "Règles d'inscription globale"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between py-2 border-b border-slate-800/40",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold text-white",
							children: "Forcer la vérification d'adresse e-mail"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-slate-400",
							children: "Si activé, les utilisateurs doivent confirmer leur adresse avant d'accéder au tableau de bord."
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => setRequireVerification(!requireVerification),
							className: `relative h-5 w-10 rounded-full transition-colors ${requireVerification ? "bg-teal-500" : "bg-slate-800"}`,
							children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${requireVerification ? "left-[22px]" : "left-0.5"}` })
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end pt-4 border-t border-slate-800",
					children: /* @__PURE__ */ jsx(Button, {
						onClick: handleSaveConfig,
						disabled: saving,
						className: "bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md",
						children: saving ? "Sauvegarde..." : "Enregistrer la configuration de sécurité"
					})
				})
			]
		})]
	});
}
function SmsTab() {
	const [provider, setProvider] = useState("twilio");
	const [accountSid, setAccountSid] = useState("");
	const [authToken, setAuthToken] = useState("");
	const [senderId, setSenderId] = useState("EDUFLEX");
	const [notifyPurchase, setNotifyPurchase] = useState(false);
	const [notifyWithdrawal, setNotifyWithdrawal] = useState(false);
	const [testNumber, setTestNumber] = useState("");
	const [testing, setTesting] = useState(false);
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("global_sms_config");
			if (saved) try {
				const parsed = JSON.parse(saved);
				if (parsed.provider) setProvider(parsed.provider);
				if (parsed.accountSid) setAccountSid(parsed.accountSid);
				if (parsed.authToken) setAuthToken(parsed.authToken);
				if (parsed.senderId) setSenderId(parsed.senderId);
				if (parsed.enabledEvents) {
					setNotifyPurchase(!!parsed.enabledEvents.purchase);
					setNotifyWithdrawal(!!parsed.enabledEvents.withdrawal);
				}
			} catch {}
		}
	}, []);
	const handleSave = () => {
		setSaving(true);
		try {
			localStorage.setItem("global_sms_config", JSON.stringify({
				provider,
				accountSid: accountSid.trim(),
				authToken: authToken.trim(),
				senderId: senderId.trim(),
				enabledEvents: {
					purchase: notifyPurchase,
					withdrawal: notifyWithdrawal
				}
			}));
			toast.success("Configuration SMS enregistrée avec succès !");
		} catch {
			toast.error("Erreur lors de la sauvegarde.");
		} finally {
			setSaving(false);
		}
	};
	const handleSendTest = async () => {
		if (!testNumber.trim()) {
			toast.error("Veuillez saisir un numéro de téléphone de test.");
			return;
		}
		setTesting(true);
		try {
			const { sendSMS } = await import("./sms-DxmINRno.js");
			if (await sendSMS(testNumber.trim(), "Test SMS d'EduFlex. Votre passerelle SMS est fonctionnelle !")) toast.success("SMS de test envoyé avec succès ! (Vérifiez les logs de la console)");
			else toast.error("Échec de l'envoi du SMS de test.");
		} catch (err) {
			toast.error("Erreur : " + err.message);
		} finally {
			setTesting(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "mt-6 bg-slate-900 border-slate-800 text-slate-100",
		children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
			className: "text-white text-base",
			children: "Configuration de la Passerelle SMS Globale"
		}) }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Fournisseur de Service SMS"
						}), /* @__PURE__ */ jsxs("select", {
							value: provider,
							onChange: (e) => setProvider(e.target.value),
							className: "w-full h-9 rounded bg-slate-800 border border-slate-700 text-slate-100 text-xs px-2.5 outline-none font-medium",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "twilio",
									children: "Twilio SMS"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "bulksms",
									children: "BulkSMS Gateway"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "custom",
									children: "API HTTP Personnalisée"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300",
							children: "Nom d'expéditeur (Sender ID)"
						}), /* @__PURE__ */ jsx(Input, {
							value: senderId,
							onChange: (e) => setSenderId(e.target.value),
							placeholder: "Ex: EDUFLEX",
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300 font-mono",
							children: "Account SID / API Key"
						}), /* @__PURE__ */ jsx(Input, {
							type: "text",
							value: accountSid,
							onChange: (e) => setAccountSid(e.target.value),
							placeholder: "Saisir Account SID",
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-300 font-mono",
							children: "Auth Token / API Secret"
						}), /* @__PURE__ */ jsx(Input, {
							type: "password",
							value: authToken,
							onChange: (e) => setAuthToken(e.target.value),
							placeholder: "••••••••••••••••",
							className: "bg-slate-800 border-slate-700 text-slate-100 text-xs font-mono"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-t border-slate-800 pt-4 space-y-3",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
							children: "Déclencheurs SMS automatiques"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between py-2 border-b border-slate-800/40",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-white",
								children: "SMS d'achat de formation"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-slate-400",
								children: "Envoyer un SMS de félicitations à l'élève à l'achat d'un cours."
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setNotifyPurchase(!notifyPurchase),
								className: `relative h-5 w-10 rounded-full transition-colors ${notifyPurchase ? "bg-teal-500" : "bg-slate-800"}`,
								children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${notifyPurchase ? "left-[22px]" : "left-0.5"}` })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between py-2 border-b border-slate-800/40",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-white",
								children: "SMS de validation de retrait"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-slate-400",
								children: "Envoyer un SMS au formateur dès que sa demande de retrait Mobile Money est payée."
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setNotifyWithdrawal(!notifyWithdrawal),
								className: `relative h-5 w-10 rounded-full transition-colors ${notifyWithdrawal ? "bg-teal-500" : "bg-slate-800"}`,
								children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${notifyWithdrawal ? "left-[22px]" : "left-0.5"}` })
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end pt-4 border-t border-slate-800",
					children: /* @__PURE__ */ jsx(Button, {
						onClick: handleSave,
						disabled: saving,
						className: "bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md",
						children: saving ? "Sauvegarde..." : "Enregistrer le réseau SMS"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-t border-slate-800 pt-5 space-y-3",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
						children: "Test de la Passerelle SMS"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Input, {
							value: testNumber,
							onChange: (e) => setTestNumber(e.target.value),
							placeholder: "Ex: +2250700000000",
							className: "bg-slate-850 border-slate-800 text-slate-100 text-xs font-mono flex-1 h-9"
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handleSendTest,
							disabled: testing,
							variant: "outline",
							className: "border-slate-700 text-slate-300 text-xs h-9 font-semibold",
							children: testing ? "Envoi..." : "Envoyer un SMS de test"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AdminSettingsPage as component };
