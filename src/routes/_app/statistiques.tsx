import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@blinkdotnew/ui'
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'
import { useDashboardStats, useAllEnrollments } from '@/hooks/useStats'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

export const Route = createFileRoute('/_app/statistiques')({
  component: StatistiquesPage,
})

const COLORS = ['hsl(225 73% 50%)', 'hsl(25 95% 53%)', 'hsl(262 52% 47%)', 'hsl(200 65% 45%)']

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <Card className="animate-fade-in border-border/80">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">{icon}</div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold mt-0.5">{value}</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{subtext}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatistiquesPage() {
  const { data: stats, isLoading } = useDashboardStats()
  const { data: allEnrollments } = useAllEnrollments()

  // Build REAL monthly inscriptions from actual enrollment data
  const monthlyData = (() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const counts: Record<number, number> = {}
    // Initialize all 12 months to 0
    for (let i = 0; i < 12; i++) counts[i] = 0

    // Count enrollments per month for the current year
    if (allEnrollments) {
      allEnrollments.forEach(e => {
        const d = new Date(e.enrolledAt)
        if (d.getFullYear() === currentYear) {
          counts[d.getMonth()] = (counts[d.getMonth()] || 0) + 1
        }
      })
    }
    return MONTH_LABELS.map((mois, i) => ({ mois, inscriptions: counts[i] || 0 }))
  })()

  // Build category pie chart data from real database stats
  const categoryData = stats?.categoryRevenue?.map(item => ({
    name: item.categorie || 'Général',
    value: item.revenus
  })).filter(c => c.value > 0) || []

  // Revenue in FCFA (prices stored directly as FCFA integers)
  const totalRevenueFcfa = stats ? stats.totalRevenue : 0
  const totalRevenueEur = Math.round(totalRevenueFcfa / 655.957)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground text-sm mt-1">Analysez les performances et l'activité de votre plateforme.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-10 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<BookOpen className="h-5 w-5" />} label="Formations actives" value={String(stats?.coursesCount || 0)} subtext="Formations publiées" />
          <StatCard icon={<Users className="h-5 w-5" />} label="Total apprenants" value={String(stats?.studentsCount || 0)} subtext="Inscrits sur la plateforme" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Taux de complétion" value={`${stats?.averageProgress || 0}%`} subtext="Progression moyenne" />
          <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Revenus total" value={`${totalRevenueFcfa.toLocaleString('fr-FR')} FCFA`} subtext={`~ ${totalRevenueEur.toLocaleString('fr-FR')} €`} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Monthly enrollment chart */}
        <Card className="animate-fade-in border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Inscriptions mensuelles {new Date().getFullYear()} (Données réelles)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(v: number) => [v, 'Inscriptions']} />
                  <Bar dataKey="inscriptions" fill="hsl(166 72% 40%)" radius={[6, 6, 0, 0]} name="Inscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category distribution chart */}
        <Card className="animate-fade-in border-border/80">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Répartition des revenus par catégorie</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] w-full flex items-center justify-center"><Skeleton className="h-44 w-44 rounded-full" /></div>
            ) : categoryData.length === 0 ? (
              <div className="h-[300px] w-full flex items-center justify-center text-xs text-muted-foreground italic">
                Aucun revenu généré pour le moment pour catégoriser la répartition.
              </div>
            ) : (
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} innerRadius={60} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
