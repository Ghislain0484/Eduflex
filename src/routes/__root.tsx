/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import type { ReactNode } from 'react'
import indexCss from '../index.css?url'

const queryClient = new QueryClient()

/**
 * Root route — owns the HTML document (SSR), global <head> (SEO-ready),
 * and the app-wide providers.
 *
 * NO app chrome (sidebar/top bar) is applied here by default, so every app —
 * landing pages, marketing sites, content, games — renders FULL-BLEED.
 * Building a SaaS / dashboard app? Opt into the sidebar shell by ADDING a
 * `src/routes/_app.tsx` pathless layout route with pages under `src/routes/_app/`
 * (a `_app.tsx` with no children conflicts with this index route). Keep this
 * root bare — don't add chrome here.
 *
 * SEO/AEO: <HeadContent /> renders the merged head() output (title, meta,
 * Open Graph, links) on the server, so crawlers and AI bots receive a
 * fully-rendered, indexable document on the first request. Per-page routes
 * override title/description via their own head().
 */
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { title: 'EduFlex — Plateforme LMS' },
      { name: 'description', content: 'EduFlex : la plateforme LMS moderne pour créer, gérer et vendre vos formations en ligne. Zéro installation, mises à jour gratuites, sans engagement.' },
      { name: 'theme-color', content: '#2251cc' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'EduFlex — Plateforme LMS' },
      { property: 'og:description', content: 'Créez, gérez et vendez vos formations en ligne avec EduFlex.' },
      { property: 'og:site_name', content: 'EduFlex' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: indexCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        {/*
          WebSite + Organization entity (rendered on every page, once at the root).
          Gives Google's Knowledge Graph + AI answer engines explicit, machine-
          readable identity. Replace name/url and add the brand's real profile
          links to `sameAs` (LinkedIn, GitHub, X, Crunchbase) per app.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                { '@type': 'WebSite', name: 'EduFlex', url: '/' },
                { '@type': 'Organization', name: 'EduFlex', url: '/', sameAs: [] },
              ],
            }),
          }}
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <BlinkUIProvider theme="linear" darkMode="system">
            <Toaster />
            {/*
              Full-bleed by default — NO app chrome. Child routes render directly.
              SaaS / dashboard app? Opt in by adding a `src/routes/_app.tsx` layout
              route with pages under `src/routes/_app/`. Landing pages, marketing
              sites, content, and games stay full-bleed.
            */}
            {children}
          </BlinkUIProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
