/**
 * SaaS Plan Validation Rules.
 * Defines structural limits for Free (Découverte), Pro, and B2B (EduFlex+) subscription tiers.
 */

export function canCreateMoreCourses(currentCount: number, plan: string | null | undefined): boolean {
  if (!plan) return currentCount < 2
  const activePlan = plan.toLowerCase()
  if (activePlan === 'free' || activePlan === 'découverte' || activePlan === 'decouverte') {
    return currentCount < 2
  }
  return true // Pro and B2B tiers support unlimited courses
}

export function canCustomizeBranding(plan: string | null | undefined): boolean {
  if (!plan) return false
  const activePlan = plan.toLowerCase()
  return activePlan === 'pro' || activePlan === 'b2b'
}

export function canUseCustomDomain(plan: string | null | undefined): boolean {
  if (!plan) return false
  const activePlan = plan.toLowerCase()
  return activePlan === 'b2b'
}
