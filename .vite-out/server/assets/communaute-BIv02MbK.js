import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, Badge, Button, Card, Input, toast } from "@blinkdotnew/ui";
import { MessageCircle, MessageSquare, Pin, Send, ThumbsUp, Users } from "lucide-react";
//#region src/routes/_app/communaute.tsx?tsr-split=component
function CommunautePage() {
	const { user } = useAuth();
	const [posts, setPosts] = useState([{
		id: 1,
		author: user?.displayName || "Formateur Principal",
		role: "Enseignant",
		avatar: "FP",
		time: "Il y a 2h",
		title: "Bienvenue dans la communauté EduFlex ! 🚀",
		content: "Posez vos questions, échangez vos retours d'expérience et entraidez-vous sur les cours.",
		likes: 12,
		replies: 4,
		pinned: true
	}, {
		id: 2,
		author: "Moussa Diakité",
		role: "Élève",
		avatar: "MD",
		time: "Il y a 5h",
		title: "Question sur l'exercice du Chapitre 3",
		content: "Est-ce que quelqu'un a réussi à résoudre la deuxième partie du cas pratique Excel ?",
		likes: 3,
		replies: 2
	}]);
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const handleCreatePost = (e) => {
		e.preventDefault();
		if (!newTitle.trim() || !newContent.trim()) return;
		setIsPosting(true);
		setTimeout(() => {
			setPosts([{
				id: Date.now(),
				author: user?.displayName || "Utilisateur",
				role: user?.role === "teacher" ? "Enseignant" : "Élève",
				avatar: (user?.displayName || "U").slice(0, 2).toUpperCase(),
				time: "À l'instant",
				title: newTitle,
				content: newContent,
				likes: 0,
				replies: 0
			}, ...posts]);
			setNewTitle("");
			setNewContent("");
			setIsPosting(false);
			toast.success("Publication publiée sur le forum !");
		}, 400);
	};
	const handleLike = (id) => {
		setPosts(posts.map((p) => p.id === id ? {
			...p,
			likes: p.likes + 1
		} : p));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-black text-white flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-6 w-6 text-teal-400" }), "Communauté & Entraide"]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-slate-400",
					children: "Espace d'échange en temps réel entre apprenants et formateurs."
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-4",
				children: [/* @__PURE__ */ jsx(Card, {
					className: "border border-border/80 bg-card p-5",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: handleCreatePost,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-xs font-bold text-foreground uppercase tracking-wider",
								children: "Créer une discussion"
							}),
							/* @__PURE__ */ jsx(Input, {
								placeholder: "Titre de votre sujet...",
								value: newTitle,
								onChange: (e) => setNewTitle(e.target.value),
								className: "text-xs"
							}),
							/* @__PURE__ */ jsx("textarea", {
								placeholder: "Exprimez-vous ou posez une question...",
								value: newContent,
								onChange: (e) => setNewContent(e.target.value),
								rows: 3,
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-ring resize-none"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									disabled: isPosting || !newTitle.trim(),
									size: "sm",
									className: "bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs",
									children: [/* @__PURE__ */ jsx(Send, { className: "h-3.5 w-3.5 mr-1.5" }), " Publier"]
								})
							})
						]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: posts.map((post) => /* @__PURE__ */ jsxs(Card, {
						className: "border border-border/70 bg-card p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(Avatar, {
										className: "h-8 w-8",
										children: /* @__PURE__ */ jsx(AvatarFallback, {
											className: "text-xs font-bold bg-teal-500/10 text-teal-500",
											children: post.avatar
										})
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-foreground",
											children: post.author
										}), /* @__PURE__ */ jsx(Badge, {
											className: "text-[9px] bg-slate-800 text-slate-300 border-none font-semibold",
											children: post.role
										})]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-muted-foreground",
										children: post.time
									})] })]
								}), post.pinned && /* @__PURE__ */ jsxs(Badge, {
									className: "bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] font-bold flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(Pin, { className: "h-3 w-3" }), " Épinglé"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-sm font-bold text-white leading-snug",
									children: post.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: post.content
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 pt-2 border-t border-border/40 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => handleLike(post.id),
									className: "flex items-center gap-1.5 hover:text-teal-400 transition-colors font-medium",
									children: [
										/* @__PURE__ */ jsx(ThumbsUp, { className: "h-3.5 w-3.5" }),
										" ",
										post.likes,
										" J'aime"
									]
								}), /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1.5 font-medium",
									children: [
										/* @__PURE__ */ jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
										" ",
										post.replies,
										" Réponses"
									]
								})]
							})
						]
					}, post.id))
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ jsxs(Card, {
					className: "border border-border/70 bg-card p-5 space-y-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-xs font-bold text-foreground uppercase tracking-wider",
						children: "Membres Actifs"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-teal-400" }), /* @__PURE__ */ jsx("span", { children: "142 apprenants inscrits dans l'académie." })]
					})]
				})
			})]
		})]
	});
}
//#endregion
export { CommunautePage as component };
