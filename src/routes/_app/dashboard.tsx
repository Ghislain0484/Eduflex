import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Skeleton,
  Button,
  EmptyState,
} from '@blinkdotnew/ui'
import {
  BookOpen,
  Users,
  Euro,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Award,
  PlayCircle
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDashboardStats, useRecentEnrollments, useAllEnrollments } from '@/hooks/useStats'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useCourses } from '@/hooks/useCourses'
import { useEnrollments } from '@/hooks/useEnrollments'

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
})

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function KpiCard({ title, value, trend, trendLabel, icon }: {
  title: string; value: React.ReactNode; trend: number; trendLabel: string; icon: React.ReactNode
}) {
  const isPositive = trend >= 0
  return (
    <Card className="animate-fade-in border border-border/80 bg-card/60 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
            {icon}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" /> : <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
          <span className={cn('text-xs font-semibold', isPositive ? 'text-emerald-600' : 'text-red-500')}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          <span className="text-xs text-muted-foreground">{trendLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardPage() {
  const { user } = useAuth()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: recentEnrollments, isLoading: enrollmentsLoading } = useRecentEnrollments()
  const { data: allEnrollments } = useAllEnrollments()

  // Student specific queries
  const { data: studentEnrollments, isLoading: studentLoading } = useEnrollments()
  const { data: allPublishedCourses } = useCourses()

  const isInstructorOrAdmin = user?.role === 'teacher' || user?.role === 'admin'

  // Build REAL monthly inscriptions from enrollment data
  const enrollmentData = (() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const counts: Record<number, number> = {}
    for (let i = 0; i < 12; i++) counts[i] = 0
    if (allEnrollments) {
      allEnrollments.forEach(e => {
        const d = new Date(e.enrolledAt)
        if (d.getFullYear() === currentYear) {
          counts[d.getMonth()] = (counts[d.getMonth()] || 0) + 1
        }
      })
    }
    return MONTH_LABELS.map((mois, i) => ({ mois, inscriptions: counts[i] || 0 }))
  })()

  if (user?.academyName && !user.approved) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-background min-h-[85vh]">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in border border-border bg-card p-8 rounded-2xl shadow-xl">
          <div className="mx-auto h-16 w-16 bg-teal-500/10 text-teal-600 flex items-center justify-center rounded-2xl">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">Félicitations, votre inscription a été prise en compte !</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Votre demande de création d'académie en ligne pour <strong className="text-foreground">{user.academyName}</strong> est actuellement en cours de validation par notre équipe d'administrateurs.
            </p>
          </div>
          <Card className="border border-border/80 bg-accent/40 text-left">
            <CardContent className="pt-6 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                📌 Prochaines étapes :
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Validation de vos informations par l'administrateur de la plateforme (sous 24h).</li>
                <li>Activation de vos fonctionnalités d'enseignement et de personnalisation en marque blanche.</li>
                <li>Notification automatique par e-mail dès que votre espace sera opérationnel.</li>
              </ul>
            </CardContent>
          </Card>
          <div className="text-[11px] text-muted-foreground">
            Besoin d'aide ? Contactez notre support technique à <a href="mailto:support@eduflex.com" className="text-teal-500 hover:underline font-semibold">support@eduflex.com</a>
          </div>
        </div>
      </div>
    )
  }

  // ── RENDER STUDENT DASHBOARD (ESPACE APPRENANT) ────────────────────────────
  if (!isInstructorOrAdmin) {
    const enrolledCoursesCount = studentEnrollments?.length || 0
    const completedCourses = studentEnrollments?.filter(e => e.progressPercent === 100) || []
    const averageProgress = enrolledCoursesCount > 0 
      ? Math.round((studentEnrollments?.reduce((sum, e) => sum + e.progressPercent, 0) || 0) / enrolledCoursesCount)
      : 0

    return (
      <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
        {/* Learner Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/20 border border-border/70 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Bonjour, {user?.displayName || 'Apprenant'} 👋
            </h1>
            <p className="text-xs text-muted-foreground">
              Ravi de vous revoir sur votre portail d'apprentissage. Suivez vos cours et téléchargez vos diplômes.
            </p>
          </div>
          <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-9">
            <Link to="/courses">Explorer le catalogue</Link>
          </Button>
        </div>

        {/* Student KPIs */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border border-border/70 bg-card/40 backdrop-blur-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Formations suivies</p>
                <p className="text-xl font-bold text-white">{enrolledCoursesCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/70 bg-card/40 backdrop-blur-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Certificats obtenus</p>
                <p className="text-xl font-bold text-white">{completedCourses.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/70 bg-card/40 backdrop-blur-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Progression globale</p>
                <p className="text-xl font-bold text-white">{averageProgress}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled courses vs Certificates grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main learning section (Left) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mes Formations actives</h2>
            
            {studentLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <Card key={i} className="h-28 w-full border border-border/60 animate-pulse" />
                ))}
              </div>
            ) : !studentEnrollments || studentEnrollments.length === 0 ? (
              <Card className="border-dashed border-border/80 bg-slate-900/10 py-12">
                <EmptyState
                  icon={<BookOpen className="h-10 w-10 text-slate-500" />}
                  title="Aucun cours en cours"
                  description="Inscrivez-vous à des cours pour démarrer votre apprentissage en ligne."
                >
                  <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold mt-4">
                    <Link to="/courses">Voir le catalogue</Link>
                  </Button>
                </EmptyState>
              </Card>
            ) : (
              <div className="grid gap-4">
                {studentEnrollments.map(enrollment => {
                  const course = allPublishedCourses?.find(c => c.id === enrollment.courseId)
                  if (!course) return null

                  return (
                    <Card key={enrollment.id} className="border border-border/70 bg-card hover:border-teal-500/30 transition-all shadow-sm">
                      <CardContent className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        {course.imageUrl ? (
                          <img src={course.imageUrl} alt={course.title} className="w-full sm:w-28 h-20 object-cover rounded-xl border border-border/40 shrink-0" />
                        ) : (
                          <div className="w-full sm:w-28 h-20 rounded-xl bg-slate-800 flex items-center justify-center text-muted-foreground shrink-0 font-bold text-xs">
                            No Cover
                          </div>
                        )}
                        <div className="flex-1 space-y-3 w-full">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-teal-600/10 text-teal-400 hover:bg-teal-600/10 text-[10px] uppercase font-bold border-none">
                                {course.category || 'Général'}
                              </Badge>
                              {enrollment.progressPercent === 100 && (
                                <Badge className="bg-emerald-600/10 text-emerald-400 border-none text-[9px] font-bold">
                                  ✓ Terminé
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-sm font-bold text-white leading-snug">{course.title}</h3>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400">Progression</span>
                              <span className="text-teal-400 font-bold">{enrollment.progressPercent}%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-800">
                              <div 
                                className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" 
                                style={{ width: `${enrollment.progressPercent}%` }} 
                              />
                            </div>
                          </div>
                        </div>

                        <Button asChild size="sm" variant={enrollment.progressPercent === 100 ? 'outline' : 'default'} className={cn("w-full sm:w-auto shrink-0 font-bold text-xs h-9", enrollment.progressPercent === 100 ? 'border-border text-slate-300' : 'bg-teal-600 hover:bg-teal-500 text-white')}>
                          <Link to="/study/$id" params={{ id: String(course.id) }} className="flex items-center gap-1">
                            {enrollment.progressPercent === 100 ? (
                              <>
                                <PlayCircle className="h-3.5 w-3.5" /> Revoir le cours
                              </>
                            ) : (
                              <>
                                Continuer <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </>
                            )}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Certificates block (Right) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mes Récompenses</h2>
            <Card className="border border-border/70 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-500" /> Diplômes & Certificats
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {completedCourses.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500 italic space-y-1">
                    <p>Aucun certificat pour le moment.</p>
                    <p className="text-[10px] text-slate-600">Complétez un cours à 100% pour générer votre attestation.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {completedCourses.map(e => {
                      const course = allPublishedCourses?.find(c => c.id === e.courseId)
                      if (!course) return null
                      return (
                        <div key={e.id} className="p-3 bg-slate-950/40 border border-border/60 rounded-xl flex items-center justify-between gap-3">
                          <div className="space-y-0.5 min-w-0">
                            <p className="text-xs font-bold text-white truncate leading-tight">{course.title}</p>
                            <p className="text-[9px] text-muted-foreground">Obtenu le {new Date(e.enrolledAt).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <Button asChild size="xs" variant="outline" className="h-7 text-[10px] font-bold border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                            <Link to="/study/$id" params={{ id: String(course.id) }}>
                              Télécharger
                            </Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ── RENDER INSTRUCTOR/ADMIN DASHBOARD ────────────────────────────────────
  const barChartData = stats?.categoryRevenue && stats.categoryRevenue.length > 0
    ? stats.categoryRevenue
    : [{ categorie: 'Aucun cours', revenus: 0 }]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.academyName ? `Tableau de bord — ${user.academyName}` : 'Tableau de bord'}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {user?.academySlogan || "Vue d'ensemble de votre plateforme EduFlex"}
        </p>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-8 w-36" /></CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Formations actives" value={String(stats?.coursesCount ?? 0)} trend={0} trendLabel="Formations publiées" icon={<BookOpen className="h-5 w-5" />} />
          <KpiCard title="Apprenants" value={String(stats?.studentsCount ?? 0)} trend={0} trendLabel="Élèves inscrits" icon={<Users className="h-5 w-5" />} />
          <KpiCard 
            title="Revenus" 
            value={
              <div className="flex flex-col items-start leading-tight">
                <span>{(stats?.totalRevenue || 0).toLocaleString('fr-FR')} FCFA</span>
                {stats?.totalRevenue ? (
                  <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                    ~ {Math.round((stats.totalRevenue || 0) / 655.957).toLocaleString('fr-FR')} €
                  </span>
                ) : null}
              </div>
            } 
            trend={0} 
            trendLabel="Ventes totales" 
            icon={<Euro className="h-5 w-5" />} 
          />
          <KpiCard title="Taux de complétion" value={`${stats?.averageProgress ?? 0} %`} trend={0} trendLabel="Progression moyenne" icon={<TrendingUp className="h-5 w-5" />} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Évolution des inscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorInscriptions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(172 73% 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(172 73% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '13px' }} />
                  <Area type="monotone" dataKey="inscriptions" stroke="hsl(172 73% 50%)" strokeWidth={2} fill="url(#colorInscriptions)" name="Inscriptions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenus par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                  <XAxis dataKey="categorie" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '13px' }} formatter={(value: number) => [`${value.toLocaleString('fr-FR')} FCFA`, 'Revenus']} />
                  <Bar dataKey="revenus" fill="hsl(172 73% 45%)" radius={[6, 6, 0, 0]} name="Revenus" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Inscriptions récentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {enrollmentsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-4 w-48" /><Skeleton className="h-3 w-32" /></div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentEnrollments && recentEnrollments.length > 0 ? (
            <div className="space-y-1">
              {recentEnrollments.map((enrollment, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{enrollment.studentName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      S'est inscrit à : <span className="font-medium text-foreground">{enrollment.courseTitle}</span> · {new Date(enrollment.enrolledAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {(enrollment.coursePrice || 0).toLocaleString('fr-FR')} FCFA
                    </Badge>
                    {enrollment.coursePrice > 0 && (
                      <span className="text-[9px] text-muted-foreground mt-0.5">
                        ~ {Math.round((enrollment.coursePrice || 0) / 655.957).toLocaleString('fr-FR')} €
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">Aucune inscription pour le moment</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
