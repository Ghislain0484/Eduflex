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
  Percent,
  Plus,
  Copy,
  Trash2
} from 'lucide-react'

export const Route = createFileRoute('/_app/codes-promo')({
  component: CodesPromoPage,
})

function CodesPromoPage() {
  const [promos, setPromos] = useState([
    { id: 1, code: 'BIENVENUE20', type: 'Pourcentage', value: '-20%', uses: 42, maxUses: 100 },
    { id: 2, code: 'LANCEMENT50', type: 'Pourcentage', value: '-50%', uses: 15, maxUses: 50 }
  ])

  const [codeName, setCodeName] = useState('')
  const [discountVal, setDiscountVal] = useState('20')

  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!codeName.trim()) return
    setPromos([
      ...promos,
      {
        id: Date.now(),
        code: codeName.toUpperCase().replace(/\s+/g, ''),
        type: 'Pourcentage',
        value: `-${discountVal}%`,
        uses: 0,
        maxUses: 100
      }
    ])
    setCodeName('')
    toast.success("Code promo créé et activé !")
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Percent className="h-6 w-6 text-teal-400" />
            Codes Promo & Remises
          </h1>
          <p className="text-xs text-slate-400">
            Créez des coupons de réduction pour booster vos ventes et fidéliser vos prospects.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border border-border/80 bg-card p-5 h-fit">
          <CardTitle className="text-sm font-bold text-white mb-4">Nouveau code promo</CardTitle>
          <form onSubmit={handleCreateCode} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Code (Ex: PROMO50)</label>
              <Input 
                placeholder="PROMO50"
                value={codeName}
                onChange={e => setCodeName(e.target.value)}
                className="text-xs font-mono uppercase"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Réduction (%)</label>
              <Input 
                type="number"
                value={discountVal}
                onChange={e => setDiscountVal(e.target.value)}
                className="text-xs"
              />
            </div>
            <Button type="submit" disabled={!codeName.trim()} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
              <Plus className="h-4 w-4 mr-1" /> Créer le code promo
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Codes promo actifs</h3>
          <div className="space-y-2">
            {promos.map(p => (
              <Card key={p.id} className="border border-border/70 bg-card p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono text-teal-400">{p.code}</span>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-bold">
                      {p.value}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-400">{p.uses} utilisations sur {p.maxUses} autorisées</p>
                </div>
                <Button 
                  size="xs" 
                  variant="outline" 
                  onClick={() => {
                    navigator.clipboard.writeText(p.code)
                    toast.success("Code copié dans le presse-papiers !")
                  }}
                  className="text-xs border-border"
                >
                  <Copy className="h-3 w-3 mr-1" /> Copier
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
