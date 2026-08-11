import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import {
  Button,
  Avatar,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
} from '@blinkdotnew/ui'
import {
  Eye,
  Bell,
  HelpCircle,
  GraduationCap,
  ChevronDown,
  User,
  Gem,
  Globe,
  Share2,
  LogOut,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react'

export function AppTopHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Ghislain'
  const initials = displayName.slice(0, 2).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <TooltipProvider delayDuration={100}>
      <header className="sticky top-0 z-40 h-[52px] w-full border-b border-border/60 bg-background/95 backdrop-blur-md px-4 flex items-center justify-between shadow-2xs">
        
        {/* Left side empty or page context tag */}
        <div className="flex items-center gap-2">
          {user?.academyName && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-accent/50 px-2.5 py-1 rounded-full border border-border/40">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {user.academyName}
            </span>
          )}
        </div>

        {/* Right side Header Action Icons & User Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* 1. Aperçu Espace Public (Eye icon) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              >
                <Link to="/courses" target="_blank">
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Aperçu espace public</TooltipContent>
          </Tooltip>

          {/* 2. Notifications (Bell icon) */}
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-teal-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Notifications</TooltipContent>
            </Tooltip>

            {/* Notifications Popup */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 text-left space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-0.5">
                    <p className="font-bold text-teal-400">Bienvenue sur EduFlex !</p>
                    <p className="text-[10px] text-slate-400">Votre académie en ligne est prête à accueillir vos premiers apprenants.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Support & Aide (Question mark icon) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHelpOpen(true)}
                className="h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Centre d'aide & FAQ</TooltipContent>
          </Tooltip>

          {/* 4. Espace Apprenant (Graduation cap icon) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8.5 w-8.5 p-0 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              >
                <Link to="/courses">
                  <GraduationCap className="h-4.5 w-4.5 text-teal-400" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Espace apprenant</TooltipContent>
          </Tooltip>

          <div className="h-4 w-px bg-border/60 mx-1" />

          {/* 5. USER PROFILE DROPDOWN (Matching Teachizy Screenshot 1:1) */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-800/60 transition-colors text-left focus:outline-none"
            >
              <Avatar className="h-7 w-7 border border-teal-500/30">
                <AvatarFallback className="text-[11px] font-bold bg-teal-500/10 text-teal-400">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-bold text-slate-200 hidden sm:inline-block max-w-[120px] truncate">
                {displayName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu Container (Matching Teachizy Dropdown exactly) */}
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 text-left z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="py-1">
                  {/* Item 1: Mon compte */}
                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <User className="h-4 w-4 text-slate-400" /> Mon compte
                  </Link>

                  {/* Item 2: Abonnement */}
                  <Link
                    to="/tarifs"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <Gem className="h-4 w-4 text-amber-500" /> Abonnement
                  </Link>
                </div>

                <div className="py-1">
                  {/* Item 3: Espace apprenant */}
                  <Link
                    to="/courses"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <Globe className="h-4 w-4 text-teal-500" /> Espace apprenant
                  </Link>

                  {/* Item 4: Programme affilié */}
                  <Link
                    to="/affiliation"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <Share2 className="h-4 w-4 text-slate-400" /> Programme affilié
                  </Link>
                </div>

                <div className="py-1">
                  {/* Item 5: Déconnexion */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4 text-red-500" /> Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* Support / Help Modal Dialog */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-left space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-teal-400" /> Centre d'aide & Support EduFlex
              </h3>
              <button onClick={() => setHelpOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <p>Besoin d'aide pour configurer votre académie ou lancer vos cours ?</p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="font-bold text-white">📧 Email Support :</p>
                <a href="mailto:support@eduflex.com" className="text-teal-400 hover:underline">support@eduflex.com</a>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="font-bold text-white">🎓 Académie des Formateurs :</p>
                <Link to="/academy-hub" onClick={() => setHelpOpen(false)} className="text-teal-400 hover:underline">
                  Accéder aux masterclasses & guides →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}
