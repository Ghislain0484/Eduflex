import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Input,
  toast,
} from '@blinkdotnew/ui'
import {
  Settings as SettingsIcon,
  Users,
  CreditCard,
  Building2,
  Search,
  FileText,
  Code2,
  Receipt,
  Upload,
  ExternalLink,
  Plus
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'payments' | 'company' | 'seo' | 'legal' | 'api' | 'billing'>('general')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      if (['general', 'team', 'payments', 'company', 'seo', 'legal', 'api', 'billing'].includes(tabParam || '')) {
        setActiveTab(tabParam as any)
      }
    }
  }, [])

  // Général Form states
  const [academyName, setAcademyName] = useState(user?.academyName || "GHISLAIN ADOHI-NGUESSAN")
  const [academySlug, setAcademySlug] = useState('ghislain')
  const [replyEmail, setReplyEmail] = useState(user?.email || 'mon@email.fr')
  const [savEmail, setSavEmail] = useState(user?.email || 'mon@email.fr')
  const [savPhone, setSavPhone] = useState('+225 07 00 00 00 00')
  const [mobilePhone, setMobilePhone] = useState('+225 07 00 00 00 00')
  const [suspendEnrollments, setSuspendEnrollments] = useState(false)

  // SEO Form states (Screenshot 1)
  const [seoTitle, setSeoTitle] = useState('GHISLAIN ADOHI-NGUESSAN')
  const [seoDescription, setSeoDescription] = useState('')

  // Entreprise Form states (Screenshot 2)
  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [regionState, setRegionState] = useState('')
  const [country, setCountry] = useState('France')
  const [legalForm, setLegalForm] = useState('')
  const [siret, setSiret] = useState('')
  const [activityDeclNumber, setActivityDeclNumber] = useState('')
  const [vatNumber, setVatNumber] = useState('')

  // RGPD & Liens Légaux Form states (Screenshot 4)
  const [rgpdOptinActive, setRgpdOptinActive] = useState(true)
  const [rgpdText, setRgpdText] = useState('')
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('')
  const [cgvUrl, setCgvUrl] = useState('')
  const [cgvAcceptText, setCgvAcceptText] = useState('')

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Top Header Upgrade Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
        </span>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
          <Link to="/tarifs">
            Débloquer 🫱
          </Link>
        </Button>
      </div>

      {/* Settings Navigation Layout */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Sidebar Sub-Nav */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 shadow-xs text-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'general' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <SettingsIcon className="h-4 w-4" /> Général
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'team' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Users className="h-4 w-4" /> Équipe
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'payments' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <CreditCard className="h-4 w-4" /> Paiements
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'company' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Building2 className="h-4 w-4" /> Entreprise
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'seo' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Search className="h-4 w-4" /> Référencement SEO
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'legal' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FileText className="h-4 w-4" /> Liens légaux et RGPD
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'api' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Code2 className="h-4 w-4" /> APIs développeur
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'billing' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Receipt className="h-4 w-4" /> Facturation
          </button>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* 1. TAB: GÉNÉRAL */}
          {activeTab === 'general' && (
            <div className="space-y-8">
              {/* Informations obligatoires */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Informations obligatoires</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Renseignez des informations obligatoires pour que nous puissions configurer votre espace.
                  </p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom de l'espace</label>
                    <Input value={academyName} onChange={e => setAcademyName(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">URL de votre espace</label>
                    <div className="flex gap-2">
                      <Input value={academySlug} onChange={e => setAcademySlug(e.target.value)} className="text-xs font-mono h-9 flex-1" />
                      <span className="text-xs font-semibold text-slate-500 self-center">.eduflex.app</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => toast.success("Informations enregistrées !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
                      Mettre à jour
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Domaine personnalisé */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Domaine personnalisé</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Connectez votre sous-domaine personnalisé.</p>
                </div>
                <div className="md:col-span-8">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>

              {/* Communication et SAV */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Communication et SAV</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Coordonnées de support pour vos apprenants.</p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email de réponse (Reply-to)</label>
                    <Input value={replyEmail} onChange={e => setReplyEmail(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email de votre support (SAV)</label>
                    <Input value={savEmail} onChange={e => setSavEmail(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Téléphone de votre support (SAV)</label>
                    <Input value={savPhone} onChange={e => setSavPhone(e.target.value)} className="text-xs h-9 font-mono" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => toast.success("Coordonnées SAV enregistrées !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
                      Mettre à jour
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Suspendre les inscriptions */}
              <div className="grid gap-6 md:grid-cols-12 items-start">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Suspendre les inscriptions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Désactivez temporairement les nouvelles ventes.</p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Les apprenants auront toujours accès aux formations déjà acquises.</p>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="suspendCheck"
                      checked={suspendEnrollments}
                      onChange={e => setSuspendEnrollments(e.target.checked)}
                      className="h-5 w-5 rounded accent-teal-600 cursor-pointer"
                    />
                    <label htmlFor="suspendCheck" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                      Suspendre les inscriptions
                    </label>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* 2. TAB: ÉQUIPE */}
          {activeTab === 'team' && (
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Collaborateurs de l'académie</h3>
                <Button size="sm" onClick={() => toast.info("Invitation d'un nouveau formateur...")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" /> Inviter un membre
                </Button>
              </div>
              <p className="text-xs text-slate-500">Ajoutez des formateurs ou assistants pour vous aider à gérer vos cours.</p>
            </Card>
          )}

          {/* 3. TAB: PAIEMENTS */}
          {activeTab === 'payments' && (
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Moyens de paiement & Passerelles</h3>
              <p className="text-xs text-slate-500">Connectez vos comptes Wave Mobile Money, Orange Money, MTN, Moov ou Stripe pour encaisser vos règlements.</p>
            </Card>
          )}

          {/* 4. TAB: ENTREPRISE (Matching Screenshot 2) */}
          {activeTab === 'company' && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Dites-nous tout sur votre entreprise
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pour la gestion de votre facturation, nous avons besoin de vos informations légales (raison sociale, siret, adresse, etc)...
                </p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ces informations <strong className="text-slate-900 dark:text-white">sont privées et ne seront pas communiquées</strong> à vos apprenants.
                </p>
              </div>

              <Card className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom de l'entreprise (Raison sociale) *</label>
                  <Input value={companyName} onChange={e => setCompanyName(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse (numéro + voie) *</label>
                  <Input value={address} onChange={e => setAddress(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Complément d'adresse</label>
                  <Input value={addressComplement} onChange={e => setAddressComplement(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Code postal *</label>
                    <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Ville *</label>
                    <Input value={city} onChange={e => setCity(e.target.value)} className="text-xs h-9" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Région / État</label>
                    <Input value={regionState} onChange={e => setRegionState(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pays</label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-semibold px-3 text-slate-700 dark:text-slate-300 outline-none"
                    >
                      <option value="France">France</option>
                      <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                      <option value="Sénégal">Sénégal</option>
                      <option value="Cameroun">Cameroun</option>
                      <option value="Gabon">Gabon</option>
                      <option value="Belgique">Belgique</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Forme juridique *</label>
                    <Input placeholder="SASU/SAS/EURL/SARL/EI/Micro..." value={legalForm} onChange={e => setLegalForm(e.target.value)} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Siret *</label>
                    <Input value={siret} onChange={e => setSiret(e.target.value)} className="text-xs h-9 font-mono" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Numéro de Déclaration d'Activité</label>
                    <Input value={activityDeclNumber} onChange={e => setActivityDeclNumber(e.target.value)} className="text-xs h-9 font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">TVA intracommunautaire</label>
                    <Input value={vatNumber} onChange={e => setVatNumber(e.target.value)} className="text-xs h-9 font-mono" />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => toast.success("Informations de l'entreprise mises à jour !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
                    Mettre à jour
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 5. TAB: RÉFÉRENCEMENT SEO (Matching Screenshot 1) */}
          {activeTab === 'seo' && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Paramètres SEO
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Configurez les métadonnées qui améliorent le référencement naturel de votre page d'accueil EduFlex.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ces données seront également affichées lors des partages sur <strong className="text-slate-800 dark:text-slate-200">Facebook, Twitter, LinkedIn...</strong>
                </p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Ces champs doivent être modifiés avec précaution.
                </p>
                <button onClick={() => toast.info("Ouverture du tutoriel SEO...")} className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline block pt-1">
                  Vous ne savez pas ce que c'est le SEO ? Regardez notre tutoriel sur le sujet.
                </button>
              </div>

              <Card className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Titre SEO (affiché sur Google, Bing, Facebook, LinkedIn...)</label>
                  <Input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="text-xs h-9" />
                  <span className="text-[10px] text-slate-400 block">50 – 60 caractères maximum recommandés par Google</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description SEO (affichée sur Google, Bing, Facebook, LinkedIn...)</label>
                  <textarea rows={4} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white" />
                  <span className="text-[10px] text-slate-400 block">155 – 160 caractères maximum recommandés par Google</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Image (affichée sur Facebook, LinkedIn, Twitter...)</label>
                  <div className="border border-teal-500/40 bg-teal-500/5 rounded-xl p-4 text-center cursor-pointer hover:bg-teal-500/10 transition-colors flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs">
                    <Upload className="h-4 w-4" /> Téléverser
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-950/80 rounded-xl text-[11px] text-slate-500">
                    Si aucune image n'est ajoutée, l'image utilisée pour les réseaux sociaux sera votre logo.
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => toast.success("Métadonnées SEO sauvegardées !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
                    Mettre à jour
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 6. TAB: LIENS LÉGAUX ET RGPD (Matching Screenshot 4) */}
          {activeTab === 'legal' && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    RGPD et liens légaux
                  </h2>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Notre accord de sous-traitance des données (DPA)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Un Accord de traitement des données (DPA) vous est mis à votre disposition afin de préciser les modalités de traitement des données dans le cadre de l'utilisation de la plateforme.
                  </p>
                  <button onClick={() => toast.info("Ouverture du DPA...")} className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
                    Accord de sous-traitance des données (DPA)
                  </button>
                </div>

                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Vos conditions générales et votre politique de confidentialité
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Le RGPD impose de communiquer à vos apprenants vos conditions générales et votre politique de confidentialité.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Par défaut, nous affichons des conditions générales et politique de confidentialité types à vos apprenants.
                  </p>
                  <span className="text-[11px] text-slate-400 italic block">Tous les champs sont facultatifs.</span>
                </div>

                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-4 text-xs">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Voir les modèles types</h4>
                  <button onClick={() => toast.info("Ouverture des CGV types...")} className="text-teal-600 dark:text-teal-400 hover:underline block text-[11px]">
                    Conditions générales de vente - Modèle apprenant
                  </button>
                  <button onClick={() => toast.info("Ouverture de la Politique types...")} className="text-teal-600 dark:text-teal-400 hover:underline block text-[11px]">
                    Politique de confidentialité - Modèle apprenant
                  </button>
                </div>
              </div>

              <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Activez la récolte d'email pour le marketing (RGPD)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rgpdCheck"
                      checked={rgpdOptinActive}
                      onChange={e => setRgpdOptinActive(e.target.checked)}
                      className="h-5 w-5 rounded accent-teal-600 cursor-pointer"
                    />
                    <label htmlFor="rgpdCheck" className="text-xs font-bold text-teal-600 dark:text-teal-400 cursor-pointer">
                      Activer
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Personnalisez le texte d'acceptation du marketing (RGPD)</label>
                  <textarea rows={3} placeholder="Je veux recevoir la newsletter... OU Je veux être tenu.e au courant..." value={rgpdText} onChange={e => setRgpdText(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lien vers votre politique de confidentialité</label>
                  <Input placeholder="https://monsite.fr/lien" value={privacyPolicyUrl} onChange={e => setPrivacyPolicyUrl(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lien vers vos conditions générales</label>
                  <Input placeholder="https://monsite.fr/lien" value={cgvUrl} onChange={e => setCgvUrl(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Personnalisez le texte d'acceptation des conditions générales</label>
                  <textarea rows={3} placeholder="Acceptez nos conditions générales et politique de confidentialité pour continuer..." value={cgvAcceptText} onChange={e => setCgvAcceptText(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs outline-none text-slate-900 dark:text-white" />
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => toast.success("Mentions RGPD mises à jour !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
                    Mettre à jour
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 7. TAB: APIS DÉVELOPPEUR (Matching Screenshot 5) */}
          {activeTab === 'api' && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  APIs Développeur
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vous êtes développeur ou faites appel à un prestataire ?
                </p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Accédez à vos données à travers une API en générant une clé unique associée à votre compte.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                  Vous pouvez utiliser cette clé côté client ou côté serveur. Néanmoins, vous n'aurez accès qu'à des APIs en lecture seule.
                </Card>
                {isFreePlan && <YellowPlanGuardBox />}
              </div>
            </div>
          )}

          {/* 8. TAB: FACTURATION (Matching Screenshot 3) */}
          {activeTab === 'billing' && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Factures
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-200">Besoin d'un justificatif ?</strong> Retrouvez ici toutes vos factures EduFlex.
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Vous utilisez le forfait DÉCOUVERTE ? Nous vous adressons une facture tous les mois correspondant aux commissions que nous aurons perçues sur les règlements de vos apprenants.
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Vous utilisez le forfait PRO ou le forfait EXPERT ? Vous n'avez pas de commission dans ce cas, mais nous vous adressons une facture mensuelle ou annuelle correspondant à vos frais d'abonnement.
                </p>
              </div>

              <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs min-h-[140px] flex items-center justify-center">
                <div className="p-4 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center w-full">
                  Aucune facture pour le moment.
                </div>
              </Card>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
