import { useEffect } from 'react'

/**
 * Hook to inject dynamic brand colors (Hex value) into root CSS custom properties.
 * Overwrites tailwind primary variables so the entire layout adopts the brand theme.
 */
export function useBrandTheme(colorOverride?: string) {
  useEffect(() => {
    let brandColor = colorOverride || '#0d9488' // Default teal fallback

    if (typeof window !== 'undefined') {
      // 1. Try override color if provided
      if (!colorOverride) {
        // 2. Try to fetch academy color if saved
        const localAcademyColor = localStorage.getItem('academy_brand_color')
        if (localAcademyColor) {
          brandColor = localAcademyColor
        } else {
          // 3. Fall back to global platform admin settings color
          const globalConfig = localStorage.getItem('global_platform_config')
          if (globalConfig) {
            try {
              const parsed = JSON.parse(globalConfig)
              if (parsed.color) brandColor = parsed.color
            } catch {}
          }
        }
      }
    }

    // Helper to calculate rgb coordinates for Tailwind utility opacity filters (e.g. bg-primary/20)
    const hexToRgb = (hex: string): string => {
      const cleaned = hex.replace(/^#/, '')
      if (cleaned.length === 3) {
        const r = parseInt(cleaned[0] + cleaned[0], 16)
        const g = parseInt(cleaned[1] + cleaned[1], 16)
        const b = parseInt(cleaned[2] + cleaned[2], 16)
        return `${r} ${g} ${b}`
      } else if (cleaned.length === 6) {
        const r = parseInt(cleaned.substring(0, 2), 16)
        const g = parseInt(cleaned.substring(2, 4), 16)
        const b = parseInt(cleaned.substring(4, 6), 16)
        return `${r} ${g} ${b}`
      }
      return '13 148 136' // Default teal RGB coordinates fallback
    }

    const rgbValue = hexToRgb(brandColor)

    let styleElement = document.getElementById('dynamic-brand-theme') as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'dynamic-brand-theme'
      document.head.appendChild(styleElement)
    }

    styleElement.innerHTML = `
      :root {
        --primary: ${brandColor} !important;
        --ring: ${brandColor} !important;
        --primary-rgb: ${rgbValue} !important;
      }
      .bg-primary {
        background-color: ${brandColor} !important;
      }
      .text-primary {
        color: ${brandColor} !important;
      }
      .border-primary {
        border-color: ${brandColor} !important;
      }
      .hover\\:bg-primary\\/90:hover {
        background-color: ${brandColor}ee !important;
      }
      .hover\\:bg-primary\\/10:hover {
        background-color: rgba(${rgbValue}, 0.1) !important;
      }
      .focus-visible\\:ring-primary:focus-visible {
        --tw-ring-color: ${brandColor} !important;
      }
    `
  }, [colorOverride])
}
export default useBrandTheme
