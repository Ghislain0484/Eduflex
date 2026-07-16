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
  const value = React.useMemo(() => ({ appName }), [appName])
  const { isAuthenticated } = useAuth()

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
                <span className="font-bold text-lg tracking-tight">EduFlex</span>
              </Link>
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/95">
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
        <Shell appName={appName} sidebar={sidebar}>
          {children}
        </Shell>
      </div>
    </SharedLayoutContext.Provider>
  )
}
