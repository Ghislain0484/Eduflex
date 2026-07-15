import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, Badge, Button, Input, EmptyState } from '@blinkdotnew/ui'
import { Users, Search, Plus, Mail, GraduationCap } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_app/eleves')({
  component: ElevesPage,
})

const MOCK_ELEVES = [
  { id: 1, name: 'Marie Dupont', email: 'marie.dupont@email.com', classe: 'Marketing Digital L1', date: '15/01/2026', status: 'Actif' },
  { id: 2, name: 'Thomas Martin', email: 'thomas.martin@email.com', classe: 'Business Management L2', date: '22/01/2026', status: 'Actif' },
  { id: 3, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', classe: 'SEO & Contenu L1', date: '03/02/2026', status: 'Actif' },
  { id: 4, name: 'Lucas Petit', email: 'lucas.petit@email.com', classe: 'Marketing Digital L1', date: '10/02/2026', status: 'Inactif' },
  { id: 5, name: 'Emma Richard', email: 'emma.richard@email.com', classe: 'Excel Avancé L3', date: '18/02/2026', status: 'Actif' },
  { id: 6, name: 'Hugo Moreau', email: 'hugo.moreau@email.com', classe: 'Business Management L2', date: '01/03/2026', status: 'Actif' },
]

function ElevesPage() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_ELEVES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
  e.classe.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des élèves</h1>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_ELEVES.length} élèves inscrits</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Ajouter un élève</Button>
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
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Classe</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date inscription</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(eleve => (
                  <tr key={eleve.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{eleve.name}</p>
                        <p className="text-xs text-muted-foreground">{eleve.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{eleve.classe}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{eleve.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant={eleve.status === 'Actif' ? 'default' : 'secondary'}>{eleve.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Mail className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12">
              <EmptyState icon={<Users className="h-8 w-8" />} title="Aucun élève trouvé" description="Aucun résultat pour votre recherche." />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
