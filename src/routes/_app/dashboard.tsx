import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Skeleton,
  Button,
  EmptyState,
  toast,
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
  HelpCircle,
  ChevronRight,
  Sparkle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import { useDashboardStats, useRecentEnrollments, useAllEnrollments } from '@/hooks/useStats'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useCourses } from '@/hooks/useCourses'
import { useEnrollments } from '@/hooks/useEnrollments'

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useAuth()
  const { data: stats } = useDashboardStats()
  const { data: studentEnrollments, isLoading: studentLoading } = useEnrollments()
  const { data: allPublishedCourses } = useCourses()

  const [onboardingOpen, setOnboardingOpen] = useState(true)

  const isInstructorOrAdmin = user?.role === 'teacher' || user?.role === 'admin'

  // Onboarding Checklist state calculations (matching screenshots)
  const isUrlConfigured = true // Completed by default
  const isSpacePersonalized = !!user?.academyColor // Checks if brand color exists
  const isFirstCourseCreated = (stats?.coursesCount ?? 0) > 0
  const isBusinessInfoAdded = !!user?.academyName // Checks if academy name configured
  const isPaymentConfigured = true // Active by default for Mobile Money

  const completedStepsCount = [
    isUrlConfigured,
    isSpacePersonalized,
    isFirstCourseCreated,
    isBusinessInfoAdded,
    isPaymentConfigured
  ].filter(Boolean).length

  const progressPercent = (completedStepsCount / 5) * 100

  // ── STUDENT DASHBOARD (ESPACE APPRENANT) ────────────────────────────
  if (!isInstructorOrAdmin) {
    const enrolledCoursesCount = studentEnrollments?.length || 0
    const completedCourses = studentEnrollments?.filter(e => e.progressPercent === 100) || []
    const averageProgress = enrolledCoursesCount > 0 
      ? Math.round((studentEnrollments?.reduce((sum, e) => sum + e.progressPercent, 0) || 0) / enrolledCoursesCount)
      : 0

    return (
      <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
        {/* Learner Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-955/20 border border-border/70 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
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

  // ── INSTRUCTOR/ADMIN HOME DASHBOARD (IDENTICAL TO TEACHIZY SCREENSHOTS) ──
  const featureCards = [
    {
      id: 1,
      title: "Créer **autant de formations** que vous le voulez, avec **autant d'apprenants** que vous le voulez.",
      btnText: "Ajouter",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M18 42h28M18 34h28M18 26h18" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 22l4 4-8 8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Apprendre à créer les meilleures formations en ligne grâce à votre **coaching offert** !",
      btnText: "Réserver mon coaching",
      link: "/academy-hub",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 18l14 8-14 8-14-8 14-8z" fill="#0d9488" fillOpacity="0.3" stroke="#0d9488" strokeWidth="2" />
          <path d="M18 26v12c0 4 6 6 14 6s14-2 14-6V26" stroke="#0d9488" strokeWidth="2" />
          <path d="M32 34v10" stroke="#0d9488" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Inviter **vos collaborateurs** à gérer vos contenus et vos apprenants. **Passez à la vitesse supérieure** !",
      btnText: "Inviter",
      link: "/enseignants",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <circle cx="32" cy="24" r="6" stroke="#0d9488" strokeWidth="2.5" />
          <path d="M20 44c0-7 6-10 12-10s12 3 12 10" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="48" cy="28" r="4" stroke="#0d9488" strokeWidth="2" />
          <circle cx="16" cy="28" r="4" stroke="#0d9488" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Créer **des codes promo** en illimité !",
      btnText: "Créer",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <rect x="20" y="24" width="24" height="16" rx="2" stroke="#0d9488" strokeWidth="2.5" />
          <circle cx="28" cy="32" r="2" fill="#0d9488" />
          <path d="M38 32h-4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Connecter un **sous-domaine personnalisé**.",
      btnText: "Connecter",
      link: "/settings",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <circle cx="32" cy="32" r="14" stroke="#0d9488" strokeWidth="2" />
          <path d="M18 32h28M32 18v28" stroke="#0d9488" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Configurer vos outils marketing parmi **Brevo, ActiveCampaign et GetResponse**.",
      btnText: "Configurer",
      link: "/settings",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M20 28l12 8 12-8" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="18" y="22" width="28" height="20" rx="3" stroke="#0d9488" strokeWidth="2.5" />
        </svg>
      )
    },
    {
      id: 7,
      title: "**Personnaliser les emails** automatiques envoyés à vos apprenants.",
      btnText: "Personnaliser",
      link: "/settings",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 24h20v16H22V24z" stroke="#0d9488" strokeWidth="2" />
          <path d="M22 28l10 6 10-6" stroke="#0d9488" strokeWidth="2" />
          <circle cx="44" cy="22" r="6" fill="#ef4444" />
        </svg>
      )
    },
    {
      id: 8,
      title: "**Intégrer vos formations** sur autant de sites externes que vous le souhaitez.",
      btnText: "Intégrer",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M24 26l-6 6 6 6M40 26l6 6-6 6M34 22l-4 20" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 9,
      title: "Évaluer vos apprenants en **leur proposant des devoirs** qu'ils devront vous soumettre.",
      btnText: "Personnaliser",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 42V22h20v20H22z" stroke="#0d9488" strokeWidth="2" />
          <path d="M28 28h8M28 34h8" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 10,
      title: "Proposer à vos clients de **payer vos formations avec PayPal**, pour générer plus de ventes !",
      btnText: "Connecter",
      link: "/settings",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 22h14c4 0 7 2 7 6s-3 6-7 6H28v10h-6V22z" fill="#0d9488" fillOpacity="0.2" stroke="#0d9488" strokeWidth="2" />
          <path d="M28 28h12c3 0 5 1.5 5 4.5S43 37 40 37H34v11h-6V28z" fill="#0d9488" fillOpacity="0.3" stroke="#0d9488" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 11,
      title: "Configurer **un programme d'affiliation complet** et faites de vos clients actuels vos **apporteurs d'affaire**.",
      btnText: "Configurer",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 20v24M20 32h24" stroke="#0d9488" strokeWidth="2" />
          <circle cx="20" cy="32" r="4" fill="#0d9488" />
          <circle cx="44" cy="32" r="4" fill="#0d9488" />
          <circle cx="32" cy="20" r="4" fill="#0d9488" />
          <circle cx="32" cy="44" r="4" fill="#0d9488" />
        </svg>
      )
    },
    {
      id: 12,
      title: "Activer notre **système anti-décrochage** pour booster le taux de complétion de vos formations.",
      btnText: "Activer",
      link: "/settings",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 18v28M22 28h20" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 22l6-6 6 6" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 13,
      title: "Faire appel à nos **outils IA** pour vous aider à **générer du contenu** pour vos formations en quelques clics.",
      btnText: "Générer",
      link: "/academy-hub",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 20v24" stroke="#0d9488" strokeWidth="2" />
          <path d="M24 28l8-8 8 8" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="6" stroke="#0d9488" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 14,
      title: "Utiliser notre **CRM** en ajoutant des notes et des informations personnelles sur vos apprenants.",
      btnText: "Utiliser",
      link: "/eleves",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 22h20v20H22V22z" stroke="#0d9488" strokeWidth="2.5" />
          <path d="M28 30h8M28 34h8M28 26h4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 15,
      title: "Récolter **des avis à chaud** sur chaque leçon pour savoir si vos formations plaisent.",
      btnText: "Récolter",
      link: "/manage-courses",
      icon: (
        <svg className="w-16 h-16 text-teal-500 mx-auto" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 18l4 9 10 1.5-7 7 2 10.5-9-5-9 5 2-10.5-7-7 10-1.5z" fill="#0d9488" fillOpacity="0.2" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )
    }
  ]

  const toggleOnboarding = () => {
    setOnboardingOpen(!onboardingOpen)
  }

  const displayName = user?.displayName || "Ghislain"

  return (
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500/20 selection:text-teal-900">
      
      {/* 1. UPGRADE BANNER (Exactly as in Teachizy screenshot) */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-sm gap-4">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
          </span>
          <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 scale-98 hover:scale-100 shrink-0">
            <Link to="/tarifs">
              Débloquer 🫱
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. MAIN CENTRED HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bienvenue <span className="underline decoration-teal-500 decoration-3 underline-offset-4">{displayName}</span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">
          Créons ensemble pas à pas votre espace personnalisé de formation !
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">
          Configurez votre espace en 5 étapes simples
        </p>
        
        {/* Onboarding progress bar indicator */}
        <div className="max-w-md mx-auto space-y-1.5 pt-2">
          <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-300 dark:border-slate-800">
            <div 
              className="bg-emerald-500 h-full transition-all duration-1000 ease-out rounded-full" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500">{progressPercent}% complété</span>
        </div>
      </section>

      {/* 3. 5-STEP CHECKLIST BOX (Exactly as in Teachizy screenshot) */}
      <section className="max-w-xl mx-auto px-6 pb-12">
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-md rounded-xl overflow-hidden text-left transition-all duration-300">
          <CardHeader className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-white">
              Pour commencer
            </CardTitle>
            <button 
              onClick={toggleOnboarding}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
              title="Masquer / Afficher"
            >
              {onboardingOpen ? (
                <ToggleRight className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              ) : (
                <ToggleLeft className="h-6 w-6 text-slate-400" />
              )}
            </button>
          </CardHeader>

          {onboardingOpen && (
            <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
              {/* Step 1 */}
              <Link 
                to="/settings"
                className="flex items-center gap-4 py-3.5 px-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-500 transition-colors">
                  1) Définissez l'URL de votre espace
                </span>
              </Link>

              {/* Step 2 */}
              <Link 
                to="/settings"
                className="flex items-center gap-4 py-3.5 px-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
              >
                {isSpacePersonalized ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
                )}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-500 transition-colors">
                  2) Personnalisez votre espace (Logo & Couleurs)
                </span>
              </Link>

              {/* Step 3 */}
              <Link 
                to="/manage-courses"
                className="flex items-center gap-4 py-3.5 px-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
              >
                {isFirstCourseCreated ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
                )}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-500 transition-colors">
                  3) Créez votre première formation
                </span>
              </Link>

              {/* Step 4 */}
              <Link 
                to="/settings"
                className="flex items-center gap-4 py-3.5 px-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
              >
                {isBusinessInfoAdded ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
                )}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-500 transition-colors">
                  4) Ajoutez vos informations d'entreprise
                </span>
              </Link>

              {/* Step 5 */}
              <Link 
                to="/settings"
                className="flex items-center gap-4 py-3.5 px-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
              >
                <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-teal-500 transition-colors">
                  5) Configurez votre système de paiement
                </span>
              </Link>
            </CardContent>
          )}
        </Card>
      </section>

      {/* 4. MOCK DATA SUMMARY AND CHARTS LINK */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Info className="h-4.5 w-4.5 text-teal-600 shrink-0" />
            <span>EduFlex intègre des rapports de vente en temps réel. Suivez vos revenus et inscriptions de vos élèves.</span>
          </div>
          <Button asChild size="sm" variant="ghost" className="h-8 text-teal-600 dark:text-teal-400 font-bold hover:bg-transparent">
            <Link to="/statistiques" className="flex items-center gap-1">
              Voir les Statistiques <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 5. "AVEC EDUFLEX, VOUS POUVEZ :" 15-CARD INTERACTIVE GRID (Exactly as in Teachizy screenshots) */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-center space-y-8">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Avec EduFlex, vous pouvez :
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featureCards.map(card => (
            <Card 
              key={card.id} 
              className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/25 shadow hover:shadow-lg hover:border-teal-500/20 dark:hover:border-teal-500/20 transition-all rounded-2xl overflow-hidden flex flex-col justify-between text-center p-6 space-y-6"
            >
              {/* Central Custom SVG Illustration */}
              <div className="h-20 flex items-center justify-center">
                {card.icon}
              </div>

              {/* Bold-emphasized text */}
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed px-2 flex-1">
                {card.title.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index} className="text-slate-900 dark:text-white font-bold">{part}</strong> : part
                )}
              </p>

              {/* Action Button */}
              <div>
                <Button 
                  asChild
                  className="w-full bg-[#112d27] hover:bg-[#153830] text-teal-400 font-bold h-10 border border-teal-800/40 rounded-lg shadow-sm"
                >
                  <Link to={card.link as any}>
                    {card.btnText}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </div>
  )
}
