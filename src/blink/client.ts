import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'teachizy-pro-saas-3p9u95nq',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_2HxFrh1jihNKF35z_QaPPTjRL6bG-DgW',
  authRequired: false,
  auth: { mode: 'managed' },
})
