import { Link } from '@tanstack/react-router'
import { Card, CardContent, Button } from '@blinkdotnew/ui'
import { Lock, Sparkles, Gem, ArrowRight } from 'lucide-react'

interface FeatureLockGuardProps {
  featureTitle: string
  featureDescription: string
  children: React.ReactNode
  isLocked: boolean
}

export function FeatureLockGuard({
  featureTitle,
  featureDescription,
  children,
  isLocked
}: FeatureLockGuardProps) {
  if (!isLocked) return <>{children}</>

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center p-6 text-left">
      {/* Blurred background preview */}
      <div className="absolute inset-0 opacity-20 blur-sm pointer-events-none overflow-hidden select-none">
        {children}
      </div>

      {/* Lock overlay banner */}
      <Card className="relative z-10 max-w-lg w-full border border-amber-500/40 bg-slate-950/90 shadow-2xl rounded-2xl p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300 backdrop-blur-md">
        <div className="mx-auto h-16 w-16 bg-amber-500/10 text-amber-400 flex items-center justify-center rounded-2xl border border-amber-500/20 shadow-inner">
          <Lock className="h-8 w-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
            Offre Découverte (Gratuite)
          </span>
          <h2 className="text-xl font-black text-white tracking-tight">
            {featureTitle} — Fonctionnalité PRO
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            {featureDescription}
          </p>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400 text-left">
          <p className="font-bold text-white flex items-center gap-1.5">
            <Gem className="h-4 w-4 text-emerald-400" /> Inclus dans le plan PRO :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li>Formations et apprenants illimités</li>
            <li>Autorépondeurs & Tracking Facebook Pixel / Google Analytics</li>
            <li>Affiliation, codes promo & visioconférences illimitées</li>
            <li>Accès complet aux clés API & Webhooks</li>
          </ul>
        </div>

        <Button asChild className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black h-11 text-xs rounded-xl shadow-lg border-none">
          <Link to="/tarifs" className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" /> Passer à la version PRO <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  )
}
