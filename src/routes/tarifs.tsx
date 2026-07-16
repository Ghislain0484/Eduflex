import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, CardContent, Badge } from '@blinkdotnew/ui'
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  Building,
  GraduationCap,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export const Route = createFileRoute('/tarifs')({
  component: TarifsPage,
})

function TarifsPage() {
  const [currency, setCurrency] = useState<'FCFA' | 'EUR'>('FCFA')

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'FCFA' ? 'EUR' : 'FCFA'))
  }

  const featuresList = [
    { name: "Nombre d'élèves", free: "Illimité", pro: "Illimité", b2b: "Illimité" },
    { name: "Nombre de formations", free: "Jusqu'à 2", pro: "Illimité", b2b: "Illimité" },
    { name: "Mobile Money & Cartes bancaires", free: "Oui (Commission 5%)", pro: "Oui (Commission 2%)", b2b: "Oui (Commission 0% - Direct)" },
    { name: "Classes Virtuelles Jitsi", free: "Non", pro: "Oui (50 part. max)", b2b: "Oui (Illimité)" },
    { name: "Branding Personnalisé", free: "Non (Logo EduFlex)", pro: "Partiel (Logo + Couleurs)", b2b: "Total (Marque Blanche 100%)" },
    { name: "Nom de domaine propre", free: "Non", pro: "Non (sous-domaine)", b2b: "Oui (ex: cours.votre-ecole.com)" },
    { name: "Support de modules SCORM / H5P", free: "Non", pro: "Non", b2b: "Oui (Inclus)" },
    { name: "Rapports d'assiduité avancés", free: "Non", pro: "Oui", b2b: "Oui" },
    { name: "Support technique", free: "Standard (Email)", pro: "Prioritaire (Email/Chat)", b2b: "Dédié 24/7 (Téléphone & WhatsApp)" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
              EduFlex<span className="text-teal-400 font-extrabold text-xs">TARIFS</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Retour au site
            </Link>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-500/20 border-none">
              <Link to="/register">Démarrer gratuitement</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.06),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full">
            Tarification Flexible
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Des tarifs transparents, <br />
            <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">sans frais cachés</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Hébergez vos formations, vendez vos cours et créez votre propre académie virtuelle avec des plans adaptés à vos objectifs.
          </p>

          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-xs font-semibold ${currency === 'FCFA' ? 'text-teal-400' : 'text-slate-400'}`}>FCFA (XOF/XAF)</span>
            <button onClick={toggleCurrency} className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-800 transition-colors focus:outline-none">
              <span className={`inline-block h-4 w-4 transform rounded-full bg-teal-500 transition-transform ${currency === 'EUR' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-xs font-semibold ${currency === 'EUR' ? 'text-teal-400' : 'text-slate-400'}`}>Euros (€)</span>
          </div>
        </div>
      </section>

      {/* Plans Card Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Plan Découverte */}
          <Card className="border-slate-800/80 bg-slate-900/20 text-left flex flex-col justify-between">
            <CardContent className="pt-8 space-y-6 flex-1">
              <div className="space-y-2">
                <Badge variant="outline" className="border-slate-700 text-slate-400">Plan Découverte</Badge>
                <div className="text-3xl font-black text-white">Gratuit</div>
                <p className="text-[11px] text-slate-400">Pour tester les fonctionnalités d'EduFlex sans limite de temps.</p>
              </div>

              <ul className="space-y-3 text-[11px] text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Jusqu'à 2 cours en ligne</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Inscriptions d'élèves illimitées</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Support standard par e-mail</li>
                <li className="flex items-center gap-2 text-slate-500"><CheckCircle className="h-3.5 w-3.5 text-slate-700 shrink-0" /> Personnalisation de marque</li>
                <li className="flex items-center gap-2 text-slate-500"><CheckCircle className="h-3.5 w-3.5 text-slate-700 shrink-0" /> Nom de domaine propre</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full border-slate-800 text-slate-300 hover:bg-slate-900 h-10">
                <Link to="/register">Démarrer gratuitement</Link>
              </Button>
            </div>
          </Card>

          {/* Plan Pro */}
          <Card className="border-slate-850 bg-slate-900/40 text-left flex flex-col justify-between relative">
            <CardContent className="pt-8 space-y-6 flex-1">
              <div className="space-y-2">
                <Badge variant="outline" className="border-teal-500/20 text-teal-400 bg-teal-500/5">Plan Pro</Badge>
                <div className="text-3xl font-black text-white">
                  {currency === 'FCFA' ? '15 000 FCFA' : '25 €'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </div>
                <p className="text-[11px] text-slate-400">Parfait pour les formateurs, coachs et consultants indépendants.</p>
              </div>

              <ul className="space-y-3 text-[11px] text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> **Nombre de cours illimités**</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Sous-domaine personnalisé</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Logo & thème couleur modifiables</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Classes Jitsi live (50 part. max)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Mobile Money (Wave, Orange, MTN)</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full bg-slate-850 hover:bg-slate-800 text-white h-10 border border-slate-700">
                <Link to="/register" search={{ plan: 'Pro' }}>Choisir le plan Pro</Link>
              </Button>
            </div>
          </Card>

          {/* Plan Académie / B2B */}
          <Card className="border-teal-500/40 bg-teal-950/10 text-left flex flex-col justify-between relative shadow-lg shadow-teal-500/5">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-teal-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
              EduFlex+
            </div>
            <CardContent className="pt-8 space-y-6 flex-1">
              <div className="space-y-2">
                <Badge className="bg-teal-500/15 text-teal-400 border-teal-500/30">Académie B2B (Marque Blanche)</Badge>
                <div className="text-3xl font-black text-teal-400">
                  {currency === 'FCFA' ? '65 000 FCFA' : '99 €'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </div>
                <p className="text-[11px] text-slate-400">Conçu pour les écoles d'enseignement supérieur, lycées, et grands cabinets.</p>
              </div>

              <ul className="space-y-3 text-[11px] text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> **Marque blanche totale (100% neutre)**</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> **Propre nom de domaine** (ex: cours.ecole.com)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Jitsi Meet Live illimité</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Intégration de modules interactifs SCORM</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" /> Support technique dédié 24/7 (WhatsApp)</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-555 text-white font-bold h-10 border-none shadow-lg shadow-teal-500/20">
                <Link to="/register" search={{ plan: 'B2B' }}>Activer EduFlex+</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-white text-center">Comparatif complet des fonctionnalités</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase bg-slate-900/50">
                  <th className="px-6 py-4">Fonctionnalité</th>
                  <th className="px-6 py-4">Découverte</th>
                  <th className="px-6 py-4">Pro</th>
                  <th className="px-6 py-4 text-teal-400">EduFlex+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs">
                {featuresList.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">{f.name}</td>
                    <td className="px-6 py-4 text-slate-400">{f.free}</td>
                    <td className="px-6 py-4 text-slate-300">{f.pro}</td>
                    <td className="px-6 py-4 font-semibold text-teal-400">{f.b2b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <h2 className="text-2xl font-extrabold text-white text-center flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-teal-500" /> Questions Fréquentes sur les Abonnements
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 text-left">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Puis-je changer d'abonnement à tout moment ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Oui, tout à fait. Vous pouvez passer à un forfait supérieur ou résilier votre abonnement mensuel directement depuis vos réglages, sans engagement.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Comment récupérer l'argent des ventes de cours ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pour chaque vente effectuée via Mobile Money (Orange Money, Wave, MTN), l'argent est sécurisé sur notre passerelle puis reversé automatiquement sur votre compte Mobile Money ou compte bancaire.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} EduFlex. Tous droits réservés. Tarifs indicatifs.</p>
      </footer>
    </div>
  )
}
