//#region src/utils/planGuards.ts
/**
* SaaS Plan Validation Rules.
* Defines structural limits for Free (Découverte), Pro, and B2B (EduFlex+) subscription tiers.
*/
function canCreateMoreCourses(currentCount, plan) {
	if (!plan) return currentCount < 2;
	const activePlan = plan.toLowerCase();
	if (activePlan === "free" || activePlan === "découverte" || activePlan === "decouverte") return currentCount < 2;
	return true;
}
function canCustomizeBranding(plan) {
	if (!plan) return false;
	const activePlan = plan.toLowerCase();
	return activePlan === "pro" || activePlan === "b2b";
}
//#endregion
export { canCustomizeBranding as n, canCreateMoreCourses as t };
