import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Skeleton,
} from '@blinkdotnew/ui'
import {
  BookOpen,
  Users,
  Euro,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useCourses } from '@/hooks/useCourses'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
})

const enrollmentData = [
  { mois: 'Jan', inscriptions: 45 },
  { mois: 'Fév', inscriptions: 62 },
  { mois: 'Mar', inscriptions: 78 },
  { mois: 'Avr', inscriptions: 95 },
  { mois: 'Mai', inscriptions: 120 },
  { mois: 'Jun', inscriptions: 145 },
  { mois: 'Jul', inscriptions: 168 },
  { mois: 'Aoû', inscriptions: 182 },
  { mois: 'Sep', inscriptions: 210 },
  { mois: 'Oct', inscriptions: 245 },
  { mois: 'Nov', inscriptions: 278 },
  { mois: 'Déc', inscriptions: 310 },
]

const revenueData = [
  { categorie: 'Marketing', revenus: 8500 },
  { categorie: 'Business', revenus: 12400 },
  { categorie: 'Productivité', revenus: 6200 },
]

function KpiCard({ title, value, trend, trendLabel, icon }: {
  title: string; value: string; trend: number; trendLabel: string; icon: React.ReactNode
}) {
  const isPositive = trend >= 0
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            {icon}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" /> : <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
          <span className={cn('text-xs font-semibold', isPositive ? 'text-emerald-600' : 'text-red-500')}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          <span className="text-xs text-muted-foreground">{trendLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardPage() {
  const { data: courses, isLoading } = useCourses()

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble de votre plateforme EduFlex</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Formations" value="24" trend={12} trendLabel="vs mois dernier" icon={<BookOpen className="h-5 w-5" />} />
        <KpiCard title="Apprenants" value="1 247" trend={8.3} trendLabel="vs mois dernier" icon={<Users className="h-5 w-5" />} />
        <KpiCard title="Revenus" value="27 100 €" trend={15.2} trendLabel="vs mois dernier" icon={<Euro className="h-5 w-5" />} />
        <KpiCard title="Taux de complétion" value="78,4 %" trend={-2.1} trendLabel="vs mois dernier" icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Évolution des inscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorInscriptions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(225 73% 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(225 73% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '13px' }} />
                  <Area type="monotone" dataKey="inscriptions" stroke="hsl(225 73% 50%)" strokeWidth={2} fill="url(#colorInscriptions)" name="Inscriptions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenus par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="categorie" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '13px' }} formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Revenus']} />
                  <Bar dataKey="revenus" fill="hsl(25 95% 53%)" radius={[6, 6, 0, 0]} name="Revenus" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Formations récentes</CardTitle>
            <a href="/courses" className="text-xs text-primary hover:underline font-medium">Voir tout →</a>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-4 w-48" /><Skeleton className="h-3 w-32" /></div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="space-y-1">
              {courses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.category || 'Général'} · {course.durationHours || 0}h</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{((Number(course.price) || 0) / 100).toLocaleString('fr-FR')} €</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">Aucune formation pour le moment</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
