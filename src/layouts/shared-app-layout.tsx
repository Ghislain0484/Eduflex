/**
 * SaaS app chrome (sidebar + main) — OPT-IN, not the default.
 * The template root (__root.tsx) is full-bleed by default. To use this, ADD a
 * `src/routes/_app.tsx` pathless layout route that renders <SharedAppLayout>
 * and wrap pages under `src/routes/_app/` in it — give it children, since a
 * childless `_app.tsx` collides with the root index route. Do not wrap
 * individual pages in Shell or duplicate sidebars/top bars. Landing/marketing/
 * content apps don't need this at all.
 */
import React, { createContext, useContext } from 'react'
import { Shell } from '../Shell'
import { AppSidebarShell } from '../components/AppSidebarShell'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@blinkdotnew/ui'
import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export type SharedLayoutContextValue = {
  appName: string
}

const SharedLayoutContext = createContext<SharedLayoutContextValue | null>(null)

/** Use inside routes/pages that need app name or layout metadata — never for duplicating Shell. */
export function useSharedLayout(): SharedLayoutContextValue {
  const ctx = useContext(SharedLayoutContext)
  if (!ctx) {
    throw new Error('useSharedLayout must be used within SharedAppLayout')
  }
  return ctx
}

export type SharedAppLayoutProps = {
  appName?: string
  /** Override default sidebar; keep same flex structure as AppSidebarShell */
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function SharedAppLayout({
  appName = 'EduFlex',
  sidebar = <AppSidebarShell />,
  children,
}: SharedAppLayoutProps) {
  const { isAuthenticated, user } = useAuth()
  
  // Dynamic tenant-aware white-label branding resolver
  const [academyInfo, setAcademyInfo] = React.useState<{ name: string; color: string } | null>(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Check URL parameters
    const params = new URLSearchParams(window.location.search)
    const urlAcademy = params.get('academy')

    // 2. Check tenant subdomains (e.g. hec.eduflex.com)
    const host = window.location.hostname
    const parts = host.split('.')
    let tenantSubdomain = ''
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      tenantSubdomain = parts[0]
    }

    const academyKey = urlAcademy || tenantSubdomain

    if (academyKey) {
      const fetchBranding = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('academy_name, academy_color')
          .or(`academy_name.ilike.%${academyKey}%,display_name.ilike.%${academyKey}%`)
          .maybeSingle()

        if (!error && data && data.academy_name) {
          const info = {
            name: data.academy_name,
            color: data.academy_color || '#6366f1'
          }
          setAcademyInfo(info)
          localStorage.setItem('cached_academy_theme', JSON.stringify(info))
        }
      }
      fetchBranding()
    } else {
      try {
        const cached = localStorage.getItem('cached_academy_theme')
        if (cached) {
          const parsed = JSON.parse(cached)
          // Validate parsed object has expected shape before using
          if (parsed && typeof parsed.name === 'string' && typeof parsed.color === 'string') {
            setAcademyInfo(parsed)
          }
        }
      } catch {
        // Malformed JSON in localStorage — clear it to avoid repeated failures
        localStorage.removeItem('cached_academy_theme')
      }
    }
  }, [])

  // Load global platform config from settings
  const [globalPlatformName, setGlobalPlatformName] = React.useState('EduFlex')
  const [globalPlatformColor, setGlobalPlatformColor] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const globalConfig = localStorage.getItem('global_platform_config')
      if (globalConfig) {
        try {
          const parsed = JSON.parse(globalConfig)
          if (parsed.name) setGlobalPlatformName(parsed.name)
          if (parsed.color) setGlobalPlatformColor(parsed.color)
        } catch {}
      }
    }
  }, [])

  // Resolve branding: prioritize logged-in user profile, then resolved tenant info, then custom global platform name, then default appName
  const displayedAppName = user?.academyName || academyInfo?.name || globalPlatformName
  const activeColor = user?.academyColor || academyInfo?.color || globalPlatformColor || null

  const value = React.useMemo(() => ({ appName: displayedAppName }), [displayedAppName])

  React.useEffect(() => {
    if (typeof window !== 'undefined' && activeColor) {
      // Validate: only set CSS var for valid hex colors (3 or 6 digit)
      const hexRaw = activeColor.replace('#', '')
      const isValidHex = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hexRaw)
      if (!isValidHex) return

      document.documentElement.style.setProperty('--primary', activeColor)

      // Expand 3-digit hex to 6-digit for RGB parsing
      const hex6 = hexRaw.length === 3
        ? hexRaw.split('').map(c => c + c).join('')
        : hexRaw

      const r = parseInt(hex6.substring(0, 2), 16)
      const g = parseInt(hex6.substring(2, 4), 16)
      const b = parseInt(hex6.substring(4, 6), 16)
      document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`)
    }
  }, [activeColor])

  if (!isAuthenticated) {
    return (
      <SharedLayoutContext.Provider value={value}>
        <div className="flex min-h-dvh w-full flex-col bg-background text-foreground">
          {/* Top navigation for guest visitors */}
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg tracking-tight">{displayedAppName}</span>
              </Link>
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/95 text-primary-foreground">
                  <Link to="/register">S'inscrire gratuitement</Link>
                </Button>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </SharedLayoutContext.Provider>
    )
  }

  return (
    <SharedLayoutContext.Provider value={value}>
      <div className="flex min-h-dvh w-full flex-1 flex-col">
        <Shell appName={displayedAppName} sidebar={sidebar}>
          {children}
        </Shell>
      </div>
    </SharedLayoutContext.Provider>
  )
}
