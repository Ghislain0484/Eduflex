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
  User,
  Users,
  CreditCard,
  Building2,
  Search,
  FileText,
  Code2,
  Receipt,
  Globe,
  Lock,
  Phone,
  Mail,
  Tag,
  ToggleLeft
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

  // Form states
  const [academyName, setAcademyName] = useState(user?.academyName || "MON ESPACE DE FORMATION")
  const [academySlug, setAcademySlug] = useState('mon-espace')
  const [replyEmail, setReplyEmail] = useState(user?.email || 'mon@email.fr')
  const [savEmail, setSavEmail] = useState(user?.email || 'mon@email.fr')
  const [savPhone, setSavPhone] = useState('+225 07 00 00 00 00')
  const [mobilePhone, setMobilePhone] = useState('+225 07 00 00 00 00')
  const [suspendEnrollments, setSuspendEnrollments] = useState(false)

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

      {/* Settings Header Layout (Matching Screenshots 3 & 4) */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Sub-Menu Navigation List */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 shadow-xs text-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'general' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <SettingsIcon className="h-4 w-4" /> Général
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'team' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Users className="h-4 w-4" /> Équipe
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'payments' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <CreditCard className="h-4 w-4" /> Paiements
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'company' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Building2 className="h-4 w-4" /> Entreprise
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'seo' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Search className="h-4 w-4" /> Référencement SEO
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'legal' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FileText className="h-4 w-4" /> Liens légaux et RGPD
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'api' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Code2 className="h-4 w-4" /> APIs développeur
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2.5 ${activeTab === 'billing' ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Receipt className="h-4 w-4" /> Facturation
          </button>
        </div>

        {/* Right Content View */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: GÉNÉRAL (Matching Screenshots 3 & 4) */}
          {activeTab === 'general' && (
            <div className="space-y-8">
              
              {/* Section 1: Informations obligatoires */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Informations obligatoires</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Renseignez des informations obligatoires pour que nous puissions configurer votre espace.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Attention ! Si vous modifiez l'URL de votre espace, n'oubliez pas d'en informer vos apprenants.
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

              {/* Section 2: Domaine personnalisé (Matching Screenshot 3) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Domaine personnalisé</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Connectez un sous-domaine qui vous appartient en quelques étapes simples.
                  </p>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                    Vous disposez déjà d'un nom de domaine ? Vous pouvez faire apparaître votre espace EduFlex directement sur votre sous-domaine (comme <strong className="text-slate-900 dark:text-white">formations.monsite.fr</strong>).
                  </Card>
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>

              {/* Section 3: Langue (Matching Screenshot 3) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Langue</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Définissez la langue de votre espace apprenant. La langue par défaut est le français.
                  </p>
                </div>
                <div className="md:col-span-8">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>

              {/* Section 4: Communication et SAV (Matching Screenshot 3) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Communication et SAV</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Il est très important que vos apprenants puissent vous contacter au moindre doute. Ces informations seront accessibles par vos apprenants.
                  </p>
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

              {/* Section 5: Numéro de téléphone mobile (Matching Screenshot 4) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Numéro de téléphone mobile</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pour mieux vous accompagner, nous avons besoin de votre numéro de téléphone avec l'indicatif international (+225, +221, +237, +33, etc.).
                  </p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Veuillez préciser l'indicatif (+225 ou autre)</label>
                    <Input value={mobilePhone} onChange={e => setMobilePhone(e.target.value)} className="text-xs h-9 font-mono" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => toast.success("Mobile enregistré !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
                      Mettre à jour
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Section 6: Gestion des étiquettes (Tags) (Matching Screenshot 4) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Gestion des étiquettes</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Les étiquettes (ou tags) vous permettent d'organiser vos formations et vos packs.
                  </p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Vos étiquettes</span>
                  <p className="text-xs text-slate-400 italic">Aucune étiquette</p>
                </Card>
              </div>

              {/* Section 7: Formulaire d'inscription (Matching Screenshot 4) */}
              <div className="grid gap-6 md:grid-cols-12 items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Formulaire d'inscription</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Le nom, prénom et adresse e-mail sont déjà demandés lors de la création du compte apprenant.
                  </p>
                </div>
                <div className="md:col-span-8">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>

              {/* Section 8: Suspendre les inscriptions (Matching Screenshot 4) */}
              <div className="grid gap-6 md:grid-cols-12 items-start">
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Suspendre les inscriptions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Besoin d'arrêter temporairement vos formations ? Vous pouvez désactiver les inscriptions à vos formations pendant un temps SANS désactiver ou supprimer votre compte.
                  </p>
                </div>
                <Card className="md:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Les apprenants auront toujours accès aux formations déjà acquises.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="suspendCheck"
                      checked={suspendEnrollments}
                      onChange={e => {
                        setSuspendEnrollments(e.target.checked)
                        toast.info(e.target.checked ? "Inscriptions suspendues." : "Inscriptions réactivées.")
                      }}
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

          {activeTab !== 'general' && (
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs text-xs text-slate-500">
              Paramètres du sous-menu <strong className="text-slate-900 dark:text-white uppercase">{activeTab}</strong>...
            </Card>
          )}

        </div>

      </div>

    </div>
  )
}
