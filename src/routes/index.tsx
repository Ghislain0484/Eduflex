import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, CardContent, Skeleton, Badge } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useCourses } from '@/hooks/useCourses'
import { useState } from 'react'
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
} from 'lucide-react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'EduFlex — Plateforme LMS Premium et Innovante' },
      { name: 'description', content: 'Créez, gérez et vendez vos formations en ligne avec EduFlex. Support du Mobile Money, double devise EUR/XOF, quiz et certificats de réussite inclus.' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { data: courses, isLoading: coursesLoading } = useCourses()
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)
  const [priceCurrency, setPriceCurrency] = useState<'CFA' | 'EUR'>('CFA')

  const publishedCourses = (courses || [])
    .filter(c => c.status === 'publie')
    .slice(0, 3)

  const faqs = [
    {
      q: "Comment fonctionne la double devise ?",
      a: "Toutes les formations sont affichées à la fois en Euros (€) et en Francs CFA (XOF). Les paiements en Francs CFA activent automatiquement les services de Mobile Money (Orange Money, MTN, Wave, Moov) pour éviter les frais bancaires internationaux de conversion."
    },
    {
      q: "Quelles sont les méthodes de paiement acceptées ?",
      a: "Nous prenons en charge les paiements par carte bancaire internationale via Flutterwave, ainsi que les solutions de Mobile Money les plus populaires en Afrique de l'Ouest et Centrale."
    },
    {
      q: "Comment fonctionne l'obtention du certificat ?",
      a: "Dès que vous terminez une formation à 100% (validation de tous les chapitres et quiz), un bouton de téléchargement de certificat haute définition s'affiche dans votre espace d'étude."
    },
    {
      q: "Puis-je gagner de l'argent en parrainant des amis ?",
      a: "Oui ! Chaque formation achetée vous donne accès à un lien de parrainage unique. Si un contact achète la formation via votre lien, vous gagnez immédiatement 15% de commission sur la vente."
    }
  ]

  if (!isLoading && isAuthenticated) {
    return <DashboardRedirect />
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Navigation Header (Teachizy Premium Style) */}
      <header className="sticky top-0 z-50 bg-[#061d1d] border-b border-teal-950/40 shadow-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-950/50">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              eduflex<span className="text-teal-400">.</span>
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2">
                Services <ChevronDown className="h-3.5 w-3.5 text-slate-450 group-hover:text-teal-400" />
              </button>
              
              {/* Mega Dropdown Panel (Teachizy style Solutions / Fonctionnalités / Secteurs) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] rounded-2xl border border-teal-900/60 bg-[#072424] p-6 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-3 gap-6 text-left">
                
                {/* Column 1: Solutions */}
                <div className="space-y-3.5">
                  <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Solutions</h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Créer une formation</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Vendre en Francs CFA</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Digitaliser les écoles</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Suivi Mobile Money</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Classes en Direct</Link></li>
                  </ul>
                </div>

                {/* Column 2: Fonctionnalités */}
                <div className="space-y-3.5">
                  <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Fonctionnalités</h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li><Link to="/courses" className="hover:text-teal-400 block transition-colors">• LMS Localisé</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Créateur de Quiz</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Vidéos économes data</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Affiliation 15%</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Certificats HD</Link></li>
                  </ul>
                </div>

                {/* Column 3: Secteurs */}
                <div className="space-y-3.5">
                  <h4 className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Secteurs</h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Écoles & Universités</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Organismes de formation</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Formateurs indépendants</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Coachs & Experts</Link></li>
                    <li><Link to="/register" className="hover:text-teal-400 block transition-colors">• Entreprises locales</Link></li>
                  </ul>
                </div>

              </div>
            </div>

            <Link to="/tarifs" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2">
              Fonctionnalités & Tarifs
            </Link>

            <Link to="/eduflex-plus" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors py-2">
              EduFlex+ Entreprises
            </Link>
          </div>

          {/* Right: Auth Buttons */}
          <div className="flex items-center gap-5">
            <Link to="/login" className="text-[13px] font-semibold text-slate-300 hover:text-teal-400 transition-colors">
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="border-2 border-teal-400/80 hover:border-teal-355 text-white hover:bg-teal-500/10 rounded-full px-6 py-1.5 text-[13px] font-semibold tracking-wide transition-all shadow-sm"
            >
              Inscription
            </Link>
          </div>

        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Neon Glow spots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              LMS Premium & Double Devise Intégrée
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1] text-foreground">
              Vendez et suivez vos <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">formations en ligne</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              La plateforme de e-learning nouvelle génération qui connecte l'Europe et l'Afrique. 
              Support complet du <b>Mobile Money</b> local, quiz de validation, certificats HD automatisés et affiliation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-base px-8 bg-primary hover:bg-primary/90 shadow-md">
                <Link to="/register">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 hover:bg-accent/10">
                <Link to="/login">Découvrir le catalogue</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Banner (Teachizy style) */}
        <div className="bg-[#0b2626] border-y border-teal-950/60 py-3 text-center text-[10px] md:text-xs text-teal-300 font-semibold tracking-wide flex flex-wrap justify-center items-center gap-x-8 gap-y-2 px-6">
          <span className="flex items-center gap-1.5">⚡ Sans engagement</span>
          <span className="text-teal-900/50 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5">📱 Mobile Money local intégré (Wave, Orange, MTN, Moov)</span>
          <span className="text-teal-900/50 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5">🌍 Conforme ministères de l'enseignement régionaux</span>
          <span className="text-teal-900/50 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5">📡 Optimisé pour connexions bas-débit (3G/4G)</span>
        </div>

        {/* Statistics Bar */}
        <section className="border-y border-border/50 bg-muted/20 py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '15 000+', label: 'Apprenants formés' },
              { val: '100%', label: 'Mobile Money local' },
              { val: '98%', label: 'Taux de satisfaction' },
              { val: '15%', label: 'Affiliation parrain' }
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl font-extrabold tracking-tight text-primary">{s.val}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche Section (Teachizy Style) */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-b border-border/40">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Comment fonctionne la plateforme ?</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Une expérience d'apprentissage et de vente simplifiée au maximum en 4 étapes clés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Création du cours', desc: 'Le formateur crée son cours et structure ses chapitres avec du texte, des vidéos et des quiz interactifs.' },
              { step: '02', title: 'Achat sécurisé', desc: 'L\'élève s\'inscrit et paye en ligne par Carte Bancaire ou via son compte Mobile Money local en Francs CFA.' },
              { step: '03', title: 'Apprentissage', desc: 'L\'élève progresse chapitre après chapitre, participe aux discussions communautaires et valide ses acquis.' },
              { step: '04', title: 'Certification & Gain', desc: 'L\'élève obtient son certificat de complétion Canvas HD et peut parrainer d\'autres élèves pour toucher 15%.' }
            ].map((s, i) => (
              <div key={i} className="space-y-3 relative group">
                <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{s.step}</div>
                <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Courses Highlight */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Formations à la une</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Accédez aux fiches détaillées des formations pour découvrir le syllabus complet.
            </p>
          </div>

          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-44 w-full" />
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : publishedCourses.length === 0 ? (
            <div className="text-center py-10 border border-dashed rounded-xl">
              <p className="text-sm text-muted-foreground">Aucune formation publiée disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedCourses.map(course => {
                const priceXof = Math.round((course.price / 100) * 655.957)
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-border/80 bg-card">
                    <div className="h-44 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden shrink-0">
                      {course.imageUrl ? (
                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><BookOpen className="h-10 w-10 text-primary/20" /></div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm" variant="secondary">{course.category}</Badge>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-base leading-snug line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>
                      </div>
                      <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-extrabold text-primary">{((course.price || 0) / 100).toLocaleString('fr-FR')} €</p>
                          <p className="text-[10px] text-muted-foreground font-semibold">~ {priceXof.toLocaleString('fr-FR')} F CFA</p>
                        </div>
                        <Button asChild size="sm" variant="outline" className="text-xs">
                          <Link to="/courses/$id" params={{ id: String(course.id) }}>En savoir plus</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        {/* Payouts / LMS Comparative Table */}
        <section className="max-w-4xl mx-auto px-6 py-20 border-t border-border/40">
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Pourquoi choisir EduFlex ?</h2>
            <p className="text-sm text-muted-foreground">Une comparaison rapide face aux solutions LMS américaines ou traditionnelles.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30 font-bold text-foreground">
                  <th className="p-4">Fonctionnalité</th>
                  <th className="p-4 text-primary font-black">EduFlex</th>
                  <th className="p-4 text-muted-foreground">LMS Classique (Teachable, etc.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="p-4 font-semibold">Paiement Mobile Money local (Afrique)</td>
                  <td className="p-4 text-emerald-600 font-bold">Oui (Wave, Orange, MTN, Moov)</td>
                  <td className="p-4 text-red-500">Non (Stripe/PayPal uniquement)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Double Devise dynamique (EUR/XOF)</td>
                  <td className="p-4 text-emerald-600 font-bold">Oui (Conversion intégrée)</td>
                  <td className="p-4 text-red-500">Non (Frais bancaires élevés)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Certificats de réussite Canvas HD</td>
                  <td className="p-4 text-emerald-600 font-bold">Oui (Inclus)</td>
                  <td className="p-4 text-muted-foreground">Payant / Modules tiers</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Commission d'Affiliation Directe (15%)</td>
                  <td className="p-4 text-emerald-600 font-bold">Oui (Tableau de bord parrain)</td>
                  <td className="p-4 text-muted-foreground">Paramétrage complexe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* EduFlex+ B2B Digitalisation Projects Showcase */}
        <section id="eduflex-plus" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-xs font-semibold text-teal-400">
              🚀 EduFlex+ Solutions Entreprises
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Quel est votre projet de digitalisation ?
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Des processus d'amélioration continue au développement des compétences de vos équipes... EduFlex+ répond à vos besoins !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💻',
                title: 'Académie clients',
                desc: 'Accompagnez vos clients dans l\'utilisation de vos produits et services via une académie en accès libre ou payant selon votre modèle.'
              },
              {
                icon: '📱',
                title: 'Formation salariés',
                desc: 'Renforcez l\'engagement de vos équipes locales avec la formation continue sur tous les sujets et y compris sur mobile.'
              },
              {
                icon: '⚡',
                title: 'Parcours réglementaire & RSE',
                desc: 'Actualisez les compétences : sensibilisez vos apprenants aux enjeux réglementaires et de développement durable.'
              },
              {
                icon: '👥',
                title: 'Onboarding (intégration)',
                desc: 'Optimisez l\'intégration de vos nouveaux collaborateurs en construisant une expérience RH moderne et engageante.'
              },
              {
                icon: '🤝',
                title: 'Formation des partenaires',
                desc: 'Systématisez la transmission de savoir-faire avec votre réseau de distributeurs, franchisés et partenaires régionaux.'
              },
              {
                icon: '🏫',
                title: 'Écoles & Lycées Supérieurs',
                desc: 'Gérez vos apprenants et donnez accès à vos contenus académiques (cours, quiz, classes lives) tout au long de leur parcours.'
              }
            ].map((p, i) => (
              <Card key={i} className="bg-card/40 border-border/60 hover:border-teal-900/35 transition-all p-6 space-y-4">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>

          {/* Pourquoi choisir EduFlex+ Sub-section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-teal-950/10 border border-teal-900/20 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Pourquoi choisir EduFlex+ ?</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Nous ne limitons pas votre réussite : toutes nos offres incluent des apprenants et des contenus en illimité !
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">✨</div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Prise en main ultra-rapide</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Notre outil auteur intuitif vous permet de structurer vos cursus et vos classes virtuelles en quelques heures.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">👑</div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Expérience premium White-Label</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Injectez vos propres couleurs et votre logo. Vos apprenants étudient dans un espace entièrement personnalisé à votre effigie.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-teal-900/30 aspect-video shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-950/80 to-transparent z-10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 space-y-2">
                <p className="text-lg font-bold text-white">L'écosystème de formation leader</p>
                <p className="text-xs text-teal-300">Intégration Mobile Money native et visioconférences sécurisées.</p>
              </div>
              <div className="w-full h-full bg-[#051c1c] flex items-center justify-center">
                <span className="text-6xl">🌍</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border/40">
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Ils font confiance à EduFlex</h2>
            <p className="text-sm text-muted-foreground">Découvrez les retours d'expérience de nos apprenants et formateurs certifiés.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Jean-Marc Koffi', role: 'Enseignant Business', quote: 'La double devise et le paiement par Mobile Money ont multiplié mes inscriptions par 4 en Côte d\'Ivoire et au Sénégal !' },
              { name: 'Awa Diop', role: 'Apprenante Marketing', quote: 'J\'ai adoré le système de certificat. Dès que j\'ai fini mon quiz de fin d\'étude, j\'ai pu télécharger mon diplôme en HD d\'un clic.' },
              { name: 'Salif Traoré', role: 'Formateur Dev Web', quote: 'L\'affiliation à 15% est un outil marketing de fou. Mes élèves partagent leur lien et gagnent des commissions. C\'est gagnant-gagnant !' }
            ].map((t, i) => (
              <Card key={i} className="bg-card/50 border-border/80">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-0.5 text-amber-500"><Heart className="h-4 w-4 fill-current" /><Heart className="h-4 w-4 fill-current" /><Heart className="h-4 w-4 fill-current" /><Heart className="h-4 w-4 fill-current" /><Heart className="h-4 w-4 fill-current" /></div>
                  <p className="text-xs text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-primary font-medium">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Solutions & Tarifs Section (Teachizy Premium style) */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Découvrez nos tarifs transparents</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros.
            </p>
            
            {/* Currency Selector Toggle */}
            <div className="flex items-center justify-center gap-3 pt-6">
              <span className={`text-xs font-semibold ${priceCurrency === 'CFA' ? 'text-foreground' : 'text-muted-foreground'}`}>Francs CFA (XOF/XAF)</span>
              <button 
                onClick={() => setPriceCurrency(priceCurrency === 'CFA' ? 'EUR' : 'CFA')}
                className="w-12 h-6.5 rounded-full bg-teal-900/40 p-1 flex items-center transition-colors relative"
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-teal-400 transition-all ${priceCurrency === 'EUR' ? 'translate-x-5.5' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-semibold ${priceCurrency === 'EUR' ? 'text-foreground' : 'text-muted-foreground'}`}>Euros (€)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Découverte */}
            <Card className="border-border/80 flex flex-col justify-between hover:border-teal-900/30 transition-all relative overflow-hidden bg-card/60">
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Découverte</h3>
                  <p className="text-xs text-muted-foreground mt-1">Pour lancer votre premier produit et tester l'écosystème.</p>
                </div>
                <div className="pt-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                    {priceCurrency === 'CFA' ? '0 CFA' : '0 €'}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / mois</span>
                  <p className="text-[10px] text-teal-500 font-bold mt-1">Gratuit à vie · Sans engagement</p>
                </div>
                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/40">
                  <li className="flex items-center gap-2">✓ Jusqu'à 3 formations</li>
                  <li className="flex items-center gap-2">✓ 50 apprenants enregistrés</li>
                  <li className="flex items-center gap-2">✓ Quiz de validation basiques</li>
                  <li className="flex items-center gap-2">✓ Certificats de réussite standards</li>
                  <li className="flex items-center gap-2">✓ Frais de transaction : 10%</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-foreground" size="lg">
                  <Link to="/register">Commencer gratuitement</Link>
                </Button>
              </div>
            </Card>

            {/* Plan 2: Pro */}
            <Card className="border-teal-500/50 shadow-lg shadow-teal-950/10 flex flex-col justify-between hover:border-teal-500/80 transition-all relative overflow-hidden bg-[#072424]/40">
              <div className="absolute top-0 right-0 bg-teal-500 text-teal-950 text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-lg">
                Populaire
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Pro</h3>
                  <p className="text-xs text-muted-foreground mt-1">Le tout inclus pour les formateurs, coachs et infopreneurs.</p>
                </div>
                <div className="pt-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-teal-400">
                    {priceCurrency === 'CFA' ? '19 000 CFA' : '29 €'}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / mois</span>
                  <p className="text-[10px] text-teal-500 font-bold mt-1">2 mois offerts en paiement annuel</p>
                </div>
                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-teal-950/40">
                  <li className="flex items-center gap-2 text-foreground font-medium">✓ Formations illimitées</li>
                  <li className="flex items-center gap-2 text-foreground font-medium">✓ Apprenants illimités</li>
                  <li className="flex items-center gap-2">✓ Quiz et examens avancés</li>
                  <li className="flex items-center gap-2">✓ Certificats Canvas HD automatisés</li>
                  <li className="flex items-center gap-2">✓ Visioconférences en Direct (1h/live)</li>
                  <li className="flex items-center gap-2">✓ Support prioritaire 24h/7j</li>
                  <li className="flex items-center gap-2 text-teal-400 font-bold">✓ Frais de transaction : 5%</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-500 text-white" size="lg">
                  <Link to="/register">Lancer mon Académie Pro</Link>
                </Button>
              </div>
            </Card>

            {/* Plan 3: Institution & Académie */}
            <Card className="border-border/80 flex flex-col justify-between hover:border-teal-900/30 transition-all relative overflow-hidden bg-card/60">
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Académie B2B</h3>
                  <p className="text-xs text-muted-foreground mt-1">Pour les universités, lycées et centres de formation officiels.</p>
                </div>
                <div className="pt-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                    {priceCurrency === 'CFA' ? '59 000 CFA' : '89 €'}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / mois</span>
                  <p className="text-[10px] text-teal-500 font-bold mt-1">Support d'intégration sur-mesure inclus</p>
                </div>
                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/40">
                  <li className="flex items-center gap-2 text-foreground font-semibold">✓ Personnalisation White-Label (Marque)</li>
                  <li className="flex items-center gap-2 text-foreground font-semibold">✓ Visioconférences Jitsi illimitées</li>
                  <li className="flex items-center gap-2">✓ Multi-comptes formateurs (jusqu'à 10)</li>
                  <li className="flex items-center gap-2">✓ Rapports d'assiduité ministériels</li>
                  <li className="flex items-center gap-2">✓ Hébergement dédié réseaux bas-débit</li>
                  <li className="flex items-center gap-2 text-teal-500 font-bold">✓ Frais de transaction : 2%</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-foreground" size="lg">
                  <Link to="/register">Contacter le service Académie</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border/40">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Questions fréquentes</h2>
            <p className="text-sm text-muted-foreground">Tout ce que vous devez savoir sur la plateforme LMS EduFlex.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div key={idx} className="border border-border/60 rounded-xl overflow-hidden bg-card transition-all">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs md:text-sm text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-border/30 text-xs md:text-sm text-muted-foreground leading-relaxed bg-muted/5 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Call To Action */}
        <section className="border-t border-border/50 bg-gradient-to-b from-transparent to-primary/5">
          <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Rejoignez l'avenir du e-learning
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Prêt à vendre et diffuser des formations de manière professionnelle et sans restriction ? Créez votre compte gratuitement.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="text-base px-10 bg-primary hover:bg-primary/95 shadow-lg">
                <Link to="/register">
                  Créer mon compte gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
            <span className="font-bold text-foreground">EduFlex</span>
            <span>&copy; 2026. Tous droits réservés.</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> Plateforme LMS Premium</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DashboardRedirect() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-background">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <p className="text-muted-foreground font-medium text-sm">Redirection vers votre tableau de bord...</p>
        <Button asChild className="bg-primary hover:bg-primary/95">
          <Link to="/_app/dashboard">Accéder au tableau de bord</Link>
        </Button>
      </div>
    </div>
  )
}
