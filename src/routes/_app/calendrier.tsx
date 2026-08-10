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
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Video,
  BookOpen,
  CheckCircle2
} from 'lucide-react'

export const Route = createFileRoute('/_app/calendrier')({
  component: CalendrierPage,
})

interface EventItem {
  id: number
  title: string
  date: string
  time: string
  type: 'Live' | 'Devoir' | 'Examen'
  course: string
}

function CalendrierPage() {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      title: 'Session Live Q&A Marketing Digital',
      date: '2026-08-15',
      time: '18:00 - 19:30',
      type: 'Live',
      course: 'Marketing Digital de A à Z'
    },
    {
      id: 2,
      title: 'Rendu du Projet d\'Analyse Financière',
      date: '2026-08-20',
      time: '23:59',
      type: 'Devoir',
      course: 'Excel Avancé & Tableaux'
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('2026-08-18')
  const [newTime, setNewTime] = useState('17:00')
  const [newType, setNewType] = useState<'Live' | 'Devoir' | 'Examen'>('Live')

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    setEvents([
      ...events,
      {
        id: Date.now(),
        title: newTitle,
        date: newDate,
        time: newTime,
        type: newType,
        course: 'Formation Générale'
      }
    ])
    setNewTitle('')
    toast.success("Événement planifié avec succès au calendrier !")
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-teal-400" />
            Calendrier des Formations
          </h1>
          <p className="text-xs text-slate-400">
            Planifiez et visualisez l'ensemble de vos directs, visioconférences et devoirs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form add event */}
        <Card className="border border-border/80 bg-card p-5 h-fit">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-sm font-bold text-foreground">Planifier un événement</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            <form onSubmit={handleAddEvent} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Titre</label>
                <Input 
                  placeholder="Ex: Masterclass Live React..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Date</label>
                <Input 
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Heure</label>
                <Input 
                  type="text"
                  placeholder="18:00"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Type d'événement</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full h-9 rounded bg-background border border-input text-xs px-2.5 outline-none"
                >
                  <option value="Live">Classe Virtuelle / Live</option>
                  <option value="Devoir">Rendu de Devoir</option>
                  <option value="Examen">Examen / Quiz</option>
                </select>
              </div>
              <Button type="submit" disabled={!newTitle.trim()} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9">
                <Plus className="h-4 w-4 mr-1" /> Ajouter au calendrier
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Event List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Événements à venir</h3>
          <div className="space-y-3">
            {events.map(ev => (
              <Card key={ev.id} className="border border-border/70 bg-card p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={ev.type === 'Live' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-teal-500/10 text-teal-400 border-teal-500/20'}>
                      {ev.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{ev.course}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {ev.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ev.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
