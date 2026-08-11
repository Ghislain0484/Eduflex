/**
 * Shell — Mobile-responsive app layout with topbar header.
 */
import React from 'react'
import {
  AppShell,
  AppShellSidebar,
  AppShellMain,
  MobileSidebarTrigger,
} from '@blinkdotnew/ui'
import { AppTopHeader } from './components/AppTopHeader'

interface ShellProps {
  /** Sidebar content — e.g. <Sidebar><SidebarItem .../></Sidebar> */
  sidebar: React.ReactNode
  /** App name shown in mobile header */
  appName?: string
  children: React.ReactNode
}

export function Shell({ sidebar, appName = 'App', children }: ShellProps) {
  return (
    <AppShell>
      {/* Sidebar — hidden on mobile, always visible on md+. */}
      <AppShellSidebar className="shrink-0">
        {sidebar}
      </AppShellSidebar>

      {/* Main content */}
      <AppShellMain className="flex flex-col flex-1 min-h-screen">
        {/* Top Header Bar */}
        <AppTopHeader />

        {/* Mobile header — hamburger + app name, only shown below md breakpoint */}
        <div className="md:hidden flex items-center gap-3 px-4 h-12 border-b border-border bg-background sticky top-13 z-30">
          <MobileSidebarTrigger />
          <span className="font-semibold text-sm">{appName}</span>
        </div>

        {/* Page content */}
        <div className="flex-1">
          {children}
        </div>
      </AppShellMain>
    </AppShell>
  )
}
