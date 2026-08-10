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
  PlayCircle,
  CheckCircle2,
  Circle,
  Info,
  Settings,
  ShieldAlert,
  CreditCard,
  HelpCircle
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
    <Card className="animate-fade-in border border-border/85 bg-card/70 backdrop-blur-sm shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold tracking-tight mt-1">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
            {icon}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 animate-pulse" /> : <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
          <span className={cn('text-xs font-bold', isPositive ? 'text-emerald-600' : 'text-red-500')}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          <span className="text-[11px] text-muted-foreground font-medium">{trendLabel}</span>
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

  // Onboarding Step Completion Checks (replicates Teachizy "Bien démarrer" checklist)
  const isAcademyConfigured = !!user?.academyName && !!user?.academyColor
  const isCourseCreated = (stats?.coursesCount ?? 0) > 0
  const isChaptersAdded = (stats?.coursesCount ?? 0) > 0 // Implicit if course exists in sample data
  const isPaymentEnabled = !!user?.academyName // Payments automatically active on setup
  const isStudentEnrolled = (stats?.studentsCount ?? 0) > 0

  // ── DEMO DATA MOCK ENGINE (When platform has zero courses, active to match Teachizy's rich onboarding design) ──
  const isDemoActive = !statsLoading && (!stats || stats.coursesCount === 0)

  const activeStats = isDemoActive ? {
    coursesCount: 3,
    studentsCount: 142,
    totalRevenue: 2950000,
    averageProgress: 68
  } : {
    coursesCount: stats?.coursesCount ?? 0,
    studentsCount: stats?.studentsCount ?? 0,
    totalRevenue: stats?.totalRevenue ?? 0,
    averageProgress: stats?.averageProgress ?? 0
  }

  const enrollmentData = (() => {
    if (isDemoActive) {
      // Return high-fidelity dynamic curve matching Teachizy premium stats look
      return [
        { mois: 'Jan', inscriptions: 8 },
        { mois: 'Fév', inscriptions: 14 },
        { mois: 'Mar', inscriptions: 11 },
        { mois: 'Avr', inscriptions: 22 },
        { mois: 'Mai', inscriptions: 31 },
        { mois: 'Jun', inscriptions: 28 },
        { mois: 'Jul', inscriptions: 45 },
        { mois: 'Aoû', inscriptions: 52 },
        { mois: 'Sep', inscriptions: 68 },
        { mois: 'Oct', inscriptions: 89 },
        { mois: 'Nov', inscriptions: 112 },
        { mois: 'Déc', inscriptions: 142 }
      ]
    }
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

  const barChartData = (() => {
    if (isDemoActive) {
      return [
        { categorie: 'Marketing', revenus: 1200000 },
        { categorie: 'Business', revenus: 950000 },
        { categorie: 'Excel', revenus: 800000 }
      ]
    }
    return stats?.categoryRevenue && stats.categoryRevenue.length > 0
      ? stats.categoryRevenue
      : [{ categorie: 'Aucun cours', revenus: 0 }]
  })()

  const activeRecentEnrollments = (() => {
    if (isDemoActive) {
      return [
        { studentName: 'Moussa Diakité', courseTitle: 'Marketing Digital de A à Z', enrolledAt: new Date(Date.now() - 3600000 * 4).toISOString(), coursePrice: 29900 },
        { studentName: 'Awa Koné', courseTitle: 'Business Management & Stratégie', enrolledAt: new Date(Date.now() - 3600000 * 12).toISOString(), coursePrice: 49900 },
        { studentName: 'Koffi Yao', courseTitle: 'Excel Avancé : Tableaux & Analyse', enrolledAt: new Date(Date.now() - 3600000 * 24).toISOString(), coursePrice: 19900 },
        { studentName: 'Jean-Pierre Kouadio', courseTitle: 'Marketing Digital de A à Z', enrolledAt: new Date(Date.now() - 3600000 * 48).toISOString(), coursePrice: 29900 }
      ]
    }
    return recentEnrollments || []
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
  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* Demo Banner Notification */}
      {isDemoActive && (
        <div className="flex items-center gap-3 p-4 bg-teal-600/10 border border-teal-500/25 rounded-2xl text-xs text-teal-400">
          <Info className="h-4.5 w-4.5 shrink-0" />
          <div className="space-y-0.5">
            <p className="font-bold text-white">Données de démonstration actives</p>
            <p className="text-[11px] text-slate-300">Votre académie est vide. Nous avons pré-rempli des statistiques fictives pour illustrer le fonctionnement des graphiques de vente. Créez des formations pour commencer !</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {user?.academyName ? `Tableau de bord — ${user.academyName}` : 'Tableau de bord'}
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            {user?.academySlogan || "Vue d'ensemble de votre académie de formation EduFlex."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-9">
            <Link to="/manage-courses">Gérer mes formations</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-border text-slate-300 font-bold h-9 bg-slate-900/40">
            <Link to="/settings">Configuration marque</Link>
          </Button>
        </div>
      </div>

      {/* 🚀 ONBOARDING CHECKLIST ("Carnet de route du formateur" identical to Teachizy dashboard) */}
      <Card className="border border-border/80 bg-slate-950/40 shadow-xl rounded-2xl overflow-hidden text-left">
        <CardHeader className="pb-4 bg-slate-900/30 border-b border-border/40">
          <CardTitle className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-500" />
            Pour bien démarrer avec EduFlex (Carnet de route)
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Complétez ces 5 étapes indispensables pour lancer et automatiser votre académie en ligne.</p>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Step 1 */}
            <div className="p-3 bg-slate-900/20 border border-border/50 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Étape 1</span>
                  {isAcademyConfigured ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> : <Circle className="h-4.5 w-4.5 text-slate-600" />}
                </div>
                <h4 className="text-xs font-bold text-white">Nom & Couleur</h4>
                <p className="text-[10px] text-slate-400 leading-snug">Configurez l'identité visuelle de votre académie.</p>
              </div>
              <Button asChild size="xs" variant="ghost" className="h-7 text-[10px] text-teal-400 font-bold justify-start p-0 hover:bg-transparent hover:text-teal-300">
                <Link to="/settings">Configurer →</Link>
              </Button>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-900/20 border border-border/50 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Étape 2</span>
                  {isCourseCreated ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> : <Circle className="h-4.5 w-4.5 text-slate-600" />}
                </div>
                <h4 className="text-xs font-bold text-white">Créer le cours</h4>
                <p className="text-[10px] text-slate-400 leading-snug">Ajoutez votre première formation au catalogue.</p>
              </div>
              <Button asChild size="xs" variant="ghost" className="h-7 text-[10px] text-teal-400 font-bold justify-start p-0 hover:bg-transparent hover:text-teal-300">
                <Link to="/manage-courses">Créer formation →</Link>
              </Button>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900/20 border border-border/50 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Étape 3</span>
                  {isChaptersAdded ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> : <Circle className="h-4.5 w-4.5 text-slate-600" />}
                </div>
                <h4 className="text-xs font-bold text-white">Ajouter chapitres</h4>
                <p className="text-[10px] text-slate-400 leading-snug">Ajoutez des vidéos, des quiz ou des cours en direct.</p>
              </div>
              <Button asChild size="xs" variant="ghost" className="h-7 text-[10px] text-teal-400 font-bold justify-start p-0 hover:bg-transparent hover:text-teal-300">
                <Link to="/manage-courses">Éditer chapitres →</Link>
              </Button>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-slate-900/20 border border-border/50 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Étape 4</span>
                  {isPaymentEnabled ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> : <Circle className="h-4.5 w-4.5 text-slate-600" />}
                </div>
                <h4 className="text-xs font-bold text-white">Comptes de paiement</h4>
                <p className="text-[10px] text-slate-400 leading-snug">Configurez Mobile Money et Stripe pour vos ventes.</p>
              </div>
              <Button asChild size="xs" variant="ghost" className="h-7 text-[10px] text-teal-400 font-bold justify-start p-0 hover:bg-transparent hover:text-teal-300">
                <Link to="/settings">Vérifier →</Link>
              </Button>
            </div>

            {/* Step 5 */}
            <div className="p-3 bg-slate-900/20 border border-border/50 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Étape 5</span>
                  {isStudentEnrolled ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> : <Circle className="h-4.5 w-4.5 text-slate-600" />}
                </div>
                <h4 className="text-xs font-bold text-white">Inscrire un élève</h4>
                <p className="text-[10px] text-slate-400 leading-snug">Inscrivez manuellement ou vendez votre premier accès.</p>
              </div>
              <Button asChild size="xs" variant="ghost" className="h-7 text-[10px] text-teal-400 font-bold justify-start p-0 hover:bg-transparent hover:text-teal-300">
                <Link to="/eleves">Inscrire élève →</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Grid */}
      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-24"><CardContent className="p-6"><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-8 w-36" /></CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Formations actives" value={String(activeStats.coursesCount)} trend={0} trendLabel="Formations publiées" icon={<BookOpen className="h-5 w-5" />} />
          <KpiCard title="Apprenants" value={String(activeStats.studentsCount)} trend={0} trendLabel="Élèves inscrits" icon={<Users className="h-5 w-5" />} />
          <KpiCard 
            title="Revenus de l'académie" 
            value={
              <div className="flex flex-col items-start leading-tight">
                <span>{activeStats.totalRevenue.toLocaleString('fr-FR')} FCFA</span>
                <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                  ~ {Math.round(activeStats.totalRevenue / 655.957).toLocaleString('fr-FR')} €
                </span>
              </div>
            } 
            trend={0} 
            trendLabel="Ventes totales" 
            icon={<Euro className="h-5 w-5" />} 
          />
          <KpiCard title="Taux de complétion" value={`${activeStats.averageProgress} %`} trend={0} trendLabel="Progression moyenne" icon={<TrendingUp className="h-5 w-5" />} />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-white tracking-wide">Évolution des inscriptions</CardTitle>
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

        <Card className="lg:col-span-3 animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-white tracking-wide">Revenus par catégorie</CardTitle>
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

      {/* Recent Enrollments Table */}
      <Card className="animate-fade-in border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm text-left">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-sm font-bold text-white tracking-wide">Inscriptions récentes d'apprenants</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
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
          ) : activeRecentEnrollments.length > 0 ? (
            <div className="space-y-1">
              {activeRecentEnrollments.map((enrollment, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{enrollment.studentName}</p>
                    <p className="text-xs text-slate-400 truncate">
                      Inscrit à : <span className="font-semibold text-teal-400">{enrollment.courseTitle}</span> · Le {new Date(enrollment.enrolledAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <Badge variant="secondary" className="text-xs font-bold bg-slate-900 border border-border/80 text-teal-400">
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
