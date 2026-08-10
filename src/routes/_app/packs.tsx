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
  Layers,
  Plus,
  Tag,
  BookOpen,
  CheckCircle2
} from 'lucide-react'

export const Route = createFileRoute('/_app/packs')({
  component: PacksPage,
})

function PacksPage() {
  const [packs, setPacks] = useState([
    {
      id: 1,
      title: 'Pack Bundle Marketing & Vente',
      coursesCount: 2,
      price: 59900,
      originalPrice: 79800,
      sales: 14
    }
  ])

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-teal-400" />
            Packs & Offres Bundles
          </h1>
          <p className="text-xs text-slate-400">
            Regroupez plusieurs formations dans une offre combinée à prix préférentiel.
          </p>
        </div>
        <Button onClick={() => toast.info("Formulaire de création de pack prêt.")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
          <Plus className="h-4 w-4 mr-1" /> Créer un Pack
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map(pack => (
          <Card key={pack.id} className="border border-border/80 bg-card p-5 space-y-4">
            <div className="space-y-1">
              <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-bold">
                {pack.coursesCount} Formations incluses
              </Badge>
              <h3 className="text-sm font-bold text-white leading-snug">{pack.title}</h3>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-teal-400">{pack.price.toLocaleString('fr-FR')} FCFA</span>
              <span className="text-xs text-slate-500 line-through">{pack.originalPrice.toLocaleString('fr-FR')} FCFA</span>
            </div>

            <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground flex justify-between">
              <span>{pack.sales} ventes générées</span>
              <Button size="xs" variant="ghost" className="text-teal-400 font-bold p-0 h-auto">Éditer →</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
