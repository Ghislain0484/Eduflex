/**
 * Collapsible SaaS sidebar — OPT-IN (rendered by SharedAppLayout, which the
 * template root does NOT apply by default). Only reach for this when building a
 * SaaS / dashboard app; landing & marketing pages stay full-bleed.
 *
 * Expands to 15rem, collapses to 3rem (icon-only).
 * State is persisted to localStorage. Tooltips appear automatically when collapsed.
 *
 * NOTE: We bypass @blinkdotnew/ui <Sidebar> because it wraps all children in a
 * single overflow-y-auto div, making flex-1/shrink-0 on children no-ops.
 * This native flex-col implementation gives full layout control.
 */
import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import {
  Avatar,
  AvatarFallback,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@blinkdotnew/ui'
import {
  Home,
  Sparkles,
  Users,
  Calendar,
  BarChart3,
  GraduationCap,
  BookOpen,
  Video,
  Layers,
  Wallet,
  Percent,
  Megaphone,
  Palette,
  Share2,
  Code2,
  Gem,
  Settings,
  Building,
  ShieldAlert,
  CreditCard,
  User,
  LogOut,
  PanelLeft,
  Sun,
  Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SIDEBAR_KEY = 'sidebar_collapsed'

const ROLE_MAP = {
  student: 'Élève',
  teacher: 'Enseignant',
  admin: 'Admin',
}

interface NavItemDef {
  href: string
  icon: ReactNode
  label: string
  badge?: string
}

function NavItem({ item, collapsed }: { item: NavItemDef; collapsed: boolean }) {
  const location = useLocation()
  const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
  const link = (
    <a
      href={item.href}
      className={cn(
        'flex items-center gap-2.5 rounded-md text-sm transition-colors cursor-pointer',
        collapsed ? 'justify-center w-8 h-8 mx-auto' : 'px-3 py-2 w-full',
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <span className="shrink-0">{item.icon}</span>
      {!collapsed && (
        <span className="truncate flex-1 flex items-center justify-between">
          <span>{item.label}</span>
          {item.badge && (
            <span className="text-[9px] font-extrabold bg-red-500/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-tighter ml-1">
              {item.badge}
            </span>
          )}
        </span>
      )}
    </a>
  )
  if (!collapsed) return link
  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}

export function AppSidebarShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(SIDEBAR_KEY) === 'true'
  })

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // 17 MENU ITEMS MATCHING TEACHIZY MOCKUP SIDEBAR 1:1
  const isTeacherOrAdmin = user?.role === 'teacher' || user?.role === 'admin'

  const navItems: NavItemDef[] = [
    { href: '/dashboard', icon: <Home className="h-4 w-4" />, label: 'Accueil' },
    ...(isTeacherOrAdmin ? [
      { href: '/assistants-ia', icon: <Sparkles className="h-4 w-4" />, label: 'Assistants IA' },
      { href: '/communaute', icon: <Users className="h-4 w-4" />, label: 'Communauté' },
      { href: '/calendrier', icon: <Calendar className="h-4 w-4" />, label: 'Calendrier', badge: 'Nouveau' },
      { href: '/statistiques', icon: <BarChart3 className="h-4 w-4" />, label: 'Statistiques' },
      { href: '/eleves', icon: <GraduationCap className="h-4 w-4" />, label: 'Apprenants' },
      { href: '/manage-courses', icon: <BookOpen className="h-4 w-4" />, label: 'Formations' },
      { href: '/classes-virtuelles', icon: <Video className="h-4 w-4" />, label: 'Classes virtuelles', badge: 'Nouveau' },
      { href: '/packs', icon: <Layers className="h-4 w-4" />, label: 'Packs' },
      { href: '/paiements', icon: <Wallet className="h-4 w-4" />, label: 'Ventes' },
      { href: '/codes-promo', icon: <Percent className="h-4 w-4" />, label: 'Codes promo' },
      { href: '/outils-marketing', icon: <Megaphone className="h-4 w-4" />, label: 'Outils Marketing' },
      { href: '/settings', icon: <Palette className="h-4 w-4" />, label: 'Personnalisation' },
      { href: '/affiliation', icon: <Share2 className="h-4 w-4" />, label: 'Affiliation' },
      { href: '/integrations', icon: <Code2 className="h-4 w-4" />, label: 'Intégrations externes' },
      { href: '/academy-hub', icon: <GraduationCap className="h-4 w-4 text-amber-500" />, label: 'Académie EduFlex 🎓' },
    ] : []),
    { href: '/tarifs', icon: <Gem className="h-4 w-4 text-emerald-500" />, label: 'Nos offres' },
    { href: '/settings', icon: <Settings className="h-4 w-4" />, label: 'Paramètres' },
    ...(user?.role === 'admin' ? [
      { href: '/academies', icon: <Building className="h-4 w-4" />, label: 'Académies B2B' },
      { href: '/admin-settings', icon: <ShieldAlert className="h-4 w-4" />, label: 'Console Admin' }
    ] : []),
  ]

  const toggle = useCallback(() => {
    setCollapsed(v => {
      const next = !v
      localStorage.setItem(SIDEBAR_KEY, String(next))
      return next
    })
  }, [])

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          'flex flex-col h-full bg-background border-r border-border overflow-hidden',
          'transition-[width] duration-200 ease-linear shrink-0',
          collapsed ? 'w-[3rem]' : 'w-[15rem]'
        )}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div
          className={cn(
            'flex items-center gap-2 shrink-0 border-b border-border h-[52px] px-3',
            collapsed && 'justify-center px-2'
          )}
        >
          {!collapsed && (
            <>
              <div 
                className="flex items-center justify-center h-7 w-7 rounded-md text-white text-xs font-bold shrink-0 bg-primary"
                style={user?.academyColor ? { backgroundColor: user.academyColor } : {}}
              >
                {(user?.academyName || 'E')[0].toUpperCase()}
              </div>
              <span className="flex-1 font-semibold text-sm truncate">
                {user?.academyName || 'EduFlex'}
              </span>
            </>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 animate-none" /> : <Moon className="h-4 w-4 animate-none" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={toggle}
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? 'Développer la barre' : 'Réduire la barre'}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ── Nav Items ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map(item => (
            <NavItem key={item.href + item.label} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* ── User Footer ───────────────────────────────── */}
        <div className="shrink-0 border-t border-border p-2">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 mx-auto flex items-center justify-center text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    logout()
                    navigate({ to: '/login' })
                  }}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Déconnexion</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-xs font-semibold">
                  {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {ROLE_MAP[user?.role || 'student']}
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      logout()
                      navigate({ to: '/login' })
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Déconnexion</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
