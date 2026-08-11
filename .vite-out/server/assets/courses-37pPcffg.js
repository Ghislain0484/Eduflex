import { n as useCourses } from "./useCourses-B9-zxIvH.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, EmptyState, Input, Skeleton } from "@blinkdotnew/ui";
import { ArrowRight, BookOpen, Clock, Search, Users } from "lucide-react";
//#region src/routes/_app/courses.tsx?tsr-split=component
var CATEGORIES = [
	"Tous",
	"Marketing",
	"Business",
	"Productivité"
];
var LEVEL_MAP = {
	debutant: "Débutant",
	intermediaire: "Intermédiaire",
	avance: "Avancé"
};
function CoursesPage() {
	const { data: courses, isLoading } = useCourses();
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState("Tous");
	const courseList = Array.isArray(courses) ? courses : [];
	const filtered = useMemo(() => {
		return courseList.filter((c) => {
			const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase());
			const matchCat = activeCategory === "Tous" || c.category === activeCategory;
			return matchSearch && matchCat;
		});
	}, [
		courseList,
		search,
		activeCategory
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 space-y-6 p-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Catalogue de formations"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "Explorez nos formations et développez vos compétences."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Rechercher une formation...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx("button", {
						onClick: () => setActiveCategory(cat),
						className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
						children: cat
					}, cat))
				})]
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					1,
					2,
					3,
					4,
					5,
					6
				].map((i) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-xl border border-border overflow-hidden",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-44 w-full" }), /* @__PURE__ */ jsxs("div", {
						className: "p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }),
							/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
							/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })
						]
					})]
				}, i))
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8" }),
				title: "Aucune formation trouvée",
				description: search ? `Aucun résultat pour "${search}".` : "Aucune formation disponible."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filtered.map((course) => /* @__PURE__ */ jsxs(Link, {
					to: "/courses/$id",
					params: { id: String(course.id) },
					className: "group rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "h-44 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden",
						children: [course.imageUrl ? /* @__PURE__ */ jsx("img", {
							src: course.imageUrl,
							alt: course.title,
							className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						}) : /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full",
							children: /* @__PURE__ */ jsx(BookOpen, { className: "h-12 w-12 text-primary/30" })
						}), /* @__PURE__ */ jsx(Badge, {
							className: "absolute top-3 left-3",
							variant: "secondary",
							children: course.category || "Général"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors",
								children: course.title
							}),
							course.description && /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed",
								children: course.description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
											course.durationHours || 0,
											"h"
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(Users, { className: "h-3.5 w-3.5" }), Number(course.studentsCount) || 0]
									}),
									/* @__PURE__ */ jsx(Badge, {
										variant: "outline",
										className: "text-[10px]",
										children: LEVEL_MAP[course.level] || course.level
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between pt-2 border-t border-border/50",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col text-left",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-base font-bold text-primary",
										children: [((Number(course.price) || 0) / 100).toLocaleString("fr-FR"), " €"]
									}), Number(course.price) > 0 && /* @__PURE__ */ jsxs("span", {
										className: "text-[10px] text-muted-foreground leading-none mt-0.5",
										children: [
											"~",
											Math.round((Number(course.price) || 0) / 100 * 655.957).toLocaleString("fr-FR"),
											" F CFA"
										]
									})]
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all",
									children: ["Découvrir ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
								})]
							})
						]
					})]
				}, course.id))
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
