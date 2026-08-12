import { t as supabase } from "./supabase-DUsUuZXg.js";
import { t as useAuth } from "./useAuth-BDa8rpUT.js";
import { t as useCourse } from "./useCourses-1dzTx_dt.js";
import { i as useToggleChapterCompletion, n as useCompletedChapters, t as useChapters } from "./useChapters-B767Kw6p.js";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, EmptyState, Skeleton, toast } from "@blinkdotnew/ui";
import { ArrowLeft, BookOpen, Check, CheckSquare, ChevronRight, PlayCircle, Square } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/JitsiMeet.tsx
/**
* Premium Jitsi Meet integration utilizing Jitsi Meet External API script.
* Dynamically binds meeting options, participant names, moderator status, and toolbar toggles.
*/
function JitsiMeet({ roomName, displayName, email = "", domain = "meet.jit.si", isModerator = false, onMeetLeave }) {
	const containerRef = useRef(null);
	const [apiLoaded, setApiLoaded] = useState(false);
	const apiInstanceRef = useRef(null);
	useEffect(() => {
		const scriptId = "jitsi-external-api-script";
		let script = document.getElementById(scriptId);
		const initJitsi = () => {
			setApiLoaded(true);
		};
		if (!script) {
			script = document.createElement("script");
			script.id = scriptId;
			script.src = `https://${domain}/external_api.js`;
			script.async = true;
			script.onload = initJitsi;
			document.body.appendChild(script);
		} else if (window.JitsiMeetExternalAPI) initJitsi();
		else script.onload = initJitsi;
		return () => {
			if (apiInstanceRef.current) apiInstanceRef.current.dispose();
		};
	}, [domain]);
	useEffect(() => {
		if (!apiLoaded || !containerRef.current || !window.JitsiMeetExternalAPI) return;
		if (apiInstanceRef.current) apiInstanceRef.current.dispose();
		const options = {
			roomName,
			width: "100%",
			height: "100%",
			parentNode: containerRef.current,
			configOverwrite: {
				startWithAudioMuted: !isModerator,
				startWithVideoMuted: !isModerator,
				prejoinPageEnabled: true,
				disableInviteFunctions: true,
				enableWelcomePage: false,
				toolbarButtons: [
					"camera",
					"chat",
					"closedcaptions",
					"desktop",
					"download",
					"embedmeeting",
					"etherpad",
					"feedback",
					"filmstrip",
					"fullscreen",
					"hangup",
					"help",
					"highlight",
					"invite",
					"linktosalesforce",
					"livestreaming",
					"microphone",
					"noisesuppression",
					"participants-pane",
					"profile",
					"raisehand",
					"recording",
					"security",
					"select-background",
					"settings",
					"shareaudio",
					"sharedvideo",
					"shortcuts",
					"stats",
					"tileview",
					"toggle-camera",
					"videoquality",
					"whiteboard"
				]
			},
			interfaceConfigOverwrite: {
				SHOW_JITSI_WATERMARK: false,
				SHOW_BRAND_WATERMARK: false,
				MOBILE_APP_PROMO: false
			},
			userInfo: {
				displayName,
				email
			}
		};
		try {
			const api = new window.JitsiMeetExternalAPI(domain, options);
			apiInstanceRef.current = api;
			api.addEventListener("readyToClose", () => {
				if (onMeetLeave) onMeetLeave();
			});
		} catch (err) {
			console.error("JitsiMeetExternalAPI instantiation failed:", err);
		}
		return () => {
			if (apiInstanceRef.current) {
				apiInstanceRef.current.dispose();
				apiInstanceRef.current = null;
			}
		};
	}, [
		apiLoaded,
		roomName,
		displayName,
		email,
		domain,
		isModerator
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: "w-full h-full min-h-[500px] bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-border"
	});
}
//#endregion
//#region src/routes/_app/study.$id.tsx?tsr-split=component
function StudyRoomPage() {
	const { id } = useParams({ strict: false });
	const { data: course, isLoading: courseLoading } = useCourse(Number(id));
	const { data: chapters, isLoading: chaptersLoading } = useChapters(Number(id));
	const { data: completedIds } = useCompletedChapters(Number(id));
	const toggleMutation = useToggleChapterCompletion(Number(id));
	const { user } = useAuth();
	const handleDownloadCalendar = () => {
		if (!activeChapter || !activeChapter.scheduledAt) return;
		const start = new Date(activeChapter.scheduledAt);
		const end = new Date(start.getTime() + 3600 * 1e3);
		const formatTime = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
		const icsContent = [
			"BEGIN:VCALENDAR",
			"VERSION:2.0",
			"PRODID:-//EduFlex//LMS//FR",
			"BEGIN:VEVENT",
			`UID:eduflex-live-${activeChapter.id}@eduflex.app`,
			`DTSTAMP:${formatTime(/* @__PURE__ */ new Date())}`,
			`DTSTART:${formatTime(start)}`,
			`DTEND:${formatTime(end)}`,
			`SUMMARY:EduFlex Live : ${activeChapter.title}`,
			`DESCRIPTION:Rejoignez la visioconférence en direct sur EduFlex : ${activeChapter.content || ""}`,
			"STATUS:CONFIRMED",
			"END:VEVENT",
			"END:VCALENDAR"
		].join("\r\n");
		const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `Live_Eduflex_${activeChapter.title.replace(/[^a-zA-Z0-9]/g, "_")}.ics`;
		link.click();
		toast.success("Calendrier ICS téléchargé avec succès !");
	};
	const [jitsiDomain, setJitsiDomain] = useState("meet.jit.si");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const globalConfig = localStorage.getItem("global_platform_config");
			if (globalConfig) try {
				const parsed = JSON.parse(globalConfig);
				if (parsed.jitsiDomain) setJitsiDomain(parsed.jitsiDomain.replace(/(^\w+:|^)\/\//, ""));
			} catch {}
		}
	}, []);
	const [showSuccessParticles, setShowSuccessParticles] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [particles, setParticles] = useState([]);
	const triggerParticles = () => {
		const colors = [
			"#0d9488",
			"#38bdf8",
			"#fbbf24",
			"#f43f5e",
			"#a855f7",
			"#10b981"
		];
		setParticles(Array.from({ length: 30 }).map((_, i) => ({
			id: Math.random() + i,
			x: (Math.random() - .5) * 450,
			y: (Math.random() - .5) * 350 - 80,
			color: colors[Math.floor(Math.random() * colors.length)],
			size: Math.random() * 8 + 6
		})));
		setShowSuccessParticles(true);
		setTimeout(() => {
			setShowSuccessParticles(false);
			setParticles([]);
		}, 2200);
	};
	const videoRef = useRef(null);
	const [playbackRate, setPlaybackRate] = useState(1);
	const handleSpeedChange = (rate) => {
		setPlaybackRate(rate);
		if (videoRef.current) videoRef.current.playbackRate = rate;
	};
	useEffect(() => {
		if (videoRef.current) videoRef.current.playbackRate = playbackRate;
	}, [activeChapterId, playbackRate]);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [quizSubmitted, setQuizSubmitted] = useState(false);
	const [quizScore, setQuizScore] = useState(0);
	const [quizPassed, setQuizPassed] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentContent, setCommentContent] = useState("");
	const [commentsLoading, setCommentsLoading] = useState(false);
	const chapterList = chapters || [];
	const activeChapter = chapterList.find((c) => c.id === activeChapterId) || chapterList[0];
	useEffect(() => {
		if (chapterList.length > 0 && activeChapterId === null) {
			const incomplete = chapterList.find((c) => !completedIds?.includes(c.id));
			setActiveChapterId(incomplete ? incomplete.id : chapterList[0].id);
		}
	}, [
		chapterList,
		completedIds,
		activeChapterId
	]);
	useEffect(() => {
		setSelectedAnswers({});
		setQuizSubmitted(false);
		setQuizScore(0);
		setQuizPassed(false);
	}, [activeChapterId]);
	const fetchComments = async () => {
		if (!activeChapter) return;
		setCommentsLoading(true);
		try {
			const { data, error } = await supabase.from("chapter_comments").select(`
          id,
          content,
          created_at,
          user_id,
          profiles (
            display_name,
            email
          )
        `).eq("chapter_id", activeChapter.id).order("created_at", { ascending: true });
			if (error) throw error;
			setComments(data || []);
		} catch (err) {
			console.error(err);
		} finally {
			setCommentsLoading(false);
		}
	};
	useEffect(() => {
		fetchComments();
	}, [activeChapterId]);
	useEffect(() => {
		if (!course) return;
		const channel = supabase.channel(`live-chapters-${course.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "chapters"
		}, (payload) => {
			if (payload.new && payload.new.course_id === course.id && payload.new.chapter_type === "live") toast.success(`📢 Session en direct mise à jour : "${payload.new.title}". Cliquez sur le chapitre pour rejoindre !`, { duration: 6e3 });
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [course]);
	const handleAddComment = async (e) => {
		e.preventDefault();
		if (!commentContent.trim() || !user || !activeChapter) return;
		try {
			const { error } = await supabase.from("chapter_comments").insert([{
				chapter_id: activeChapter.id,
				user_id: user.id,
				content: commentContent.trim()
			}]);
			if (error) throw error;
			setCommentContent("");
			toast.success("Commentaire ajouté !");
			fetchComments();
		} catch (err) {
			toast.error("Erreur lors de l’ajout du commentaire.");
		}
	};
	if (courseLoading || chaptersLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex h-dvh items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4 text-center",
			children: [/* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto" }), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Chargement de votre espace d'étude..."
			})]
		})
	});
	if (!course) return /* @__PURE__ */ jsx("div", {
		className: "p-6 max-w-xl mx-auto",
		children: /* @__PURE__ */ jsx(EmptyState, {
			icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8" }),
			title: "Cours introuvable",
			description: "Ce cours n'existe pas ou vous n'y avez pas accès."
		})
	});
	const isCompleted = (chapterId) => completedIds?.includes(chapterId) || false;
	const activeChapterIsCompleted = activeChapter ? isCompleted(activeChapter.id) : false;
	const handleToggleComplete = () => {
		if (!activeChapter) return;
		const nextCompleted = !activeChapterIsCompleted;
		if (nextCompleted) triggerParticles();
		toggleMutation.mutate({
			chapterId: activeChapter.id,
			isCompleted: nextCompleted
		});
	};
	const handleNextChapter = () => {
		const currentIndex = chapterList.findIndex((c) => c.id === activeChapter?.id);
		if (currentIndex !== -1 && currentIndex < chapterList.length - 1) setActiveChapterId(chapterList[currentIndex + 1].id);
	};
	const handleQuizSubmit = () => {
		if (!activeChapter || !Array.isArray(activeChapter.quizData)) return;
		const totalQ = activeChapter.quizData.length;
		let correct = 0;
		activeChapter.quizData.forEach((q, idx) => {
			if (selectedAnswers[idx] === q.correctOptionIndex) correct++;
		});
		const score = Math.round(correct * 100 / totalQ);
		setQuizScore(score);
		const passed = score >= 80;
		setQuizPassed(passed);
		setQuizSubmitted(true);
		if (passed) {
			toast.success(`Félicitations ! Quiz réussi avec un score de ${score}%`);
			triggerParticles();
			if (!activeChapterIsCompleted) toggleMutation.mutate({
				chapterId: activeChapter.id,
				isCompleted: true
			});
		} else toast.error(`Quiz échoué avec un score de ${score}%. 80% de bonnes réponses requises.`);
	};
	const handleRetakeQuiz = () => {
		setSelectedAnswers({});
		setQuizSubmitted(false);
		setQuizScore(0);
		setQuizPassed(false);
	};
	const downloadCertificate = async () => {
		if (!course || !user) return;
		const canvas = document.createElement("canvas");
		canvas.width = 1600;
		canvas.height = 1130;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const studentName = user.displayName || user.email?.split("@")[0] || "Apprenant";
		const academyName = course.profiles?.academyName || "EDUFLEX ACADEMY";
		const academyColor = course.profiles?.academyColor || "#ca8a04";
		const academySlogan = course.profiles?.academySlogan || "L'excellence par la formation en ligne";
		ctx.fillStyle = "#fdfbf7";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = academyColor;
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
		ctx.fillText(academyName.toUpperCase().split("").join(" "), canvas.width / 2, 180);
		ctx.font = "italic 62px Georgia, serif";
		ctx.fillStyle = academyColor;
		ctx.fillText("Certificat de Réussite", canvas.width / 2, 290);
		ctx.font = "italic 16px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText(academySlogan, canvas.width / 2, 335);
		ctx.font = "22px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText("Ce diplôme officiel est fièrement décerné à", canvas.width / 2, 420);
		ctx.font = "bold italic 68px \"Playfair Display\", Georgia, serif";
		ctx.fillStyle = "#0f172a";
		ctx.fillText(studentName, canvas.width / 2, 530);
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
		ctx.fillText(course.title, canvas.width / 2, 720);
		const today = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
		ctx.font = "italic 20px Arial, sans-serif";
		ctx.fillStyle = "#64748b";
		ctx.fillText(`Délivré le ${today}`, canvas.width / 2, 810);
		const sealX = canvas.width / 2 - 280;
		const sealY = 930;
		ctx.beginPath();
		ctx.arc(sealX, sealY, 65, 0, Math.PI * 2);
		ctx.fillStyle = "#fef08a";
		ctx.fill();
		ctx.strokeStyle = academyColor;
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(sealX, sealY, 57, 0, Math.PI * 2);
		ctx.strokeStyle = "#ca8a04";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.font = "bold 13px Arial, sans-serif";
		ctx.fillStyle = "#854d0e";
		ctx.fillText("OFFICIEL", sealX, sealY - 10);
		ctx.fillText("AGRÉÉ", sealX, 940);
		ctx.font = "8px Arial, sans-serif";
		ctx.fillText(academyName.substring(0, 10).toUpperCase(), sealX, 955);
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
		ctx.fillText(`La Direction ${academyName}`, sigX, 975);
		ctx.font = "italic 34px Georgia, serif";
		ctx.fillStyle = "#1e3a8a";
		ctx.fillText(academyName, sigX, sigY - 5);
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
			const toastId = toast.loading("Génération de votre certificat PDF...");
			const { jsPDF } = await loadJsPDF();
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [canvas.width, canvas.height]
			});
			pdf.addImage(canvas.toDataURL("image/jpeg", .95), "JPEG", 0, 0, canvas.width, canvas.height);
			pdf.save(`Certificat_${academyName.replace(/[^a-zA-Z0-9]/g, "_")}_${course.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
			toast.dismiss(toastId);
			toast.success("Certificat PDF téléchargé avec succès !");
		} catch (err) {
			toast.error("Erreur lors du téléchargement du certificat.");
		}
	};
	const totalChapters = chapterList.length;
	const completedChaptersCount = completedIds?.length || 0;
	const progressPercent = totalChapters > 0 ? Math.round(completedChaptersCount * 100 / totalChapters) : 0;
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col lg:flex-row h-dvh overflow-hidden transition-colors duration-200 ${isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-background"}`,
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: `w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border flex flex-col h-[40dvh] lg:h-full bg-card transition-all duration-300 ${sidebarCollapsed ? "lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-r-0 h-0 border-b-0 overflow-hidden" : ""}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "p-4 border-b border-border space-y-3 shrink-0",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/_app/courses/$id",
						params: { id: String(course.id) },
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }), " Fiche de la formation"]
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-sm line-clamp-1",
						children: course.title
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-2.5 space-y-1",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx("span", { children: "Progression" }), /* @__PURE__ */ jsxs("span", {
									className: "font-semibold text-foreground",
									children: [progressPercent, "%"]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "h-1.5 w-full bg-muted rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-primary transition-all duration-300",
									style: { width: `${progressPercent}%` }
								})
							}),
							progressPercent === 100 && /* @__PURE__ */ jsx("div", {
								className: "pt-2",
								children: /* @__PURE__ */ jsx(Button, {
									onClick: downloadCertificate,
									size: "sm",
									className: "w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-medium text-xs gap-1.5 py-1.5 h-8 animate-pulse shadow-sm",
									children: "🏆 Télécharger mon certificat"
								})
							})
						]
					})] })]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto p-2 space-y-1",
					children: chapterList.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground p-3 text-center",
						children: "Aucun chapitre disponible."
					}) : chapterList.map((chapter, index) => {
						const active = activeChapter?.id === chapter.id;
						const done = isCompleted(chapter.id);
						const hasQuiz = chapter.chapterType === "quiz" || Array.isArray(chapter.quizData) && chapter.quizData.length > 0;
						const isLive = chapter.chapterType === "live";
						return /* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveChapterId(chapter.id),
							className: `w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ jsx("div", {
								className: "mt-0.5 shrink-0",
								children: done ? /* @__PURE__ */ jsx("div", {
									className: "h-4.5 w-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center",
									children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 stroke-[3]" })
								}) : active ? /* @__PURE__ */ jsx(PlayCircle, { className: "h-4.5 w-4.5 text-primary" }) : isLive ? /* @__PURE__ */ jsxs("span", {
									className: "relative flex h-2 w-2 mt-1.5 mx-1",
									children: [/* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }), /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-red-500" })]
								}) : /* @__PURE__ */ jsx("div", {
									className: "h-4.5 w-4.5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[10px]",
									children: index + 1
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: `text-xs leading-snug line-clamp-2 ${active ? "text-primary font-medium" : "text-foreground"}`,
									children: chapter.title
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1.5 mt-1.5 flex-wrap",
									children: [isLive && /* @__PURE__ */ jsx(Badge, {
										className: "bg-red-500 hover:bg-red-600 text-[8px] h-3.5 px-1 py-0 text-white border-0",
										children: "Direct Live"
									}), hasQuiz && /* @__PURE__ */ jsx(Badge, {
										variant: "secondary",
										className: "text-[8px] h-3.5 px-1 py-0",
										children: "Quiz"
									})]
								})]
							})]
						}, chapter.id);
					})
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				className: `flex-1 overflow-y-auto flex flex-col h-[60dvh] lg:h-full transition-colors duration-200 ${isDarkMode ? "bg-slate-900/40" : "bg-background/40"}`,
				children: activeChapter ? /* @__PURE__ */ jsxs("div", {
					className: "flex-1 p-6 md:p-10 max-w-4xl w-full mx-auto space-y-8 flex flex-col justify-between",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between border-b border-border/50 pb-4 mb-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setSidebarCollapsed(!sidebarCollapsed),
									className: "text-[11px] font-bold h-8 px-3 rounded-lg border border-border/60 hover:bg-muted/40",
									children: sidebarCollapsed ? "📖 Afficher le Programme" : "🎬 Focus Plein Écran"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:inline",
									children: "Espace d'Étude"
								})]
							}), /* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setIsDarkMode(!isDarkMode),
								className: `text-[11px] font-bold gap-1.5 h-8 px-3 rounded-lg border border-border/60 transition-all ${isDarkMode ? "bg-slate-900 text-teal-400 border-teal-800/40 hover:bg-slate-800" : "hover:bg-muted/40"}`,
								children: isDarkMode ? "☀️ Mode Clair" : "🎬 Mode Cinéma"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-6",
							children: activeChapter.chapterType === "live" ? /* @__PURE__ */ jsxs("div", {
								className: "space-y-6",
								children: [activeChapter.videoUrl ? /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center justify-between gap-3 p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" }), /* @__PURE__ */ jsx("h2", {
													className: "text-base font-bold text-foreground",
													children: "Rediffusion de la Classe en Direct"
												})]
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground leading-relaxed",
												children: "Cette session virtuelle est maintenant terminée. Retrouvez son enregistrement ci-dessous."
											})]
										}), /* @__PURE__ */ jsx(Badge, {
											className: "bg-emerald-600 text-white border-0 font-extrabold text-[10px] tracking-wide",
											children: "REPLAY DISPONIBLE"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg relative border border-border/80",
										children: activeChapter.videoUrl.endsWith(".html") || activeChapter.videoUrl.includes("/scorm/") || activeChapter.videoUrl.includes("/embed/") ? /* @__PURE__ */ jsx("iframe", {
											src: activeChapter.videoUrl,
											className: "w-full h-full border-0 absolute inset-0",
											allowFullScreen: true
										}) : /* @__PURE__ */ jsx("video", {
											ref: videoRef,
											controls: true,
											className: "w-full h-full object-contain",
											src: activeChapter.videoUrl,
											controlsList: "nodownload",
											onContextMenu: (e) => e.preventDefault(),
											children: "Votre navigateur ne supporte pas la lecture de vidéos."
										}, activeChapter.videoUrl)
									})]
								}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-3 p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "flex h-2.5 w-2.5 relative",
												children: [/* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }), /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" })]
											}), /* @__PURE__ */ jsx("h2", {
												className: "text-base font-bold text-foreground",
												children: "Classe en Direct Interactive"
											})]
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: activeChapter.scheduledAt ? /* @__PURE__ */ jsxs(Fragment, { children: ["Planifié pour le : ", /* @__PURE__ */ jsx("span", {
												className: "font-semibold text-foreground",
												children: new Date(activeChapter.scheduledAt).toLocaleString("fr-FR")
											})] }) : "Session virtuelle active"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-2",
										children: activeChapter.scheduledAt && new Date(activeChapter.scheduledAt).getTime() > Date.now() ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Badge, {
											className: "bg-amber-600 text-white border-0 font-extrabold text-[10px] tracking-wide",
											children: "PLANIFIÉ"
										}), /* @__PURE__ */ jsx(Button, {
											variant: "outline",
											size: "xs",
											onClick: handleDownloadCalendar,
											className: "h-7 text-[10px] font-semibold border-border/80 hover:bg-muted/40",
											children: "📅 M'ajouter"
										})] }) : /* @__PURE__ */ jsx(Badge, {
											className: "bg-red-600 text-white border-0 font-extrabold text-[10px] tracking-wide",
											children: "EN DIRECT"
										})
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-black relative min-h-[500px]",
									children: /* @__PURE__ */ jsx(JitsiMeet, {
										roomName: `eduflex-${course.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${activeChapter.id}`,
										displayName: user?.displayName || user?.email || "Étudiant",
										email: user?.email || "",
										domain: jitsiDomain,
										isModerator: user?.role === "teacher" || user?.role === "admin"
									})
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsx(Card, {
										className: "border-border/80",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "p-5 space-y-2",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Comment participer ?"
											}), /* @__PURE__ */ jsxs("p", {
												className: "text-xs text-muted-foreground leading-relaxed",
												children: [
													"1. Donnez l'autorisation d'accès à votre caméra et microphone si le navigateur le demande.",
													/* @__PURE__ */ jsx("br", {}),
													"2. L'enseignant modérateur gère les prises de parole et le partage d'écran.",
													/* @__PURE__ */ jsx("br", {}),
													"3. Une fois le cours terminé, l'enregistrement sera mis à disposition par votre enseignant dans cet espace."
												]
											})]
										})
									}), /* @__PURE__ */ jsx(Card, {
										className: "border-border/80",
										children: /* @__PURE__ */ jsxs(CardContent, {
											className: "p-5 space-y-2",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Notes de session"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap",
												children: activeChapter.content || "Aucune note complémentaire pour cette session. Préparez vos notes de cours et vos questions."
											})]
										})
									})]
								})]
							}) : activeChapter.chapterType === "quiz" || Array.isArray(activeChapter.quizData) && activeChapter.quizData.length > 0 ? /* @__PURE__ */ jsx(Card, {
								className: "border border-border/80 shadow-md",
								children: /* @__PURE__ */ jsxs(CardContent, {
									className: "p-6 md:p-8 space-y-6",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between border-b border-border/50 pb-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
												className: "text-lg font-bold text-foreground",
												children: "Évaluation des connaissances"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: "80% de bonnes réponses requises pour valider ce module"
											})] }), quizSubmitted && /* @__PURE__ */ jsxs("div", {
												className: `px-3 py-1.5 rounded-full text-xs font-bold ${quizPassed ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`,
												children: [
													"Score : ",
													quizScore,
													"% ",
													quizPassed ? " (Réussi)" : " (Échoué)"
												]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "space-y-6",
											children: activeChapter.quizData.map((q, qIdx) => {
												const isCorrect = selectedAnswers[qIdx] === q.correctOptionIndex;
												return /* @__PURE__ */ jsxs("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ jsxs("p", {
														className: "text-sm font-semibold text-foreground",
														children: [
															qIdx + 1,
															". ",
															q.question
														]
													}), /* @__PURE__ */ jsx("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-3",
														children: q.options.map((opt, optIdx) => {
															const isSelected = selectedAnswers[qIdx] === optIdx;
															const isCorrectOpt = optIdx === q.correctOptionIndex;
															let cardStyle = "border-border hover:bg-muted/30";
															if (isSelected) cardStyle = "border-primary bg-primary/5 text-primary font-medium";
															if (quizSubmitted) if (isCorrectOpt) cardStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium";
															else if (isSelected && !isCorrect) cardStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
															else cardStyle = "border-border opacity-60 bg-transparent";
															return /* @__PURE__ */ jsxs("button", {
																type: "button",
																disabled: quizSubmitted,
																onClick: () => setSelectedAnswers((prev) => ({
																	...prev,
																	[qIdx]: optIdx
																})),
																className: `w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs transition-all ${cardStyle}`,
																children: [/* @__PURE__ */ jsx("span", { children: opt }), quizSubmitted && isCorrectOpt && /* @__PURE__ */ jsx("span", {
																	className: "text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded",
																	children: "Correct"
																})]
															}, optIdx);
														})
													})]
												}, qIdx);
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex gap-3 pt-4 border-t border-border/50",
											children: !quizSubmitted ? /* @__PURE__ */ jsx(Button, {
												onClick: handleQuizSubmit,
												disabled: Object.keys(selectedAnswers).length < activeChapter.quizData.length,
												className: "w-full h-11",
												children: "Valider mes réponses"
											}) : /* @__PURE__ */ jsxs(Fragment, { children: [!quizPassed && /* @__PURE__ */ jsx(Button, {
												onClick: handleRetakeQuiz,
												variant: "outline",
												className: "w-full h-11",
												children: "Recommencer le quiz"
											}), quizPassed && /* @__PURE__ */ jsx(Button, {
												onClick: handleNextChapter,
												className: "w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white",
												children: "Continuer la formation"
											})] })
										})
									]
								})
							}) : /* @__PURE__ */ jsxs(Fragment, { children: [activeChapter.videoUrl && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg relative",
									children: activeChapter.videoUrl.endsWith(".html") || activeChapter.videoUrl.includes("/scorm/") || activeChapter.videoUrl.includes("/embed/") ? /* @__PURE__ */ jsx("iframe", {
										src: activeChapter.videoUrl,
										sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
										className: "w-full h-full border-0 absolute inset-0 bg-white"
									}) : /* @__PURE__ */ jsx("video", {
										ref: videoRef,
										controls: true,
										className: "w-full h-full object-contain",
										src: activeChapter.videoUrl,
										children: "Votre navigateur ne prend pas en charge la lecture de cette vidéo."
									}, activeChapter.videoUrl)
								}), !(activeChapter.videoUrl.endsWith(".html") || activeChapter.videoUrl.includes("/scorm/") || activeChapter.videoUrl.includes("/embed/")) && /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 px-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
										children: "Vitesse :"
									}), [
										.5,
										1,
										1.25,
										1.5,
										2
									].map((rate) => /* @__PURE__ */ jsxs("button", {
										onClick: () => handleSpeedChange(rate),
										className: `text-[10px] font-bold px-2 py-0.5 rounded transition-all ${playbackRate === rate ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`,
										children: [rate, "x"]
									}, rate))]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsx("h1", {
									className: "text-xl md:text-2xl font-bold tracking-tight",
									children: activeChapter.title
								}), activeChapter.content ? /* @__PURE__ */ jsx("div", {
									className: "prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-wrap",
									children: activeChapter.content
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-sm italic text-muted-foreground",
									children: "Aucun contenu textuel pour ce chapitre."
								})]
							})] })
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "border-t border-border/60 pt-8 space-y-4",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-base font-bold text-foreground",
									children: "Discussion de la communauté"
								}),
								user ? /* @__PURE__ */ jsxs("form", {
									onSubmit: handleAddComment,
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										placeholder: "Posez votre question ou laissez un message...",
										value: commentContent,
										onChange: (e) => setCommentContent(e.target.value),
										className: "flex-1 min-w-0 rounded-md border border-input bg-transparent px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										size: "sm",
										className: "text-xs",
										children: "Envoyer"
									})]
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: "Veuillez vous connecter pour participer à la discussion."
								}),
								commentsLoading ? /* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })]
								}) : comments.length === 0 ? /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground italic",
									children: "Aucun message pour l'instant. Soyez le premier à poser une question !"
								}) : /* @__PURE__ */ jsx("div", {
									className: "space-y-3 max-h-60 overflow-y-auto pr-2",
									children: comments.map((c) => {
										const name = c.profiles?.display_name || c.profiles?.email?.split("@")[0] || "Apprenant";
										const initials = name.slice(0, 2).toUpperCase();
										const date = new Date(c.created_at).toLocaleDateString("fr-FR", {
											day: "numeric",
											month: "short",
											hour: "2-digit",
											minute: "2-digit"
										});
										return /* @__PURE__ */ jsxs("div", {
											className: "flex gap-3 text-xs animate-fade-in",
											children: [/* @__PURE__ */ jsx("div", {
												className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px] shrink-0",
												children: initials
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex-1 bg-muted/20 dark:bg-muted/10 p-2.5 rounded-xl border border-border/40",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-semibold text-foreground",
														children: name
													}), /* @__PURE__ */ jsx("span", {
														className: "text-[9px] text-muted-foreground",
														children: date
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "text-muted-foreground mt-1 leading-relaxed",
													children: c.content
												})]
											})]
										}, c.id);
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border mt-8",
							children: [!(Array.isArray(activeChapter.quizData) && activeChapter.quizData.length > 0) && /* @__PURE__ */ jsx(Button, {
								onClick: handleToggleComplete,
								disabled: toggleMutation.isPending,
								className: "w-full sm:w-auto gap-2",
								variant: activeChapterIsCompleted ? "outline" : "default",
								children: activeChapterIsCompleted ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Square, { className: "h-4 w-4" }), " Reprendre ce chapitre"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckSquare, { className: "h-4 w-4" }), " Marquer comme terminé"] })
							}), chapterList.findIndex((c) => c.id === activeChapter.id) < chapterList.length - 1 && /* @__PURE__ */ jsxs(Button, {
								onClick: handleNextChapter,
								variant: "ghost",
								className: "w-full sm:w-auto gap-1 ml-auto text-primary",
								children: ["Chapitre suivant ", /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })]
							})]
						})
					]
				}) : /* @__PURE__ */ jsx("div", {
					className: "flex-1 flex items-center justify-center",
					children: /* @__PURE__ */ jsx(EmptyState, {
						icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8" }),
						title: "Sélectionnez un chapitre",
						description: "Sélectionnez un chapitre dans la liste de gauche pour commencer à apprendre."
					})
				})
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: showSuccessParticles && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden",
				children: particles.map((p) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 1,
						scale: 0,
						x: 0,
						y: 0
					},
					animate: {
						opacity: [
							1,
							1,
							0
						],
						scale: [
							0,
							1.4,
							.5
						],
						x: p.x,
						y: p.y,
						rotate: Math.random() * 360
					},
					exit: { opacity: 0 },
					transition: {
						duration: 2,
						ease: "easeOut"
					},
					style: {
						position: "absolute",
						width: p.size,
						height: p.size,
						borderRadius: Math.random() > .5 ? "50%" : "20%",
						backgroundColor: p.color
					}
				}, p.id))
			}) })
		]
	});
}
//#endregion
export { StudyRoomPage as component };
