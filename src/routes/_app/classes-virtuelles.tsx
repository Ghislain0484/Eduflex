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
  Video,
  Play,
  Calendar,
  Users,
  Plus,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react'

export const Route = createFileRoute('/_app/classes-virtuelles')({
  component: ClassesVirtuellesPage,
})

export function ClassesVirtuellesPage() {
  const [roomName, setRoomName] = useState('Session-Live-EduFlex')
  const [activeMeeting, setActiveMeeting] = useState(false)

  const handleStartInstantMeeting = () => {
    setActiveMeeting(true)
    toast.success("Classe virtuelle lancée ! Rejoignez la salle de visioconférence.")
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Video className="h-6 w-6 text-red-500 animate-pulse" />
            Classes Virtuelles & Visioconférence
          </h1>
          <p className="text-xs text-slate-400">
            Animez vos cours en direct, partagez votre écran et interagissez avec vos apprenants.
          </p>
        </div>
        <Button onClick={handleStartInstantMeeting} className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs h-9">
          <Play className="h-3.5 w-3.5 mr-1.5" /> Démarrer un direct instantané
        </Button>
      </div>

      {activeMeeting && (
        <Card className="border border-red-500/40 bg-slate-950 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge className="bg-red-600 text-white text-xs font-bold animate-pulse">● EN DIRECT</Badge>
            <Button size="xs" variant="outline" onClick={() => setActiveMeeting(false)} className="text-xs text-red-400 border-red-500/30">
              Quitter la réunion
            </Button>
          </div>
          <div className="w-full h-96 bg-slate-900 rounded-xl flex flex-col items-center justify-center space-y-3 border border-slate-800">
            <Video className="h-12 w-12 text-teal-400" />
            <p className="text-sm font-bold text-white">Salle Visioconférence EduFlex : {roomName}</p>
            <p className="text-xs text-slate-400">Intégration directe Jitsi Meet / Google Meet opérationnelle.</p>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs">
              <a href={`https://meet.jit.si/${roomName}`} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                Ouvrir dans une nouvelle fenêtre <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-border/80 bg-card p-5 space-y-4">
          <CardTitle className="text-sm font-bold text-white">Créer une classe programmée</CardTitle>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Nom du cours en direct</label>
              <Input placeholder="Ex: Atelier Coaching individuel..." className="text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Lien Google Meet / Zoom / Jitsi</label>
              <Input placeholder="https://meet.google.com/abc-defg-hij" className="text-xs" />
            </div>
            <Button onClick={() => toast.success("Classe virtuelle programmée !")} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
              Enregistrer la classe
            </Button>
          </div>
        </Card>

        <Card className="border border-border/80 bg-card p-5 space-y-4">
          <CardTitle className="text-sm font-bold text-white">Statistiques des Lives</CardTitle>
          <div className="space-y-2 text-xs text-slate-400">
            <p>• <strong>Heures de direct diffusées :</strong> 14h</p>
            <p>• <strong>Taux de participation moyen :</strong> 84%</p>
            <p>• <strong>Enregistrements replay archivés :</strong> 6 vidéos</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
