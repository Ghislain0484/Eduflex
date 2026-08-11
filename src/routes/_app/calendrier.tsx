import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  Button
} from '@blinkdotnew/ui'
import {
  Calendar as CalendarIcon,
  Video,
  MapPin,
  Users,
  Trophy,
  Flag,
  Laptop
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/calendrier')({
  component: CalendrierPage,
})

function CalendrierPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const calendarFeatures = [
    {
      id: 1,
      title: "Blended learning",
      description: "Combinez des formations en ligne avec des sessions en présentiel pour offrir une expérience d'apprentissage enrichie.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <Laptop className="h-5 w-5" />
        </div>
      )
    },
    {
      id: 2,
      title: "Événements physiques",
      description: "Organisez des ateliers, séminaires et sessions de travail en ajoutant l'adresse du lieu directement.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <MapPin className="h-5 w-5" />
        </div>
      )
    },
    {
      id: 3,
      title: "Séances de coaching",
      description: "Planifiez des sessions d'accompagnement individuel ou collectif avec vos apprenants.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <Users className="h-5 w-5" />
        </div>
      )
    },
    {
      id: 4,
      title: "Webinaires et sessions en direct",
      description: "Ajoutez un lien vers votre plateforme de visioconférence (Talkizy, Zoom, Meet...) pour des sessions en direct.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <Video className="h-5 w-5" />
        </div>
      )
    },
    {
      id: 5,
      title: "Gamification",
      description: "Donnez à vos apprenants une raison de revenir régulièrement en planifiant des événements récurrents.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <Trophy className="h-5 w-5" />
        </div>
      )
    },
    {
      id: 6,
      title: "Jalons de parcours",
      description: "Marquez les dates clés de vos formations pour guider la progression de vos apprenants.",
      icon: (
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
          <Flag className="h-5 w-5" />
        </div>
      )
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Upgrade Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
        </span>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
          <Link to="/tarifs">
            Débloquer 🫱
          </Link>
        </Button>
      </div>

      {/* Main Title & Description (Matching Screenshot 1) */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Calendrier
        </h1>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-5xl">
          Gérez vos événements (webinaires, sessions en direct, ateliers) et communiquez-les à vos apprenants. En plus de ces événements, le calendrier de chaque apprenant affiche automatiquement <strong className="text-slate-900 dark:text-white">ses dates personnalisées de déblocage des leçons ainsi que les classes virtuelles</strong> auxquelles il est inscrit.
        </p>
      </div>

      {/* Yellow Upgrade Box for Découverte Plan */}
      {isFreePlan && (
        <div className="max-w-4xl mx-auto">
          <YellowPlanGuardBox />
        </div>
      )}

      {/* 6 Feature Preview Cards Grid (Matching Screenshot 1) */}
      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto pt-2">
        {calendarFeatures.map(item => (
          <Card key={item.id} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3 text-left">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {item.description}
            </p>
          </Card>
        ))}
      </div>

    </div>
  )
}
