import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, Badge, Button, Input, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { CreditCard, Search, Download, Euro } from 'lucide-react'
import { useState } from 'react'
import { useAllEnrollments } from '@/hooks/useStats'

export const Route = createFileRoute('/_app/paiements')({
  component: PaiementsPage,
})

function PaiementsPage() {
  const { data: enrollments, isLoading } = useAllEnrollments()
  const [search, setSearch] = useState('')

  const enrollmentList = enrollments || []
  const filtered = enrollmentList.filter(p =>
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
    p.studentEmail.toLowerCase().includes(search.toLowerCase())
  )

  // Prices are stored in FCFA directly (e.g. 15000 = 15,000 FCFA)
  // Do NOT divide by 100 — they are not stored as cents
  const totalRevenueFcfa = enrollmentList.reduce((sum, item) => sum + (item.coursePrice || 0), 0)
  const totalRevenueEur = Math.round(totalRevenueFcfa / 655.957)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground text-sm mt-1">Historique des transactions de la plateforme</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-fade-in border-border/80">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Revenus cumulés (FCFA)</p>
                <p className="text-2xl font-bold mt-0.5">{totalRevenueFcfa.toLocaleString('fr-FR')} F CFA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in border-border/80">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shrink-0">
                <Euro className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Revenus cumulés (Euros)</p>
                <p className="text-2xl font-bold mt-0.5">~ {totalRevenueEur.toLocaleString('fr-FR')} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher par élève ou cours..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground uppercase font-semibold text-[10px]">
                  <th className="py-3 px-4">Élève</th>
                  <th className="py-3 px-4">Formation</th>
                  <th className="py-3 px-4">Montant</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Méthode</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-5 w-16" /></td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-muted-foreground italic">
                      Aucune transaction enregistrée.
                    </td>
                  </tr>
                ) : (
                  filtered.map(paiement => {
                    const priceEur = paiement.coursePrice / 100
                    const priceXof = Math.round(priceEur * 655.957)
                    const date = new Date(paiement.enrolledAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                    return (
                      <tr key={paiement.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-foreground block">{paiement.studentName}</span>
                          <span className="text-[10px] text-muted-foreground">{paiement.studentEmail}</span>
                        </td>
                        <td className="py-3.5 px-4 text-muted-foreground truncate max-w-xs">{paiement.courseTitle}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-foreground block">{(paiement.coursePrice || 0).toLocaleString('fr-FR')} FCFA</span>
                          {paiement.coursePrice > 0 && <span className="text-[10px] text-muted-foreground">~ {Math.round((paiement.coursePrice || 0) / 655.957).toLocaleString('fr-FR')} €</span>}
                        </td>
                        <td className="py-3.5 px-4 text-muted-foreground">{date}</td>
                        <td className="py-3.5 px-4 text-muted-foreground">{paiement.method}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant={paiement.coursePrice > 0 ? 'default' : 'secondary'}>
                            {paiement.status}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
