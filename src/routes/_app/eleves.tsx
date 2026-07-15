import { createFileRoute } from '@tanstack/react-router'
import { useStudentsList } from '@/hooks/useStats'
import { Card, CardContent, Badge, Button, Input, EmptyState, Skeleton } from '@blinkdotnew/ui'
import { Users, Search, Mail } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_app/eleves')({
  component: ElevesPage,
})

function ElevesPage() {
  const { data: students, isLoading } = useStudentsList()
  const [search, setSearch] = useState('')

  const studentList = students || []
  const filtered = studentList.filter(e => {
    const name = e.displayName || ''
    const email = e.email || ''
    return name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des élèves</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? 'Chargement...' : `${filtered.length} élève(s) inscrit(s)`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un élève..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom / Prénom</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date inscription</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-8 w-8 rounded-full" /></td>
                    </tr>
                  ))
                ) : (
                  filtered.map(eleve => (
                    <tr key={eleve.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium">
                        {eleve.displayName || eleve.email?.split('@')[0] || 'Apprenant'}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {eleve.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(eleve.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="default">Actif</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <a href={`mailto:${eleve.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!isLoading && filtered.length === 0 && (
            <div className="py-12">
              <EmptyState icon={<Users className="h-8 w-8" />} title="Aucun élève trouvé" description="Aucun élève inscrit ne correspond à votre recherche." />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
