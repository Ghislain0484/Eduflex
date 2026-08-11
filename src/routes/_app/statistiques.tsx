import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@blinkdotnew/ui'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/statistiques')({
  component: StatistiquesPage,
})

function StatistiquesPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [dateRange, setDateRange] = useState('12/07/2026 - 10/08/2026')
  const [period, setPeriod] = useState('30d')

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

      {/* Main Title */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Statistiques récentes
        </h1>

        {/* Date Filter controls (Matching Screenshot 2) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            {dateRange}
          </div>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="h-9 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none shadow-xs cursor-pointer"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* 4 KPI Cards Grid (Matching Screenshot 2) */}
      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2">
          <span className="text-xs font-medium text-slate-500">Apprenants</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
          <p className="text-[11px] text-slate-400">Période précédente : <span className="font-semibold">0</span></p>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2">
          <span className="text-xs font-medium text-slate-500">Ventes</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
          <p className="text-[11px] text-slate-400">Période précédente : <span className="font-semibold">0</span></p>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2">
          <span className="text-xs font-medium text-slate-500">Revenus</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">0,00 € <span className="text-xs text-slate-400 font-normal">(0 FCFA)</span></p>
          <p className="text-[11px] text-slate-400">Période précédente : <span className="font-semibold">0,00 €</span></p>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 rounded-xl text-left space-y-2">
          <span className="text-xs font-medium text-slate-500">Abandonnés</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
          <p className="text-[11px] text-slate-400">Période précédente : <span className="font-semibold">0</span></p>
        </Card>
      </div>

      {/* Summary Stats Table (Matching Screenshot 2) */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs divide-y divide-slate-100 dark:divide-slate-800">
        <div className="flex justify-between items-center px-6 py-3">
          <span className="font-medium text-slate-600 dark:text-slate-400">Dernière vente effectuée :</span>
          <span className="font-bold text-slate-900 dark:text-white">N/A</span>
        </div>
        <div className="flex justify-between items-center px-6 py-3">
          <span className="font-medium text-slate-600 dark:text-slate-400">Nombre d'apprenants ayant fini une formation :</span>
          <span className="font-bold text-slate-900 dark:text-white">N/A</span>
        </div>
        <div className="flex justify-between items-center px-6 py-3">
          <span className="font-medium text-slate-600 dark:text-slate-400">Nombre d'apprenants ayant commencé une formation :</span>
          <span className="font-bold text-slate-900 dark:text-white">N/A</span>
        </div>
      </div>

      {/* Graphiques Section with Yellow Upgrade Box (Matching Screenshot 2) */}
      <div className="max-w-4xl mx-auto pt-6 space-y-4 text-left">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Graphiques</h2>

        {isFreePlan ? (
          <YellowPlanGuardBox 
            subtext="Seuls ceux ayant un Forfait EXPERT ou supérieur peuvent bénéficier de cette fonctionnalité."
          />
        ) : (
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-xl text-center text-slate-400 text-xs italic">
            Graphiques d'évolution des ventes réelles en cours de chargement...
          </Card>
        )}
      </div>

    </div>
  )
}
