import { createFileRoute } from '@tanstack/react-router'
import { useTeachersList } from '@/hooks/useStats'
import { Card, CardContent, Badge, Button, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { GraduationCap, Mail } from 'lucide-react'

export const Route = createFileRoute('/_app/enseignants')({
  component: EnseignantsPage,
})

function EnseignantsPage() {
  const { data: teachers, isLoading } = useTeachersList()
  const teacherList = teachers || []

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des enseignants</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? 'Chargement...' : `${teacherList.length} enseignant(s) actif(s)`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-48 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : teacherList.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-8 w-8" />}
          title="Aucun enseignant"
          description="Aucun compte utilisateur ne possède le rôle d'enseignant (teacher) pour le moment."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teacherList.map(enseignant => {
            const name = enseignant.displayName || enseignant.email?.split('@')[0] || 'Enseignant'
            const initials = getInitials(name)
            return (
              <Card key={enseignant.id} className="animate-fade-in hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{name}</p>
                      <p className="text-sm text-muted-foreground">Formateur certifié</p>
                    </div>
                    <Badge variant="default" className="shrink-0">
                      Actif
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{enseignant.email}</span>
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={`mailto:${enseignant.email}`}>Contacter par email</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
