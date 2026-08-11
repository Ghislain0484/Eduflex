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
  toast,
} from '@blinkdotnew/ui'
import {
  Users,
  Search,
  Download,
  UserPlus,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Upload
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/eleves')({
  component: ElevesPage,
})

function ElevesPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [searchFilter, setSearchFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('STUDENT')
  const [sortOrder, setSortOrder] = useState('created_at')

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

      {/* Title & Top Right Actions (Matching Screenshot 3) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Apprenants
        </h1>

        <Button 
          onClick={() => toast.info("Export CSV en cours de génération...")}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 rounded-lg px-4 flex items-center gap-1.5"
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filter bar (Matching Screenshot 3) */}
      <div className="grid gap-3 md:grid-cols-12 items-end">
        <div className="md:col-span-6 space-y-1">
          <label className="text-xs font-semibold text-slate-500">Filtrer par</label>
          <Input
            placeholder="Filtrez par email, prénom, nom, tag ou lien UTM"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 text-xs h-9"
          />
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-semibold text-slate-500">Type</label>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none px-3 cursor-pointer"
          >
            <option value="STUDENT">Inscrits</option>
            <option value="ALL">Tous les contacts</option>
            <option value="LEAD">Prospects / Leads</option>
          </select>
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-semibold text-slate-500">Trier par</label>
          <div className="flex gap-1.5">
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="flex-1 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none px-3 cursor-pointer"
            >
              <option value="created_at">Date d'inscription</option>
              <option value="name">Nom / Prénom</option>
              <option value="progress">Progression</option>
            </select>
            <button className="h-9 w-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0">
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtitle Limit Badge & Action Buttons (Matching Screenshot 3) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          Résultat : <strong className="text-teal-600 dark:text-teal-400">0 apprenant</strong> / 70 maximum avec le Forfait DÉCOUVERTE
        </span>

        <div className="flex gap-2">
          <Button 
            onClick={() => toast.info("Formulaire d'invitation prêt.")}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8.5 rounded-lg px-3.5 flex items-center gap-1.5"
          >
            <UserPlus className="h-4 w-4" /> Inviter un apprenant
          </Button>
          <Button 
            onClick={() => toast.info("Importation CSV.")}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8.5 rounded-lg px-3.5 flex items-center gap-1.5"
          >
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
        </div>
      </div>

      {/* Table & Empty State (Matching Screenshot 3) */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-xl overflow-hidden shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Apprenant</th>
                <th className="py-3.5 px-6">Activité</th>
                <th className="py-3.5 px-6 text-right">Revenus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td colSpan={3} className="py-16 text-center text-slate-400 text-xs italic">
                  Il n'y pas de résultat pour cette recherche
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination bar (Matching Screenshot 3) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-1">
          <button disabled className="h-7 w-7 rounded border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button disabled className="h-7 w-7 rounded border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Card>

    </div>
  )
}
