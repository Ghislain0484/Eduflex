import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as useFlutterwave } from "./useFlutterwave-DtCXXsFg.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, toast } from "@blinkdotnew/ui";
import { Check, Sparkles, X } from "lucide-react";
//#region src/routes/tarifs.tsx?tsr-split=component
function TarifsPage() {
	const { user } = useAuth();
	const { makePayment } = useFlutterwave();
	const [currency, setCurrency] = useState("FCFA");
	const [selectedPlanModal, setSelectedPlanModal] = useState(null);
	const handleSubscribe = async (planName, priceFcfa, priceEur) => {
		try {
			await makePayment({
				amount: currency === "FCFA" ? priceFcfa : Math.round(priceEur * 655.957),
				currency: currency === "FCFA" ? "XOF" : "EUR",
				courseTitle: `Abonnement EduFlex ${planName}`,
				userEmail: user?.email || "formateur@eduflex.com",
				userName: user?.displayName || "Formateur"
			});
			setSelectedPlanModal(null);
			toast.success(`Félicitations ! Votre académie est désormais sur le Forfait ${planName} !`);
		} catch (err) {
			toast.info(`Abonnement ${planName} activé en mode démonstration !`);
			setSelectedPlanModal(null);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 text-left",
		children: [/* @__PURE__ */ jsx("header", {
			className: "sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg",
			children: /* @__PURE__ */ jsxs("nav", {
				className: "max-w-7xl mx-auto flex items-center justify-between h-16 px-6",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20",
						children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ jsxs("span", {
						className: "font-bold text-lg tracking-tight text-white flex items-center gap-1",
						children: ["EduFlex", /* @__PURE__ */ jsx("span", {
							className: "text-teal-400 font-extrabold text-xs",
							children: "OFFRES"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/dashboard",
						className: "text-xs font-semibold text-slate-300 hover:text-white transition-colors",
						children: "Tableau de bord"
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "sm",
						className: "bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-lg shadow-teal-500/20 border-none",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/courses",
							children: "Espace Apprenant"
						})
					})]
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-6 py-10 space-y-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center space-y-3 max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl sm:text-4xl font-black text-white tracking-tight",
						children: "Découvrez les tarifs transparents de EduFlex"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-slate-400 font-medium",
						children: "Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-center gap-2 pt-3",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setCurrency("FCFA"),
							className: `px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${currency === "FCFA" ? "bg-teal-600 text-white shadow-md" : "bg-slate-900 text-slate-400 hover:text-white"}`,
							children: "Francs CFA (XOF/XAF)"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setCurrency("EUR"),
							className: `px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${currency === "EUR" ? "bg-teal-600 text-white shadow-md" : "bg-slate-900 text-slate-400 hover:text-white"}`,
							children: "Euros (€)"
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 md:grid-cols-3 max-w-6xl mx-auto",
				children: [
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ jsx(Badge, {
										variant: "outline",
										className: "border-slate-700 text-slate-400 text-[10px]",
										children: "Découverte"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-black text-white",
										children: "Découverte"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-2xl font-bold text-white",
										children: [
											"0 ",
											currency === "EUR" ? "€" : "FCFA",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "text-xs font-normal text-slate-400",
												children: "/ mois"
											})
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-slate-400",
										children: "Pour lancer votre premier produit et tester l'écosystème."
									})
								]
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " 1 formation active"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " 50 apprenants maximum"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Quiz et certificats basiques"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Frais de transaction: 5%"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2 text-slate-500",
										children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-slate-700 shrink-0" }), " Pas de classes virtuelles Live"]
									})
								]
							})]
						}), /* @__PURE__ */ jsx(Button, {
							disabled: true,
							className: "w-full bg-slate-800/60 text-slate-400 font-bold text-xs h-10 cursor-not-allowed",
							children: "Forfait Actuel"
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border-2 border-teal-500 bg-teal-950/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xl shadow-teal-500/10",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-0 right-6 -translate-y-1/2 bg-teal-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full",
								children: "POPULAIRE"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ jsx(Badge, {
											className: "bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px]",
											children: "Recommandé"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "text-xl font-black text-white",
											children: "Pro"
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "text-2xl font-black text-teal-400",
											children: [
												currency === "EUR" ? "49 €" : "32 000 FCFA",
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-normal text-slate-400",
													children: "/ mois"
												})
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[11px] text-slate-400",
											children: "Le tout inclus pour les formateurs, coachs et infopreneurs."
										})
									]
								}), /* @__PURE__ */ jsxs("ul", {
									className: "space-y-2.5 text-xs text-slate-200 border-t border-slate-800/80 pt-4",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Formations illimitées"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Apprenants illimités"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Classes virtuelles Live (EduFlex Meet)"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Certificats Canvas HD automatisés"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-teal-400 shrink-0" }), " Frais de transaction réduits: 3%"]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: () => handleSubscribe("Pro", 32e3, 49),
								className: "w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 shadow-md border-none",
								children: "Lancer mon Académie Pro"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ jsx(Badge, {
										variant: "outline",
										className: "border-amber-500/30 text-amber-400 text-[10px]",
										children: "Établissements & B2B"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-black text-white",
										children: "Académie B2B"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-2xl font-black text-amber-400",
										children: [
											currency === "EUR" ? "89 €" : "59 000 FCFA",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "text-xs font-normal text-slate-400",
												children: "/ mois"
											})
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-slate-400",
										children: "Pour les universités, lycées et centres de formation officiels."
									})
								]
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-400 shrink-0" }), " Personnalisation White-Label (Marque)"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-400 shrink-0" }), " Nom de domaine propre (ex: cours.ecole.com)"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-400 shrink-0" }), " Multi-comptes formateurs (jusqu'à 10)"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-400 shrink-0" }), " Support VIP WhatsApp & Téléphone 24/7"]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-amber-400 shrink-0" }), " Frais de transaction ultra-bas: 1%"]
									})
								]
							})]
						}), /* @__PURE__ */ jsx(Button, {
							onClick: () => handleSubscribe("Académie B2B", 59e3, 89),
							className: "w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-10 border border-slate-700",
							children: "Activer l'Académie B2B"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { TarifsPage as component };
