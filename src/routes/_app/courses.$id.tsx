import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Badge, Button, Card, CardContent, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { useCourse } from '@/hooks/useCourses'
import { useEnroll, useEnrollments } from '@/hooks/useEnrollments'
import { useChapters } from '@/hooks/useChapters'
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeft, Clock, Users, BookOpen, GraduationCap, CheckCircle, Play } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_app/courses/$id')({
  component: CourseDetailPage,
})

const LEVEL_MAP: Record<string, string> = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' }

function CourseDetailPage() {
  const { id } = useParams({ from: '/courses/$id' } as any)
  const { data: course, isLoading, error } = useCourse(Number(id))
  const { data: chapters } = useChapters(Number(id))
  const { data: enrollments } = useEnrollments()
  const { isAuthenticated } = useAuth()
  const enrollMutation = useEnroll()
  const [enrolled, setEnrolled] = useState(false)

  const isUserEnrolled = enrollments?.some(e => Number(e.courseId) === Number(id))


  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4"><Skeleton className="h-64 w-full rounded-xl" /><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !course) {
    return <div className="p-6 max-w-6xl mx-auto"><EmptyState icon={<BookOpen className="h-8 w-8" />} title="Formation introuvable" description="Cette formation n'existe pas ou n'est plus disponible." /></div>
  }

  const handleEnroll = () => {
    if (!isAuthenticated) return
    enrollMutation.mutate(course.id, { onSuccess: () => setEnrolled(true) })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Link to="/_app/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative">
            {course.imageUrl ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full"><BookOpen className="h-20 w-20 text-primary/20" /></div>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{course.category || 'Général'}</Badge>
            <Badge variant="outline">{LEVEL_MAP[course.level] || course.level}</Badge>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{course.description}</p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Contenu de la formation</h2>
              <div className="space-y-3">
                {chapters && chapters.length > 0 ? (
                  chapters.map((chapter, i) => (
                    <div key={chapter.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-semibold">{i + 1}</div>
                      <span className="text-sm font-medium">{chapter.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">Aucun chapitre disponible pour le moment.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{((Number(course.price) || 0) / 100).toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-muted-foreground mt-1">Accès à vie</p>
              </div>
              {enrolled || isUserEnrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="h-5 w-5" /><span className="text-sm font-medium">Inscription confirmée !</span>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/study/$id" params={{ id: String(course.id) }}>
                      Continuer la formation
                    </Link>
                  </Button>
                </div>
              ) : isAuthenticated ? (
                <Button className="w-full" size="lg" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                  {enrollMutation.isPending ? 'Inscription...' : 'S\'inscrire à cette formation'}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg"><Link to="/login">Connectez-vous pour vous inscrire</Link></Button>
                  <p className="text-xs text-center text-muted-foreground">Pas encore de compte ? <Link to="/register" className="text-primary hover:underline">S'inscrire</Link></p>
                </div>
              )}
              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>{course.durationHours || 0} heures de contenu</span></div>
                <div className="flex items-center gap-3 text-sm"><Users className="h-4 w-4 text-muted-foreground" /><span>{Number(course.studentsCount) || 0} apprenants inscrits</span></div>
                <div className="flex items-center gap-3 text-sm"><GraduationCap className="h-4 w-4 text-muted-foreground" /><span>Certificat de complétion</span></div>
                <div className="flex items-center gap-3 text-sm"><Play className="h-4 w-4 text-muted-foreground" /><span>Accès illimité à vie</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
