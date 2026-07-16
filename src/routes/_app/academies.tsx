import { createFileRoute } from '@tanstack/react-router'
import { useAcademiesList } from '@/hooks/useStats'
import { Card, CardContent, Badge, Button, Input, EmptyState, Skeleton, toast } from '@blinkdotnew/ui'
import { Building, Search, Mail, UserCheck, UserX, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/academies')({
  component: AcademiesPage,
})

function AcademiesPage() {
  const { user: currentUser } = useAuth()
  const { data: academies, isLoading } = useAcademiesList()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const academyList = academies || []
  const filtered = academyList.filter(a => {
    const name = a.academyName || ''
    const rep = a.displayName || ''
    const email = a.email || ''
    return name.toLowerCase().includes(search.toLowerCase()) ||
      rep.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
  })

  const handleApprove = async (id: string, approve: boolean) => {
    if (!approve && !confirm("Êtes-vous sûr de vouloir suspendre cette académie ? L'accès sera bloqué mais les données seront conservées.")) {
      return
    }
    setUpdatingId(id)
    try {
      // Only toggle 'approved' — NEVER change the role on suspension
      // Changing role to 'student' would permanently strip teacher access
      const updatePayload: any = { approved: approve }
      // Only promote to 'academy' role when first approving
      if (approve) {
        updatePayload.role = 'teacher'
      }

      const { error } = await supabase
        .from('profiles')
        .update(updatePayload)
        .eq('id', id)

      if (error) throw error
      toast.success(approve ? "✅ L'académie a été approuvée et activée !" : "⏸️ L'académie a été suspendue. Ses données sont conservées.")
      
      // Use targeted query key to avoid unnecessary refetches
      queryClient.invalidateQueries({ queryKey: ['profiles', 'academies'] })
    } catch (err: any) {
      console.error(err)
      toast.error("Erreur lors de la modification du statut : " + err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handlePlanChange = async (id: string, plan: string) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          academy_plan: plan,
        })
        .eq('id', id)

      if (error) throw error
      toast.success(`Plan d'abonnement mis à jour en : ${plan}`)
      
      // Invalidate queries to refresh listing
      queryClient.invalidateQueries({ queryKey: ['profiles'] })
    } catch (err: any) {
      console.error(err)
      toast.error("Erreur de modification de plan : " + err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-background">
        <EmptyState
          icon={<ShieldAlert className="h-10 w-10 text-destructive animate-pulse" />}
          title="Accès Restreint"
          description="Seuls les administrateurs généraux d'EduFlex ont accès à cette console de gestion B2B."
        />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Console d'administration des Académies B2B</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? 'Chargement...' : `${filtered.length} demande(s) et académie(s) enregistrée(s)`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher par nom d'académie, email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Académie / Couleur</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Responsable</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date inscription</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Validation / Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-8 w-24" /></td>
                    </tr>
                  ))
                ) : (
                  filtered.map(academy => {
                    const statusBadge = academy.approved ? (
                      <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none">Actif & Approuvé</Badge>
                    ) : (
                      <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10">En Attente</Badge>
                    )

                    return (
                      <tr key={academy.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: academy.academyColor || '#0d9488' }} title={academy.academyColor || ''} />
                            <span className="font-semibold">{academy.academyName || 'Nom non spécifié'}</span>
                          </div>
                          {academy.academySlogan && <span className="text-[10px] text-muted-foreground block truncate max-w-xs">{academy.academySlogan}</span>}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium">{academy.displayName || 'Non renseigné'}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {academy.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <select
                            value={academy.academyPlan}
                            onChange={e => handlePlanChange(academy.id, e.target.value)}
                            disabled={updatingId === academy.id}
                            className="bg-background border border-input rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option value="Découverte">Plan Découverte</option>
                            <option value="Pro">Plan Pro</option>
                            <option value="Académie B2B">Académie B2B (EduFlex+)</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(academy.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-4 py-3">
                          {statusBadge}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            {!academy.approved ? (
                              <Button
                                size="xs"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1"
                                onClick={() => handleApprove(academy.id, true)}
                                disabled={updatingId === academy.id}
                              >
                                <UserCheck className="h-3.5 w-3.5" /> Activer
                              </Button>
                            ) : (
                              <Button
                                size="xs"
                                variant="outline"
                                className="border-destructive hover:bg-destructive/10 text-destructive flex items-center gap-1"
                                onClick={() => handleApprove(academy.id, false)}
                                disabled={updatingId === academy.id}
                              >
                                <UserX className="h-3.5 w-3.5" /> Suspendre
                              </Button>
                            )}
                            <Button variant="ghost" size="xs" className="h-7 w-7 p-0" asChild>
                              <a href={`mailto:${academy.email}`}>
                                <Mail className="h-3.5 w-3.5" />
                              </a>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {!isLoading && filtered.length === 0 && (
            <div className="py-12">
              <EmptyState icon={<Building className="h-8 w-8" />} title="Aucune demande" description="Aucune demande de création d'académie n'a été soumise." />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
