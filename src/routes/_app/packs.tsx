import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  Button,
  toast,
} from '@blinkdotnew/ui'
import {
  PackagePlus,
  Plus
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/packs')({
  component: PacksPage,
})

function PacksPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

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

      {/* Title & Add Pack Action (Matching Screenshot 3) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Vos Packs
        </h1>

        <Button 
          onClick={() => {
            if (isFreePlan) {
              toast.error("Veuillez passer au forfait PRO pour créer des packs de formations !")
            } else {
              toast.info("Création d'un pack de formations...")
            }
          }}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 rounded-lg px-4 flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" /> Ajouter un pack
        </Button>
      </div>

      {/* Yellow Upgrade Box for Découverte Plan (Matching Screenshot 3) */}
      {isFreePlan && (
        <div className="max-w-4xl mx-auto pt-4">
          <YellowPlanGuardBox />
        </div>
      )}

    </div>
  )
}
