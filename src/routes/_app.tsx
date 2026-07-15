import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SharedAppLayout } from '@/layouts/shared-app-layout'

export const Route = createFileRoute('/_app')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <SharedAppLayout appName="EduFlex">
      <Outlet />
    </SharedAppLayout>
  )
}
