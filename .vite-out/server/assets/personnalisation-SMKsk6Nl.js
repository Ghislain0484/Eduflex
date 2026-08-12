import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Card, Input, toast } from "@blinkdotnew/ui";
import { Trash2, Upload } from "lucide-react";
//#region src/routes/_app/personnalisation.tsx?tsr-split=component
function PersonnalisationPage() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("design");
	const [primaryColor, setPrimaryColor] = useState("#0d9488");
	const [bgColor, setBgColor] = useState("#ffffff");
	const [titleColor, setTitleColor] = useState("#0f172a");
	const [textColor, setTextColor] = useState("#334155");
	const [btnColor, setBtnColor] = useState("#0d9488");
	const [btnTextColor, setBtnTextColor] = useState("#ffffff");
	const [socialType, setSocialType] = useState("Site Web");
	const [socialLink, setSocialLink] = useState("");
	const [socialList, setSocialList] = useState([{
		id: 1,
		type: "WhatsApp",
		url: "https://wa.me/225070000000"
	}]);
	const handleAddSocial = (e) => {
		e.preventDefault();
		if (!socialLink.trim()) {
			toast.error("Veuillez entrer une URL valide.");
			return;
		}
		setSocialList([...socialList, {
			id: Date.now(),
			type: socialType,
			url: socialLink
		}]);
		setSocialLink("");
		toast.success("Lien réseau social ajouté !");
	};
	const handleRemoveSocial = (id) => {
		setSocialList(socialList.filter((s) => s.id !== id));
		toast.success("Lien supprimé.");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans",
		children: [
			/* @__PURE__ */ jsxs("div", {
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
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-1",
				children: /* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-black text-slate-900 dark:text-white tracking-tight",
					children: "Personnalisez votre plateforme"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("design"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "design" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Design"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("pages"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "pages" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Pages"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveTab("learner"),
						className: `px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "learner" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`,
						children: "Espace apprenant"
					})
				]
			}),
			activeTab === "design" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
								children: "Créez votre image de marque"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
								children: [
									"Pour se différencier des autres formations en ligne, il faut être identifiable et reconnaissable. EduFlex vous permet de choisir ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-slate-900 dark:text-white",
										children: "votre logo et vos couleurs"
									}),
									"."
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 leading-relaxed",
								children: [
									"Ces éléments apparaîtront sur votre page d'accueil accessible en ",
									/* @__PURE__ */ jsx(Link, {
										to: "/courses",
										target: "_blank",
										className: "text-teal-500 hover:underline font-semibold",
										children: "cliquant ici"
									}),
									"."
								]
							})
						]
					}), /* @__PURE__ */ jsxs(Card, {
						className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Logo (1024x1024 max)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-6 text-center hover:border-teal-500 cursor-pointer transition-colors space-y-2 bg-slate-50 dark:bg-slate-950",
										children: [/* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-slate-400 mx-auto" }), /* @__PURE__ */ jsx("p", {
											className: "text-[11px] font-semibold text-slate-600 dark:text-slate-400",
											children: "Cliquez ou glissez votre image"
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-slate-700 dark:text-slate-300",
										children: "Favicon (64x64 max, en PNG)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-6 text-center hover:border-teal-500 cursor-pointer transition-colors space-y-2 bg-slate-50 dark:bg-slate-950",
										children: [/* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-slate-400 mx-auto" }), /* @__PURE__ */ jsx("p", {
											className: "text-[11px] font-semibold text-slate-600 dark:text-slate-400",
											children: "Cliquez ou glissez votre image"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur principale"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: primaryColor,
												onChange: (e) => setPrimaryColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: primaryColor,
												onChange: (e) => setPrimaryColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur d'arrière-plan"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: bgColor,
												onChange: (e) => setBgColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: bgColor,
												onChange: (e) => setBgColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur des titres"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: titleColor,
												onChange: (e) => setTitleColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: titleColor,
												onChange: (e) => setTitleColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur des textes"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: textColor,
												onChange: (e) => setTextColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: textColor,
												onChange: (e) => setTextColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur des boutons"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: btnColor,
												onChange: (e) => setBtnColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: btnColor,
												onChange: (e) => setBtnColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-slate-700 dark:text-slate-300",
											children: "Couleur du texte des boutons"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "color",
												value: btnTextColor,
												onChange: (e) => setBtnTextColor(e.target.value),
												className: "h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5"
											}), /* @__PURE__ */ jsx(Input, {
												value: btnTextColor,
												onChange: (e) => setBtnTextColor(e.target.value),
												className: "text-xs font-mono h-9"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ jsx(Button, {
									onClick: () => toast.success("Thème visuel de l'académie mis à jour !"),
									className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg",
									children: "Mettre à jour"
								})
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-12 items-start border-t border-slate-200 dark:border-slate-800 pt-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-black text-slate-900 dark:text-white tracking-tight",
								children: "Vos liens sociaux"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium",
								children: "Ajoutez des liens vers un site externe, votre page Facebook, Twitter, Instagram, WhatsApp ou n'importe quelle autre page qui aidera vos apprenants à en savoir plus sur vous."
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-slate-500 leading-relaxed",
								children: [
									"Ces liens apparaîtront sur votre page d'accueil accessible en ",
									/* @__PURE__ */ jsx(Link, {
										to: "/courses",
										target: "_blank",
										className: "text-teal-500 hover:underline font-semibold",
										children: "cliquant ici"
									}),
									"."
								]
							})
						]
					}), /* @__PURE__ */ jsxs(Card, {
						className: "lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4",
						children: [/* @__PURE__ */ jsxs("form", {
							onSubmit: handleAddSocial,
							className: "space-y-3",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-slate-700 dark:text-slate-300",
								children: "Lien vers une page web"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ jsxs("select", {
										value: socialType,
										onChange: (e) => setSocialType(e.target.value),
										className: "h-9 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none px-3 cursor-pointer shrink-0",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "Site Web",
												children: "Site Web"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Facebook",
												children: "Facebook"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Instagram",
												children: "Instagram"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "WhatsApp",
												children: "WhatsApp"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "LinkedIn",
												children: "LinkedIn"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "YouTube",
												children: "YouTube"
											})
										]
									}),
									/* @__PURE__ */ jsx(Input, {
										placeholder: "Entrez votre lien (https://monsite.fr)",
										value: socialLink,
										onChange: (e) => setSocialLink(e.target.value),
										className: "text-xs h-9 bg-white dark:bg-slate-950 flex-1"
									}),
									/* @__PURE__ */ jsx(Button, {
										type: "submit",
										className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-4 rounded-lg shrink-0",
										children: "Ajouter"
									})
								]
							})]
						}), socialList.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-slate-700 dark:text-slate-300",
								children: "Liens ajoutés :"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-1.5",
								children: socialList.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "font-semibold text-teal-600 dark:text-teal-400",
										children: [
											item.type,
											" : ",
											/* @__PURE__ */ jsx("span", {
												className: "text-slate-600 dark:text-slate-300 font-normal",
												children: item.url
											})
										]
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => handleRemoveSocial(item.id),
										className: "text-red-500 hover:text-red-400 p-1",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
									})]
								}, item.id))
							})]
						})]
					})]
				})]
			}),
			activeTab === "pages" && /* @__PURE__ */ jsx(Card, {
				className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs text-xs text-slate-500",
				children: "Personnalisation des pages de destination et mentions légales..."
			}),
			activeTab === "learner" && /* @__PURE__ */ jsx(Card, {
				className: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs text-xs text-slate-500",
				children: "Personnalisation du thème et du lecteur de cours de l'espace apprenant..."
			})
		]
	});
}
//#endregion
export { PersonnalisationPage as component };
