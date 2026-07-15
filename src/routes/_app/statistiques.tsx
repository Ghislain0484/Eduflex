import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '@blinkdotnew/ui'
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'
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

const categoryData = [
  { name: 'Marketing', value: 35 },
  { name: 'Business', value: 28 },
  { name: 'Productivité', value: 20 },
  { name: 'Technique', value: 17 },
]

const COLORS = ['hsl(225 73% 50%)', 'hsl(25 95% 53%)', 'hsl(262 52% 47%)', 'hsl(200 65% 45%)']

function StatCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: string }) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs text-emerald-600 font-medium">{change}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatistiquesPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground text-sm mt-1">Analysez les performances de votre plateforme</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<BookOpen className="h-5 w-5" />} label="Formations actives" value="24" change="+3 ce mois" />
        <StatCard icon={<Users className="h-5 w-5" />} label="Total apprenants" value="1 247" change="+89 ce mois" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Taux de réussite" value="87%" change="+2.3%" />
        <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Revenus total" value="27 100 €" change="+15.2%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Inscriptions par mois</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="inscriptions" fill="hsl(225 73% 50%)" radius={[6, 6, 0, 0]} name="Inscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Répartition par catégorie</CardTitle></CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
