import { createFileRoute } from '@tanstack/react-router'
import { useTeachersList } from '@/hooks/useStats'
import { Card, CardContent, Badge, Button, Input, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { GraduationCap, Mail, Plus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@blinkdotnew/ui'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/_app/enseignants')({
  component: EnseignantsPage,
})

function EnseignantsPage() {
  const { data: teachers, isLoading } = useTeachersList()
  const queryClient = useQueryClient()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)

  const teacherList = teachers || []

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim() || !newName.trim()) return
    setAdding(true)
    try {
      // Generate a secure random temporary password
      const tempPassword = crypto.randomUUID().replace(/-/g, '') + 'Aa1!'

      // Create a REAL Supabase Auth user (not a ghost profile)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newEmail.trim().toLowerCase(),
        password: tempPassword,
        options: {
          data: {
            display_name: newName.trim(),
            role: 'teacher',
          },
        },
      })

      if (signUpError) throw signUpError

      // Update profile row with teacher role and approval
      if (signUpData.user?.id) {
        await supabase
          .from('profiles')
          .upsert({
            id: signUpData.user.id,
            email: newEmail.trim().toLowerCase(),
            display_name: newName.trim(),
            role: 'teacher',
            approved: true,
          }, { onConflict: 'id' })
      }

      toast.success(`✅ L'enseignant a été ajouté ! Un email de bienvenue a été envoyé à ${newEmail.trim()}.`)
      setNewEmail('')
      setNewName('')
      setShowAddForm(false)
      // React Query invalidation instead of page reload
      queryClient.invalidateQueries({ queryKey: ['profiles', 'teachers'] })
    } catch (err: any) {
      console.error(err)
      if (err.message?.includes('already registered')) {
        toast.error('Cet email est déjà enregistré sur la plateforme.')
      } else {
        toast.error("Erreur lors de l'ajout : " + err.message)
      }
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
                <h3 className="font-bold text-lg text-white">Ajouter un enseignant</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Inscrivez un nouveau formateur dans l'académie pour lui donner accès au créateur de cours.
                </p>
              </div>
              <form onSubmit={handleAddTeacher} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nom Complet *</label>
                  <Input 
                    required 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    placeholder="Ex: Dr. Martin Luther"
                    className="h-9 text-xs bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Adresse Email *</label>
                  <Input 
                    required 
                    type="email"
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)} 
                    placeholder="Ex: martin.luther@ecole.com"
                    className="h-9 text-xs bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
                  />
                  <p className="text-[10px] text-slate-400">Un email de bienvenue avec lien de connexion sera envoyé automatiquement.</p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 text-xs h-9 border-slate-600 text-slate-300" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 text-xs h-9 bg-teal-600 hover:bg-teal-500 text-white font-medium" 
                    disabled={adding}
                  >
                    {adding ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Création...</> : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des enseignants</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? 'Chargement...' : `${teacherList.length} enseignant(s) actif(s)`}
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium">
          <Plus className="h-4 w-4" /> Recruter un enseignant
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-48 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : teacherList.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-8 w-8" />}
          title="Aucun enseignant"
          description="Aucun compte formateur n'est encore enregistré pour votre académie."
          action={
            <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium">
              <Plus className="h-4 w-4" /> Ajouter mon premier formateur
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teacherList.map(enseignant => {
            const name = enseignant.displayName || enseignant.email?.split('@')[0] || 'Enseignant'
            const initials = getInitials(name)
            return (
              <Card key={enseignant.id} className="animate-fade-in hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{name}</p>
                      <p className="text-sm text-muted-foreground">Formateur certifié</p>
                    </div>
                    <Badge variant="default" className="shrink-0 bg-teal-500/10 text-teal-400 border-teal-500/20">
                      Actif
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground border-t border-border/40 pt-3">
                    <span className="flex items-center gap-1.5 truncate text-xs">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{enseignant.email}</span>
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-9 text-xs" asChild>
                      <a href={`mailto:${enseignant.email}`}>Contacter par email</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
