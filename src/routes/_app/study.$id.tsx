import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  EmptyState,
  toast,
  Badge,
  Input,
} from '@blinkdotnew/ui'
import { useCourse } from '@/hooks/useCourses'
import { useAuth } from '@/hooks/useAuth'
import {
  useChapters,
  useCompletedChapters,
  useToggleChapterCompletion,
} from '@/hooks/useChapters'
import { supabase } from '@/lib/supabase'
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  CheckSquare,
  Square,
  ChevronRight,
  BookOpen,
  Check,
} from 'lucide-react'

export const Route = createFileRoute('/_app/study/$id')({
  component: StudyRoomPage,
})

function StudyRoomPage() {
  const { id } = useParams({ strict: false })
  const { data: course, isLoading: courseLoading } = useCourse(Number(id))
  const { data: chapters, isLoading: chaptersLoading } = useChapters(Number(id))
  const { data: completedIds } = useCompletedChapters(Number(id))
  const toggleMutation = useToggleChapterCompletion(Number(id))
  const { user } = useAuth()

  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)

  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Comments states
  const [comments, setComments] = useState<any[]>([])
  const [commentContent, setCommentContent] = useState('')
  const [commentsLoading, setCommentsLoading] = useState(false)

  const chapterList = chapters || []
  const activeChapter = chapterList.find((c) => c.id === activeChapterId) || chapterList[0]

  useEffect(() => {
    if (chapterList.length > 0 && activeChapterId === null) {
      // Find first incomplete chapter or default to first chapter
      const incomplete = chapterList.find((c) => !completedIds?.includes(c.id))
      setActiveChapterId(incomplete ? incomplete.id : chapterList[0].id)
    }
  }, [chapterList, completedIds, activeChapterId])

  // Reset quiz states when active chapter changes
  useEffect(() => {
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setQuizPassed(false)
  }, [activeChapterId])

  const fetchComments = async () => {
    if (!activeChapter) return
    setCommentsLoading(true)
    try {
      const { data, error } = await supabase
        .from('chapter_comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles (
            display_name,
            email
          )
        `)
        .eq('chapter_id', activeChapter.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setCommentsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [activeChapterId])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || !user || !activeChapter) return

    try {
      const { error } = await supabase
        .from('chapter_comments')
        .insert([{
          chapter_id: activeChapter.id,
          user_id: user.id,
          content: commentContent.trim()
        }])

      if (error) throw error
      setCommentContent('')
      toast.success('Commentaire ajouté !')
      fetchComments()
    } catch (err) {
      toast.error('Erreur lors de l’ajout du commentaire.')
    }
  }

  if (courseLoading || chaptersLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Chargement de votre espace d'étude...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <EmptyState
          icon={<BookOpen className="h-8 w-8" />}
          title="Cours introuvable"
          description="Ce cours n'existe pas ou vous n'y avez pas accès."
        />
      </div>
    )
  }

  const isCompleted = (chapterId: number) => completedIds?.includes(chapterId) || false
  const activeChapterIsCompleted = activeChapter ? isCompleted(activeChapter.id) : false

  const handleToggleComplete = () => {
    if (!activeChapter) return
    toggleMutation.mutate({
      chapterId: activeChapter.id,
      isCompleted: !activeChapterIsCompleted,
    })
  }

  const handleNextChapter = () => {
    const currentIndex = chapterList.findIndex((c) => c.id === activeChapter?.id)
    if (currentIndex !== -1 && currentIndex < chapterList.length - 1) {
      setActiveChapterId(chapterList[currentIndex + 1].id)
    }
  }

  // Quiz submit handlers
  const handleQuizSubmit = () => {
    if (!activeChapter || !Array.isArray(activeChapter.quizData)) return
    const totalQ = activeChapter.quizData.length
    let correct = 0
    activeChapter.quizData.forEach((q: any, idx: number) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correct++
      }
    })
    const score = Math.round((correct * 100) / totalQ)
    setQuizScore(score)
    const passed = score >= 80
    setQuizPassed(passed)
    setQuizSubmitted(true)

    if (passed) {
      toast.success(`Félicitations ! Quiz réussi avec un score de ${score}%`)
      // Mark chapter completed in database
      if (!activeChapterIsCompleted) {
        toggleMutation.mutate({
          chapterId: activeChapter.id,
          isCompleted: true,
        })
      }
    } else {
      toast.error(`Quiz échoué avec un score de ${score}%. 80% de bonnes réponses requises.`)
    }
  }

  const handleRetakeQuiz = () => {
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setQuizPassed(false)
  }

  // Canvas Certificate Generator
  const downloadCertificate = () => {
    if (!course || !user) return

    const canvas = document.createElement('canvas')
    canvas.width = 1600
    canvas.height = 1130
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const studentName = user.displayName || user.email?.split('@')[0] || 'Apprenant'

    // 1. Fond beige/crème premium
    ctx.fillStyle = '#fdfbf7'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 2. Bordure double dorée
    // Bordure extérieure
    ctx.strokeStyle = '#c5a880'
    ctx.lineWidth = 15
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

    // Bordure intérieure fine
    ctx.strokeStyle = '#c5a880'
    ctx.lineWidth = 2
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110)

    // Coins décoratifs
    ctx.fillStyle = '#c5a880'
    // Coin supérieur gauche
    ctx.fillRect(50, 50, 40, 4)
    ctx.fillRect(50, 50, 4, 40)
    // Coin supérieur droit
    ctx.fillRect(canvas.width - 90, 50, 40, 4)
    ctx.fillRect(canvas.width - 54, 50, 4, 40)
    // Coin inférieur gauche
    ctx.fillRect(50, canvas.height - 54, 40, 4)
    ctx.fillRect(50, canvas.height - 90, 4, 40)
    // Coin inférieur droit
    ctx.fillRect(canvas.width - 90, canvas.height - 54, 40, 4)
    ctx.fillRect(canvas.width - 54, canvas.height - 90, 4, 40)

    // 3. Titre du Certificat
    ctx.textAlign = 'center'
    ctx.fillStyle = '#1e293b'
    
    // Titre principal
    ctx.font = '600 24px Arial, sans-serif'
    ctx.fillText('E D U F L E X   A C A D E M Y', canvas.width / 2, 180)

    ctx.font = 'italic 62px Georgia, serif'
    ctx.fillStyle = '#854d0e' // Marron doré
    ctx.fillText('Certificat de Réussite', canvas.width / 2, 290)

    // Texte descriptif
    ctx.font = '22px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Ce diplôme officiel est fièrement décerné à', canvas.width / 2, 420)

    // Nom de l'étudiant
    ctx.font = 'bold italic 68px "Playfair Display", Georgia, serif'
    ctx.fillStyle = '#0f172a'
    ctx.fillText(studentName, canvas.width / 2, 530)

    // Ligne sous le nom
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 250, 560)
    ctx.lineTo(canvas.width / 2 + 250, 560)
    ctx.stroke()

    // Texte d'accréditation
    ctx.font = '22px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('pour avoir complété avec succès la formation en ligne', canvas.width / 2, 630)

    // Titre de la formation
    ctx.font = 'bold 46px Georgia, serif'
    ctx.fillStyle = '#1e293b'
    ctx.fillText(course.title, canvas.width / 2, 720)

    // Date
    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    ctx.font = 'italic 20px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText(`Délivré le ${today}`, canvas.width / 2, 810)

    // 4. Cachet et Signature
    // Sceau doré (gauche)
    const sealX = canvas.width / 2 - 280
    const sealY = 930
    ctx.beginPath()
    ctx.arc(sealX, sealY, 65, 0, Math.PI * 2)
    ctx.fillStyle = '#fef08a'
    ctx.fill()
    ctx.strokeStyle = '#ca8a04'
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(sealX, sealY, 57, 0, Math.PI * 2)
    ctx.strokeStyle = '#ca8a04'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.font = 'bold 13px Arial, sans-serif'
    ctx.fillStyle = '#854d0e'
    ctx.fillText('OFFICIEL', sealX, sealY - 10)
    ctx.fillText('AGRÉÉ', sealX, sealY + 10)
    ctx.font = '8px Arial, sans-serif'
    ctx.fillText('EDUFLEX', sealX, sealY + 25)

    // Signature (droite)
    const sigX = canvas.width / 2 + 280
    const sigY = 930
    
    // Ligne de signature
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(sigX - 120, sigY + 20)
    ctx.lineTo(sigX + 120, sigY + 20)
    ctx.stroke()

    // Texte signature
    ctx.font = '16px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('La Direction EduFlex', sigX, sigY + 45)

    // Écrit à la main
    ctx.font = 'italic 34px Georgia, serif'
    ctx.fillStyle = '#1e3a8a' // Bleu encre
    ctx.fillText('EduFlex Academy', sigX, sigY - 5)

    // Déclencher le téléchargement
    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `Certificat_EduFlex_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`
      link.href = dataUrl
      link.click()
      toast.success('Certificat généré et téléchargé avec succès !')
    } catch (err) {
      toast.error('Erreur lors du téléchargement du certificat.')
    }
  }

  // Calculate progress percent
  const totalChapters = chapterList.length
  const completedChaptersCount = completedIds?.length || 0
  const progressPercent = totalChapters > 0 ? Math.round((completedChaptersCount * 100) / totalChapters) : 0

  return (
    <div className="flex flex-col lg:flex-row h-dvh overflow-hidden bg-background">
      {/* ── Sidebar (Chapter List) ──────────────────────────── */}
      <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border flex flex-col h-[40dvh] lg:h-full bg-card">
        <div className="p-4 border-b border-border space-y-3 shrink-0">
          <Link
            to="/_app/courses/$id"
            params={{ id: String(course.id) } as any}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Fiche de la formation
          </Link>
          <div>
            <h2 className="font-semibold text-sm line-clamp-1">{course.title}</h2>
            <div className="mt-2.5 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progression</span>
                <span className="font-semibold text-foreground">{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {progressPercent === 100 && (
                <div className="pt-2">
                  <Button 
                    onClick={downloadCertificate}
                    size="sm" 
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-medium text-xs gap-1.5 py-1.5 h-8 animate-pulse shadow-sm"
                  >
                    🏆 Télécharger mon certificat
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chapterList.length === 0 ? (
            <p className="text-xs text-muted-foreground p-3 text-center">
              Aucun chapitre disponible.
            </p>
          ) : (
            chapterList.map((chapter, index) => {
              const active = activeChapter?.id === chapter.id
              const done = isCompleted(chapter.id)
              const hasQuiz = chapter.chapterType === 'quiz' || (Array.isArray(chapter.quizData) && chapter.quizData.length > 0)
              const isLive = chapter.chapterType === 'live'

              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapterId(chapter.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {done ? (
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    ) : active ? (
                      <PlayCircle className="h-4.5 w-4.5 text-primary" />
                    ) : isLive ? (
                      <span className="relative flex h-2 w-2 mt-1.5 mx-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[10px]">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs leading-snug line-clamp-2 ${active ? 'text-primary font-medium' : 'text-foreground'}`}>
                      {chapter.title}
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {isLive && <Badge className="bg-red-500 hover:bg-red-600 text-[8px] h-3.5 px-1 py-0 text-white border-0">Direct Live</Badge>}
                      {hasQuiz && <Badge variant="secondary" className="text-[8px] h-3.5 px-1 py-0">Quiz</Badge>}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </aside>

      {/* ── Main content (Course Player) ────────────────────── */}
      <main className="flex-1 overflow-y-auto flex flex-col h-[60dvh] lg:h-full bg-background/40">
        {activeChapter ? (
          <div className="flex-1 p-6 md:p-10 max-w-4xl w-full mx-auto space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {activeChapter.chapterType === 'live' ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <h2 className="text-base font-bold text-foreground">Classe en Direct Interactive</h2>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {activeChapter.scheduledAt ? (
                          <>Planifié pour le : <span className="font-semibold text-foreground">{new Date(activeChapter.scheduledAt).toLocaleString('fr-FR')}</span></>
                        ) : (
                          'Session virtuelle active'
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-red-600 text-white border-0 font-extrabold text-[10px] tracking-wide">DIRECT</Badge>
                      <Badge variant="outline" className="text-[10px]">Audio, Vidéo & Écran</Badge>
                    </div>
                  </div>

                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-black flex flex-col items-center justify-center relative">
                    <iframe
                      src={`https://meet.jit.si/eduflex-${course.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${activeChapter.id}`}
                      allow="camera; microphone; fullscreen; display-capture; autoplay"
                      className="w-full h-full border-0 absolute inset-0"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-border/80">
                      <CardContent className="p-5 space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Comment participer ?</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          1. Cliquez sur le bouton d'activation du microphone/caméra dans l'intégration.<br />
                          2. Indiquez votre prénom pour que l'instructeur puisse vous identifier.<br />
                          3. Utilisez le chat intégré de Jitsi pour poser des questions par écrit.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border/80">
                      <CardContent className="p-5 space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notes de session</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {activeChapter.content || "Aucune note complémentaire pour cette session. Préparez vos notes de cours et vos questions."}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (activeChapter.chapterType === 'quiz' || (Array.isArray(activeChapter.quizData) && activeChapter.quizData.length > 0)) ? (
                <Card className="border border-border/80 shadow-md">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-border/50 pb-4">
                      <div>
                        <h2 className="text-lg font-bold text-foreground">Évaluation des connaissances</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">80% de bonnes réponses requises pour valider ce module</p>
                      </div>
                      {quizSubmitted && (
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${quizPassed ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                          Score : {quizScore}% {quizPassed ? ' (Réussi)' : ' (Échoué)'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      {activeChapter.quizData.map((q: any, qIdx: number) => {
                        const isCorrect = selectedAnswers[qIdx] === q.correctOptionIndex
                        return (
                          <div key={qIdx} className="space-y-3">
                            <p className="text-sm font-semibold text-foreground">{qIdx + 1}. {q.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {q.options.map((opt: string, optIdx: number) => {
                                const isSelected = selectedAnswers[qIdx] === optIdx
                                const isCorrectOpt = optIdx === q.correctOptionIndex
                                
                                let cardStyle = "border-border hover:bg-muted/30"
                                if (isSelected) {
                                  cardStyle = "border-primary bg-primary/5 text-primary font-medium"
                                }
                                if (quizSubmitted) {
                                  if (isCorrectOpt) {
                                    cardStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium"
                                  } else if (isSelected && !isCorrect) {
                                    cardStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"
                                  } else {
                                    cardStyle = "border-border opacity-60 bg-transparent"
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled={quizSubmitted}
                                    onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs transition-all ${cardStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrectOpt && (
                                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">Correct</span>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      {!quizSubmitted ? (
                        <Button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < activeChapter.quizData.length}
                          className="w-full h-11"
                        >
                          Valider mes réponses
                        </Button>
                      ) : (
                        <>
                          {!quizPassed && (
                            <Button onClick={handleRetakeQuiz} variant="outline" className="w-full h-11">
                              Recommencer le quiz
                            </Button>
                          )}
                          {quizPassed && (
                            <Button 
                              onClick={handleNextChapter} 
                              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Continuer la formation
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Video Player */}
                  {activeChapter.videoUrl && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                      {/* Basic HTML5 Video Player support */}
                      <video
                        key={activeChapter.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                        src={activeChapter.videoUrl}
                      >
                        Votre navigateur ne prend pas en charge la lecture de cette vidéo.
                      </video>
                    </div>
                  )}

                  {/* Title & Content */}
                  <div className="space-y-4">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                      {activeChapter.title}
                    </h1>
                    {activeChapter.content ? (
                      <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {activeChapter.content}
                      </div>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Aucun contenu textuel pour ce chapitre.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Discussion Thread */}
            <div className="border-t border-border/60 pt-8 space-y-4">
              <h3 className="text-base font-bold text-foreground">Discussion de la communauté</h3>
              
              {/* Comment Input Form */}
              {user ? (
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    placeholder="Posez votre question ou laissez un message..."
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                    className="flex-1 min-w-0 rounded-md border border-input bg-transparent px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Button type="submit" size="sm" className="text-xs">Envoyer</Button>
                </form>
              ) : (
                <p className="text-xs text-muted-foreground">Veuillez vous connecter pour participer à la discussion.</p>
              )}

              {/* Comments List */}
              {commentsLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">Aucun message pour l'instant. Soyez le premier à poser une question !</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {comments.map((c: any) => {
                    const name = c.profiles?.display_name || c.profiles?.email?.split('@')[0] || 'Apprenant'
                    const initials = name.slice(0, 2).toUpperCase()
                    const date = new Date(c.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                    return (
                      <div key={c.id} className="flex gap-3 text-xs animate-fade-in">
                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px] shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 bg-muted/20 dark:bg-muted/10 p-2.5 rounded-xl border border-border/40">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-foreground">{name}</span>
                            <span className="text-[9px] text-muted-foreground">{date}</span>
                          </div>
                          <p className="text-muted-foreground mt-1 leading-relaxed">{c.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border mt-8">
              {!(Array.isArray(activeChapter.quizData) && activeChapter.quizData.length > 0) && (
                <Button
                  onClick={handleToggleComplete}
                  disabled={toggleMutation.isPending}
                  className="w-full sm:w-auto gap-2"
                  variant={activeChapterIsCompleted ? 'outline' : 'default'}
                >
                  {activeChapterIsCompleted ? (
                    <>
                      <Square className="h-4 w-4" /> Reprendre ce chapitre
                    </>
                  ) : (
                    <>
                      <CheckSquare className="h-4 w-4" /> Marquer comme terminé
                    </>
                  )}
                </Button>
              )}

              {/* Next Button */}
              {chapterList.findIndex((c) => c.id === activeChapter.id) < chapterList.length - 1 && (
                <Button onClick={handleNextChapter} variant="ghost" className="w-full sm:w-auto gap-1 ml-auto text-primary">
                  Chapitre suivant <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={<BookOpen className="h-8 w-8" />}
              title="Sélectionnez un chapitre"
              description="Sélectionnez un chapitre dans la liste de gauche pour commencer à apprendre."
            />
          </div>
        )}
      </main>
    </div>
  )
}
