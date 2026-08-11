import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast,
} from '@blinkdotnew/ui'
import {
  Sparkles,
  Play,
  Video,
  FileText,
  HelpCircle,
  Cpu,
  Coins,
  CheckCircle2,
  Copy,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Workflow,
  Target,
  X,
  Zap,
  Check
} from 'lucide-react'
import { useFlutterwave } from '@/hooks/useFlutterwave'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/assistants-ia')({
  component: AssistantsIaPage,
})

interface Assistant {
  id: number
  title: string
  description: string
  btnText: string
  category: 'General' | 'Copywriter'
  icon: React.ReactNode
  promptLabel: string
  placeholder: string
  sampleOutput: string
}

function AssistantsIaPage() {
  const { user } = useAuth()
  const { makePayment } = useFlutterwave()
  const [credits, setCredits] = useState(15) // 15 free initial credits
  const [activeTab, setActiveTab] = useState('general')
  
  // Interactive generation dialog state
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)
  const [inputPrompt, setInputPrompt] = useState('')
  const [audience, setAudience] = useState('debutant')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState('')

  // Buy Credits Modal state (Matching User Screenshot)
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false)

  const assistants: Assistant[] = [
    {
      id: 1,
      title: "Générer une structure de formation",
      description: "Votre assistant structure pédagogique crée pour vous le plan complet de votre formation, avec chapitres et leçons adaptés à votre contenu pédagogique.",
      btnText: "Créer une structure",
      category: "General",
      promptLabel: "Quel est le sujet de votre formation ?",
      placeholder: "Ex: Développement Web avec React, Boulangerie Traditionnelle...",
      sampleOutput: `### Structure de Formation Pédagogique

**Module 1 : Les Fondations & Introduction**
- Leçon 1.1 : Bienvenue & Configuration de l'environnement de travail
- Leçon 1.2 : Comprendre les principes fondamentaux et l'architecture clé
- Leçon 1.3 : Quiz d'évaluation de départ

**Module 2 : Maîtrise des Concepts Avancés**
- Leçon 2.1 : Manipulation pratique et cas réels d'utilisation
- Leçon 2.2 : Structurer ses modules de données efficacement
- Leçon 2.3 : Exercice pratique de synthèse

**Module 3 : Finalisation & Déploiement**
- Leçon 3.1 : Optimisations de performance et bonnes pratiques
- Leçon 3.2 : Examen final de validation des acquis`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 18v10M20 38h24M20 28h24" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="18" r="3" fill="#0d9488" />
          <circle cx="20" cy="28" r="3" fill="#0d9488" />
          <circle cx="44" cy="28" r="3" fill="#0d9488" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Générer du contenu de formation",
      description: "Votre assistant rédaction pédagogique transforme vos notes ou idées en leçons claires, structurées et prêtes à être utilisées, pour vous faire gagner un temps précieux.",
      btnText: "Générer le contenu",
      category: "General",
      promptLabel: "Quel est le sujet de la leçon et quels points aborder ?",
      placeholder: "Ex: Comment créer des variables en Python (déclarations, types primitifs)...",
      sampleOutput: `### Contenu de Leçon : Introduction pratique

**Introduction**
Dans cette leçon, nous allons explorer en détail le fonctionnement et les concepts clés liés à notre sujet. L'objectif est de vous donner une autonomie complète.

**1. Le Concept Fondamental**
Le mécanisme principal repose sur l'interaction entre les différentes variables. Il est essentiel de comprendre comment initialiser et structurer chaque élément.

**2. Exemple Pratique d'application**
Voici un bloc type pour illustrer le comportement attendu :
\`\`\`javascript
// Initialisation de la ressource
const ressource = initAction();
console.log("Statut de la ressource:", ressource.status);
\`\`\`

**Exercice de Validation**
Essayez par vous-même d'écrire un exemple similaire et exécutez-le dans votre terminal.`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 20h20v24H22V20z" stroke="#0d9488" strokeWidth="2" />
          <path d="M26 26h12M26 32h12M26 38h6" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Générer des idées de titres",
      description: "Votre assistant Copywriter IA vous propose des titres percutants et optimisés pour votre formation afin d'attirer plus d'apprenants.",
      btnText: "Générer des titres",
      category: "Copywriter",
      promptLabel: "Quel est le thème principal de votre formation ?",
      placeholder: "Ex: Perdre du poids, Apprendre la guitare...",
      sampleOutput: `### Idées de Titres Percutants (Copywriting)

1. **La Méthode Accélérée** : Maîtrisez [Thème] en moins de 30 jours
2. **De Zéro à Pro** : Le Guide Complet et Pratique du [Thème]
3. **Le Secret des Experts** : Comment dominer [Thème] sans faire d'erreurs
4. **La Révolution [Thème]** : Transformez vos compétences et boostez vos résultats
5. **Formation Pratique** : Dompter [Thème] de A à Z par la pratique`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M32 18l4 9 10 1.5-7 7 2 10.5-9-5-9 5 2-10.5-7-7 10-1.5z" stroke="#0d9488" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Générer une proposition de valeur",
      description: "Votre assistant Copywriter IA vous aide à formuler une proposition de valeur claire, différenciante et convaincante, qui met en avant les bénéfices clés de votre offre.",
      btnText: "Créer ma proposition",
      category: "Copywriter",
      promptLabel: "Quel est le produit ou service et à qui s'adresse-t-il ?",
      placeholder: "Ex: Une formation sur le SEO pour les créateurs de blogs...",
      sampleOutput: `### Proposition de Valeur Unique (UVP)

**Accroche Principale :**
"Positionnez votre site web en première page de Google sans dépenser un centime en publicité payante."

**Les 3 Piliers de Valeur :**
1. **Économie de budget** : Dites adieu aux coûts d'acquisition Google/Facebook Ads.
2. **Autonomie complète** : Apprenez à faire vos audits et rédactions SEO vous-même.
3. **Résultats durables** : Générez des visites qualifiées passives et automatiques 24h/24.`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <circle cx="32" cy="32" r="12" stroke="#0d9488" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="4" fill="#0d9488" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Générer un plan de page de vente",
      description: "Votre assistant Copywriter IA structure pour vous une page complète avec tous les éléments essentiels, pour maximiser vos conversions.",
      btnText: "Créer le plan",
      category: "Copywriter",
      promptLabel: "Quelle formation vendez-vous et à quel tarif ?",
      placeholder: "Ex: Formation Excel Avancé à 299 €...",
      sampleOutput: `### Plan de Page de Vente Recommandé

- **Section 1 : Hook d'accroche** (La promesse de gain de temps sur Excel)
- **Section 2 : Le problème** (Les heures perdues sur des tableaux manuels)
- **Section 3 : Présentation** (La solution Excel Automatisé de A à Z)
- **Section 4 : Table des matières** (Détail des chapitres et leçons)
- **Section 5 : Bonus** (Modèles de tableaux financiers prêts à l'emploi)
- **Section 6 : Appel à l'action principal** (Formulaires de paiements et devises)`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M22 22h20v20H22V22z" stroke="#0d9488" strokeWidth="2.5" />
          <path d="M28 30h8M28 34h8M28 26h4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Générer une page de vente complète",
      description: "Votre assistant Copywriter IA rédige pour vous l'intégralité du texte de votre page de vente, prête à être personnalisée selon votre ton et votre cible.",
      btnText: "Générer la page",
      category: "Copywriter",
      promptLabel: "Décrivez l'offre de votre formation en quelques phrases :",
      placeholder: "Ex: Formation prise de parole en public pour timides...",
      sampleOutput: `### Page de Vente Rédigée par l'IA

#### Titre : Vainquez votre timidité et captivez votre auditoire en 10 jours.

**Le constat est simple :**
80% des personnes ressentent une angoisse paralysante à l'idée de parler en public. Pourtant, savoir exprimer ses idées est la compétence n°1 pour progresser professionnellement.

**La Solution :**
Découvrez notre méthode progressive conçue spécialement pour les introvertis. Pas de théorie complexe, uniquement des exercices pratiques à faire de chez soi.

👉 **Inscrivez-vous maintenant et bénéficiez de 50% de réduction immédiate.**`,
      icon: (
        <svg className="w-10 h-10 text-teal-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#134e4a" fillOpacity="0.2" />
          <path d="M24 24h16v16H24V24z" stroke="#0d9488" strokeWidth="2" />
          <path d="M24 28l8 6 8-6" stroke="#0d9488" strokeWidth="2" />
          <circle cx="42" cy="22" r="4" fill="#10b981" />
        </svg>
      )
    }
  ]

  const filtered = assistants.filter(a => {
    if (activeTab === 'general') return a.category === 'General'
    if (activeTab === 'copywriter') return a.category === 'Copywriter'
    return true
  })

  // Start Generation logic
  const handleStartGeneration = (assistant: Assistant) => {
    if (credits <= 0) {
      toast.error("Vous n'avez plus de crédits IA. Veuillez en recharger.")
      setBuyCreditsModalOpen(true)
      return
    }
    setSelectedAssistant(assistant)
    setInputPrompt('')
    setGeneratedResult('')
  }

  const handleGenerate = () => {
    if (!inputPrompt.trim()) {
      toast.error("Veuillez remplir le champ de saisie.")
      return
    }
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedResult(selectedAssistant?.sampleOutput || '')
      setCredits(prev => Math.max(0, prev - 1))
      toast.success("Génération IA complétée avec succès ! (1 crédit débité)")
    }, 2800)
  }

  const handleBuyPack = async (packCredits: number, priceEur: number) => {
    const priceFcfa = Math.round(priceEur * 655.957)
    try {
      await makePayment({
        amount: priceFcfa,
        currency: 'XOF',
        courseTitle: `Pack IA EduFlex ${packCredits} Crédits`,
        userEmail: user?.email || 'formateur@eduflex.com',
        userName: user?.displayName || 'Formateur',
      })
      setCredits(prev => prev + packCredits)
      setBuyCreditsModalOpen(false)
      toast.success(`${packCredits} Crédits IA ajoutés à votre compte !`)
    } catch (err: any) {
      toast.error(err.message || "Achat annulé.")
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500/20 selection:text-teal-900">
      
      {/* Upgrade banner */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-sm gap-4">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
          </span>
          <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 scale-98 hover:scale-100 shrink-0">
            <Link to="/tarifs">
              Débloquer 🫱
            </Link>
          </Button>
        </div>
      </div>

      {/* Main title & credits block */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="space-y-3 max-w-2xl text-left">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Bonjour {user?.displayName?.split(' ')[0] || 'Ghislain'} !
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Voici vos assistants IA pour créer et diffuser plus vite, plus simplement et avec plus d'impact vos formations en ligne ! Retrouvez les assistants d'aide à la création (structure, contenus) directement dans le menu de création de vos formations.
          </p>
        </div>

        {/* Remaining Credits Card */}
        <Card className="w-full md:w-72 border border-teal-500/20 bg-teal-950/10 dark:bg-teal-950/20 shadow-md rounded-xl overflow-hidden shrink-0 text-left">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">Crédits restants</span>
              <span className="text-4xl font-black text-teal-600 dark:text-teal-400 font-mono block">{credits}</span>
            </div>
            <Button 
              onClick={() => setBuyCreditsModalOpen(true)}
              className="w-full bg-white dark:bg-slate-900 hover:bg-slate-100 text-teal-700 dark:text-teal-400 border border-teal-500/30 text-xs font-bold py-1.5 h-8.5 rounded-lg transition-all"
            >
              Acheter des crédits
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* MODAL: ASSISTANTS IA PRICING PACKS (Matching User Screenshot) */}
      {buyCreditsModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#061d1d]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-[#061d1d] border border-teal-900/60 rounded-3xl p-6 sm:p-10 text-center space-y-8 relative animate-in fade-in zoom-in-95 my-8">
            
            <button 
              onClick={() => setBuyCreditsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-teal-950/60 p-2 rounded-full border border-teal-900/60"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Travaillez plus vite (et plus sereinement) grâce aux assistants IA EduFlex
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Générez et améliorez des contenus de formation, des pages de vente et bien plus encore <strong>en quelques clics</strong>.
              </p>
              <p className="text-xs text-slate-400">
                Nos outils IA vous accompagnent au quotidien pour <strong>gagner un temps précieux</strong> et créer des formations engageantes... et rentables.
              </p>
            </div>

            {/* 3 Credit Packs Grid (Matching Screenshot) */}
            <div className="grid gap-6 md:grid-cols-3 text-left pt-4">
              
              {/* Pack 1: 100 crédits */}
              <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-900 space-y-5 border border-slate-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">100 crédits</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">12€</span>
                      <span className="text-xs font-bold text-slate-500"> (~ 7 800 FCFA)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Un seul paiement. Tarifs TTC.</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Idéal pour découvrir nos assistants IA et faire vos premiers tests en toute simplicité.
                  </p>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Accédez à tous les outils :</span>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      <li className="flex items-start gap-1.5">• <span>Page de vente (rédaction complète)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Structure pédagogique</span></li>
                      <li className="flex items-start gap-1.5">• <span>Contenus pédagogiques (générer des leçons multi-média)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Titres & accroches</span></li>
                      <li className="flex items-start gap-1.5">• <span>Descriptions optimisées</span></li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-2">
                    <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span>Résultats en moins de 5 minutes</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleBuyPack(100, 12)}
                  variant="outline"
                  className="w-full mt-4 border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs h-10 rounded-xl"
                >
                  Acheter 100 crédits
                </Button>
              </div>

              {/* Pack 2: 200 crédits + 50 offerts [Le + populaire] */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl text-slate-900 space-y-5 border-2 border-teal-400 relative flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                  Le + populaire
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">200 crédits <span className="text-teal-600 text-xs font-bold">+ 50 offerts</span></h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">24€</span>
                      <span className="text-xs font-bold text-slate-500"> (~ 15 700 FCFA)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Un seul paiement. Tarifs TTC.</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Le choix parfait pour reprendre et améliorer les contenus (vente & pédagogie) de vos formations en ligne.
                  </p>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Accédez à tous les outils :</span>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      <li className="flex items-start gap-1.5">• <span>Page de vente (rédaction complète)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Structure pédagogique</span></li>
                      <li className="flex items-start gap-1.5">• <span>Contenus pédagogiques (générer des leçons multi-média)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Titres & accroches</span></li>
                      <li className="flex items-start gap-1.5">• <span>Descriptions optimisées</span></li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-2">
                    <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span>Résultats en moins de 5 minutes</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleBuyPack(250, 24)}
                  className="w-full mt-4 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs h-10 rounded-xl shadow-lg border-none"
                >
                  Acheter 200 crédits
                </Button>
              </div>

              {/* Pack 3: 500 crédits + 100 offerts */}
              <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-900 space-y-5 border border-slate-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">500 crédits <span className="text-teal-600 text-xs font-bold">+ 100 offerts</span></h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">60€</span>
                      <span className="text-xs font-bold text-slate-500"> (~ 39 300 FCFA)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Un seul paiement. Tarifs TTC.</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pour les formateurs ambitieux qui veulent s'appuyer sur nos assistants IA pour développer leur activité, créer de nouvelles formations et itérer en toute liberté.
                  </p>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Accédez à tous les outils :</span>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      <li className="flex items-start gap-1.5">• <span>Page de vente (rédaction complète)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Structure pédagogique</span></li>
                      <li className="flex items-start gap-1.5">• <span>Contenus pédagogiques (générer des leçons multi-média)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Titres & accroches</span></li>
                      <li className="flex items-start gap-1.5">• <span>Descriptions optimisées</span></li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-2">
                    <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span>Résultats en moins de 5 minutes</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleBuyPack(600, 60)}
                  variant="outline"
                  className="w-full mt-4 border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs h-10 rounded-xl"
                >
                  Acheter 500 crédits
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Interactive generative modal dialog panel */}
      {selectedAssistant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden text-left animate-in fade-in zoom-in duration-200">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-teal-500 animate-pulse" />
                {selectedAssistant.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {selectedAssistant.promptLabel}
                </label>
                <Input
                  value={inputPrompt}
                  onChange={e => setInputPrompt(e.target.value)}
                  placeholder={selectedAssistant.placeholder}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-xs"
                />
              </div>

              {selectedAssistant.category === 'General' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Niveau ciblé pour les apprenants</label>
                  <select 
                    value={audience} 
                    onChange={e => setAudience(e.target.value)}
                    className="w-full h-9 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs px-2.5 outline-none"
                  >
                    <option value="debutant">Débutant / Fondations</option>
                    <option value="intermediaire">Intermédiaire / Pratique</option>
                    <option value="avance">Avancé / Expert</option>
                  </select>
                </div>
              )}

              {/* Action trigger button */}
              <div className="pt-2">
                <Button
                  disabled={isGenerating || !inputPrompt.trim()}
                  onClick={handleGenerate}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold h-10 border-none shadow-md"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Cpu className="h-4.5 w-4.5 animate-spin" /> Génération IA en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      Débuter la génération <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Generative Result block */}
              {generatedResult && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Résultat de la génération</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedResult)
                        toast.success("Résultat copié !")
                      }}
                      className="text-teal-500 hover:text-teal-400 flex items-center gap-1 hover:underline"
                    >
                      <Copy className="h-3 w-3" /> Copier
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-[10px] text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto select-all">
                    {generatedResult}
                  </pre>
                </div>
              )}
            </CardContent>

            {/* Modal close footer */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="h-8.5 text-xs font-bold border-border text-slate-400"
                onClick={() => setSelectedAssistant(null)}
              >
                Fermer
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Tabs navigation list */}
      <section className="max-w-7xl mx-auto px-6">
        <Tabs defaultValue="general" className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <TabsList className="bg-slate-100 dark:bg-slate-900 border-none p-1 max-w-md grid grid-cols-3 rounded-lg">
              <TabsTrigger 
                value="general" 
                onClick={() => setActiveTab('general')}
                className="text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Général
              </TabsTrigger>
              <TabsTrigger 
                value="copywriter" 
                onClick={() => setActiveTab('copywriter')}
                className="text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Copywriter IA
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                onClick={() => setActiveTab('history')}
                className="text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Historique du Copywriter
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Subtitle intro text (General / Copywriter specific) */}
          <div className="text-left py-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
              {activeTab === 'general' ? (
                "Découvrez vos assistants pédagogiques IA, conçus spécialement pour la formation en ligne : ils vous accompagnent pour structurer, rédiger et enrichir vos formations en quelques clics !"
              ) : activeTab === 'copywriter' ? (
                "Boostez l'attractivité de vos cours et vos conversions avec nos assistants d'écriture persuasive (copywriting) conçus pour rédiger des pages de vente percutantes."
              ) : (
                "Consultez l'historique complet de vos générations de textes et plans de pages de vente rédigées par l'assistant IA."
              )}
            </p>
          </div>

          {/* GENERAL & COPYWRITER TABS */}
          <TabsContent value="general" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
              {filtered.map(assistant => (
                <Card 
                  key={assistant.id}
                  className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/35 hover:shadow-md hover:border-teal-500/20 dark:hover:border-teal-500/20 transition-all rounded-2xl overflow-hidden flex flex-col justify-between text-left p-6 space-y-4"
                >
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0">
                      {assistant.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{assistant.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{assistant.description}</p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <button 
                      onClick={() => {
                        toast.info("Vidéo démonstration de l'assistant IA en cours de préparation.")
                      }}
                      className="text-[11px] font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1.5"
                    >
                      <Play className="h-3 w-3 fill-current text-slate-500" /> Démo
                    </button>
                    <Button
                      onClick={() => handleStartGeneration(assistant)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-8 text-[11px] px-3.5 rounded-lg shadow-sm flex items-center gap-1"
                    >
                      {assistant.btnText} <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="copywriter" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
              {filtered.map(assistant => (
                <Card 
                  key={assistant.id}
                  className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/35 hover:shadow-md hover:border-teal-500/20 dark:hover:border-teal-500/20 transition-all rounded-2xl overflow-hidden flex flex-col justify-between text-left p-6 space-y-4"
                >
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0">
                      {assistant.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{assistant.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{assistant.description}</p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <button 
                      onClick={() => {
                        toast.info("Vidéo démonstration de l'assistant IA en cours de préparation.")
                      }}
                      className="text-[11px] font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1.5"
                    >
                      <Play className="h-3 w-3 fill-current text-slate-500" /> Démo
                    </button>
                    <Button
                      onClick={() => handleStartGeneration(assistant)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-8 text-[11px] px-3.5 rounded-lg shadow-sm flex items-center gap-1"
                    >
                      {assistant.btnText} <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: History */}
          <TabsContent value="history" className="mt-0">
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-left">
              <CardContent className="p-8 text-center text-xs text-slate-400 italic space-y-1">
                <p>Aucun historique de copywriting disponible.</p>
                <p className="text-[10px] text-slate-500">Vos générations d'argumentaires et structures s'afficheront ici au fur et à mesure.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

    </div>
  )
}
