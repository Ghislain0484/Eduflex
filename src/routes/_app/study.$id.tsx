import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  EmptyState,
} from '@blinkdotnew/ui'
import { useCourse } from '@/hooks/useCourses'
import {
  useChapters,
  useCompletedChapters,
  useToggleChapterCompletion,
} from '@/hooks/useChapters'
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
  const { id } = useParams({ from: '/study.$id' } as any)
  const { data: course, isLoading: courseLoading } = useCourse(Number(id))
  const { data: chapters, isLoading: chaptersLoading } = useChapters(Number(id))
  const { data: completedIds } = useCompletedChapters(Number(id))
  const toggleMutation = useToggleChapterCompletion(Number(id))

  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)

  const chapterList = chapters || []
  const activeChapter = chapterList.find((c) => c.id === activeChapterId) || chapterList[0]

  useEffect(() => {
    if (chapterList.length > 0 && activeChapterId === null) {
      // Find first incomplete chapter or default to first chapter
      const incomplete = chapterList.find((c) => !completedIds?.includes(c.id))
      setActiveChapterId(incomplete ? incomplete.id : chapterList[0].id)
    }
  }, [chapterList, completedIds, activeChapterId])

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
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[10px]">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs leading-snug line-clamp-2 ${active ? 'text-primary' : 'text-foreground'}`}>
                      {chapter.title}
                    </p>
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
            </div>

            {/* Navigation Footer */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border mt-8">
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
