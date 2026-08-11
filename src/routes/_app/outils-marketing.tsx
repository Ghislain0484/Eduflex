import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Input,
  toast,
} from '@blinkdotnew/ui'
import {
  Megaphone,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  PlayCircle,
  Copy,
  MessageCircle,
  Zap,
  Mail,
  Sliders,
  Send,
  Key,
  ExternalLink,
  Lock
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/outils-marketing')({
  component: OutilsMarketingPage,
})

function OutilsMarketingPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [activeTab, setActiveTab] = useState<'tracking' | 'autoresponders' | 'automations' | 'emails'>('tracking')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      if (tabParam === 'autoresponders' || tabParam === 'automations' || tabParam === 'emails' || tabParam === 'tracking') {
        setActiveTab(tabParam)
      }
    }
  }, [])

  // Tracking state
  const [utmSource, setUtmSource] = useState('')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [generatedUtmUrl, setGeneratedUtmUrl] = useState('')
  const [gaCode, setGaCode] = useState('')
  const [metaPixelCode, setMetaPixelCode] = useState('')
  const [faqUtmOpen, setFaqUtmOpen] = useState(false)

  // Emails tab state (Matching Screenshot 3)
  const [selectedEmailId, setSelectedEmailId] = useState('welcome')

  const emailTemplates = [
    { id: 'welcome', title: 'Email de bienvenue', desc: "Personnalisez l'email que reçoivent vos apprenants lorsqu'ils s'inscrivent à une de vos formations." },
    { id: 'completion', title: 'Email de fin de formation', desc: "Félicitez vos apprenants dès qu'ils terminent 100% des leçons d'un cours." },
    { id: 'unsubscribe', title: 'Email de désinscription', desc: "Envoyé lorsqu'un apprenant annule son inscription à une formation." },
    { id: 'delete', title: "Email de suppression d'un apprenant", desc: "Notification envoyée lors de la suppression définitive du compte d'un apprenant." },
    { id: 'abandon1', title: "1ère relance après un abandon d'achat", desc: "Relancez automatiquement les prospects ayant quitté la page de paiement avant d'avoir finalisé par Mobile Money ou Carte." },
    { id: 'abandon2', title: "2ème relance après un abandon d'achat", desc: "Seconde relance incitative avec un code promo pour convertir les indécis." },
    { id: 'invite_new', title: "Email d'invitation d'un nouvel apprenant", desc: "Email contenant les identifiants de connexion générés pour un nouvel élève." },
    { id: 'invite_exist', title: "Email d'invitation d'un apprenant existant", desc: "Notification envoyée à un élève déjà inscrit pour lui donner accès à un nouveau cours." },
    { id: 'lesson_new', title: "Email de leçon nouvellement accessible", desc: "Prévenez l'apprenant lorsqu'un nouveau chapitre ou leçon débloquée est disponible." },
    { id: 'recap', title: "Email récapitulatif des formations en cours", desc: "Résumé hebdomadaire de la progression envoyée à l'apprenant." },
    { id: 'access_mod', title: "Email de modification des accès à une formation", desc: "Informa l'apprenant d'un changement dans la durée d'accès à ses cours." },
    { id: 'access_exp', title: "Email d'expiration des accès à une formation", desc: "Avertit l'apprenant quelques jours avant l'expiration de son accès." },
    { id: 'churn1', title: "1ère relance après le décrochage d'un apprenant", desc: "Encouragez l'apprenant inactif depuis 14 jours à reprendre ses leçons." },
    { id: 'churn2', title: "2ème relance après le décrochage d'un apprenant", desc: "Relance ultime pour réengager les étudiants inactifs." },
  ]

  const selectedEmail = emailTemplates.find(e => e.id === selectedEmailId) || emailTemplates[0]

  const handleGenerateUtm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!utmSource.trim()) {
      toast.error("La source UTM est obligatoire (ex: whatsapp, facebook).")
      return
    }
    const baseUrl = window.location.origin
    const url = `${baseUrl}/courses?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`
    setGeneratedUtmUrl(url)
    toast.success("Lien de suivi UTM généré avec succès !")
  }

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

      {/* Internal Sub-Nav Tabs for Outils Marketing */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'tracking' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Suivi / Tracking
        </button>
        <button
          onClick={() => setActiveTab('autoresponders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'autoresponders' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Autorépondeurs
        </button>
        <button
          onClick={() => setActiveTab('automations')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'automations' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Automatisations (Zapier...)
        </button>
        <button
          onClick={() => setActiveTab('emails')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'emails' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Emails & Relances
        </button>
      </div>

      {/* SUB-TAB 1: SUIVI / TRACKING (Matching Screenshot 2 from turn 1) */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Créez vos liens de suivi UTM
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Identifiez l'origine de vos inscriptions grâce à des liens de suivi UTM personnalisés. EduFlex vous permet d'analyser et d'optimiser vos canaux d'acquisition (Facebook, WhatsApp, TikTok, Google...).
              </p>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/40">
                <button
                  onClick={() => setFaqUtmOpen(!faqUtmOpen)}
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                >
                  <span>Qu'est-ce qu'un lien de suivi UTM ?</span>
                  {faqUtmOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>
                {faqUtmOpen && (
                  <div className="p-4 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <p>Un paramètre UTM est un petit bout de code ajouté à la fin de votre lien URL pour indiquer précisément d'où vient l'apprenant (ex: un statut WhatsApp, une pub Facebook ou un e-mail).</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={() => toast.info("Guide UTM ouvert.")} className="text-xs h-8 gap-1.5 text-slate-600 dark:text-slate-300">
                  <HelpCircle className="h-3.5 w-3.5" /> Voir la page d'aide
                </Button>
                <Button size="sm" onClick={() => toast.info("Lancement de la vidéo démo...")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8 gap-1.5">
                  <PlayCircle className="h-3.5 w-3.5" /> Regarder la démo
                </Button>
              </div>
            </div>

            <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                Vous n'avez aucun produit publié à intégrer pour le moment.
              </div>

              <form onSubmit={handleGenerateUtm} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Source (obligatoire)</label>
                  <Input
                    placeholder="Ex: whatsapp, facebook, instagram, google"
                    value={utmSource}
                    onChange={e => setUtmSource(e.target.value)}
                    className="text-xs h-9 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Medium</label>
                  <Input
                    placeholder="Ex: cpc, statut, story, newsletter"
                    value={utmMedium}
                    onChange={e => setUtmMedium(e.target.value)}
                    className="text-xs h-9 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Campagne</label>
                  <Input
                    placeholder="Ex: promo_rentree, lancement_bootcamp"
                    value={utmCampaign}
                    onChange={e => setUtmCampaign(e.target.value)}
                    className="text-xs h-9 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
                    Générer mon lien de suivi UTM
                  </Button>
                </div>
              </form>

              {generatedUtmUrl && (
                <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl space-y-2 animate-in fade-in">
                  <span className="text-xs font-bold text-teal-400 block">Lien généré :</span>
                  <div className="flex gap-2 items-center">
                    <Input readOnly value={generatedUtmUrl} className="text-xs font-mono bg-slate-950 text-teal-300 h-8" />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedUtmUrl)
                        toast.success("Lien UTM copié !")
                      }}
                      className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-8 shrink-0"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Outils de suivi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Indiquez ici vos codes <strong className="text-slate-800 dark:text-slate-200">Google Analytics 4</strong> ou <strong className="text-slate-800 dark:text-slate-200">Pixel Meta (Facebook)</strong> pour suivre vos performances et piloter vos campagnes.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Code Google Analytics</label>
                <Input placeholder="G-XXXXXXXXXX" value={gaCode} onChange={e => setGaCode(e.target.value)} className="text-xs font-mono h-9" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pixel Meta (Facebook)</label>
                <Input placeholder="XXXXXXXXXXXXXXX" value={metaPixelCode} onChange={e => setMetaPixelCode(e.target.value)} className="text-xs font-mono h-9" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => toast.success("Codes de suivi enregistrés !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
                Mettre à jour
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* SUB-TAB 2: AUTORÉPONDEURS (Matching Screenshot 2 from turn 2) */}
      {activeTab === 'autoresponders' && (
        <div className="space-y-6">
          <div className="p-4 bg-teal-50 dark:bg-slate-900 border border-teal-500/30 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <p className="font-semibold">
              Pour alimenter vos listes et gérer vos autorépondeurs, connectez EduFlex à vos outils Marketing : <strong className="text-slate-900 dark:text-white">Brevo, ActiveCampaign et/ou GetResponse</strong>.
            </p>
            <p className="text-[11px] text-slate-500">
              Vous devrez ensuite associer chacune de vos formations EduFlex avec une liste préalablement créée dans votre outil Marketing. Pour cela, rendez-vous dans l'onglet « Paramètres » de vos formations.
            </p>
          </div>

          <div className="space-y-4">
            {/* Brevo */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs">
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Brevo (ex Sendinblue)</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Où trouver votre clé API ? Dans la section « SMTP et API » de votre compte Brevo. <br />
                    <button onClick={() => toast.info("Ouverture du tutoriel Brevo...")} className="text-teal-500 hover:underline font-semibold">
                      Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici
                    </button>
                  </p>
                </div>
                <div className="md:col-span-7">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>
            </Card>

            {/* ActiveCampaign */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs">
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">ActiveCampaign</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Où trouver vos accès d'API ? Dans la section « Paramètres », puis « Développeur » de votre compte ActiveCampaign. <br />
                    <button onClick={() => toast.info("Ouverture du tutoriel ActiveCampaign...")} className="text-teal-500 hover:underline font-semibold">
                      Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici
                    </button>
                  </p>
                </div>
                <div className="md:col-span-7">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>
            </Card>

            {/* GetResponse */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs">
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">GetResponse</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Où trouver votre clé API ? Dans la section « Intégrations & API », puis « API » de votre compte GetResponse. <br />
                    <strong className="text-slate-700 dark:text-slate-300">Point d'attention : les clés API GetResponse expirent au bout de 90 jours</strong>, charge à vous de faire le renouvellement avant expiration. <br />
                    <button onClick={() => toast.info("Ouverture du tutoriel GetResponse...")} className="text-teal-500 hover:underline font-semibold">
                      Vous pouvez également suivre notre tutoriel sur le sujet en cliquant ici
                    </button>
                  </p>
                </div>
                <div className="md:col-span-7">
                  {isFreePlan && <YellowPlanGuardBox />}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: AUTOMATISATIONS ZAPIER & MAKE (Matching Screenshot 1 from turn 2) */}
      {activeTab === 'automations' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Zapier et Make
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vous voulez connecter EduFlex avec d'autres applications ?
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                Connectez votre compte EduFlex à Zapier ou Make en générant une clé d'authentification (aussi appelée clé d'API).
              </p>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold">Attention !</p>
                <p className="text-[11px] leading-relaxed">
                  Pour accéder à l'application EduFlex sur Zapier ou Make, vous devez impérativement passer par les liens privés ; l'application n'étant pas disponible publiquement sur les stores.
                </p>
              </div>
            </div>

            <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cette clé est secrète, ne la partagez pas !</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vous devez utiliser cette clé côté Zapier ou Make pour authentifier votre compte EduFlex, afin de recevoir et envoyer uniquement les données vous concernant.
                </p>
              </div>

              {isFreePlan ? (
                <YellowPlanGuardBox />
              ) : (
                <div className="space-y-3 pt-2">
                  <Input readOnly value="ef_live_99a818172901fa910" className="text-xs font-mono bg-slate-950 text-teal-400" />
                  <Button onClick={() => toast.success("Clé d'API Zapier copiée !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
                    Copier la clé Zapier
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: EMAILS TRANSACTIONNELS & RELANCES (Matching Screenshot 3 from turn 2) */}
      {activeTab === 'emails' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* Left Column: List of 14 Email Templates */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 max-h-[600px] overflow-y-auto shadow-xs text-xs">
              {emailTemplates.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedEmailId(tpl.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-between ${selectedEmailId === tpl.id ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <span className="truncate">{tpl.title}</span>
                </button>
              ))}
            </div>

            {/* Right Main Column: Email Preview & Editor */}
            <Card className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedEmail.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {selectedEmail.desc}
                </p>
              </div>

              {isFreePlan ? (
                <YellowPlanGuardBox />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sujet de l'email</label>
                    <Input defaultValue={`[${selectedEmail.title}] Bienvenue sur votre formation !`} className="text-xs h-9" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Corps du message (Supporte le HTML et variables {"{{prenom_apprenant}}"})</label>
                    <textarea rows={6} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-xs font-sans outline-none text-slate-900 dark:text-white" defaultValue={`Bonjour {{prenom_apprenant}},\n\nFélicitations pour votre inscription à la formation !`} />
                  </div>
                  <Button onClick={() => toast.success("Modèle d'email sauvegardé !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
                    Enregistrer le modèle
                  </Button>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">Personnalisez les emails envoyés aux apprenants</h4>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Nous allons envoyer plusieurs emails à vos apprenants en votre nom : <strong className="text-slate-700 dark:text-slate-300">avant, pendant et après leur formation</strong>. Vous avez ici la possibilité de les personnaliser.
                </p>
              </div>
            </Card>

          </div>
        </div>
      )}

    </div>
  )
}
