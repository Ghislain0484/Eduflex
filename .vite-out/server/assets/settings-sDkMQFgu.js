import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as YellowPlanGuardBox } from "./YellowPlanGuardBox-30Di_CJu.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, Input, toast } from "@blinkdotnew/ui";
import { Building2, Code2, CreditCard, FileText, Plus, Receipt, Search, Settings, Upload, Users } from "lucide-react";
//#region src/routes/_app/settings.tsx?tsr-split=component
function SettingsPage() {
	const { user } = useAuth();
	const isFreePlan = !user?.subscriptionPlan || [
		"découverte",
		"decouverte",
		"free"
	].includes(user.subscriptionPlan.toLowerCase());
	const [activeTab, setActiveTab] = useState("general");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const tabParam = new URLSearchParams(window.location.search).get("tab");
			if ([
				"general",
				"team",
				"payments",
				"company",
				"seo",
				"legal",
				"api",
				"billing"
			].includes(tabParam || "")) setActiveTab(tabParam);
		}
	}, []);
	const [academyName, setAcademyName] = useState(user?.academyName || "GHISLAIN ADOHI-NGUESSAN");
	const [academySlug, setAcademySlug] = useState("ghislain");
	const [replyEmail, setReplyEmail] = useState(user?.email || "mon@email.fr");
	const [savEmail, setSavEmail] = useState(user?.email || "mon@email.fr");
	const [savPhone, setSavPhone] = useState("+225 07 00 00 00 00");
	const [mobilePhone, setMobilePhone] = useState("+225 07 00 00 00 00");
	const [suspendEnrollments, setSuspendEnrollments] = useState(false);
	const [seoTitle, setSeoTitle] = useState("GHISLAIN ADOHI-NGUESSAN");
	const [seoDescription, setSeoDescription] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [addressComplement, setAddressComplement] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [city, setCity] = useState("");
	const [regionState, setRegionState] = useState("");
	const [country, setCountry] = useState("France");
	const [legalForm, setLegalForm] = useState("");
	const [siret, setSiret] = useState("");
	const [activityDeclNumber, setActivityDeclNumber] = useState("");
	const [vatNumber, setVatNumber] = useState("");
	const [rgpdOptinActive, setRgpdOptinActive] = useState(true);
	const [rgpdText, setRgpdText] = useState("");
	const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
	const [cgvUrl, setCgvUrl] = useState("");
	const [cgvAcceptText, setCgvAcceptText] = useState("");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "text-sm font-semibold text-slate-800 dark:text-slate-200",
				children: [
					"Débloquer ",
					/* @__PURE__ */ jsx("strong", {
						className: "text-emerald-600 dark:text-emerald-400",
						children: "TOUTES"
					}),
					" les fonctionnalités pour profiter du meilleur de EduFlex"
				]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/tarifs",
					children: "Débloquer 🫱"
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-12 items-start",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 shadow-xs text-xs",
				children: [
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("general"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "general" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), " Général"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("team"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "team" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }), " Équipe"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("payments"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "payments" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" }), " Paiements"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("company"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "company" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Building2, { className: "h-4 w-4" }), " Entreprise"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("seo"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "seo" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }), " Référencement SEO"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("legal"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "legal" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }), " Liens légaux et RGPD"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("api"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "api" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Code2, { className: "h-4 w-4" }), " APIs développeur"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab("billing"),
						className: `w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === "billing" ? "bg-teal-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
						children: [/* @__PURE__ */ jsx(Receipt, { className: "h-4 w-4" }), " Facturation"]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-9 space-y-6",
				children: [
					activeTab === "general" && /* @__PURE__ */ jsxs("div", {
						className: "space-y-8",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-4 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "Informations obligatoires"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: "Renseignez des informations obligatoires pour que nous puissions configurer votre espace."
									})]
								}), /* @__PURE__ */ jsxs(Card, {
									className: "md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-slate-700 dark:text-slate-300",
												children: "Nom de l'espace"
											}), /* @__PURE__ */ jsx(Input, {
												value: academyName,
												onChange: (e) => setAcademyName(e.target.value),
												className: "text-xs h-9"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-slate-700 dark:text-slate-300",
												children: "URL de votre espace"
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx(Input, {
													value: academySlug,
													onChange: (e) => setAcademySlug(e.target.value),
													className: "text-xs font-mono h-9 flex-1"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs font-semibold text-slate-500 self-center",
													children: ".eduflex.app"
												})]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex justify-end pt-2",
											children: /* @__PURE__ */ jsx(Button, {
												onClick: () => toast.success("Informations enregistrées !"),
												className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg",
												children: "Mettre à jour"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-4 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "Domaine personnalisé"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: "Connectez votre sous-domaine personnalisé."
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "md:col-span-8",
									children: isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-4 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "Communication et SAV"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: "Coordonnées de support pour vos apprenants."
									})]
								}), /* @__PURE__ */ jsxs(Card, {
									className: "md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-slate-700 dark:text-slate-300",
												children: "Email de réponse (Reply-to)"
											}), /* @__PURE__ */ jsx(Input, {
												value: replyEmail,
												onChange: (e) => setReplyEmail(e.target.value),
												className: "text-xs h-9"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-slate-700 dark:text-slate-300",
												children: "Email de votre support (SAV)"
											}), /* @__PURE__ */ jsx(Input, {
												value: savEmail,
												onChange: (e) => setSavEmail(e.target.value),
												className: "text-xs h-9"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-slate-700 dark:text-slate-300",
												children: "Téléphone de votre support (SAV)"
											}), /* @__PURE__ */ jsx(Input, {
												value: savPhone,
												onChange: (e) => setSavPhone(e.target.value),
												className: "text-xs h-9 font-mono"
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex justify-end pt-2",
											children: /* @__PURE__ */ jsx(Button, {
												onClick: () => toast.success("Coordonnées SAV enregistrées !"),
												className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg",
												children: "Mettre à jour"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-12 items-start",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "md:col-span-4 space-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-base font-bold text-slate-900 dark:text-white",
										children: "Suspendre les inscriptions"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 leading-relaxed",
										children: "Désactivez temporairement les nouvelles ventes."
									})]
								}), /* @__PURE__ */ jsxs(Card, {
									className: "md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-slate-700 dark:text-slate-300",
										children: "Les apprenants auront toujours accès aux formations déjà acquises."
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 pt-1",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											id: "suspendCheck",
											checked: suspendEnrollments,
											onChange: (e) => setSuspendEnrollments(e.target.checked),
											className: "h-5 w-5 rounded accent-teal-600 cursor-pointer"
										}), /* @__PURE__ */ jsx("label", {
											htmlFor: "suspendCheck",
											className: "text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer",
											children: "Suspendre les inscriptions"
										})]
									})]
								})]
							})
						]
					}),
					activeTab === "team" && /* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base font-bold text-slate-900 dark:text-white",
								children: "Collaborateurs de l'académie"
							}), /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								onClick: () => toast.info("Invitation d'un nouveau formateur..."),
								className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8 gap-1",
								children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }), " Inviter un membre"]
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-500",
							children: "Ajoutez des formateurs ou assistants pour vous aider à gérer vos cours."
						})]
					}),
					activeTab === "payments" && /* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-base font-bold text-slate-900 dark:text-white",
							children: "Moyens de paiement & Passerelles"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-500",
							children: "Connectez vos comptes Wave Mobile Money, Orange Money, MTN, Moov ou Stripe pour encaisser vos règlements."
						})]
					}),
					activeTab === "company" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-4 space-y-3",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
									children: "Dites-nous tout sur votre entreprise"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: "Pour la gestion de votre facturation, nous avons besoin de vos informations légales (raison sociale, siret, adresse, etc)..."
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs font-semibold text-slate-700 dark:text-slate-300",
									children: [
										"Ces informations ",
										/* @__PURE__ */ jsx("strong", {
											className: "text-slate-900 dark:text-white",
											children: "sont privées et ne seront pas communiquées"
										}),
										" à vos apprenants."
									]
								})
							]
						}), /* @__PURE__ */ jsxs(Card, {
							className: "lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Nom de l'entreprise (Raison sociale) *"
									}), /* @__PURE__ */ jsx(Input, {
										value: companyName,
										onChange: (e) => setCompanyName(e.target.value),
										className: "text-xs h-9"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Adresse (numéro + voie) *"
									}), /* @__PURE__ */ jsx(Input, {
										value: address,
										onChange: (e) => setAddress(e.target.value),
										className: "text-xs h-9"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Complément d'adresse"
									}), /* @__PURE__ */ jsx(Input, {
										value: addressComplement,
										onChange: (e) => setAddressComplement(e.target.value),
										className: "text-xs h-9"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Code postal *"
										}), /* @__PURE__ */ jsx(Input, {
											value: postalCode,
											onChange: (e) => setPostalCode(e.target.value),
											className: "text-xs h-9"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Ville *"
										}), /* @__PURE__ */ jsx(Input, {
											value: city,
											onChange: (e) => setCity(e.target.value),
											className: "text-xs h-9"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Région / État"
										}), /* @__PURE__ */ jsx(Input, {
											value: regionState,
											onChange: (e) => setRegionState(e.target.value),
											className: "text-xs h-9"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Pays"
										}), /* @__PURE__ */ jsxs("select", {
											value: country,
											onChange: (e) => setCountry(e.target.value),
											className: "w-full h-9 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-semibold px-3 text-slate-700 dark:text-slate-300 outline-none",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "France",
													children: "France"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Côte d'Ivoire",
													children: "Côte d'Ivoire"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Sénégal",
													children: "Sénégal"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Cameroun",
													children: "Cameroun"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Gabon",
													children: "Gabon"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Belgique",
													children: "Belgique"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Forme juridique *"
										}), /* @__PURE__ */ jsx(Input, {
											placeholder: "SASU/SAS/EURL/SARL/EI/Micro...",
											value: legalForm,
											onChange: (e) => setLegalForm(e.target.value),
											className: "text-xs h-9"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Siret *"
										}), /* @__PURE__ */ jsx(Input, {
											value: siret,
											onChange: (e) => setSiret(e.target.value),
											className: "text-xs h-9 font-mono"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Numéro de Déclaration d'Activité"
										}), /* @__PURE__ */ jsx(Input, {
											value: activityDeclNumber,
											onChange: (e) => setActivityDeclNumber(e.target.value),
											className: "text-xs h-9 font-mono"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "TVA intracommunautaire"
										}), /* @__PURE__ */ jsx(Input, {
											value: vatNumber,
											onChange: (e) => setVatNumber(e.target.value),
											className: "text-xs h-9 font-mono"
										})]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-end pt-2",
									children: /* @__PURE__ */ jsx(Button, {
										onClick: () => toast.success("Informations de l'entreprise mises à jour !"),
										className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
										children: "Mettre à jour"
									})
								})
							]
						})]
					}),
					activeTab === "seo" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-4 space-y-3",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
									children: "Paramètres SEO"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: "Configurez les métadonnées qui améliorent le référencement naturel de votre page d'accueil EduFlex."
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: ["Ces données seront également affichées lors des partages sur ", /* @__PURE__ */ jsx("strong", {
										className: "text-slate-800 dark:text-slate-200",
										children: "Facebook, Twitter, LinkedIn..."
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-slate-800 dark:text-slate-200",
									children: "Ces champs doivent être modifiés avec précaution."
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => toast.info("Ouverture du tutoriel SEO..."),
									className: "text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline block pt-1",
									children: "Vous ne savez pas ce que c'est le SEO ? Regardez notre tutoriel sur le sujet."
								})
							]
						}), /* @__PURE__ */ jsxs(Card, {
							className: "lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Titre SEO (affiché sur Google, Bing, Facebook, LinkedIn...)"
										}),
										/* @__PURE__ */ jsx(Input, {
											value: seoTitle,
											onChange: (e) => setSeoTitle(e.target.value),
											className: "text-xs h-9"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-slate-400 block",
											children: "50 – 60 caractères maximum recommandés par Google"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Description SEO (affichée sur Google, Bing, Facebook, LinkedIn...)"
										}),
										/* @__PURE__ */ jsx("textarea", {
											rows: 4,
											value: seoDescription,
											onChange: (e) => setSeoDescription(e.target.value),
											className: "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-slate-400 block",
											children: "155 – 160 caractères maximum recommandés par Google"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Image (affichée sur Facebook, LinkedIn, Twitter...)"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "border border-teal-500/40 bg-teal-500/5 rounded-xl p-4 text-center cursor-pointer hover:bg-teal-500/10 transition-colors flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs",
											children: [/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }), " Téléverser"]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "p-3 bg-slate-100 dark:bg-slate-950/80 rounded-xl text-[11px] text-slate-500",
											children: "Si aucune image n'est ajoutée, l'image utilisée pour les réseaux sociaux sera votre logo."
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-end pt-2",
									children: /* @__PURE__ */ jsx(Button, {
										onClick: () => toast.success("Métadonnées SEO sauvegardées !"),
										className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
										children: "Mettre à jour"
									})
								})
							]
						})]
					}),
					activeTab === "legal" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-5 space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("h2", {
											className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
											children: "RGPD et liens légaux"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "text-sm font-bold text-slate-800 dark:text-slate-200",
											children: "Notre accord de sous-traitance des données (DPA)"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-500 leading-relaxed",
											children: "Un Accord de traitement des données (DPA) vous est mis à votre disposition afin de préciser les modalités de traitement des données dans le cadre de l'utilisation de la plateforme."
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => toast.info("Ouverture du DPA..."),
											className: "text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline",
											children: "Accord de sous-traitance des données (DPA)"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-sm font-bold text-slate-800 dark:text-slate-200",
											children: "Vos conditions générales et votre politique de confidentialité"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-500 leading-relaxed",
											children: "Le RGPD impose de communiquer à vos apprenants vos conditions générales et votre politique de confidentialité."
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-slate-500 leading-relaxed",
											children: "Par défaut, nous affichons des conditions générales et politique de confidentialité types à vos apprenants."
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-slate-400 italic block",
											children: "Tous les champs sont facultatifs."
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-4 text-xs",
									children: [
										/* @__PURE__ */ jsx("h4", {
											className: "font-bold text-slate-800 dark:text-slate-200",
											children: "Voir les modèles types"
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => toast.info("Ouverture des CGV types..."),
											className: "text-teal-600 dark:text-teal-400 hover:underline block text-[11px]",
											children: "Conditions générales de vente - Modèle apprenant"
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => toast.info("Ouverture de la Politique types..."),
											className: "text-teal-600 dark:text-teal-400 hover:underline block text-[11px]",
											children: "Politique de confidentialité - Modèle apprenant"
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs(Card, {
							className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300 block",
										children: "Activez la récolte d'email pour le marketing (RGPD)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											id: "rgpdCheck",
											checked: rgpdOptinActive,
											onChange: (e) => setRgpdOptinActive(e.target.checked),
											className: "h-5 w-5 rounded accent-teal-600 cursor-pointer"
										}), /* @__PURE__ */ jsx("label", {
											htmlFor: "rgpdCheck",
											className: "text-xs font-bold text-teal-600 dark:text-teal-400 cursor-pointer",
											children: "Activer"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Personnalisez le texte d'acceptation du marketing (RGPD)"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										placeholder: "Je veux recevoir la newsletter... OU Je veux être tenu.e au courant...",
										value: rgpdText,
										onChange: (e) => setRgpdText(e.target.value),
										className: "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Lien vers votre politique de confidentialité"
									}), /* @__PURE__ */ jsx(Input, {
										placeholder: "https://monsite.fr/lien",
										value: privacyPolicyUrl,
										onChange: (e) => setPrivacyPolicyUrl(e.target.value),
										className: "text-xs h-9"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Lien vers vos conditions générales"
									}), /* @__PURE__ */ jsx(Input, {
										placeholder: "https://monsite.fr/lien",
										value: cgvUrl,
										onChange: (e) => setCgvUrl(e.target.value),
										className: "text-xs h-9"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Personnalisez le texte d'acceptation des conditions générales"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										placeholder: "Acceptez nos conditions générales et politique de confidentialité pour continuer...",
										value: cgvAcceptText,
										onChange: (e) => setCgvAcceptText(e.target.value),
										className: "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-end pt-2",
									children: /* @__PURE__ */ jsx(Button, {
										onClick: () => toast.success("Mentions RGPD mises à jour !"),
										className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
										children: "Mettre à jour"
									})
								})
							]
						})]
					}),
					activeTab === "api" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-4 space-y-3",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
									children: "APIs Développeur"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: "Vous êtes développeur ou faites appel à un prestataire ?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-slate-700 dark:text-slate-300",
									children: "Accédez à vos données à travers une API en générant une clé unique associée à votre compte."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-8 space-y-4",
							children: [/* @__PURE__ */ jsx(Card, {
								className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300",
								children: "Vous pouvez utiliser cette clé côté client ou côté serveur. Néanmoins, vous n'aurez accès qu'à des APIs en lecture seule."
							}), isFreePlan && /* @__PURE__ */ jsx(YellowPlanGuardBox, {})]
						})]
					}),
					activeTab === "billing" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-5 space-y-3",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
									children: "Factures"
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-slate-500 leading-relaxed",
									children: [/* @__PURE__ */ jsx("strong", {
										className: "text-slate-800 dark:text-slate-200",
										children: "Besoin d'un justificatif ?"
									}), " Retrouvez ici toutes vos factures EduFlex."]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-slate-500 leading-relaxed",
									children: "Vous utilisez le forfait DÉCOUVERTE ? Nous vous adressons une facture tous les mois correspondant aux commissions que nous aurons perçues sur les règlements de vos apprenants."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-slate-500 leading-relaxed",
									children: "Vous utilisez le forfait PRO ou le forfait EXPERT ? Vous n'avez pas de commission dans ce cas, mais nous vous adressons une facture mensuelle ou annuelle correspondant à vos frais d'abonnement."
								})
							]
						}), /* @__PURE__ */ jsx(Card, {
							className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs min-h-[140px] flex items-center justify-center",
							children: /* @__PURE__ */ jsx("div", {
								className: "p-4 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center w-full",
								children: "Aucune facture pour le moment."
							})
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { SettingsPage as component };
