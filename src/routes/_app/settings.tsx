import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent, Input, Button, Badge, Skeleton } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import { toast } from '@blinkdotnew/ui'
import { User, Shield, Bell, Percent, DollarSign, Clock, CheckCircle, Users, Settings, Plus, Search, Trash2, UserCheck, UserX, Key, ShieldAlert, Edit } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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
  // Commission amounts are stored in FCFA (not cents), do NOT divide by 100
  const totalEarningsFcfa = totalEarnings
  const totalEarningsEur = Math.round(totalEarningsFcfa / 655.957)

  const paidEarnings = referrals.filter(r => r.status === 'paye').reduce((sum, r) => sum + (r.commission_amount || 0), 0)
  const pendingEarnings = referrals.filter(r => r.status === 'en_attente').reduce((sum, r) => sum + (r.commission_amount || 0), 0)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.role === 'admin' ? 'Configuration Plateforme' : 'Paramètres'}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {user?.role === 'admin' 
            ? 'Console globale de configuration du front-end et de gestion des comptes.' 
            : 'Gérez votre profil, vos préférences et votre affiliation.'}
        </p>
      </div>
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil" className="gap-2"><User className="h-4 w-4" />Profil</TabsTrigger>
          <TabsTrigger value="securite" className="gap-2"><Shield className="h-4 w-4" />Sécurité</TabsTrigger>
          {user?.role !== 'admin' && <TabsTrigger value="affiliation" className="gap-2"><Percent className="h-4 w-4" />Affiliation</TabsTrigger>}
          {user?.role === 'admin' && <TabsTrigger value="admin_front" className="gap-2"><Settings className="h-4 w-4" />Config Front</TabsTrigger>}
          {user?.role === 'admin' && <TabsTrigger value="admin_comptes" className="gap-2"><Users className="h-4 w-4" />Gestion Comptes</TabsTrigger>}
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profil"><ProfilTab user={user} /></TabsContent>
        <TabsContent value="securite"><SecuriteTab /></TabsContent>
        {user?.role !== 'admin' && (
          <TabsContent value="affiliation">
            <AffiliationTab 
              referrals={referrals} 
              loading={referralsLoading} 
              totalFcfa={totalEarningsFcfa}
              totalEur={totalEarningsEur}
              paidFcfa={paidEarnings}
              pendingFcfa={pendingEarnings}
            />
          </TabsContent>
        )}
        {user?.role === 'admin' && (
          <TabsContent value="admin_front">
            <AdminFrontTab />
          </TabsContent>
        )}
        {user?.role === 'admin' && (
          <TabsContent value="admin_comptes">
            <AdminComptesTab />
          </TabsContent>
        )}
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image (PNG ou JPEG).')
      return
    }
    // Limit logo size to 300KB to avoid exceeding Supabase row size limits
    const maxSizeKB = 300
    if (file.size > maxSizeKB * 1024) {
      toast.error(`L\'image est trop lourde (${Math.round(file.size / 1024)} KB). Maximum autorisé : ${maxSizeKB} KB. Compressez votre image avant de l\'uploader.`)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setAcademyLogo(base64)
      toast.success('Logo chargé ! Cliquez sur "Enregistrer les modifications" pour sauvegarder.')
    }
    reader.readAsDataURL(file)
  }

  const previewCertificate = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1600
    canvas.height = 1130
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 1. Fond beige/crème premium
    ctx.fillStyle = '#fdfbf7'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 2. Bordure double dorée/thème
    ctx.strokeStyle = academyColor || '#ca8a04'
    ctx.lineWidth = 15
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

    // Bordure intérieure fine
    ctx.strokeStyle = '#c5a880'
    ctx.lineWidth = 2
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110)

    // Coins décoratifs
    ctx.fillStyle = '#c5a880'
    ctx.fillRect(50, 50, 40, 4)
    ctx.fillRect(50, 50, 4, 40)
    ctx.fillRect(canvas.width - 90, 50, 40, 4)
    ctx.fillRect(canvas.width - 54, 50, 4, 40)
    ctx.fillRect(50, canvas.height - 54, 40, 4)
    ctx.fillRect(50, canvas.height - 90, 4, 40)
    ctx.fillRect(canvas.width - 90, canvas.height - 54, 40, 4)
    ctx.fillRect(canvas.width - 54, canvas.height - 90, 4, 40)

    // 3. Titre du Certificat
    ctx.textAlign = 'center'
    ctx.fillStyle = '#1e293b'
    ctx.font = '600 24px Arial, sans-serif'
    ctx.fillText((academyName || 'MON ACADEMIE').toUpperCase().split('').join(' '), canvas.width / 2, 180)

    ctx.font = 'italic 62px Georgia, serif'
    ctx.fillStyle = academyColor || '#ca8a04'
    ctx.fillText('Certificat de Réussite', canvas.width / 2, 290)

    ctx.font = 'italic 16px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText(academySlogan || 'L\'excellence par la formation en ligne', canvas.width / 2, 335)

    ctx.font = '22px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Ce diplôme officiel est fièrement décerné à', canvas.width / 2, 420)

    ctx.font = 'bold italic 68px Georgia, serif'
    ctx.fillStyle = '#0f172a'
    ctx.fillText('Jean Dupont (Exemple)', canvas.width / 2, 530)

    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 250, 560)
    ctx.lineTo(canvas.width / 2 + 250, 560)
    ctx.stroke()

    ctx.font = '22px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('pour avoir complété avec succès la formation en ligne', canvas.width / 2, 630)

    ctx.font = 'bold 46px Georgia, serif'
    ctx.fillStyle = '#1e293b'
    ctx.fillText('Exemple de Formation Branded', canvas.width / 2, 720)

    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    ctx.font = 'italic 20px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText(`Délivré le ${today}`, canvas.width / 2, 810)

    // Signature (droite)
    const sigX = canvas.width / 2 + 280
    const sigY = 930
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(sigX - 120, sigY + 20)
    ctx.lineTo(sigX + 120, sigY + 20)
    ctx.stroke()

    ctx.font = '16px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText(`La Direction ${academyName || 'Mon Académie'}`, sigX, sigY + 45)

    ctx.font = 'italic 34px Georgia, serif'
    ctx.fillStyle = '#1e3a8a'
    ctx.fillText(academyName || 'Mon Académie', sigX, sigY - 5)

    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `Apercu_Certificat_${(academyName || 'Academie').replace(/[^a-zA-Z0-9]/g, '_')}.png`
      link.href = dataUrl
      link.click()
      toast.success('Aperçu du certificat généré et téléchargé !')
    } catch (err) {
      toast.error('Erreur de génération.')
    }
  }

  const previewReceipt = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1000
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = academyColor || '#0d9488'
    ctx.fillRect(0, 0, canvas.width, 180)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 36px Arial, sans-serif'
    ctx.fillText(academyName || 'Mon Académie', 80, 105)

    ctx.textAlign = 'right'
    ctx.font = '28px Arial, sans-serif'
    ctx.fillText('REÇU DE PAIEMENT', canvas.width - 80, 105)

    ctx.textAlign = 'left'
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 20px Arial, sans-serif'
    ctx.fillText('Facturé à :', 80, 260)
    
    ctx.font = '16px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Nom: Jean Dupont', 80, 300)
    ctx.fillText('Email: jean.dupont@gmail.com', 80, 330)

    ctx.textAlign = 'right'
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 20px Arial, sans-serif'
    ctx.fillText('Détails du reçu :', canvas.width - 80, 260)
    
    ctx.font = '16px Arial, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Reçu N°: #REC-884920', canvas.width - 80, 300)
    ctx.fillText('Date: ' + new Date().toLocaleDateString('fr-FR'), canvas.width - 80, 330)
    ctx.fillText('Méthode: Mobile Money (Wave/Orange)', canvas.width - 80, 360)

    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(80, 460, canvas.width - 160, 50)
    
    ctx.textAlign = 'left'
    ctx.fillStyle = '#475569'
    ctx.font = 'bold 16px Arial, sans-serif'
    ctx.fillText('Description de la formation', 100, 492)
    ctx.textAlign = 'right'
    ctx.fillText('Montant', canvas.width - 100, 492)

    ctx.textAlign = 'left'
    ctx.fillStyle = '#1e293b'
    ctx.font = '16px Arial, sans-serif'
    ctx.fillText('Formation Complète en Intelligence Artificielle', 100, 570)
    ctx.textAlign = 'right'
    ctx.fillText('15 000 FCFA', canvas.width - 100, 570)

    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(80, 635)
    ctx.lineTo(canvas.width - 80, 635)
    ctx.stroke()

    ctx.textAlign = 'right'
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 20px Arial, sans-serif'
    ctx.fillText('Total Payé : 15 000 FCFA', canvas.width - 80, 700)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#94a3b8'
    ctx.font = '14px Arial, sans-serif'
    ctx.fillText('Merci pour votre confiance. Ce document sert de preuve officielle de paiement.', canvas.width / 2, 850)

    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `Apercu_Recu_${(academyName || 'Academie').replace(/[^a-zA-Z0-9]/g, '_')}.png`
      link.href = dataUrl
      link.click()
      toast.success('Aperçu du reçu de paiement généré !')
    } catch (err) {
      toast.error('Erreur de génération.')
    }
  }

  const handleSave = async () => {
    if (!name.trim() || !user) return
    setSaving(true)
    try {
      // 1. Update auth profile metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { display_name: name.trim() }
      })
      if (authError) throw authError

      // 2. Update profiles table in DB with fallbacks for missing columns
      try {
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
      } catch (err: any) {
        const isColumnError = err.code === '42703' || (err.message && (err.message.includes('column') || err.message.includes('schema cache')))
        if (isColumnError) {
          console.warn('academy_logo column might be missing. Trying fallback profile update.')
          const { error: fallbackError } = await supabase
            .from('profiles')
            .update({ 
              display_name: name.trim(),
              academy_name: academyName.trim() || null,
              academy_slogan: academySlogan.trim() || null,
              academy_color: academyColor || '#6366f1',
            })
            .eq('id', user.id)
          if (fallbackError) {
            console.warn('Academy columns might be missing entirely. Trying basic profile update.')
            const { error: basicError } = await supabase
              .from('profiles')
              .update({ 
                display_name: name.trim(),
              })
              .eq('id', user.id)
            if (basicError) throw basicError
          }
        } else {
          throw err
        }
      }

      toast.success('Modifications enregistrées ! Actualisation de l\'interface...')
      // Refresh user profile in auth state — reload is needed only here because
      // useAuth reads profile once at login and must be refreshed to reflect new color/logo.
      setTimeout(() => {
        window.location.reload()
      }, 800)
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
                <label className="text-xs font-medium">Logo de l'Académie (Format PNG ou JPEG)</label>
                <div className="flex items-center gap-4">
                  {academyLogo ? (
                    <div className="h-16 w-16 rounded-xl border border-border bg-slate-800 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                      <img src={academyLogo} alt="Logo Académie" className="w-full h-full object-contain rounded-lg" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0 bg-slate-900 text-xs font-bold">
                      Logo
                    </div>
                  )}
                  <div className="space-y-1.5 flex-1">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg" 
                      id="logo-upload" 
                      className="hidden" 
                      onChange={handleLogoUpload} 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs font-semibold" 
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      Sélectionner un fichier
                    </Button>
                    <p className="text-[9px] text-muted-foreground block mt-0.5">PNG transparent ou JPG carré recommandé.</p>
                  </div>
                </div>
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
                  Visualisez instantanément vos documents personnalisés aux couleurs et nom de votre académie.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-accent/40 border border-border/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20">Modèle de Reçu</span>
                    <h5 className="font-semibold text-xs mt-1 text-white">Reçu de paiement élève</h5>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                      Génère un reçu PDF officiel affichant le logo et la couleur primaire de <strong>{academyName || 'Votre Académie'}</strong>.
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-[10px] h-8 font-semibold bg-slate-900 border-slate-800 hover:bg-slate-800"
                    onClick={previewReceipt}
                  >
                    👁️ Télécharger l'aperçu du reçu
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-accent/40 border border-border/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] bg-teal-500/10 text-teal-400 font-bold px-1.5 py-0.5 rounded border border-teal-500/20">Modèle de Diplôme</span>
                    <h5 className="font-semibold text-xs mt-1 text-white">Certificat de fin de formation</h5>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                      Délivre un diplôme numérique officiel signé par <strong>{academyName || 'Votre Académie'}</strong> avec sa couleur de marque.
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-[10px] h-8 font-semibold bg-slate-900 border-slate-800 hover:bg-slate-800"
                    onClick={previewCertificate}
                  >
                    👁️ Télécharger l'aperçu du certificat
                  </Button>
                </div>
              </div>
            </div>

            {/* Save button for branding */}
            <div className="flex justify-end pt-2 border-t border-border/40">
              <Button 
                type="button" 
                onClick={handleSave} 
                disabled={saving} 
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </Button>
            </div>
          </div>
        )}

        {/* Only ONE save button — removed duplicate that was below */}
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
  totalFcfa: number
  totalEur: number
  paidFcfa: number
  pendingFcfa: number
}

function AffiliationTab({ referrals, loading, totalFcfa, totalEur, paidFcfa, pendingFcfa }: AffiliationTabProps) {
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
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-300">{totalFcfa.toLocaleString('fr-FR')} F CFA</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-500 font-medium">~ {totalEur.toLocaleString('fr-FR')} €</p>
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
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">{paidFcfa.toLocaleString('fr-FR')} F CFA</p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">~ {Math.round(paidFcfa / 655.957).toLocaleString('fr-FR')} €</p>
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
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{pendingFcfa.toLocaleString('fr-FR')} F CFA</p>
              <p className="text-[10px] text-blue-700 dark:text-blue-500 font-medium">~ {Math.round(pendingFcfa / 655.957).toLocaleString('fr-FR')} €</p>
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
                    const commissionFcfa = ref.commission_amount || 0
                    const commissionEur = Math.round(commissionFcfa / 655.957)
                    return (
                      <tr key={ref.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                        <td className="py-3.5 px-4 text-muted-foreground">{date}</td>
                        <td className="py-3.5 px-4 font-medium text-foreground">{ref.referred_email}</td>
                        <td className="py-3.5 px-4 text-muted-foreground truncate max-w-xs">{ref.courses?.title || 'Formation'}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-primary">{commissionFcfa.toLocaleString('fr-FR')} F CFA</span>
                          <span className="text-[10px] text-muted-foreground block">~ {commissionEur.toLocaleString('fr-FR')} €</span>
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

function AdminFrontTab() {
  const [name, setName] = useState('EduFlex')
  const [slogan, setSlogan] = useState('La plateforme LMS moderne pour créer, gérer et vendre vos formations en ligne.')
  const [color, setColor] = useState('#2251cc')
  const [logo, setLogo] = useState('')
  const [commissionRate, setCommissionRate] = useState(15)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const globalConfig = localStorage.getItem('global_platform_config')
      if (globalConfig) {
        try {
          const parsed = JSON.parse(globalConfig)
          if (parsed.name) setName(parsed.name)
          if (parsed.slogan) setSlogan(parsed.slogan)
          if (parsed.color) setColor(parsed.color)
          if (parsed.logo) setLogo(parsed.logo)
          if (parsed.commissionRate) setCommissionRate(parsed.commissionRate)
        } catch {}
      }
    }
  }, [])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image.')
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      setLogo(event.target?.result as string)
      toast.success('Logo chargé localement !')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    setSaving(true)
    try {
      localStorage.setItem('global_platform_config', JSON.stringify({
        name: name.trim(),
        slogan: slogan.trim(),
        color,
        logo,
        commissionRate,
      }))
      toast.success('Configuration générale de la plateforme mise à jour !')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (err: any) {
      toast.error('Erreur de sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="mt-6 bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader>
        <CardTitle className="text-white text-base">Personnalisation Générale du Front-End</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Nom de la Plateforme *</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: EduFlex" className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Taux de commission d'affiliation par défaut (%)</label>
            <Input type="number" value={commissionRate} onChange={e => setCommissionRate(Number(e.target.value))} className="bg-slate-800 border-slate-700 text-slate-100 text-xs" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Slogan Global / En-tête Public</label>
          <Input value={slogan} onChange={e => setSlogan(e.target.value)} placeholder="Slogan public" className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Logo de la Plateforme (En-têtes publics)</label>
            <div className="flex items-center gap-4">
              {logo ? (
                <div className="h-16 w-16 rounded-xl border border-slate-850 bg-slate-800 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-xl border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-500 shrink-0 bg-slate-950 text-xs font-bold">
                  Aucun
                </div>
              )}
              <div className="space-y-1.5 flex-1">
                <input type="file" accept="image/*" id="platform-logo-upload" className="hidden" onChange={handleLogoUpload} />
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs font-semibold border-slate-700 text-slate-300" onClick={() => document.getElementById('platform-logo-upload')?.click()}>
                  Sélectionner un fichier
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Couleur d'accentuation du Front</label>
            <div className="flex items-center gap-3">
              <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded-md border border-slate-700 cursor-pointer bg-transparent" />
              <div>
                <span className="text-xs font-semibold text-white block">{color}</span>
                <span className="text-[10px] text-slate-400">Applique la couleur au thème général du site public.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 text-xs border-none shadow-md">
            {saving ? 'Enregistrement...' : 'Enregistrer la configuration globale'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AdminComptesTab() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState<'student' | 'teacher' | 'admin'>('student')
  const [newAcademyName, setNewAcademyName] = useState('')
  const [adding, setAdding] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['admin_profiles_list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    }
  })

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim() || !newName.trim()) return
    setAdding(true)
    try {
      const tempPassword = crypto.randomUUID().replace(/-/g, '') + 'Aa1!'
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newEmail.trim().toLowerCase(),
        password: tempPassword,
        options: {
          data: {
            display_name: newName.trim(),
            role: newRole,
          },
        },
      })

      if (signUpError) throw signUpError

      if (signUpData.user?.id) {
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert({
            id: signUpData.user.id,
            email: newEmail.trim().toLowerCase(),
            display_name: newName.trim(),
            role: newRole,
            approved: true,
            academy_name: newAcademyName.trim() || null,
          }, { onConflict: 'id' })
        if (insertError) throw insertError
      }

      toast.success(`Compte créé avec succès ! Un e-mail a été envoyé à ${newEmail.trim()}.`)
      setNewEmail('')
      setNewName('')
      setNewAcademyName('')
      setShowAddForm(false)
      queryClient.invalidateQueries({ queryKey: ['admin_profiles_list'] })
    } catch (err: any) {
      toast.error('Erreur lors de la création : ' + err.message)
    } finally {
      setAdding(false)
    }
  }

  const handleUpdateUser = async (userId: string, updates: any) => {
    setUpdatingId(userId)
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
      if (error) throw error
      toast.success('Compte mis à jour.')
      queryClient.invalidateQueries({ queryKey: ['admin_profiles_list'] })
    } catch (err: any) {
      toast.error('Erreur de mise à jour : ' + err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer définitivement ce profil utilisateur ? Cette action est irréversible.')) return
    setUpdatingId(userId)
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
      if (error) throw error
      toast.success('Profil supprimé.')
      queryClient.invalidateQueries({ queryKey: ['admin_profiles_list'] })
    } catch (err: any) {
      toast.error('Erreur lors de la suppression : ' + err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = (profiles || []).filter((p: any) => 
    (p.display_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.role || '').toLowerCase().includes(search.toLowerCase())
  )

  const ROLE_BADGES: Record<string, string> = {
    admin: 'bg-red-500/10 text-red-400 border-red-500/20',
    teacher: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    student: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  const ROLE_LABELS: Record<string, string> = {
    admin: 'Administrateur',
    teacher: 'Enseignant / Académie',
    student: 'Élève',
  }

  return (
    <div className="space-y-6 mt-6">
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-slate-800 bg-slate-900 text-slate-100">
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-white">Créer un compte utilisateur</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enregistrez un nouvel élève, enseignant ou administrateur.
                </p>
              </div>
              <form onSubmit={handleAddAccount} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nom Complet *</label>
                  <Input required value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex: Jean Dupont" className="h-9 text-xs bg-slate-800 border-slate-700 text-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Adresse Email *</label>
                  <Input required type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Ex: jean.dupont@gmail.com" className="h-9 text-xs bg-slate-800 border-slate-700 text-slate-100" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Rôle de l'utilisateur *</label>
                  <select value={newRole} onChange={e => setNewRole(e.target.value as any)} className="w-full h-9 rounded bg-slate-800 border border-slate-700 text-slate-100 text-xs px-2.5 outline-none">
                    <option value="student">Élève</option>
                    <option value="teacher">Enseignant / Académie</option>
                    <option value="admin">Administrateur Général</option>
                  </select>
                </div>
                {newRole === 'teacher' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Nom de l'Académie (Optionnel)</label>
                    <Input value={newAcademyName} onChange={e => setNewAcademyName(e.target.value)} placeholder="Ex: Institut de Technologie" className="h-9 text-xs bg-slate-800 border-slate-700 text-slate-100" />
                  </div>
                )}
                <div className="flex items-center gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 text-xs h-9 border-slate-750 text-slate-300" onClick={() => setShowAddForm(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1 text-xs h-9 bg-teal-600 hover:bg-teal-500 text-white font-medium" disabled={adding}>
                    {adding ? 'Création...' : 'Créer le compte'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Rechercher par nom, email, rôle..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-800 text-slate-100 text-xs" />
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs h-9 flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Créer un compte
        </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 uppercase font-semibold text-[10px] bg-slate-950/20">
                  <th className="py-3 px-4">Utilisateur</th>
                  <th className="py-3 px-4">Rôle</th>
                  <th className="py-3 px-4">Académie</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4">Créé le</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i}>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-32 bg-slate-800" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-20 bg-slate-800" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-24 bg-slate-800" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-16 bg-slate-800" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-20 bg-slate-800" /></td>
                      <td className="py-4 px-4 text-right"><Skeleton className="h-6 w-12 ml-auto bg-slate-800" /></td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                      Aucun compte utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u: any) => (
                    <tr key={u.id} className="hover:bg-slate-950/10 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block">{u.display_name || 'Utilisateur'}</span>
                        <span className="text-[10px] text-slate-400">{u.email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select 
                          value={u.role || 'student'} 
                          disabled={updatingId === u.id}
                          onChange={e => handleUpdateUser(u.id, { role: e.target.value })}
                          className="bg-slate-800 border border-slate-700 text-slate-100 rounded px-2 py-1 text-[11px] outline-none"
                        >
                          <option value="student">Élève</option>
                          <option value="teacher">Enseignant</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {u.academy_name || <span className="text-slate-500 italic text-[10px]">Aucune</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleUpdateUser(u.id, { approved: !u.approved })}
                          disabled={updatingId === u.id}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            u.approved !== false
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}
                        >
                          {u.approved !== false ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                          {u.approved !== false ? 'Approuvé / Actif' : 'Suspendu'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[10px]">
                        {new Date(u.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="xs" 
                          disabled={updatingId === u.id}
                          onClick={() => handleDeleteUser(u.id)}
                          className="h-7 w-7 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
