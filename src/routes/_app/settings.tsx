import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent, Input, Button } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { toast } from '@blinkdotnew/ui'
import { User, Shield, Bell } from 'lucide-react'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useAuth()
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground text-sm mt-1">Gérez votre profil et vos préférences.</p>
      </div>
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil" className="gap-2"><User className="h-4 w-4" />Profil</TabsTrigger>
          <TabsTrigger value="securite" className="gap-2"><Shield className="h-4 w-4" />Sécurité</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profil"><ProfilTab user={user} /></TabsContent>
        <TabsContent value="securite"><SecuriteTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
      </Tabs>
    </div>
  )
}

function ProfilTab({ user }: { user: any }) {
  const [name, setName] = useState(user?.displayName || '')
  const [saving, setSaving] = useState(false)
  const handleSave = async () => { setSaving(true); toast.success('Profil mis à jour'); setSaving(false) }
  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Nom complet</label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Adresse email</label><Input value={user?.email || ''} disabled className="opacity-60" /></div>
        </div>
        <div className="space-y-2"><label className="text-sm font-medium">Rôle</label><Input value="Administrateur" disabled className="opacity-60" /></div>
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</Button>
      </CardContent>
    </Card>
  )
}

function SecuriteTab() {
  const [oldP, setOldP] = useState(''); const [newP, setNewP] = useState(''); const [confP, setConfP] = useState('')
  const handleChange = () => { if (newP !== confP) { toast.error('Les mots de passe ne correspondent pas'); return } toast.success('Mot de passe modifié'); setOldP(''); setNewP(''); setConfP('') }
  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Changer le mot de passe</CardTitle></CardHeader>
      <CardContent className="space-y-4 max-w-md">
        <div className="space-y-2"><label className="text-sm font-medium">Mot de passe actuel</label><Input type="password" value={oldP} onChange={e => setOldP(e.target.value)} /></div>
        <div className="space-y-2"><label className="text-sm font-medium">Nouveau mot de passe</label><Input type="password" value={newP} onChange={e => setNewP(e.target.value)} /></div>
        <div className="space-y-2"><label className="text-sm font-medium">Confirmer</label><Input type="password" value={confP} onChange={e => setConfP(e.target.value)} /></div>
        <Button onClick={handleChange}>Modifier le mot de passe</Button>
      </CardContent>
    </Card>
  )
}

function NotificationsTab() {
  const [email, setEmail] = useState(true); const [student, setStudent] = useState(true); const [payment, setPayment] = useState(true); const [newsletter, setNewsletter] = useState(false)
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
