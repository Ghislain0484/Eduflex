import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent, Input, Button, Badge, Skeleton } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import { toast } from '@blinkdotnew/ui'
import { User, Shield, Bell, Percent, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useAuth()
  const [referrals, setReferrals] = useState<any[]>([])
  const [referralsLoading, setReferralsLoading] = useState(false)

  const fetchReferrals = async () => {
    if (!user) return
    setReferralsLoading(true)
    try {
      const { data, error } = await supabase
        .from('affiliate_referrals')
        .select(`
          id,
          referred_email,
          commission_amount,
          status,
          created_at,
          courses (
            title
          )
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setReferrals(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setReferralsLoading(false)
    }
  }

  useEffect(() => {
    fetchReferrals()
  }, [user])

  // Calculations
  const totalEarnings = referrals.reduce((sum, r) => sum + (r.commission_amount || 0), 0)
  const totalEarningsEur = totalEarnings / 100
  const totalEarningsXof = Math.round(totalEarningsEur * 655.957)

  const paidEarnings = referrals.filter(r => r.status === 'paye').reduce((sum, r) => sum + (r.commission_amount || 0), 0)
  const pendingEarnings = referrals.filter(r => r.status === 'en_attente').reduce((sum, r) => sum + (r.commission_amount || 0), 0)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground text-sm mt-1">Gérez votre profil, vos préférences et votre affiliation.</p>
      </div>
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil" className="gap-2"><User className="h-4 w-4" />Profil</TabsTrigger>
          <TabsTrigger value="securite" className="gap-2"><Shield className="h-4 w-4" />Sécurité</TabsTrigger>
          <TabsTrigger value="affiliation" className="gap-2"><Percent className="h-4 w-4" />Affiliation</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profil"><ProfilTab user={user} /></TabsContent>
        <TabsContent value="securite"><SecuriteTab /></TabsContent>
        <TabsContent value="affiliation">
          <AffiliationTab 
            referrals={referrals} 
            loading={referralsLoading} 
            totalEur={totalEarningsEur}
            totalXof={totalEarningsXof}
            paidEur={paidEarnings / 100}
            pendingEur={pendingEarnings / 100}
          />
        </TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
      </Tabs>
    </div>
  )
}

function ProfilTab({ user }: { user: any }) {
  const [name, setName] = useState(user?.displayName || '')
  const [academyName, setAcademyName] = useState(user?.academyName || '')
  const [academySlogan, setAcademySlogan] = useState(user?.academySlogan || '')
  const [academyColor, setAcademyColor] = useState(user?.academyColor || '#6366f1')
  const [academyLogo, setAcademyLogo] = useState(user?.academyLogo || '')
  const [saving, setSaving] = useState(false)

  // Pre-fill when user changes
  useEffect(() => {
    if (user) {
      setName(user.displayName || '')
      setAcademyName(user.academyName || '')
      setAcademySlogan(user.academySlogan || '')
      setAcademyColor(user.academyColor || '#6366f1')
      setAcademyLogo(user.academyLogo || '')
    }
  }, [user])

  const ROLE_MAP: Record<string, string> = {
    student: 'Élève',
    teacher: 'Enseignant',
    admin: 'Administrateur',
  }
  const userRole = ROLE_MAP[user?.role || 'student'] || 'Élève'

  const handleSave = async () => {
    if (!name.trim() || !user) return
    setSaving(true)
    try {
      // 1. Update auth profile metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { display_name: name.trim() }
      })
      if (authError) throw authError

      // 2. Update profiles table in DB
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ 
          display_name: name.trim(),
          academy_name: academyName.trim() || null,
          academy_slogan: academySlogan.trim() || null,
          academy_color: academyColor || '#6366f1',
          academy_logo: academyLogo.trim() || null
        })
        .eq('id', user.id)
      if (dbError) throw dbError

      toast.success('Profil mis à jour avec succès ! Réactualisez la page pour appliquer les personnalisations.')
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom complet</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse email</label>
            <Input value={user?.email || ''} disabled className="opacity-60" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Rôle sur la plateforme</label>
          <Input value={userRole} disabled className="opacity-60 font-semibold" />
        </div>

        {(user?.role === 'teacher' || user?.role === 'admin' || !!user?.academyName) && (
          <div className="border-t border-border/80 pt-6 mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-foreground">Personnalisation de l'Académie (White-Label)</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Configurez l'image de marque de votre école ou académie en ligne.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">Nom de l'Académie</label>
                <Input 
                  value={academyName} 
                  onChange={e => setAcademyName(e.target.value)} 
                  placeholder="Ex: Académie du Numérique" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Slogan / Message de bienvenue</label>
                <Input 
                  value={academySlogan} 
                  onChange={e => setAcademySlogan(e.target.value)} 
                  placeholder="Ex: Formez-vous aux métiers du futur avec nos experts." 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">URL du Logo de l'Académie</label>
                <Input 
                  value={academyLogo} 
                  onChange={e => setAcademyLogo(e.target.value)} 
                  placeholder="Ex: https://lien-image.com/mon-logo.png" 
                />
                <span className="text-[9px] text-muted-foreground block">
                  Saisissez l'URL directe de votre image ou logo de marque.
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Couleur d'accentuation de la marque</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={academyColor} 
                    onChange={e => setAcademyColor(e.target.value)} 
                    className="w-10 h-10 rounded-md border border-input cursor-pointer bg-transparent"
                  />
                  <div>
                    <span className="text-xs font-semibold text-foreground block">{academyColor}</span>
                    <span className="text-[9px] text-muted-foreground">Appliquée aux boutons, en-têtes et thèmes de lecture.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificats & Reçus templates preview */}
            <div className="border-t border-border/60 pt-6 mt-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-foreground">Aperçu & Modèles de Documents officiels</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Ces modèles seront automatiquement générés à l'effigie de votre académie.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-accent/40 border border-border/80 space-y-2">
                  <span className="text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20">Modèle de Reçu</span>
                  <h5 className="font-semibold text-xs mt-1 text-white">Reçu de paiement élève</h5>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">
                    Génère un reçu PDF officiel affichant le logo <strong>{academyName || 'Votre Académie'}</strong>, sa couleur primaire, et le détail de la transaction Mobile Money.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/40 border border-border/80 space-y-2">
                  <span className="text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20">Modèle de Diplôme</span>
                  <h5 className="font-semibold text-xs mt-1 text-white">Certificat de fin de formation</h5>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">
                    Délivre un diplôme numérique officiel à l'élève ayant terminé 100% des chapitres, signé par <strong>{academyName || 'Votre Académie'}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button onClick={handleSave} disabled={saving} className="mt-4">
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </CardContent>
    </Card>
  )
}

function SecuriteTab() {
  const [newP, setNewP] = useState('')
  const [confP, setConfP] = useState('')
  const [changing, setChanging] = useState(false)

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newP || !confP) return
    if (newP !== confP) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setChanging(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newP
      })
      if (error) throw error
      toast.success('Mot de passe modifié avec succès !')
      setNewP('')
      setConfP('')
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors du changement de mot de passe.')
    } finally {
      setChanging(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Changer le mot de passe</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleChange} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nouveau mot de passe</label>
            <Input type="password" required value={newP} onChange={e => setNewP(e.target.value)} placeholder="Minimum 6 caractères" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
            <Input type="password" required value={confP} onChange={e => setConfP(e.target.value)} />
          </div>
          <Button type="submit" disabled={changing}>
            {changing ? 'Modification...' : 'Modifier le mot de passe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

interface AffiliationTabProps {
  referrals: any[]
  loading: boolean
  totalEur: number
  totalXof: number
  paidEur: number
  pendingEur: number
}

function AffiliationTab({ referrals, loading, totalEur, totalXof, paidEur, pendingEur }: AffiliationTabProps) {
  return (
    <div className="space-y-6 mt-6">
      {/* Cards summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-amber-800 dark:text-amber-400">Total des gains cumulés</p>
              <DollarSign className="h-4.5 w-4.5 text-amber-600" />
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-300">{totalEur.toLocaleString('fr-FR')} €</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-500 font-medium">~ {totalXof.toLocaleString('fr-FR')} F CFA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-emerald-800 dark:text-emerald-400">Gains payés / validés</p>
              <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">{paidEur.toLocaleString('fr-FR')} €</p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">~ {Math.round(paidEur * 655.957).toLocaleString('fr-FR')} F CFA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-400">Gains en attente de validation</p>
              <Clock className="h-4.5 w-4.5 text-blue-600" />
            </div>
            <div className="mt-2.5">
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{pendingEur.toLocaleString('fr-FR')} €</p>
              <p className="text-[10px] text-blue-700 dark:text-blue-500 font-medium">~ {Math.round(pendingEur * 655.957).toLocaleString('fr-FR')} F CFA</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Historique de vos parrainages ({referrals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : referrals.length === 0 ? (
            <p className="text-xs text-muted-foreground italic text-center py-6">
              Vous n'avez pas encore généré de vente par parrainage. Partagez vos liens de cours pour commencer à gagner des commissions !
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground uppercase font-semibold text-[10px]">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Email du Filleul</th>
                    <th className="py-3 px-4">Formation</th>
                    <th className="py-3 px-4">Commission (15%)</th>
                    <th className="py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((ref) => {
                    const date = new Date(ref.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                    const commissionEur = (ref.commission_amount || 0) / 100
                    const commissionXof = Math.round(commissionEur * 655.957)
                    return (
                      <tr key={ref.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                        <td className="py-3.5 px-4 text-muted-foreground">{date}</td>
                        <td className="py-3.5 px-4 font-medium text-foreground">{ref.referred_email}</td>
                        <td className="py-3.5 px-4 text-muted-foreground truncate max-w-xs">{ref.courses?.title || 'Formation'}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-primary">{commissionEur.toLocaleString('fr-FR')} €</span>
                          <span className="text-[10px] text-muted-foreground block">~ {commissionXof.toLocaleString('fr-FR')} F CFA</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant={ref.status === 'paye' ? 'default' : 'secondary'}>
                            {ref.status === 'paye' ? 'Payé' : 'En attente'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  const [email, setEmail] = useState(true)
  const [student, setStudent] = useState(true)
  const [payment, setPayment] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const items = [
    { label: 'Notifications par email', desc: 'Recevoir des notifications par email', value: email, onChange: setEmail },
    { label: 'Nouvelle inscription', desc: 'Être notifié quand un élève s\'inscrit', value: student, onChange: setStudent },
    { label: 'Paiements reçus', desc: 'Confirmation à chaque paiement', value: payment, onChange: setPayment },
    { label: 'Newsletter EduFlex', desc: 'Actualités et conseils', value: newsletter, onChange: setNewsletter },
  ]
  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Préférences de notification</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
            <button onClick={() => item.onChange(!item.value)} className={`relative h-6 w-11 rounded-full transition-colors ${item.value ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.value ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
