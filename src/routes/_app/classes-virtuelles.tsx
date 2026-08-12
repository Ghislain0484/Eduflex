import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardContent,
  Button,
  Input,
  Badge,
  toast,
} from '@blinkdotnew/ui'
import {
  Video,
  Users,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  Plus,
  Settings,
  Calendar,
  X,
  Lock,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import heroMasterImg from '@/assets/eduflex-hero-master.jpg'

export const Route = createFileRoute('/_app/classes-virtuelles')({
  component: ClassesVirtuellesPage,
})

export function ClassesVirtuellesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'classes' | 'settings'>('classes')

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [connectModalOpen, setConnectModalOpen] = useState(false)

  // Account plan logic: check if user is on DÉCOUVERTE plan
  const userPlan = user?.academyPlan || 'DECOUVERTE'
  const isPlanDecouverte = userPlan.toUpperCase() === 'DECOUVERTE'

  // Connect EduFlex Meet form state
  const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] || 'Ghislain')
  const [lastName, setLastName] = useState(user?.displayName?.split(' ')[1] || 'Agohi-Nguessan')
  const [email, setEmail] = useState(user?.email || 'gagohi06@gmail.com')
  const [subdomain, setSubdomain] = useState('55454618')
  const [isConnected, setIsConnected] = useState(false)

  // Demo Virtual classes list
  const [virtualClasses, setVirtualClasses] = useState<any[]>([])

  const features = [
    {
      id: 1,
      title: "Sessions en direct",
      description: "Planifiez et lancez vos classes virtuelles en quelques clics, avec ou sans inscription préalable.",
      icon: <Video className="h-5 w-5 text-teal-500" />
    },
    {
      id: 2,
      title: "Vos apprenants réunis",
      description: "Invitez automatiquement les apprenants inscrits à vos formations, sans saisie manuelle.",
      icon: <Users className="h-5 w-5 text-teal-500" />
    },
    {
      id: 3,
      title: "Émargement & Qualiopi",
      description: "Feuilles d'émargement signées par les participants et enquêtes de satisfaction pour une conformité sans effort.",
      icon: <FileCheck2 className="h-5 w-5 text-teal-500" />
    },
    {
      id: 4,
      title: "Résumé & transcription IA",
      description: "Transcription automatique et résumé généré par l'IA à l'issue de chaque session, pour ne rien perdre de vos échanges.",
      icon: <Sparkles className="h-5 w-5 text-teal-500" />
    },
    {
      id: 5,
      title: "Hébergement 100% sécurisé",
      description: "Vos sessions, données et enregistrements sont hébergés en toute sécurité dans le respect du RGPD.",
      icon: <ShieldCheck className="h-5 w-5 text-teal-500" />
    },
    {
      id: 6,
      title: "Tout au même endroit",
      description: "Retrouvez l'historique de vos sessions, les statistiques et le suivi de vos apprenants directement dans EduFlex.",
      icon: <LayoutGrid className="h-5 w-5 text-teal-500" />
    }
  ]

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnected(true)
    setConnectModalOpen(false)
    toast.success("Compte EduFlex Meet connecté avec succès !")
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Top Banner (Matching Screenshot 2) */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-teal-500/30 rounded-2xl shadow-xs gap-4">
        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
          Débloquer <strong className="text-teal-600 dark:text-teal-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
        </span>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs h-9 px-5 rounded-xl shadow-md border-none shrink-0">
          <Link to="/tarifs">
            Débloquer 💎
          </Link>
        </Button>
      </div>

      {/* Main Title & Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Vos classes virtuelles
        </h1>

        <Button 
          onClick={() => setCreateModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Créer une classe virtuelle
        </Button>
      </div>

      {/* Sub-navigation Tabs (Mes classes virtuelles / Paramètres) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'classes' ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Mes classes virtuelles
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'settings' ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Paramètres
        </button>
      </div>

      {/* TAB 1: MES CLASSES VIRTUELLES */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          {virtualClasses.length === 0 ? (
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 rounded-3xl text-center space-y-4 shadow-xs">
              <div className="h-16 w-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center mx-auto">
                <Video className="h-8 w-8" />
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Vous n'avez pas encore de classes virtuelles
                </h3>
                <p className="text-xs text-slate-500">
                  Cliquez sur le bouton ci-dessous pour en créer une dès maintenant.
                </p>
              </div>

              <div>
                <Button 
                  onClick={() => setCreateModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md"
                >
                  Créer une classe virtuelle
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {virtualClasses.map(item => (
                <Card key={item.id} className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PARAMÈTRES / CONNECT EDUFLEX MEET */}
      {activeTab === 'settings' && (
        <div className="space-y-8">
          <Card className="border border-teal-500/40 bg-slate-900 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            
            {/* Master Backdrop Watermark */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 filter contrast-125 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url(${heroMasterImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 text-xl sm:text-2xl font-black text-teal-400">
                <Video className="h-7 w-7" /> EduFlex Meet
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Organisez des classes virtuelles depuis EduFlex
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Connectez gratuitement votre compte EduFlex Meet pour organiser et gérer vos sessions de visioconférence avec vos apprenants, sans quitter votre espace formateur.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button 
                onClick={() => setConnectModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg"
              >
                {isConnected ? "Compte EduFlex Meet connecté ✓" : "Créer mon compte EduFlex Meet"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setConnectModalOpen(true)}
                className="text-xs h-10 px-6 rounded-xl text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
              >
                Se connecter à EduFlex Meet
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-400 pt-2 font-medium">
              <span>✓ Rapide</span>
              <span>•</span>
              <span>✓ Sécurisé</span>
              <span>•</span>
              <span>✓ Offre gratuite disponible</span>
              <span>•</span>
              <span>✓ Sans engagement</span>
            </div>
          </Card>

          {/* Features grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {features.map(item => (
              <Card key={item.id} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-3 text-left">
                <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: FORFAIT DÉCOUVERTE PLAN GUARD (Screenshot 4) */}
      {createModalOpen && isPlanDecouverte && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Créer une classe virtuelle</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Yellow Warning Box matching Screenshot 4 */}
              <div className="bg-amber-100/70 dark:bg-amber-950/40 border border-amber-400/80 dark:border-amber-600/60 p-6 rounded-2xl text-center space-y-3 shadow-xs">
                <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200 leading-relaxed max-w-sm mx-auto">
                  Votre forfait actuel (Forfait DÉCOUVERTE) ne vous permet pas d'avoir accès à cette fonctionnalité.
                </p>

                <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  Seuls ceux ayant un <strong>Forfait PRO ou supérieur</strong> peuvent bénéficier de cette fonctionnalité.
                </p>

                <div className="pt-2">
                  <Button 
                    asChild 
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-md border-none transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Link to="/tarifs" onClick={() => setCreateModalOpen(false)}>
                      Activer cette fonctionnalité ! 💎
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATION DE COMPTE EDUFLEX MEET (Screenshot 1) */}
      {connectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 text-left">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-black text-base shadow-md">
                E
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                EduFlex Meet × EduFlex
              </h3>
            </div>

            <form onSubmit={handleConnectSubmit} className="p-6 space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">Création de votre compte EduFlex Meet</h4>
                <p className="text-xs text-slate-500">Vérifiez et modifiez vos informations avant de créer votre compte.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prénom</label>
                  <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="text-xs h-9" required />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom</label>
                  <Input value={lastName} onChange={e => setLastName(e.target.value)} className="text-xs h-9" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} className="text-xs h-9" type="email" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sous-domaine</label>
                <div className="flex items-center">
                  <Input value={subdomain} onChange={e => setSubdomain(e.target.value)} className="text-xs h-9 rounded-r-none font-mono" required />
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 border border-l-0 border-slate-200 dark:border-slate-800 text-xs px-3 h-9 flex items-center rounded-r-lg font-mono">
                    .eduflex-meet.com
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-3">
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 rounded-xl">
                  Créer mon compte
                </Button>
                <Button type="button" variant="ghost" onClick={() => setConnectModalOpen(false)} className="w-full text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white h-9">
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
