import { createFileRoute } from '@tanstack/react-router'
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
  Share2,
  Users,
  Euro,
  Copy,
  Plus
} from 'lucide-react'

export const Route = createFileRoute('/_app/affiliation')({
  component: AffiliationPage,
})

function AffiliationPage() {
  const [commissionRate, setCommissionRate] = useState('20')

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Share2 className="h-6 w-6 text-teal-400" />
            Programme d'Affiliation & Ambassadeurs
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Récompensez vos élèves et partenaires lorsqu'ils recommandent vos formations.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border border-border/80 bg-card p-5 space-y-4">
          <CardTitle className="text-sm font-bold text-white">Paramètres des commissions</CardTitle>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Taux de commission par vente (%)</label>
              <Input 
                type="number"
                value={commissionRate}
                onChange={e => setCommissionRate(e.target.value)}
                className="text-xs"
              />
            </div>
            <Button onClick={() => toast.success(`Taux de commission mis à jour à ${commissionRate}% !`)} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
              Enregistrer le taux
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 border border-border/80 bg-card p-5 space-y-4">
          <CardTitle className="text-sm font-bold text-white">Tableau des apporteurs d'affaires</CardTitle>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950/40 border border-border/60 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Moussa Diakité</p>
                <p className="text-[10px] text-muted-foreground">Lien : eduflex.com/c/moussa?ref=aff_8842</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-teal-400">45 800 FCFA générés</p>
                <span className="text-[9px] text-emerald-400 font-semibold">3 ventes validées</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
