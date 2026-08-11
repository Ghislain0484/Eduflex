import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, CardContent, Badge } from '@blinkdotnew/ui'
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Gem,
  Check,
  X
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/tarifs')({
  component: TarifsPage,
})

function TarifsPage() {
  const { user } = useAuth()
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 text-left">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
              EduFlex<span className="text-teal-400 font-extrabold text-xs">OFFRES</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Tableau de bord
            </Link>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-lg shadow-teal-500/20 border-none">
              <Link to="/courses">Espace Apprenant</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        {/* Top Title Banner (Matching Screenshot 2) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Découvrez les avantages et les possibilités de EduFlex
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Vous êtes actuellement sur le <strong className="text-amber-400 uppercase">forfait DÉCOUVERTE</strong>.
          </p>

          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${currency === 'EUR' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Tarifs en Euros (€)
            </button>
            <button
              onClick={() => setCurrency('FCFA')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${currency === 'FCFA' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Tarifs en FCFA
            </button>
          </div>
        </div>

        {/* 3 Pricing Columns Grid (Matching Screenshot 2) */}
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          
          {/* Plan 1: DÉCOUVERTE */}
          <Card className="border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">Découverte</Badge>
                <h3 className="text-xl font-black text-white">DÉCOUVERTE</h3>
                <p className="text-2xl font-bold text-white">0 {currency === 'EUR' ? '€' : 'FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span></p>
                <p className="text-[11px] text-slate-400">Créez vos premières leçons et découvrez la plateforme.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Jusqu'à 2 formations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> 70 apprenants maximum</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Mobile Money (Wave, Orange, MTN)</li>
                <li className="flex items-center gap-2 text-slate-500"><X className="h-4 w-4 text-slate-700 shrink-0" /> Pas d'autorépondeurs</li>
                <li className="flex items-center gap-2 text-slate-500"><X className="h-4 w-4 text-slate-700 shrink-0" /> Pas de nom de domaine propre</li>
              </ul>
            </div>

            <Button disabled className="w-full bg-slate-800 text-slate-400 font-bold text-xs h-10 cursor-not-allowed">
              Vous êtes sur cette offre
            </Button>
          </Card>

          {/* Plan 2: PRO */}
          <Card className="border-2 border-teal-500 bg-teal-950/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xl shadow-teal-500/10">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-teal-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full">
              Recommandé
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px]">Populaire</Badge>
                <h3 className="text-xl font-black text-white">PRO</h3>
                <p className="text-2xl font-bold text-teal-400">
                  {currency === 'EUR' ? '49 €' : '32 000 FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className="text-[11px] text-slate-400">Pour les formateurs indépendants qui développent leur activité.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Formations illimitées</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Apprenants illimités</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Autorépondeurs (Brevo, ActiveCampaign)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Zapier & Make automatisations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Certificats de réussite</li>
              </ul>
            </div>

            <Button asChild className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 shadow-md border-none">
              <Link to="/register" search={{ plan: 'Pro' }}>Commencer dès maintenant</Link>
            </Button>
          </Card>

          {/* Plan 3: EXPERT / B2B */}
          <Card className="border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-[10px]">Entreprise</Badge>
                <h3 className="text-xl font-black text-white">EXPERT / B2B</h3>
                <p className="text-2xl font-bold text-white">
                  {currency === 'EUR' ? '99 €' : '65 000 FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className="text-[11px] text-slate-400">Pour les académies, grands cabinets et écoles de formation.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Tout le plan PRO inclus</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Nom de domaine personnalisé</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Marque blanche 100% neutre</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Clés API REST & Webhooks privés</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Support VIP WhatsApp 24/7</li>
              </ul>
            </div>

            <Button asChild className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-10 border border-slate-700">
              <Link to="/register" search={{ plan: 'B2B' }}>Commencer dès maintenant</Link>
            </Button>
          </Card>

        </div>

      </div>
    </div>
  )
}
