import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
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
} from 'lucide-react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'EduFlex — Plateforme LMS nouvelle génération' },
      { name: 'description', content: 'Créez, gérez et vendez vos formations en ligne avec EduFlex. Zéro installation, mises à jour gratuites, sans engagement.' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isLoading && isAuthenticated) {
    // Authenticated users see the dashboard instead
    return <DashboardRedirect />
  }

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">EduFlex</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Se connecter</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">S'inscrire gratuitement</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-8">
              <Zap className="h-3.5 w-3.5" />
              Plateforme LMS nouvelle génération
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
              Créez et gérez vos{' '}
              <span className="text-primary">formations en ligne</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Zéro installation. Mises à jour gratuites. Sans aucun engagement.
              EduFlex est la solution 100% Française pour les formateurs et écoles qui veulent se concentrer sur l'essentiel.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/register">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link to="/login">Se connecter</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tout ce qu'il faut pour former en ligne
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Des outils puissants, une interface intuitive, et une sécurité de niveau entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Monitor className="h-6 w-6" />, title: 'Zéro installation', description: 'Accédez à votre plateforme depuis n\'importe quel navigateur. Aucune installation requise.' },
              { icon: <BookOpen className="h-6 w-6" />, title: 'Gestion complète', description: 'Gérez vos formations, élèves, enseignants et classes depuis un seul tableau de bord.' },
              { icon: <Users className="h-6 w-6" />, title: 'Multi-utilisateurs', description: 'Invitez votre équipe et attribuez des rôles précis à chaque collaborateur.' },
              { icon: <BarChart3 className="h-6 w-6" />, title: 'Statistiques avancées', description: 'Suivez les performances, taux de complétion et revenus en temps réel.' },
              { icon: <Shield className="h-6 w-6" />, title: 'Sécurité maximale', description: 'Données protégées, transactions sécurisées, conformité RGPD garantie.' },
              { icon: <RefreshCw className="h-6 w-6" />, title: 'Mises à jour gratuites', description: 'Profitez automatiquement des nouvelles fonctionnalités et corrections.' },
            ].map((f, i) => (
              <div key={i} className="group relative rounded-xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Prêt à transformer votre enseignement ?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Rejoignez des centaines de formateurs qui font déjà confiance à EduFlex.
            </p>
            <Button asChild size="lg" className="text-base px-10">
              <Link to="/register">
                Créer mon compte gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">EduFlex</span>
            <span>&copy; 2026. Tous droits réservés.</span>
          </div>
          <p>Entreprise 100% Française</p>
        </div>
      </footer>
    </div>
  )
}

function DashboardRedirect() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="text-center space-y-4">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center mx-auto">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <p className="text-muted-foreground">Redirection vers le tableau de bord...</p>
        <Button asChild>
          <Link to="/_app/dashboard">Accéder au tableau de bord</Link>
        </Button>
      </div>
    </div>
  )
}
