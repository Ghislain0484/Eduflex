import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import heroMasterImg from '@/assets/eduflex-hero-master.jpg'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast,
} from '@blinkdotnew/ui'
import {
  GraduationCap,
  PlayCircle,
  Download,
  Copy,
  BookOpen,
  FileText,
  Video,
  Award,
  ExternalLink,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

export const Route = createFileRoute('/_app/academy-hub')({
  component: AcademyHubPage,
})

interface Lesson {
  id: number
  title: string
  duration: string
  videoUrl: string
  description: string
  speaker: string
  category: 'Pedagogy' | 'Marketing' | 'Tech' | 'Legal'
}

function AcademyHubPage() {
  const [activeLessonId, setActiveLessonId] = useState<number>(1)
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null)

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Créer sa première formation rentable : Ingénierie & Structure",
      duration: "25 min",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Elegant sample video
      description: "Apprenez à structurer votre programme en chapitres progressifs, à formuler des objectifs pédagogiques clairs et à intégrer des quiz pour maximiser le taux de complétion.",
      speaker: "Ghislain (Fondateur EduFlex)",
      category: "Pedagogy"
    },
    {
      id: 2,
      title: "Copywriting : Rédiger une page de vente qui convertit à 10%",
      duration: "18 min",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      description: "Techniques d'écriture persuasive pour capter l'attention de vos prospects, formuler votre offre unique de valeur, et lever les objections pour vendre vos formations.",
      speaker: "Sarah K. (Copywriter Senior)",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Technique : Réussir et enregistrer ses classes live Jitsi",
      duration: "12 min",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Tutoriel pas-à-pas pour planifier des visio Jitsi interactives, configurer le partage d'écran HD, et uploader automatiquement le Replay pour vos étudiants.",
      speaker: "Équipe Produit EduFlex",
      category: "Tech"
    },
    {
      id: 4,
      title: "Conformité administrative : Qualiopi et CPF en 2026",
      duration: "30 min",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      description: "Guide pour les formateurs francophones afin de structurer leurs rapports d'assiduité d'élèves et rendre leurs formations finançables CPF/OPCO ou équivalents régionaux.",
      speaker: "Marc A. (Auditeur Qualité)",
      category: "Legal"
    }
  ]

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTextId(id)
    toast.success("Copié dans le presse-papier !")
    setTimeout(() => setCopiedTextId(null), 2500)
  }

  const resourceTemplates = [
    {
      id: "email_inactive",
      title: "Modèle d'Email de relance (Élèves Inactifs)",
      description: "Email à envoyer automatiquement aux élèves qui n'ont pas progressé dans la formation depuis 7 jours.",
      content: `Sujet : Des progrès vers votre objectif, [Prénom] ? 👋

Bonjour [Prénom],

Je passais prendre des nouvelles de votre progression dans la formation "[Nom de la Formation]".

Il y a quelques jours, vous avez décidé d'investir sur vous-même en rejoignant ce programme. C'est une excellente décision, mais la clé de la réussite réside dans la régularité.

Besoin d'un coup de pouce ou bloqué sur un chapitre ?
Répondez simplement à ce mail, je suis là pour vous aider !

👉 Cliquez ici pour reprendre là où vous vous étiez arrêté : [Lien de l'espace d'étude]

À très vite,
[Votre Nom / Académie]`
    },
    {
      id: "sales_page_structure",
      title: "Structure type d'une Page de Vente High-Ticket",
      description: "Plan étape par étape pour construire la structure de votre landing page de cours dans EduFlex.",
      content: `1. ACCROCHE (Promesse forte : résultat + délai + sans la frustration)
2. PROBLÈMES (Décrire la situation actuelle douloureuse du prospect)
3. SOLUTION (Présentation de votre formation et bénéfices immédiats)
4. PROGRAMME DÉTAILLÉ (Contenu des chapitres et modules)
5. BONUS (Offres complémentaires gratuites)
6. PREUVES SOCIALES (Témoignages de premiers élèves satisfaits)
7. TARIFS & PAIEMENT (Option en 1x ou X fois avec Mobile Money)
8. GARANTIE (Garantie de satisfaction 14 jours)
9. FAQ (Questions fréquentes avec réponses rapides)`
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Header Banner avec Filigrane Master */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900 p-6 md:p-8 space-y-4 shadow-lg shadow-teal-950/10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 filter contrast-125 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${heroMasterImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900 pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-3xl">
          <Badge className="bg-teal-500/10 text-teal-400 border-none text-[10px] uppercase font-bold py-1 px-3">
            🎓 ACADÉMIE DES FORMATEURS
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Espace Pédagogie & Succès
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Profitez de nos cours exclusifs et outils pratiques pour optimiser vos parcours d'apprentissage, rédiger vos pages de vente et booster l'engagement de vos étudiants.
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="bg-slate-900 border-slate-800 p-1 w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="courses" className="text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            <Video className="h-3.5 w-3.5 mr-1.5" /> Formations & Lives
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs font-bold py-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            <FileText className="h-3.5 w-3.5 mr-1.5" /> Boîte à Outils
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Formations & Masterclasses */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Player block (Left) */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-slate-800 bg-slate-900/40 text-left overflow-hidden">
                <div className="relative aspect-video bg-black flex items-center justify-center border-b border-slate-800">
                  {activeLesson.videoUrl ? (
                    <video
                      key={activeLesson.id}
                      src={activeLesson.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                      <PlayCircle className="h-12 w-12 text-teal-500 animate-pulse" />
                      <span className="text-xs">Chargement du cours vidéo...</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-bold uppercase">
                      {activeLesson.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-medium">Durée : {activeLesson.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{activeLesson.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{activeLesson.description}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                    <span>Intervenant : <strong className="text-slate-300">{activeLesson.speaker}</strong></span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Program Sidebar (Right) */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Programme de formation</h4>
              <div className="space-y-2">
                {lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex gap-3.5 items-start ${activeLessonId === lesson.id ? 'border-teal-500 bg-teal-500/5 shadow-sm shadow-teal-500/5' : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'}`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${activeLessonId === lesson.id ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <PlayCircle className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className={`text-xs font-semibold leading-snug truncate ${activeLessonId === lesson.id ? 'text-teal-400' : 'text-slate-200'}`}>{lesson.title}</p>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                        <span>{lesson.duration}</span>
                        <span>·</span>
                        <span>{lesson.speaker}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Qualiopi compliance banner */}
              <Card className="border-teal-500/25 bg-teal-950/10 text-left">
                <CardContent className="p-4 space-y-2 text-xs">
                  <h5 className="font-bold text-white flex items-center gap-1">
                    <Award className="h-4 w-4 text-teal-400" /> Qualité de Formation
                  </h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    EduFlex intègre des rapports d'assiduité exportables (durée de connexion et logs d'étapes) indispensables pour vos dossiers qualité.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Boite à Outils */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {resourceTemplates.map(tmpl => (
              <Card key={tmpl.id} className="border-slate-800 bg-slate-900/30 text-left flex flex-col justify-between">
                <CardHeader className="pb-3 border-b border-slate-800">
                  <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                    {tmpl.title}
                  </CardTitle>
                  <p className="text-[10px] text-slate-400 mt-1">{tmpl.description}</p>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all max-h-56">
                    {tmpl.content}
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(tmpl.content, tmpl.id)}
                    className="w-full h-8 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-800/40"
                  >
                    {copiedTextId === tmpl.id ? (
                      <>✓ Modèle Copié !</>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1.5" /> Copier le modèle textuel
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
