import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, CardContent, Badge } from '@blinkdotnew/ui'
import {
  Sparkles,
  Building,
  GraduationCap,
  Users,
  Video,
  Paintbrush,
  Smartphone,
  DollarSign,
  CheckCircle,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

export const Route = createFileRoute('/eduflex-plus')({
  component: EduflexPlusPage,
})

function EduflexPlusPage() {
  const [currency, setCurrency] = useState<'FCFA' | 'EUR'>('FCFA')

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'FCFA' ? 'EUR' : 'FCFA'))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              EduFlex<span className="text-teal-400 font-extrabold text-xs bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">PLUS</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Retour au site
            </Link>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-500/20 border-none">
              <Link to="/register">Lancer mon académie</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.08),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full">
            ✨ Solution LMS Blanche pour Académies & Écoles
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Créez votre propre <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">académie de formation</span> en ligne
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            EduFlex+ offre aux établissements, universités, entreprises et formateurs d'Afrique de l'Ouest et Centrale la possibilité d'héberger leurs formations sous leur propre marque avec paiement Mobile Money intégré.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold h-12 shadow-lg shadow-teal-500/25 border-none">
              <Link to="/register">Commencer gratuitement</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-800 text-slate-300 hover:bg-slate-900 h-12">
              <a href="#tarifs">Voir la grille de prix</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-slate-900/60 border-y border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
          <span className="flex items-center gap-2 justify-center"><CheckCircle className="h-4 w-4 text-teal-500" /> Sous-domaine personnalisé</span>
          <span className="flex items-center gap-2 justify-center"><CheckCircle className="h-4 w-4 text-teal-500" /> Intégration Mobile Money</span>
          <span className="flex items-center gap-2 justify-center"><CheckCircle className="h-4 w-4 text-teal-500" /> Salles virtuelles interactives</span>
          <span className="flex items-center gap-2 justify-center"><CheckCircle className="h-4 w-4 text-teal-500" /> Support Dédié 24/7</span>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Une plateforme, des possibilités infinies</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Découvrez pourquoi les écoles leaders choisissent notre technologie.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <Paintbrush className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Branding & Marque Blanche</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configurez vos propres couleurs, logos, slogans et thème visuel. Vos élèves restent dans votre univers sans aucune mention d'EduFlex.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Classes Virtuelles Jitsi</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lancez des sessions interactives en direct d'un clic. Partage d'écran, chat en temps réel et tableau blanc collaboratif intégrés.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Moyens de paiement locaux</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vendez vos abonnements et cours en acceptant Wave, Orange Money, MTN, Moov et cartes bancaires avec virement automatique vers votre compte.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Faible consommation data</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Architecture de lecture optimisée pour les réseaux mobiles 3G/4G instables afin de garantir l'accessibilité à tous les apprenants.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Statistiques de présence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suivez la progression de vos élèves en temps réel, validez leur assiduité aux cours en direct et générez des rapports de présence automatiques.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/80 bg-slate-900/40 text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="h-10 w-10 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-lg">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Multi-tenancy complet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hébergez votre école sur votre propre adresse (ex: `cours.mon-ecole.com`) avec sécurité SSL automatique.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Target Audiences Grid */}
      <section className="bg-slate-900/40 border-y border-slate-900/80 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Conçu pour tous les besoins pédagogiques</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">Que vous soyez une grande école ou un formateur solo, EduFlex+ s'adapte à vous.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4 items-start p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">Écoles, Académies et Universités</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Digitalisez vos cursus académiques. Donnez à vos étudiants un portail d'étude moderne et interactif pour suivre les travaux dirigés, les live-classes et les évaluations à distance de manière rigoureuse.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">Cabinets de conseil & Entreprises</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Formez vos équipes internes ou délivrez des certifications professionnelles à vos clients sous votre propre identité d'entreprise. Idéal pour optimiser les budgets de formation continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="tarifs" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-6">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 font-semibold text-xs rounded-full">
            Tarifs Transparent
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Des abonnements simples, sans surprise</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Choisissez le plan adapté à la taille de votre académie.</p>
          
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${currency === 'FCFA' ? 'text-teal-400' : 'text-slate-400'}`}>FCFA (Afrique Centrale/Ouest)</span>
            <button onClick={toggleCurrency} className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-800 transition-colors focus:outline-none">
              <span className={`inline-block h-4 w-4 transform rounded-full bg-teal-500 transition-transform ${currency === 'EUR' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-xs font-semibold ${currency === 'EUR' ? 'text-teal-400' : 'text-slate-400'}`}>Euros (Europe/International)</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Plan Pro */}
          <Card className="border-slate-800 bg-slate-900/30 text-left">
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="border-slate-700 text-slate-300">Plan Académie Pro</Badge>
                <div className="text-3xl font-black text-white">
                  {currency === 'FCFA' ? '30 000 FCFA' : '45 €'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </div>
                <p className="text-xs text-slate-400">Idéal pour les formateurs indépendants et petites académies.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Formations et élèves illimités</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Nom de domaine en `.eduflex.com`</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Logo et couleurs personnalisés</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Jitsi Live (jusqu'à 50 participants)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Paiements Mobile Money configurés</li>
              </ul>

              <Button asChild className="w-full bg-slate-800 hover:bg-slate-700 text-white h-11">
                <Link to="/register">Démarrer le plan Pro</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Plan Entreprise/EduFlex+ */}
          <Card className="border-teal-500/40 bg-teal-950/10 text-left relative shadow-lg shadow-teal-500/5">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-teal-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
              Recommandé
            </div>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-2">
                <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20">Plan Académie B2B (EduFlex+)</Badge>
                <div className="text-3xl font-black text-teal-400">
                  {currency === 'FCFA' ? '65 000 FCFA' : '99 €'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </div>
                <p className="text-xs text-slate-400">Pour les grandes écoles et cabinets de formation à forte visibilité.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Tout ce qui est dans le plan Pro</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> **Propre nom de domaine** (ex: `cours.votre-ecole.com`)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Jitsi Live illimité avec support direct</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Intégration du standard de modules SCORM</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Panel d'administration multi-comptes</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" /> Support premium prioritaire 24/7</li>
              </ul>

              <Button asChild className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 border-none shadow-lg shadow-teal-500/20">
                <Link to="/register">Activer EduFlex+</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">Foire aux questions</h2>
        <div className="space-y-6">
          <div className="space-y-2 border-b border-slate-900 pb-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4 text-teal-500" /> Comment fonctionne la validation de mon académie ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Une fois inscrit en spécifiant les informations de votre académie, notre équipe vérifie et active votre accès sous 24h. Vous recevez un e-mail dès que la console d'enseignement et votre domaine sont configurés.
            </p>
          </div>

          <div className="space-y-2 border-b border-slate-900 pb-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4 text-teal-500" /> Puis-je utiliser mon propre nom de domaine ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Oui, avec l'offre EduFlex+, nous relions la plateforme à votre adresse personnalisée (ex: `ecole.votre-domaine.com`) avec certificat de sécurité HTTPS gratuit et automatique.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4 text-teal-500" /> Quels sont les moyens de paiement acceptés pour mes formations ?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vos élèves d'Afrique francophone peuvent s'inscrire en payant via Wave, Orange Money, MTN Mobile Money, Moov, ou par carte bancaire. Les fonds sont automatiquement centralisés et reversés sur votre compte.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} EduFlex. Tous droits réservés. Digitalisation des écoles d'Afrique.</p>
      </footer>
    </div>
  )
}
