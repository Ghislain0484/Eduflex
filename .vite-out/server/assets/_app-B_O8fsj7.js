import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-eAXdAeIa.js";
import { t as cn } from "./utils-C_uf36nf.js";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AppShell, AppShellMain, AppShellSidebar, Avatar, AvatarFallback, Button, MobileSidebarTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@blinkdotnew/ui";
import { BarChart3, Bell, BookOpen, Building, Calendar, ChevronDown, ChevronRight, Code2, Eye, Gem, Globe, GraduationCap, HelpCircle, Home, Layers, LogOut, Megaphone, Moon, Palette, PanelLeft, Percent, Settings, Share2, ShieldAlert, Sparkles, Sun, User, Users, Video, Wallet, X } from "lucide-react";
//#region src/components/AppTopHeader.tsx
function AppTopHeader() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);
	const displayName = user?.displayName || user?.email?.split("@")[0] || "Ghislain";
	const initials = displayName.slice(0, 2).toUpperCase();
	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ jsxs(TooltipProvider, {
		delayDuration: 100,
		children: [/* @__PURE__ */ jsxs("header", {
			className: "sticky top-0 z-40 h-[52px] w-full border-b border-border/60 bg-background/95 backdrop-blur-md px-4 flex items-center justify-between shadow-2xs",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-2",
				children: user?.academyName && /* @__PURE__ */ jsxs("span", {
					className: "hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-accent/50 px-2.5 py-1 rounded-full border border-border/40",
					children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), user.academyName]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/courses",
								target: "_blank",
								children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
							})
						})
					}), /* @__PURE__ */ jsx(TooltipContent, {
						side: "bottom",
						className: "text-xs",
						children: "Aperçu espace public"
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setNotifOpen(!notifOpen),
								className: "h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 relative",
								children: [/* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-teal-500" })]
							})
						}), /* @__PURE__ */ jsx(TooltipContent, {
							side: "bottom",
							className: "text-xs",
							children: "Notifications"
						})] }), notifOpen && /* @__PURE__ */ jsxs("div", {
							className: "absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 text-left space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b border-slate-800 pb-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-white",
									children: "Notifications"
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => setNotifOpen(false),
									className: "text-slate-400 hover:text-white",
									children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-2 text-xs",
								children: /* @__PURE__ */ jsxs("div", {
									className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-0.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-bold text-teal-400",
										children: "Bienvenue sur EduFlex !"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-slate-400",
										children: "Votre académie en ligne est prête à accueillir vos premiers apprenants."
									})]
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setHelpOpen(true),
							className: "h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60",
							children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ jsx(TooltipContent, {
						side: "bottom",
						className: "text-xs",
						children: "Centre d'aide & FAQ"
					})] }),
					/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/courses",
								children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-4.5 w-4.5 text-teal-400" })
							})
						})
					}), /* @__PURE__ */ jsx(TooltipContent, {
						side: "bottom",
						className: "text-xs",
						children: "Espace apprenant"
					})] }),
					/* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-border/60 mx-1" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setDropdownOpen(!dropdownOpen),
							className: "flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-800/60 transition-colors text-left focus:outline-none",
							children: [
								/* @__PURE__ */ jsx(Avatar, {
									className: "h-7 w-7 border border-teal-500/30",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "text-[11px] font-bold bg-teal-500/10 text-teal-400",
										children: initials
									})
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-slate-200 hidden sm:inline-block max-w-[120px] truncate",
									children: displayName
								}),
								/* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 text-slate-400" })
							]
						}), dropdownOpen && /* @__PURE__ */ jsxs("div", {
							className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 text-left z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800",
							onClick: () => setDropdownOpen(false),
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "py-1",
									children: [/* @__PURE__ */ jsxs(Link, {
										to: "/settings",
										className: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors",
										children: [/* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-slate-400" }), " Mon compte"]
									}), /* @__PURE__ */ jsxs(Link, {
										to: "/tarifs",
										className: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors",
										children: [/* @__PURE__ */ jsx(Gem, { className: "h-4 w-4 text-amber-500" }), " Abonnement"]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "py-1",
									children: [/* @__PURE__ */ jsxs(Link, {
										to: "/courses",
										className: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors",
										children: [/* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-teal-500" }), " Espace apprenant"]
									}), /* @__PURE__ */ jsxs(Link, {
										to: "/affiliation",
										className: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors",
										children: [/* @__PURE__ */ jsx(Share2, { className: "h-4 w-4 text-slate-400" }), " Programme affilié"]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "py-1",
									children: /* @__PURE__ */ jsxs("button", {
										onClick: handleLogout,
										className: "w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left",
										children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 text-red-500" }), " Déconnexion"]
									})
								})
							]
						})]
					})
				]
			})]
		}), helpOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-left space-y-4 animate-in fade-in zoom-in-95",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-b border-slate-800 pb-3",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "text-sm font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(HelpCircle, { className: "h-4.5 w-4.5 text-teal-400" }), " Centre d'aide & Support EduFlex"]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setHelpOpen(false),
						className: "text-slate-400 hover:text-white",
						children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-3 text-xs text-slate-300",
					children: [
						/* @__PURE__ */ jsx("p", { children: "Besoin d'aide pour configurer votre académie ou lancer vos cours ?" }),
						/* @__PURE__ */ jsxs("div", {
							className: "p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold text-white",
								children: "📧 Email Support :"
							}), /* @__PURE__ */ jsx("a", {
								href: "mailto:support@eduflex.com",
								className: "text-teal-400 hover:underline",
								children: "support@eduflex.com"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold text-white",
								children: "🎓 Académie des Formateurs :"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/academy-hub",
								onClick: () => setHelpOpen(false),
								className: "text-teal-400 hover:underline",
								children: "Accéder aux masterclasses & guides →"
							})]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
//#region src/Shell.tsx
function Shell({ sidebar, appName = "App", children }) {
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(AppShellSidebar, {
		className: "shrink-0",
		children: sidebar
	}), /* @__PURE__ */ jsxs(AppShellMain, {
		className: "flex flex-col flex-1 min-h-screen",
		children: [
			/* @__PURE__ */ jsx(AppTopHeader, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:hidden flex items-center gap-3 px-4 h-12 border-b border-border bg-background sticky top-13 z-30",
				children: [/* @__PURE__ */ jsx(MobileSidebarTrigger, {}), /* @__PURE__ */ jsx("span", {
					className: "font-semibold text-sm",
					children: appName
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1",
				children
			})
		]
	})] });
}
//#endregion
//#region src/components/AppSidebarShell.tsx
/**
* Collapsible SaaS sidebar — OPT-IN (rendered by SharedAppLayout, which the
* template root does NOT apply by default). Only reach for this when building a
* SaaS / dashboard app; landing & marketing pages stay full-bleed.
*
* Expands to 15rem, collapses to 3rem (icon-only).
* State is persisted to localStorage. Tooltips appear automatically when collapsed.
*/
var SIDEBAR_KEY = "sidebar_collapsed";
var ROLE_MAP = {
	student: "Élève",
	teacher: "Enseignant",
	admin: "Admin"
};
function NavItem({ item, collapsed }) {
	const location = useLocation();
	const [open, setOpen] = useState(() => {
		if (item.subItems) return item.subItems.some((sub) => location.pathname === sub.href || location.pathname.startsWith(sub.href.split("?")[0]));
		return false;
	});
	const isActive = location.pathname === item.href || item.href !== "/dashboard" && location.pathname.startsWith(item.href);
	const toggleSub = (e) => {
		if (item.subItems) {
			e.preventDefault();
			setOpen(!open);
		}
	};
	const link = /* @__PURE__ */ jsxs("div", {
		className: "w-full",
		children: [/* @__PURE__ */ jsxs("a", {
			href: item.href,
			onClick: item.subItems ? toggleSub : void 0,
			className: cn("flex items-center gap-2.5 rounded-md text-sm transition-colors cursor-pointer", collapsed ? "justify-center w-8 h-8 mx-auto" : "px-3 py-2 w-full", isActive || open ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
			children: [/* @__PURE__ */ jsx("span", {
				className: "shrink-0",
				children: item.icon
			}), !collapsed && /* @__PURE__ */ jsxs("span", {
				className: "truncate flex-1 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", { children: item.label }), /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [item.badge && /* @__PURE__ */ jsx("span", {
						className: "text-[9px] font-extrabold bg-red-500/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-tighter",
						children: item.badge
					}), item.subItems && (open ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-70" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5 opacity-70" }))]
				})]
			})]
		}), !collapsed && open && item.subItems && /* @__PURE__ */ jsx("div", {
			className: "pl-7 pr-2 py-1 space-y-0.5 border-l border-border/50 ml-4 my-1",
			children: item.subItems.map((sub) => {
				const isSubActive = location.pathname === sub.href || sub.href.includes("?") && location.pathname === sub.href.split("?")[0];
				return /* @__PURE__ */ jsx("a", {
					href: sub.href,
					className: cn("block px-2.5 py-1.5 text-xs rounded-md transition-colors truncate", isSubActive ? "bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold" : "text-muted-foreground hover:text-foreground hover:bg-accent/60"),
					children: sub.label
				}, sub.href + sub.label);
			})
		})]
	});
	if (!collapsed) return link;
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: link
	}), /* @__PURE__ */ jsx(TooltipContent, {
		side: "right",
		children: item.label
	})] });
}
function AppSidebarShell() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(() => {
		if (typeof window === "undefined") return false;
		return localStorage.getItem(SIDEBAR_KEY) === "true";
	});
	const [theme, setTheme] = useState(() => {
		if (typeof window === "undefined") return "light";
		const stored = localStorage.getItem("theme");
		if (stored === "dark" || stored === "light") return stored;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});
	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("theme", theme);
	}, [theme]);
	const toggleTheme = () => {
		setTheme((prev) => prev === "light" ? "dark" : "light");
	};
	const isTeacherOrAdmin = user?.role === "teacher" || user?.role === "admin";
	const navItems = [
		{
			href: "/dashboard",
			icon: /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
			label: "Accueil"
		},
		...isTeacherOrAdmin ? [
			{
				href: "/assistants-ia",
				icon: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
				label: "Assistants IA"
			},
			{
				href: "/communaute",
				icon: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
				label: "Communauté"
			},
			{
				href: "/calendrier",
				icon: /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
				label: "Calendrier",
				badge: "Nouveau"
			},
			{
				href: "/statistiques",
				icon: /* @__PURE__ */ jsx(BarChart3, { className: "h-4 w-4" }),
				label: "Statistiques"
			},
			{
				href: "/eleves",
				icon: /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4" }),
				label: "Apprenants"
			},
			{
				href: "/manage-courses",
				icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
				label: "Formations",
				subItems: [
					{
						href: "/manage-courses",
						label: "Gérer les formations"
					},
					{
						href: "/manage-courses?tab=certificates",
						label: "Certificat de réussite"
					},
					{
						href: "/manage-courses?tab=settings",
						label: "Paramètres"
					}
				]
			},
			{
				href: "/classes-virtuelles",
				icon: /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }),
				label: "Classes virtuelles",
				badge: "Nouveau"
			},
			{
				href: "/packs",
				icon: /* @__PURE__ */ jsx(Layers, { className: "h-4 w-4" }),
				label: "Packs"
			},
			{
				href: "/paiements",
				icon: /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }),
				label: "Ventes"
			},
			{
				href: "/codes-promo",
				icon: /* @__PURE__ */ jsx(Percent, { className: "h-4 w-4" }),
				label: "Codes promo"
			},
			{
				href: "/outils-marketing",
				icon: /* @__PURE__ */ jsx(Megaphone, { className: "h-4 w-4" }),
				label: "Outils Marketing",
				subItems: [
					{
						href: "/outils-marketing?tab=tracking",
						label: "Suivi / Tracking"
					},
					{
						href: "/outils-marketing?tab=autoresponders",
						label: "Autorépondeurs"
					},
					{
						href: "/outils-marketing?tab=automations",
						label: "Automatisations (Zapier...)"
					},
					{
						href: "/outils-marketing?tab=emails",
						label: "Emails"
					}
				]
			},
			{
				href: "/settings",
				icon: /* @__PURE__ */ jsx(Palette, { className: "h-4 w-4" }),
				label: "Personnalisation"
			},
			{
				href: "/affiliation",
				icon: /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
				label: "Affiliation"
			},
			{
				href: "/integrations",
				icon: /* @__PURE__ */ jsx(Code2, { className: "h-4 w-4" }),
				label: "Intégrations externes"
			},
			{
				href: "/academy-hub",
				icon: /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4 text-amber-500" }),
				label: "Académie EduFlex 🎓"
			}
		] : [],
		{
			href: "/tarifs",
			icon: /* @__PURE__ */ jsx(Gem, { className: "h-4 w-4 text-emerald-500" }),
			label: "Nos offres"
		},
		{
			href: "/settings",
			icon: /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
			label: "Paramètres",
			subItems: [
				{
					href: "/settings?tab=general",
					label: "Général"
				},
				{
					href: "/enseignants",
					label: "Équipe"
				},
				{
					href: "/settings?tab=payments",
					label: "Paiements"
				},
				{
					href: "/settings?tab=company",
					label: "Entreprise"
				},
				{
					href: "/settings?tab=seo",
					label: "Référencement SEO"
				},
				{
					href: "/settings?tab=legal",
					label: "Liens légaux et RGPD"
				},
				{
					href: "/integrations",
					label: "APIs développeur"
				},
				{
					href: "/settings?tab=billing",
					label: "Facturation"
				}
			]
		},
		...user?.role === "admin" ? [{
			href: "/academies",
			icon: /* @__PURE__ */ jsx(Building, { className: "h-4 w-4" }),
			label: "Académies B2B"
		}, {
			href: "/admin-settings",
			icon: /* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4" }),
			label: "Console Admin"
		}] : []
	];
	const toggle = useCallback(() => {
		setCollapsed((v) => {
			const next = !v;
			localStorage.setItem(SIDEBAR_KEY, String(next));
			return next;
		});
	}, []);
	return /* @__PURE__ */ jsx(TooltipProvider, {
		delayDuration: 0,
		children: /* @__PURE__ */ jsxs("div", {
			className: cn("flex flex-col h-full bg-background border-r border-border overflow-hidden", "transition-[width] duration-200 ease-linear shrink-0", collapsed ? "w-[3rem]" : "w-[15rem]"),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: cn("flex items-center gap-2 shrink-0 border-b border-border h-[52px] px-3", collapsed && "justify-center px-2"),
					children: [
						!collapsed && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-7 w-7 rounded-md text-white text-xs font-bold shrink-0 bg-primary",
							style: user?.academyColor ? { backgroundColor: user.academyColor } : {},
							children: (user?.academyName || "E")[0].toUpperCase()
						}), /* @__PURE__ */ jsx("span", {
							className: "flex-1 font-semibold text-sm truncate",
							children: user?.academyName || "EduFlex"
						})] }),
						/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-foreground",
								onClick: toggleTheme,
								children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 animate-none" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 animate-none" })
							})
						}), /* @__PURE__ */ jsx(TooltipContent, {
							side: "right",
							children: theme === "dark" ? "Mode clair" : "Mode sombre"
						})] }),
						/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-foreground",
								onClick: toggle,
								children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ jsx(TooltipContent, {
							side: "right",
							children: collapsed ? "Développer la barre" : "Réduire la barre"
						})] })
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto p-2 space-y-1",
					children: navItems.map((item) => /* @__PURE__ */ jsx(NavItem, {
						item,
						collapsed
					}, item.href + item.label))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "shrink-0 border-t border-border p-2",
					children: collapsed ? /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: "w-8 h-8 p-0 mx-auto flex items-center justify-center text-muted-foreground hover:text-destructive",
							onClick: () => {
								logout();
								navigate({ to: "/login" });
							},
							children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ jsx(TooltipContent, {
						side: "right",
						children: "Déconnexion"
					})] }) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5 px-2 py-1.5",
						children: [
							/* @__PURE__ */ jsx(Avatar, {
								className: "h-7 w-7 shrink-0",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "text-xs font-semibold",
									children: user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : "U"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-medium text-foreground truncate",
									children: user?.displayName || user?.email
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-muted-foreground truncate",
									children: ROLE_MAP[user?.role || "student"]
								})]
							}),
							/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-destructive",
									onClick: () => {
										logout();
										navigate({ to: "/login" });
									},
									children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "right",
								children: "Déconnexion"
							})] })
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/hooks/useBrandTheme.ts
/**
* Hook to inject dynamic brand colors (Hex value) into root CSS custom properties.
* Overwrites tailwind primary variables so the entire layout adopts the brand theme.
*/
function useBrandTheme(colorOverride) {
	useEffect(() => {
		let brandColor = colorOverride || "#0d9488";
		if (typeof window !== "undefined") {
			if (!colorOverride) {
				const localAcademyColor = localStorage.getItem("academy_brand_color");
				if (localAcademyColor) brandColor = localAcademyColor;
				else {
					const globalConfig = localStorage.getItem("global_platform_config");
					if (globalConfig) try {
						const parsed = JSON.parse(globalConfig);
						if (parsed.color) brandColor = parsed.color;
					} catch {}
				}
			}
		}
		const hexToRgb = (hex) => {
			const cleaned = hex.replace(/^#/, "");
			if (cleaned.length === 3) return `${parseInt(cleaned[0] + cleaned[0], 16)} ${parseInt(cleaned[1] + cleaned[1], 16)} ${parseInt(cleaned[2] + cleaned[2], 16)}`;
			else if (cleaned.length === 6) return `${parseInt(cleaned.substring(0, 2), 16)} ${parseInt(cleaned.substring(2, 4), 16)} ${parseInt(cleaned.substring(4, 6), 16)}`;
			return "13 148 136";
		};
		const rgbValue = hexToRgb(brandColor);
		let styleElement = document.getElementById("dynamic-brand-theme");
		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = "dynamic-brand-theme";
			document.head.appendChild(styleElement);
		}
		styleElement.innerHTML = `
      :root {
        --primary: ${brandColor} !important;
        --ring: ${brandColor} !important;
        --primary-rgb: ${rgbValue} !important;
      }
      .bg-primary {
        background-color: ${brandColor} !important;
      }
      .text-primary {
        color: ${brandColor} !important;
      }
      .border-primary {
        border-color: ${brandColor} !important;
      }
      .hover\\:bg-primary\\/90:hover {
        background-color: ${brandColor}ee !important;
      }
      .hover\\:bg-primary\\/10:hover {
        background-color: rgba(${rgbValue}, 0.1) !important;
      }
      .focus-visible\\:ring-primary:focus-visible {
        --tw-ring-color: ${brandColor} !important;
      }
    `;
	}, [colorOverride]);
}
//#endregion
//#region src/layouts/shared-app-layout.tsx
/**
* SaaS app chrome (sidebar + main) — OPT-IN, not the default.
* The template root (__root.tsx) is full-bleed by default. To use this, ADD a
* `src/routes/_app.tsx` pathless layout route that renders <SharedAppLayout>
* and wrap pages under `src/routes/_app/` in it — give it children, since a
* childless `_app.tsx` collides with the root index route. Do not wrap
* individual pages in Shell or duplicate sidebars/top bars. Landing/marketing/
* content apps don't need this at all.
*/
var SharedLayoutContext = createContext(null);
function SharedAppLayout({ appName = "EduFlex", sidebar = /* @__PURE__ */ jsx(AppSidebarShell, {}), children }) {
	const { isAuthenticated, user } = useAuth();
	const [academyInfo, setAcademyInfo] = React.useState(null);
	React.useEffect(() => {
		if (typeof window === "undefined") return;
		const urlAcademy = new URLSearchParams(window.location.search).get("academy");
		const parts = window.location.hostname.split(".");
		let tenantSubdomain = "";
		if (parts.length > 2 && parts[0] !== "www" && parts[0] !== "localhost") tenantSubdomain = parts[0];
		const academyKey = urlAcademy || tenantSubdomain;
		if (academyKey) {
			const fetchBranding = async () => {
				const { data, error } = await supabase.from("profiles").select("academy_name, academy_color").or(`academy_name.ilike.%${academyKey}%,display_name.ilike.%${academyKey}%`).maybeSingle();
				if (!error && data && data.academy_name) {
					const info = {
						name: data.academy_name,
						color: data.academy_color || "#6366f1"
					};
					setAcademyInfo(info);
					localStorage.setItem("cached_academy_theme", JSON.stringify(info));
				}
			};
			fetchBranding();
		} else try {
			const cached = localStorage.getItem("cached_academy_theme");
			if (cached) {
				const parsed = JSON.parse(cached);
				if (parsed && typeof parsed.name === "string" && typeof parsed.color === "string") setAcademyInfo(parsed);
			}
		} catch {
			localStorage.removeItem("cached_academy_theme");
		}
	}, []);
	const [globalPlatformName, setGlobalPlatformName] = React.useState("EduFlex");
	const [globalPlatformColor, setGlobalPlatformColor] = React.useState(null);
	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.name) setGlobalPlatformName(parsed.name);
				if (parsed.color) setGlobalPlatformColor(parsed.color);
			} catch {}
		}
	}, []);
	const displayedAppName = user?.academyName || academyInfo?.name || globalPlatformName;
	const activeColor = user?.academyColor || academyInfo?.color || globalPlatformColor || null;
	const value = React.useMemo(() => ({ appName: displayedAppName }), [displayedAppName]);
	useBrandTheme(activeColor || void 0);
	if (!isAuthenticated) return /* @__PURE__ */ jsx(SharedLayoutContext.Provider, {
		value,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-dvh w-full flex-col bg-background text-foreground",
			children: [/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "max-w-7xl mx-auto flex items-center justify-between h-16 px-6",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-primary flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" })
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-lg tracking-tight",
							children: displayedAppName
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/login",
								children: "Se connecter"
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							className: "bg-primary hover:bg-primary/95 text-primary-foreground",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/register",
								children: "S'inscrire gratuitement"
							})
						})]
					})]
				})
			}), /* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			})]
		})
	});
	return /* @__PURE__ */ jsx(SharedLayoutContext.Provider, {
		value,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex min-h-dvh w-full flex-1 flex-col",
			children: /* @__PURE__ */ jsx(Shell, {
				appName: displayedAppName,
				sidebar,
				children
			})
		})
	});
}
//#endregion
//#region src/routes/_app.tsx?tsr-split=component
function AppLayoutComponent() {
	return /* @__PURE__ */ jsx(SharedAppLayout, {
		appName: "EduFlex",
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
export { AppLayoutComponent as component };
