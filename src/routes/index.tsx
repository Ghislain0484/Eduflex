import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, CardContent, Skeleton, Badge } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useCourses } from '@/hooks/useCourses'
import { useState, useEffect } from 'react'
import heroMasterImg from '@/assets/eduflex-hero-master.jpg'
import {
  Sparkles,
  Monitor,
  RefreshCw,
  Shield,
  Zap,
  ArrowRight,
  BookOpen,
  Users,
  BarChart3,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  Play,
  Heart,
  TrendingUp,
  UserCheck,
  Building2,
  Award,
  Smartphone,
  Check,
  Globe,
  Quote,
  CheckCircle2,
  Briefcase,
  Layers,
  FileCheck
} from 'lucide-react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'EduFlex — Plateforme LMS B2B & Formation d\'Entreprise' },
      { name: 'description', content: 'Formez vos équipes aux compétences de demain en toute flexibilité. Solution EdTech B2B d\'upskilling, suivi RH et certification.' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { data: courses, isLoading: coursesLoading } = useCourses()
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)
  const [priceCurrency, setPriceCurrency] = useState<'CFA' | 'EUR'>('CFA')
  const [platformName, setPlatformName] = useState('EduFlex')
  const [servicesSubTab, setServicesSubTab] = useState<'solutions' | 'features' | 'sectors'>('solutions')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const globalConfig = localStorage.getItem('global_platform_config')
      if (globalConfig) {
        try {
          const parsed = JSON.parse(globalConfig)
          if (parsed.name) setPlatformName(parsed.name)
        } catch {}
      }
    }
  }, [])

  const publishedCourses = (courses || [])
    .filter(c => c.status === 'publie')
    .slice(0, 3)

  const faqs = [
    {
      q: "Comment fonctionne l'intégration B2B pour les entreprises ?",
      a: "EduFlex s'intègre facilement à votre système d'information. Vous pouvez créer un espace dédié à votre entreprise avec nom de domaine propre, gérer les accès de vos collaborateurs et suivre les progrès en temps réel."
    },
    {
      q: "Quelles sont les méthodes de paiement acceptées ?",
      a: "Nous prenons en charge la facturation d'entreprise en FCFA (XOF/XAF) et Euros (€) via virement bancaire, carte et Mobile Money (Orange Money, Wave, MTN, Moov) pour s'adapter aux réalités régionales."
    },
    {
      q: "Les certificats délivrés sont-ils conformes aux exigences RH ?",
      a: "Oui ! Chaque certificat généré par EduFlex comporte un identifiant unique et un QR Code de vérification. Il atteste des compétences acquises et des heures d'apprentissage suivies."
    },
    {
      q: "Puis-je adapter la plateforme à l'identité visuelle de mon entreprise ?",
      a: "Absolument. Avec le forfait Académie B2B (EduFlex+), bénéficiez de la marque blanche 100% neutre avec votre logo, vos couleurs d'entreprise et votre nom de domaine personnalisé."
    }
  ]

  if (!isLoading && isAuthenticated) {
    return <DashboardRedirect />
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[#051717] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Navigation Header (Teachizy B2B SaaS Style) */}
      <header className="sticky top-0 z-50 bg-[#061d1d]/90 backdrop-blur-md border-b border-teal-950/60 shadow-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-950/50">
              <BookOpen className="h-5.5 w-5.5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white uppercase">
              {platformName}<span className="text-teal-400">.</span>
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown (2-Level Megamenu) */}
            <div className="relative group" onMouseLeave={() => setServicesSubTab('solutions')}>
              <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2">
                Services & Solutions <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-400" />
              </button>
              
              {/* Mega Dropdown Panel */}
              <div className="absolute top-full left-0 mt-1 w-[560px] rounded-2xl border border-teal-900/60 bg-[#072424] p-0 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden flex text-left">
                
                {/* Left Category Selector Panel */}
                <div className="w-[190px] bg-[#051a1a] border-r border-teal-950/60 p-2 space-y-1 shrink-0">
                  <button
                    onMouseEnter={() => setServicesSubTab('solutions')}
                    onClick={() => setServicesSubTab('solutions')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === 'solutions' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-300 hover:bg-teal-900/40 hover:text-teal-300'}`}
                  >
                    <span>Solutions B2B</span>
                    <span className="text-[10px]">▶</span>
                  </button>

                  <button
                    onMouseEnter={() => setServicesSubTab('features')}
                    onClick={() => setServicesSubTab('features')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === 'features' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-300 hover:bg-teal-900/40 hover:text-teal-300'}`}
                  >
                    <span>Fonctionnalités</span>
                    <span className="text-[10px]">▶</span>
                  </button>

                  <button
                    onMouseEnter={() => setServicesSubTab('sectors')}
                    onClick={() => setServicesSubTab('sectors')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${servicesSubTab === 'sectors' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-300 hover:bg-teal-900/40 hover:text-teal-300'}`}
                  >
                    <span>Secteurs & Métiers</span>
                    <span className="text-[10px]">▶</span>
                  </button>
                </div>

                {/* Right Items Panel */}
                <div className="flex-1 p-5 bg-[#072424]">
                  {servicesSubTab === 'solutions' && (
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Solutions EduFlex B2B</h4>
                      <ul className="space-y-2 text-xs text-slate-200 font-medium">
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Digitalisation de Plan de Formation RH</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Portail Académie d'Entreprise & Client</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Onboarding & Recyclage des compétences</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Gestion des Habilitations & Certificats</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Suivi & Reporting d'Assiduité RH</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 block transition-colors">Classes Virtuelles EduFlex Meet</Link></li>
                      </ul>
                    </div>
                  )}

                  {servicesSubTab === 'features' && (
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Fonctionnalités Incluses</h4>
                      <ul className="space-y-2 text-xs text-slate-200 font-medium">
                        <li><Link to="/courses" className="hover:text-teal-400 block transition-colors">Plateforme LMS Multi-Appareils</Link></li>
                        <li><Link to="/assistants-ia" className="hover:text-teal-400 block transition-colors">Assistants IA de Génération de Cours</Link></li>
                        <li><Link to="/classes-virtuelles" className="hover:text-teal-400 block transition-colors">Visioconférences & Directs sécurisés</Link></li>
                        <li><Link to="/outils-marketing" className="hover:text-teal-400 block transition-colors">Autorépondeurs & Intégrations RH</Link></li>
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Marque blanche & Domaines Propres</Link></li>
                      </ul>
                    </div>
                  )}

                  {servicesSubTab === 'sectors' && (
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Secteurs Accompagnés</h4>
                      <ul className="space-y-2 text-xs text-slate-200 font-medium">
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Directeurs & Responsables RH</Link></li>
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Centres de Formation & Académies</Link></li>
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Banques, Assurances & Telcos</Link></li>
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Mines, Industrie & BTP</Link></li>
                        <li><Link to="/eduflex-plus" className="hover:text-teal-400 block transition-colors">Écoles & Établissements Supérieurs</Link></li>
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>

            <Link to="/eduflex-plus" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors">
              EduFlex+ Entreprises
            </Link>

            <Link to="/tarifs" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors">
              Tarifs
            </Link>

            <Link to="/courses" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors">
              Catalogue de Cours
            </Link>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-xs font-bold text-slate-200 hover:text-white hover:bg-teal-950/40">
              <Link to="/login">Connexion</Link>
            </Button>

            <Button asChild className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-lg shadow-teal-950/50 border-none transition-transform hover:scale-[1.02]">
              <Link to="/register">Démo Entreprise</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* SECTION 1: HERO (B2B SaaS Orienté Métier avec Filigrane Master) */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-teal-950/40 bg-[#041212]">
        
        {/* Full-width Master Background Image Watermark */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter contrast-125 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${heroMasterImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061d1d]/85 via-[#051717]/95 to-[#041212] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: B2B Copywriting */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-extrabold text-teal-300 shadow-sm backdrop-blur-md">
              <Building2 className="h-3.5 w-3.5 text-teal-400" />
              <span>SOLUTION EDTECH B2B & ENTERPRISE UPSKILLING</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Formez vos équipes aux <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">compétences de demain</span>, en toute flexibilité.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Accélérez la montée en compétences de vos collaborateurs, automatisez le suivi RH et certifiez les acquis de votre entreprise avec EduFlex — la plateforme LMS B2B ultra-flexible et adaptée aux enjeux régionaux.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm h-12 px-8 rounded-xl shadow-xl shadow-teal-500/20 border-none transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                <Link to="/register">
                  Lancer une démo entreprise <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-teal-900/80 bg-teal-950/40 backdrop-blur-md text-slate-200 hover:bg-teal-900/60 hover:text-white text-sm h-12 px-6 rounded-xl flex items-center justify-center gap-2">
                <Link to="/courses">
                  <Globe className="h-4 w-4 text-teal-400" /> Découvrir l'Espace Apprenant
                </Link>
              </Button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-6 border-t border-teal-950/60 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>98% Taux de satisfaction RH</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>+15 000 Employés formés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Paiements FCFA & EUR</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Master Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-teal-500/40 shadow-2xl shadow-teal-950/90 bg-slate-900 group">
              <img 
                src={heroMasterImg} 
                alt="Un formateur expert présentant une visioconférence EduFlex Meet avec interfaces interactives et participants"
                className="w-full h-[420px] sm:h-[490px] object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051717] via-transparent to-transparent opacity-80" />
              
              {/* Live KPI Overlay Card (Bottom Left) */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-teal-500/40 p-4 rounded-2xl shadow-xl flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Direct & Visioconférence EduFlex</p>
                    <p className="text-[11px] text-teal-300 font-semibold">+84% de compétences certifiées</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px] font-bold">En direct</Badge>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: SOCIAL PROOF (Logos Sociaux B2B) */}
      <section className="py-12 border-b border-teal-950/40 bg-[#041414]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Ils font confiance à EduFlex pour le développement de leurs talents
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider">
              <Building2 className="h-5 w-5 text-teal-400" /> TOTALENERGIES B2B
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider">
              <Globe className="h-5 w-5 text-teal-400" /> ORANGE BUSINESS
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider">
              <Briefcase className="h-5 w-5 text-teal-400" /> BANK OF AFRICA
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider">
              <Layers className="h-5 w-5 text-teal-400" /> SODECI GROUPE
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-300 tracking-wider">
              <Users className="h-5 w-5 text-teal-400" /> MTN ENTERPRISE
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES (3 Colonnes Orientées Métier avec Visuals) */}
      <section className="py-24 border-b border-teal-950/40 bg-gradient-to-b from-[#051717] to-[#041212]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/10 px-3.5 py-1 text-xs font-bold rounded-full">
              EXPÉRIENCE ENTREPRISE SUR-MESURE
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Tout ce dont les RH et Managers ont besoin
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Conçu pour simplifier la gestion des formations d'entreprise et maximiser l'engagement des collaborateurs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            {/* Feature 1: Parcours sur-mesure */}
            <Card className="border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white">Parcours sur-mesure & Adaptive Learning</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Concevez des parcours de formation personnalisés adaptés aux besoins réels de chaque poste. L'IA EduFlex ajuste le rythme d'apprentissage pour maximiser la rétention et l'efficacité métier.
                  </p>
                </div>
              </div>

              {/* Visual Mockup for Feature 1 */}
              <div className="rounded-2xl border border-teal-950 bg-slate-950 p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                  <span>Compétences Validées</span>
                  <span className="text-teal-400">88%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full w-[88%]" />
                </div>
                <p className="text-[10px] text-slate-500 italic">Tableau de bord de suivi de progression RH EduFlex</p>
              </div>
            </Card>

            {/* Feature 2: Micro-learning Mobile & Terrain */}
            <Card className="border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white">Apprentissage micro-learning & Terrain</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Permettez à vos employés sur le terrain et en déplacement d'accéder à des leçons courtes de 5 à 10 minutes sur smartphone, optimisées pour la faible consommation de données mobiles.
                  </p>
                </div>
              </div>

              {/* Visual Mockup Image for Feature 2 */}
              <div className="rounded-2xl overflow-hidden border border-teal-900/40 shadow-md h-36 relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  onError={(e) => { 
                    e.currentTarget.onerror = null
                    e.currentTarget.src = '/images/feature-mobile.png' 
                  }}
                  alt="Un ingénieur/technicien africain consultant un cours micro-learning sur son smartphone pendant une pause"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/90 text-teal-300 text-[10px] font-bold px-2 py-1 rounded">
                  Format Mobile 3G/4G
                </div>
              </div>
            </Card>

            {/* Feature 3: Suivi & Certification Digitales */}
            <Card className="border border-teal-900/60 bg-[#062020]/60 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white">Suivi RH & Certifications Digitales</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Téléchargez automatiquement des rapports d'assiduité conformes et délivrez des certificats digitaux vérifiables à vos collaborateurs dès la réussite de leurs évaluations.
                  </p>
                </div>
              </div>

              {/* Visual Mockup for Feature 3 */}
              <div className="rounded-2xl border border-teal-500/30 bg-teal-950/40 p-4 space-y-2 text-center">
                <FileCheck className="h-7 w-7 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">Certificat Qualiopi / RH HD</p>
                <p className="text-[10px] text-teal-300">Vérification QR Code sécurisée</p>
              </div>
            </Card>

          </div>

        </div>
      </section>

      {/* SECTION 4: TÉMOIGNAGE CLIENT (Client Case Study RH) */}
      <section className="py-24 border-b border-teal-950/40 bg-[#061e1e]">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="border border-teal-500/30 bg-gradient-to-r from-[#072424] via-[#051c1c] to-[#072424] rounded-3xl p-8 sm:p-12 shadow-2xl text-left">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Portrait */}
              <div className="md:col-span-4 shrink-0">
                <div className="relative rounded-2xl overflow-hidden border-2 border-teal-400 shadow-xl max-w-xs mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" 
                    onError={(e) => { 
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/images/testimonial-drh.png' 
                    }}
                    alt="Portrait professionnel de Marie-Laure Ehouman, Directrice des Ressources Humaines"
                    className="w-full h-72 object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-sm p-2 rounded-xl text-center">
                    <p className="text-xs font-bold text-white">Marie-Laure Ehouman</p>
                    <p className="text-[10px] text-teal-400 font-semibold">DRH Groupe Distribution</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote text */}
              <div className="md:col-span-8 space-y-6">
                <Quote className="h-10 w-10 text-teal-500/40" />

                <blockquote className="text-base sm:text-xl font-bold text-white leading-relaxed italic">
                  "Grâce à EduFlex, nous avons digitalisé l'onboarding et le recyclage des compétences de plus de 450 collaborateurs répartis sur 8 filiales. Le suivi en temps réel et la conformité des certificats nous ont permis d'économiser 40% sur notre budget de formation annuelle."
                </blockquote>

                <div className="pt-4 border-t border-teal-950/80 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <strong className="text-white block">Marie-Laure Ehouman</strong>
                    <span>Directrice des Ressources Humaines</span>
                  </div>

                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px] font-bold">
                    +450 Collaborateurs formés
                  </Badge>
                </div>
              </div>

            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 5: TARIFS HARMONISÉS */}
      <section id="tarifs" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/10 px-3.5 py-1 text-xs font-bold rounded-full">
            TARIFS TRANSPARENTS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Découvrez nos tarifs transparents</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros.
          </p>
          
          {/* Currency Selector Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${priceCurrency === 'CFA' ? 'text-white' : 'text-slate-500'}`}>Francs CFA (XOF/XAF)</span>
            <button 
              onClick={() => setPriceCurrency(priceCurrency === 'CFA' ? 'EUR' : 'CFA')}
              className="w-12 h-6.5 rounded-full bg-teal-900/40 p-1 flex items-center transition-colors relative"
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-teal-400 transition-all ${priceCurrency === 'EUR' ? 'translate-x-5.5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-semibold ${priceCurrency === 'EUR' ? 'text-white' : 'text-slate-500'}`}>Euros (€)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
          
          {/* Plan 1: Découverte */}
          <Card className="border-teal-950 flex flex-col justify-between hover:border-teal-900/40 transition-all relative overflow-hidden bg-[#061e1e]">
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Découverte</h3>
                <p className="text-xs text-slate-400 mt-1">Pour lancer votre premier produit et tester l'écosystème.</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl md:text-4xl font-extrabold text-white">
                  {priceCurrency === 'CFA' ? '0 CFA' : '0 €'}
                </span>
                <span className="text-xs text-slate-400 font-semibold"> / mois</span>
                <p className="text-[10px] text-teal-400 font-bold mt-1">Gratuit à vie · Sans engagement</p>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-teal-950">
                <li className="flex items-center gap-2">✓ 1 formation active</li>
                <li className="flex items-center gap-2">✓ 50 apprenants enregistrés</li>
                <li className="flex items-center gap-2">✓ Quiz et certificats basiques</li>
                <li className="flex items-center gap-2 text-teal-400 font-bold">✓ Frais de transaction : 5%</li>
                <li className="flex items-center gap-2 text-slate-500">✕ Pas de visioconférence Live</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button asChild variant="outline" className="w-full border-slate-800 text-slate-300 hover:bg-slate-900" size="lg">
                <Link to="/register">Commencer gratuitement</Link>
              </Button>
            </div>
          </Card>

          {/* Plan 2: Pro */}
          <Card className="border-2 border-teal-500/80 shadow-xl shadow-teal-950/40 flex flex-col justify-between hover:border-teal-400 transition-all relative overflow-hidden bg-[#072a2a]">
            <div className="absolute top-0 right-0 bg-teal-500 text-slate-950 text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-lg">
              Populaire
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Pro</h3>
                <p className="text-xs text-slate-400 mt-1">Le tout inclus pour les formateurs, coachs et infopreneurs.</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl md:text-4xl font-extrabold text-teal-400">
                  {priceCurrency === 'CFA' ? '32 000 CFA' : '49 €'}
                </span>
                <span className="text-xs text-slate-400 font-semibold"> / mois</span>
                <p className="text-[10px] text-teal-400 font-bold mt-1">2 mois offerts en paiement annuel</p>
              </div>
              <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-teal-900/60">
                <li className="flex items-center gap-2 font-medium">✓ Formations illimitées</li>
                <li className="flex items-center gap-2 font-medium">✓ Apprenants illimités</li>
                <li className="flex items-center gap-2">✓ Quiz et examens avancés</li>
                <li className="flex items-center gap-2">✓ Certificats Canvas HD automatisés</li>
                <li className="flex items-center gap-2">✓ Visioconférences Live (EduFlex Meet)</li>
                <li className="flex items-center gap-2">✓ Support prioritaire 24h/7j</li>
                <li className="flex items-center gap-2 text-teal-400 font-bold">✓ Frais de transaction : 3%</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold" size="lg">
                <Link to="/register">Lancer mon Académie Pro</Link>
              </Button>
            </div>
          </Card>

          {/* Plan 3: Institution & Académie B2B */}
          <Card className="border-teal-950 flex flex-col justify-between hover:border-teal-900/40 transition-all relative overflow-hidden bg-[#061e1e]">
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Académie B2B</h3>
                <p className="text-xs text-slate-400 mt-1">Pour les universités, lycées et centres de formation officiels.</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl md:text-4xl font-extrabold text-white">
                  {priceCurrency === 'CFA' ? '59 000 CFA' : '89 €'}
                </span>
                <span className="text-xs text-slate-400 font-semibold"> / mois</span>
                <p className="text-[10px] text-teal-400 font-bold mt-1">Support d'intégration sur-mesure inclus</p>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-teal-950">
                <li className="flex items-center gap-2 font-semibold text-white">✓ Personnalisation White-Label (Marque)</li>
                <li className="flex items-center gap-2 font-semibold text-white">✓ Nom de domaine propre (cours.ecole.com)</li>
                <li className="flex items-center gap-2">✓ Multi-comptes formateurs (jusqu'à 10)</li>
                <li className="flex items-center gap-2">✓ Rapports d'assiduité ministériels</li>
                <li className="flex items-center gap-2 font-bold text-amber-400">✓ Support VIP WhatsApp & Tél 24/7</li>
                <li className="flex items-center gap-2 text-teal-400 font-bold">✓ Frais de transaction : 1%</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button asChild variant="outline" className="w-full border-teal-800 text-teal-300 hover:bg-teal-950" size="lg">
                <Link to="/register">Activer l'Académie B2B</Link>
              </Button>
            </div>
          </Card>

        </div>
      </section>

      {/* SECTION 6: FAQ B2B */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-teal-950/40 space-y-12 text-left">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Foire aux Questions B2B</h2>
          <p className="text-xs text-slate-400">Tout ce que vous devez savoir pour déployer EduFlex au sein de votre organisation.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-teal-950 bg-[#061e1e] rounded-2xl p-5 cursor-pointer transition-all hover:border-teal-900/60"
              onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
            >
              <div className="flex items-center justify-between font-bold text-sm text-white">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-teal-400 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaqIdx === idx ? 'rotate-180 text-teal-400' : ''}`} />
              </div>
              {openFaqIdx === idx && (
                <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-teal-950/60 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-teal-950 bg-[#041212] py-12 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} EduFlex B2B. Tous droits réservés. Digitalisation des compétences et entreprises.</p>
      </footer>

    </div>
  )
}

function DashboardRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="space-y-4 text-center">
        <div className="h-10 w-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-400">Redirection vers votre tableau de bord...</p>
      </div>
    </div>
  )
}
