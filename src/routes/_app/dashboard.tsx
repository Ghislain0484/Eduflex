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
import { useDashboardStats, useRecentEnrollments } from '@/hooks/useStats'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { Sparkles } from 'lucide-react'

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
  title: string; value: React.ReactNode; trend: number; trendLabel: string; icon: React.ReactNode
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
  const { user } = useAuth()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: recentEnrollments, isLoading: enrollmentsLoading } = useRecentEnrollments()

  if (user?.academyName && !user.approved) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-background min-h-[85vh]">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in border border-border bg-card p-8 rounded-2xl shadow-xl">
          <div className="mx-auto h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">Félicitations, votre inscription a été prise en compte !</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Votre demande de création d'académie en ligne pour <strong className="text-foreground">{user.academyName}</strong> est actuellement en cours de validation par notre équipe d'administrateurs.
            </p>
          </div>
          <Card className="border border-border/80 bg-accent/40 text-left">
            <CardContent className="pt-6 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                📌 Prochaines étapes :
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Validation de vos informations par l'administrateur de la plateforme (sous 24h).</li>
                <li>Activation de vos fonctionnalités d'enseignement et de personnalisation en marque blanche.</li>
                <li>Notification automatique par e-mail dès que votre espace sera opérationnel.</li>
              </ul>
            </CardContent>
          </Card>
          <div className="text-[11px] text-muted-foreground">
            Besoin d'aide ? Contactez notre support technique à <a href="mailto:support@eduflex.com" className="text-primary hover:underline font-semibold">support@eduflex.com</a>
          </div>
        </div>
      </div>
    )
  }

  const barChartData = stats?.categoryRevenue && stats.categoryRevenue.length > 0
    ? stats.categoryRevenue
    : [{ categorie: 'Aucun cours', revenus: 0 }]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble de votre plateforme EduFlex</p>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-8 w-36" /></CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Formations actives" value={String(stats?.coursesCount ?? 0)} trend={0} trendLabel="Formations publiées" icon={<BookOpen className="h-5 w-5" />} />
          <KpiCard title="Apprenants" value={String(stats?.studentsCount ?? 0)} trend={0} trendLabel="Élèves inscrits" icon={<Users className="h-5 w-5" />} />
          <KpiCard 
            title="Revenus" 
            value={
              <div className="flex flex-col items-start leading-tight">
                <span>{((stats?.totalRevenue || 0) / 100).toLocaleString('fr-FR')} €</span>
                {stats?.totalRevenue ? (
                  <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                    ~ {Math.round(((stats.totalRevenue || 0) / 100) * 655.957).toLocaleString('fr-FR')} F CFA
                  </span>
                ) : null}
              </div>
            } 
            trend={0} 
            trendLabel="Ventes totales" 
            icon={<Euro className="h-5 w-5" />} 
          />
          <KpiCard title="Taux de complétion" value={`${stats?.averageProgress ?? 0} %`} trend={0} trendLabel="Progression moyenne" icon={<TrendingUp className="h-5 w-5" />} />
        </div>
      )}

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
                <BarChart data={barChartData}>
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
            <CardTitle className="text-base font-semibold">Inscriptions récentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {enrollmentsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-4 w-48" /><Skeleton className="h-3 w-32" /></div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentEnrollments && recentEnrollments.length > 0 ? (
            <div className="space-y-1">
              {recentEnrollments.map((enrollment, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{enrollment.studentName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      S'est inscrit à : <span className="font-medium text-foreground">{enrollment.courseTitle}</span> · {new Date(enrollment.enrolledAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {((enrollment.coursePrice || 0) / 100).toLocaleString('fr-FR')} €
                    </Badge>
                    {enrollment.coursePrice > 0 && (
                      <span className="text-[9px] text-muted-foreground mt-0.5">
                        ~ {Math.round(((enrollment.coursePrice || 0) / 100) * 655.957).toLocaleString('fr-FR')} F CFA
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">Aucune inscription pour le moment</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
