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
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  CreditCard,
  LogOut,
  PanelLeft,
  BookOpen,
  Sun,
  Moon,
  Building,
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
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <span className="shrink-0">{item.icon}</span>
      {!collapsed && <span className="truncate">{item.label}</span>}
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

  const navItems: NavItemDef[] = [
    { href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Tableau de bord' },
    ...((user?.role === 'teacher' || user?.role === 'admin') ? [
      { href: '/manage-courses', icon: <BookOpen className="h-4 w-4" />, label: 'Gérer les formations' }
    ] : []),
    ...(user?.role === 'admin' ? [
      { href: '/academies', icon: <Building className="h-4 w-4" />, label: 'Académies B2B' }
    ] : []),
    { href: '/eleves', icon: <Users className="h-4 w-4" />, label: 'Élèves' },
    { href: '/enseignants', icon: <GraduationCap className="h-4 w-4" />, label: 'Enseignants' },
    { href: '/statistiques', icon: <BarChart3 className="h-4 w-4" />, label: 'Statistiques' },
    { href: '/paiements', icon: <CreditCard className="h-4 w-4" />, label: 'Paiements' },
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
                <PanelLeft
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    collapsed && 'rotate-180'
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ── Nav (only this section scrolls) ───────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-0.5">
          {!collapsed && (
            <p className="px-3 pt-1 pb-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Navigation
            </p>
          )}
          {navItems.map(item => (
            <NavItem key={item.href} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* ── Footer (always pinned to bottom) ──────────── */}
        <div
          className={cn(
            'shrink-0 border-t border-border',
            collapsed ? 'flex flex-col items-center gap-1 p-2' : 'p-3 space-y-1'
          )}
        >
          {/* User row */}
          {(() => {
            const displayedRoleLabel = user?.academyName 
              ? (user.approved ? 'Gérant Académie' : 'Académie (En attente)')
              : (ROLE_MAP[user?.role || 'student'] || 'Apprenant');

            if (collapsed) {
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors cursor-pointer">
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback className="text-[10px] bg-muted">
                          {(user?.displayName || 'U')[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {user?.displayName || 'Utilisateur'} ({displayedRoleLabel}) · {user?.email || ''}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <button className="flex items-center gap-2 rounded-md hover:bg-accent transition-colors cursor-pointer w-full px-2 py-1.5">
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback className="text-[10px] bg-muted">
                    {(user?.displayName || 'U')[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium leading-tight truncate">
                    {user?.displayName || 'Utilisateur'}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight truncate">
                    {displayedRoleLabel} · {user?.email || 'Non connecté'}
                  </p>
                </div>
              </button>
            )
          })()}

          {/* Sign out or Sign in */}
          {!user ? (
            collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-primary hover:text-primary/80"
                    onClick={() => navigate({ to: '/login' })}
                  >
                    <LogOut className="h-4 w-4 shrink-0 rotate-180 text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Se connecter</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-start px-2 gap-2 text-primary border-primary/20 hover:bg-primary/5"
                onClick={() => navigate({ to: '/login' })}
              >
                <LogOut className="h-4 w-4 shrink-0 rotate-180" />
                Se connecter
              </Button>
            )
          ) : collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  onClick={async () => {
                    await logout()
                    navigate({ to: '/' })
                  }}
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Se déconnecter</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2 gap-2 text-muted-foreground hover:text-foreground"
              onClick={async () => {
                await logout()
                navigate({ to: '/' })
              }}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Se déconnecter
            </Button>
          )}

        </div>
      </div>
    </TooltipProvider>
  )
}
