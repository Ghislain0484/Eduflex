import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  Button,
  toast,
} from '@blinkdotnew/ui'
import {
  Code2,
  ExternalLink,
  HelpCircle
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/integrations')({
  component: IntegrationsPage,
})

function IntegrationsPage() {
  const { user } = useAuth()

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Top Upgrade Banner */}
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

      {/* Main Content Grid (Matching Screenshot 1) */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Column: Intégration Externe Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Intégrez vos formations et vos packs à un site externe
          </h1>
          
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Vous avez un site existant ? Que vous utilisiez Wix, WordPress, Drupal, Ionos, Leadpages ou Instapage...
          </p>

          <p className="text-xs text-slate-500 leading-relaxed">
            Nous avons développé cette fonctionnalité d'intégration externe pour vous permettre de <strong className="text-slate-800 dark:text-slate-200">faciliter les inscriptions à vos formations depuis n'importe quel site web</strong> : sous forme de liens, de boutons ou de cartes.
          </p>

          <button onClick={() => toast.info("Ouverture du tutoriel d'intégration...")} className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
            Vous pouvez suivre notre tutoriel sur le sujet en cliquant ici <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        {/* Right Column: No product published notification box (Matching Screenshot 1) */}
        <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs min-h-[140px] flex items-center justify-center">
          <div className="p-4 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center w-full">
            Vous n'avez aucun produit publié à intégrer pour le moment.
          </div>
        </Card>

      </div>

    </div>
  )
}
