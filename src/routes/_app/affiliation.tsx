import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  Button,
  Badge,
  toast,
} from '@blinkdotnew/ui'
import {
  Share2,
  Users,
  Percent,
  CheckCircle2,
  DollarSign
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/affiliation')({
  component: AffiliationPage,
})

function AffiliationPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [isAffiliateActive, setIsAffiliateActive] = useState(false)

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

      {/* Title & Status Badge (Matching Screenshot 5) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Votre programme d'affiliation
        </h1>

        <span className="bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full border border-slate-700 shadow-xs">
          {isAffiliateActive ? 'Activé' : 'Fermé'}
        </span>
      </div>

      {/* Cyan Info Box (Matching Screenshot 5) */}
      <div className="p-6 bg-teal-50 dark:bg-slate-900/60 border border-teal-500/30 rounded-2xl text-slate-700 dark:text-slate-200 space-y-2 shadow-xs">
        <p className="text-xs font-bold leading-relaxed">
          L'affiliation vous permet de vous faire connaître et de vendre plus de formations grâce à la puissance des recommandations.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          En activant votre propre programme d'affiliation, vous récompensez les personnes qui génèrent des ventes pour vous en leur rétribuant un pourcentage des revenus générés !
        </p>
      </div>

      {/* Yellow Upgrade Box for Découverte Plan (Matching Screenshot 5) */}
      {isFreePlan && (
        <div className="max-w-4xl mx-auto pt-2">
          <YellowPlanGuardBox />
        </div>
      )}

    </div>
  )
}
