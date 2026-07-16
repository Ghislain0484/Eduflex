import { createFileRoute } from '@tanstack/react-router'
import { useStudentsList } from '@/hooks/useStats'
import { Card, CardContent, Badge, Button, Input, EmptyState, Skeleton } from '@blinkdotnew/ui'
import { Users, Search, Mail } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@blinkdotnew/ui'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_app/eleves')({
  component: ElevesPage,
})

function ElevesPage() {
  const { data: students, isLoading } = useStudentsList()
  const [search, setSearch] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)

  const studentList = students || []
  const filtered = studentList.filter(e => {
    const name = e.displayName || ''
    const email = e.email || ''
    return name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
  })

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim() || !newName.trim()) return
    setAdding(true)
    try {
      const tempId = crypto.randomUUID()
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: tempId,
          email: newEmail.trim().toLowerCase(),
          display_name: newName.trim(),
          role: 'student',
          approved: true,
        }])

      if (error) throw error
      toast.success("L'élève a été inscrit avec succès !")
      setNewEmail('')
      setNewName('')
      setShowAddForm(false)
      // refresh listing
      window.location.reload()
    } catch (err: any) {
      console.error(err)
      toast.error("Erreur d'inscription : " + err.message)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-border/80 bg-slate-900 text-slate-100">
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-white">Inscrire un nouvel élève</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Renseignez ses informations pour l'inscrire directement dans votre académie.
                </p>
              </div>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-350">Nom Complet *</label>
                  <Input 
                    required 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    placeholder="Ex: Jean Dupont"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-350">Adresse Email *</label>
                  <Input 
                    required 
                    type="email"
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)} 
                    placeholder="Ex: jean.dupont@gmail.com"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 text-xs h-9" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 text-xs h-9 bg-teal-600 hover:bg-teal-500 text-white font-medium" 
                    disabled={adding}
                  >
                    {adding ? 'Inscription...' : 'Inscrire'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des élèves</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? 'Chargement...' : `${filtered.length} élève(s) inscrit(s)`}
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium">
          <Plus className="h-4 w-4" /> Inscrire un élève
        </Button>
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
