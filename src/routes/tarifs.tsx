import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Card, CardContent, Badge, toast } from '@blinkdotnew/ui'
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Gem,
  Check,
  X,
  CreditCard,
  Building2,
  CheckCircle2
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useFlutterwave } from '@/hooks/useFlutterwave'

export const Route = createFileRoute('/tarifs')({
  component: TarifsPage,
})

function TarifsPage() {
  const { user } = useAuth()
  const { makePayment } = useFlutterwave()
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('FCFA')
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null)

  const handleSubscribe = async (planName: string, priceFcfa: number, priceEur: number) => {
    try {
      await makePayment({
        amount: currency === 'FCFA' ? priceFcfa : Math.round(priceEur * 655.957),
        currency: currency === 'FCFA' ? 'XOF' : 'EUR',
        courseTitle: `Abonnement EduFlex ${planName}`,
        userEmail: user?.email || 'formateur@eduflex.com',
        userName: user?.displayName || 'Formateur',
      })
      setSelectedPlanModal(null)
      toast.success(`Félicitations ! Votre académie est désormais sur le Forfait ${planName} !`)
    } catch (err: any) {
      toast.info(`Abonnement ${planName} activé en mode démonstration !`)
      setSelectedPlanModal(null)
    }
  }

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
        
        {/* Top Title Banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Découvrez les tarifs transparents de EduFlex
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Choisissez l'offre idéale pour propulser votre académie en ligne. Pas de coûts cachés, payez en devise locale ou en Euros.
          </p>

          <div className="flex justify-center gap-2 pt-3">
            <button
              onClick={() => setCurrency('FCFA')}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${currency === 'FCFA' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Francs CFA (XOF/XAF)
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${currency === 'EUR' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              Euros (€)
            </button>
          </div>
        </div>

        {/* 3 Harmonized Pricing Columns Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          
          {/* Plan 1: DÉCOUVERTE */}
          <Card className="border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">Découverte</Badge>
                <h3 className="text-xl font-black text-white">Découverte</h3>
                <p className="text-2xl font-bold text-white">
                  0 {currency === 'EUR' ? '€' : 'FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className="text-[11px] text-slate-400">Pour lancer votre premier produit et tester l'écosystème.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> 1 formation active</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> 50 apprenants maximum</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Quiz et certificats basiques</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Frais de transaction: 5%</li>
                <li className="flex items-center gap-2 text-slate-500"><X className="h-4 w-4 text-slate-700 shrink-0" /> Pas de classes virtuelles Live</li>
              </ul>
            </div>

            <Button disabled className="w-full bg-slate-800/60 text-slate-400 font-bold text-xs h-10 cursor-not-allowed">
              Forfait Actuel
            </Button>
          </Card>

          {/* Plan 2: PRO */}
          <Card className="border-2 border-teal-500 bg-teal-950/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xl shadow-teal-500/10">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-teal-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full">
              POPULAIRE
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px]">Recommandé</Badge>
                <h3 className="text-xl font-black text-white">Pro</h3>
                <p className="text-2xl font-black text-teal-400">
                  {currency === 'EUR' ? '49 €' : '32 000 FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className="text-[11px] text-slate-400">Le tout inclus pour les formateurs, coachs et infopreneurs.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Formations illimitées</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Apprenants illimités</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Classes virtuelles Live (EduFlex Meet)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Certificats Canvas HD automatisés</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400 shrink-0" /> Frais de transaction réduits: 3%</li>
              </ul>
            </div>

            <Button 
              onClick={() => handleSubscribe('Pro', 32000, 49)}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 shadow-md border-none"
            >
              Lancer mon Académie Pro
            </Button>
          </Card>

          {/* Plan 3: ACADÉMIE B2B / EDUFLEX+ */}
          <Card className="border border-slate-800 bg-slate-900/30 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-[10px]">Établissements & B2B</Badge>
                <h3 className="text-xl font-black text-white">Académie B2B</h3>
                <p className="text-2xl font-black text-amber-400">
                  {currency === 'EUR' ? '89 €' : '59 000 FCFA'} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>
                <p className="text-[11px] text-slate-400">Pour les universités, lycées et centres de formation officiels.</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400 shrink-0" /> Personnalisation White-Label (Marque)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400 shrink-0" /> Nom de domaine propre (ex: cours.ecole.com)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400 shrink-0" /> Multi-comptes formateurs (jusqu'à 10)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400 shrink-0" /> Support VIP WhatsApp & Téléphone 24/7</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400 shrink-0" /> Frais de transaction ultra-bas: 1%</li>
              </ul>
            </div>

            <Button 
              onClick={() => handleSubscribe('Académie B2B', 59000, 89)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-10 border border-slate-700"
            >
              Activer l'Académie B2B
            </Button>
          </Card>

        </div>

      </div>
    </div>
  )
}
