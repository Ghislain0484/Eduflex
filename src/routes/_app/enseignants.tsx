import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, Badge, Button } from '@blinkdotnew/ui'
import { GraduationCap, Plus, BookOpen, Mail } from 'lucide-react'

export const Route = createFileRoute('/_app/enseignants')({
  component: EnseignantsPage,
})

const MOCK_ENSEIGNANTS = [
  { id: 1, name: 'Prof. Martin', initials: 'PM', speciality: 'Marketing Digital', courses: 5, email: 'martin@eduflex.fr', status: 'Actif' },
  { id: 2, name: 'Dr. Sophie Laurent', initials: 'SL', speciality: 'Business & Stratégie', courses: 3, email: 'laurent@eduflex.fr', status: 'Actif' },
  { id: 3, name: 'Prof. Jean Dubois', initials: 'JD', speciality: 'Data & Analytics', courses: 4, email: 'dubois@eduflex.fr', status: 'Actif' },
  { id: 4, name: 'Mme Claire Rousseau', initials: 'CR', speciality: 'Communication', courses: 2, email: 'rousseau@eduflex.fr', status: 'Inactif' },
]

function EnseignantsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des enseignants</h1>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_ENSEIGNANTS.length} enseignants actifs</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Inviter un enseignant</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_ENSEIGNANTS.map(enseignant => (
          <Card key={enseignant.id} className="animate-fade-in hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                  {enseignant.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{enseignant.name}</p>
                  <p className="text-sm text-muted-foreground">{enseignant.speciality}</p>
                </div>
                <Badge variant={enseignant.status === 'Actif' ? 'default' : 'secondary'} className="shrink-0">
                  {enseignant.status}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{enseignant.courses} formations</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{enseignant.email}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Voir profil</Button>
                <Button variant="ghost" size="sm" className="flex-1">Contacter</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
