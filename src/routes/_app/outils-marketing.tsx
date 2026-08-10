import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Input,
  toast,
} from '@blinkdotnew/ui'
import {
  Megaphone,
  Mail,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

export const Route = createFileRoute('/_app/outils-marketing')({
  component: OutilsMarketingPage,
})

function OutilsMarketingPage() {
  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-teal-400" />
            Outils Marketing & Conversion
          </h1>
          <p className="text-xs text-slate-400">
            Automatisez la relance d'abandon de panier et synchronisez vos contacts avec Brevo, ActiveCampaign et Mailchimp.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-border/80 bg-card p-5 space-y-3">
          <div className="h-10 w-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center font-bold text-xs">
            Brevo
          </div>
          <h3 className="text-sm font-bold text-white">Brevo (ex-Sendinblue)</h3>
          <p className="text-xs text-slate-400">Synchronisez vos nouveaux élèves directement dans vos listes Brevo.</p>
          <Button onClick={() => toast.success("Intégration Brevo enregistrée.")} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8">
            Connecter Brevo
          </Button>
        </Card>

        <Card className="border border-border/80 bg-card p-5 space-y-3">
          <div className="h-10 w-10 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center font-bold text-xs">
            AC
          </div>
          <h3 className="text-sm font-bold text-white">ActiveCampaign</h3>
          <p className="text-xs text-slate-400">Déclenchez des séquences d'emails automatiques lors de chaque inscription.</p>
          <Button onClick={() => toast.success("Intégration ActiveCampaign enregistrée.")} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8">
            Connecter ActiveCampaign
          </Button>
        </Card>

        <Card className="border border-border/80 bg-card p-5 space-y-3">
          <div className="h-10 w-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xs">
            GR
          </div>
          <h3 className="text-sm font-bold text-white">GetResponse</h3>
          <p className="text-xs text-slate-400">Envoyez des tunnels de vente et des offres ciblées aux indécis.</p>
          <Button onClick={() => toast.success("Intégration GetResponse enregistrée.")} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-8">
            Connecter GetResponse
          </Button>
        </Card>
      </div>
    </div>
  )
}
