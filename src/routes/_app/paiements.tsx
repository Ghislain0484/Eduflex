import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, Badge, Button, Input } from '@blinkdotnew/ui'
import { CreditCard, Search, Download, Euro } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_app/paiements')({
  component: PaiementsPage,
})

const MOCK_PAIEMENTS = [
  { id: 1, student: 'Marie Dupont', course: 'Marketing Digital', amount: '299,00 €', date: '20/01/2026', method: 'Carte bancaire', status: 'Payé' },
  { id: 2, student: 'Thomas Martin', course: 'Business Management', amount: '499,00 €', date: '22/01/2026', method: 'PayPal', status: 'Payé' },
  { id: 3, student: 'Sophie Bernard', course: 'SEO & Contenu', amount: '399,00 €', date: '03/02/2026', method: 'Carte bancaire', status: 'Payé' },
  { id: 4, student: 'Lucas Petit', course: 'Marketing Digital', amount: '299,00 €', date: '10/02/2026', method: 'Virement', status: 'En attente' },
  { id: 5, student: 'Emma Richard', course: 'Excel Avancé', amount: '199,00 €', date: '18/02/2026', method: 'Carte bancaire', status: 'Payé' },
  { id: 6, student: 'Hugo Moreau', course: 'Business Management', amount: '499,00 €', date: '01/03/2026', method: 'Carte bancaire', status: 'Remboursé' },
]

function PaiementsPage() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_PAIEMENTS.filter(p =>
    p.student.toLowerCase().includes(search.toLowerCase()) ||
    p.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground text-sm mt-1">Historique des transactions</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Exporter</Button>
      </div>

      <Card className="animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><Euro className="h-5 w-5" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Revenus total</p>
              <p className="text-2xl font-bold">2 194,00 €</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher une transaction..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Élève</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Formation</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Montant</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Méthode</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(paiement => (
                  <tr key={paiement.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{paiement.student}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{paiement.course}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{paiement.amount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{paiement.date}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{paiement.method}</td>
                    <td className="px-4 py-3">
                      <Badge variant={paiement.status === 'Payé' ? 'default' : paiement.status === 'En attente' ? 'secondary' : 'destructive'}>
                        {paiement.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
