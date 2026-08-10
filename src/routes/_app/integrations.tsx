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
  Code2,
  Zap,
  Globe,
  Key,
  Copy
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { FeatureLockGuard } from '@/components/FeatureLockGuard'

export const Route = createFileRoute('/_app/integrations')({
  component: IntegrationsPage,
})

function IntegrationsPage() {
  const { user } = useAuth()
  const isFreePlan = !user?.subscriptionPlan || ['découverte', 'decouverte', 'free'].includes(user.subscriptionPlan.toLowerCase())

  const [apiKey] = useState('ef_live_88a91c7429b9104fa281c')
  const [pixelId, setPixelId] = useState('')

  return (
    <FeatureLockGuard
      isLocked={isFreePlan}
      featureTitle="APIs Développeur, Webhooks & Meta Pixel"
      featureDescription="Accédez aux clés d'API REST, connectez vos webhooks avec Zapier/Make et suivez vos conversions avec le Meta Pixel."
    >
      <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Code2 className="h-6 w-6 text-teal-400" />
              Intégrations Externes & API
            </h1>
            <p className="text-xs text-slate-400">
              Connectez votre académie EduFlex avec Zapier, Webhooks, Google Analytics 4 et Meta Pixel.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-border/80 bg-card p-5 space-y-4">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-teal-400" /> Clé API EduFlex
            </CardTitle>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground">Clé Secrète Production</label>
              <div className="flex gap-2">
                <Input readOnly value={apiKey} className="text-xs font-mono bg-slate-950" />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey)
                    toast.success("Clé API copiée !")
                  }}
                  className="text-xs border-border shrink-0"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border border-border/80 bg-card p-5 space-y-4">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="h-4 w-4 text-sky-400" /> Facebook / Meta Pixel ID
            </CardTitle>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">ID du Pixel</label>
                <Input 
                  placeholder="Ex: 123456789012345" 
                  value={pixelId}
                  onChange={e => setPixelId(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>
              <Button onClick={() => toast.success("Pixel Meta configuré avec succès !")} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
                Enregistrer le Pixel
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </FeatureLockGuard>
  )
}
