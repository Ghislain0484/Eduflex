import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  Button,
  toast,
} from '@blinkdotnew/ui'
import {
  Video,
  Users,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/classes-virtuelles')({
  component: ClassesVirtuellesPage,
})

function ClassesVirtuellesPage() {
  const { user } = useAuth()

  const features = [
    {
      id: 1,
      title: "Sessions en direct",
      description: "Planifiez et lancez vos classes virtuelles en quelques clics, avec ou sans inscription préalable.",
      icon: <Video className="h-5 w-5 text-teal-400" />
    },
    {
      id: 2,
      title: "Vos apprenants réunis",
      description: "Invitez automatiquement les apprenants inscrits à vos formations, sans saisie manuelle.",
      icon: <Users className="h-5 w-5 text-teal-400" />
    },
    {
      id: 3,
      title: "Émargement & Qualiopi",
      description: "Feuilles d'émargement signées par les participants et enquêtes de satisfaction pour une conformité sans effort.",
      icon: <FileCheck2 className="h-5 w-5 text-teal-400" />
    },
    {
      id: 4,
      title: "Résumé & transcription IA",
      description: "Transcription automatique et résumé généré par l'IA à l'issue de chaque session, pour ne rien perdre de vos échanges.",
      icon: <Sparkles className="h-5 w-5 text-teal-400" />
    },
    {
      id: 5,
      title: "Hébergement 100% sécurisé",
      description: "Vos sessions, données et enregistrements sont hébergés en toute sécurité dans le respect du RGPD.",
      icon: <ShieldCheck className="h-5 w-5 text-teal-400" />
    },
    {
      id: 6,
      title: "Tout au même endroit",
      description: "Retrouvez l'historique de vos sessions, les statistiques et le suivi de vos apprenants directement dans EduFlex.",
      icon: <LayoutGrid className="h-5 w-5 text-teal-400" />
    }
  ]

  return (
    <div className="flex-1 space-y-8 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Upgrade Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
        </span>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
          <Link to="/tarifs">
            Débloquer 🫱
          </Link>
        </Button>
      </div>

      {/* Visio Hero Banner Card (Matching Screenshot 5) */}
      <Card className="border border-teal-500/30 bg-gradient-to-b from-teal-500/10 via-slate-900/50 to-slate-900 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto shadow-xl">
        <div className="inline-flex items-center gap-2 text-xl sm:text-2xl font-black text-teal-400">
          <Video className="h-7 w-7" /> EduFlex Meet
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Organisez des classes virtuelles depuis EduFlex
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Connectez gratuitement votre compte visio pour organiser et gérer vos sessions de visioconférence avec vos apprenants, sans quitter votre espace formateur.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button 
            onClick={() => toast.success("Creation d'un compte EduFlex Meet en cours...")}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg"
          >
            Créer un compte EduFlex Meet
          </Button>
          <Button 
            variant="outline"
            onClick={() => toast.info("Connexion visio EduFlex Meet...")}
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

      {/* Feature Grid Header (Matching Screenshot 5) */}
      <div className="text-center space-y-2 pt-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Bien plus qu'une simple visioconférence
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          EduFlex réunit tout ce dont vous avez besoin pour animer, sécuriser et valoriser vos classes virtuelles.
        </p>
      </div>

      {/* 6 Feature Cards Grid (Matching Screenshot 5) */}
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

      <div className="flex justify-center pt-4">
        <Button 
          onClick={() => toast.success("Lancement rapide de la visioconférence...")}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-10 px-8 rounded-xl"
        >
          Créer un compte EduFlex Meet
        </Button>
      </div>

    </div>
  )
}
