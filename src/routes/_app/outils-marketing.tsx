import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
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
  CheckCircle2,
  MessageCircle,
  Globe,
  Code
} from 'lucide-react'
import { YellowPlanGuardBox } from '@/components/YellowPlanGuardBox'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/outils-marketing')({
  component: OutilsMarketingPage,
})

function OutilsMarketingPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [utmSource, setUtmSource] = useState('')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [generatedUtmUrl, setGeneratedUtmUrl] = useState('')

  const [gaCode, setGaCode] = useState('')
  const [metaPixelCode, setMetaPixelCode] = useState('')

  const [faqUtmOpen, setFaqUtmOpen] = useState(false)

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
      
      {/* Upgrade Banner */}
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

      {/* Main Grid: UTM Generator Section (Matching Screenshot 2) */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Column: UTM Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Créez vos liens de suivi UTM
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Identifiez l'origine de vos inscriptions grâce à des liens de suivi UTM personnalisés. EduFlex vous permet d'analyser et d'optimiser vos canaux d'acquisition (Facebook, WhatsApp, TikTok, Google...).
          </p>

          {/* Accordion FAQ */}
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

        {/* Right Column: UTM Form */}
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
                    toast.success("Lien UTM copié dans le presse-papier !")
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

      {/* Outils de suivi: Google Analytics & Meta Pixel (Matching Screenshot 2) */}
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
            <Input
              placeholder="G-XXXXXXXXXX"
              value={gaCode}
              onChange={e => setGaCode(e.target.value)}
              className="text-xs font-mono h-9"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pixel Meta (Facebook)</label>
            <Input
              placeholder="XXXXXXXXXXXXXXX"
              value={metaPixelCode}
              onChange={e => setMetaPixelCode(e.target.value)}
              className="text-xs font-mono h-9"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={() => toast.success("Codes de suivi enregistrés !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-5 rounded-lg">
            Mettre à jour
          </Button>
        </div>
      </Card>

      {/* Messagerie Instantanée & Support WhatsApp (Regional Adaptation) */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-teal-400" />
            Messagerie instantanée & Support WhatsApp
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
            Ajoutez un bouton ou widget de messagerie instantanée (WhatsApp Direct, Crisp) sur les pages de l'espace apprenant.
          </p>
        </div>

        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" /> Support WhatsApp Direct activable pour l'Afrique de l'Ouest & Centrale
          </p>
          <p className="text-[11px] text-slate-400">
            Permettez à vos étudiants de vous envoyer des messages WhatsApp en un clic pour valider leurs inscriptions par Mobile Money !
          </p>
        </div>

        {/* Yellow Upgrade Lock Box (Matching Screenshot 2) */}
        {isFreePlan && (
          <YellowPlanGuardBox />
        )}
      </Card>

    </div>
  )
}
