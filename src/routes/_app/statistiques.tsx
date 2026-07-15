import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@blinkdotnew/ui'
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'
import { useDashboardStats } from '@/hooks/useStats'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

export const Route = createFileRoute('/_app/statistiques')({
  component: StatistiquesPage,
})

const monthlyData = [
  { mois: 'Jan', inscriptions: 45 }, { mois: 'Fév', inscriptions: 62 },
  { mois: 'Mar', inscriptions: 78 }, { mois: 'Avr', inscriptions: 95 },
  { mois: 'Mai', inscriptions: 120 }, { mois: 'Jun', inscriptions: 145 },
  { mois: 'Jul', inscriptions: 168 }, { mois: 'Aoû', inscriptions: 182 },
  { mois: 'Sep', inscriptions: 210 }, { mois: 'Oct', inscriptions: 245 },
  { mois: 'Nov', inscriptions: 278 }, { mois: 'Déc', inscriptions: 310 },
]

const COLORS = ['hsl(225 73% 50%)', 'hsl(25 95% 53%)', 'hsl(262 52% 47%)', 'hsl(200 65% 45%)']

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

  // Build category pie chart data from real database stats
  const categoryData = stats?.categoryRevenue?.map(item => ({
    name: item.categorie || 'Général',
    value: item.revenus
  })).filter(c => c.value > 0) || []

  // Default values if loading or empty
  const totalRevenueEur = stats ? stats.totalRevenue / 100 : 0
  const totalRevenueXof = Math.round(totalRevenueEur * 655.957)

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
          <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Revenus total" value={`${totalRevenueEur.toLocaleString('fr-FR')} €`} subtext={`~ ${totalRevenueXof.toLocaleString('fr-FR')} F CFA`} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Monthly enrollment chart */}
        <Card className="animate-fade-in border-border/80">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Inscriptions mensuelles (Vue globale)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="inscriptions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Inscriptions" />
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
