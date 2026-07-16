import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Skeleton,
  EmptyState,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@blinkdotnew/ui'
import { toast } from '@blinkdotnew/ui'
import { useUserCourses, useManageCourses } from '@/hooks/useCourses'
import { useChapters, useManageChapters } from '@/hooks/useChapters'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import {
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  ListPlus,
  ArrowLeft,
  Loader2,
  Settings,
  Percent,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react'

export const Route = createFileRoute('/_app/manage-courses')({
  component: ManageCoursesPage,
})

const CATEGORIES = ['Marketing', 'Business', 'Productivité']
const LEVELS = [
  { value: 'debutant', label: 'Débutant' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
]

function ManageCoursesPage() {
  const { data: courses, isLoading } = useUserCourses()
  const { createCourse, updateCourse, deleteCourse } = useManageCourses()
  const { user } = useAuth()

  const [view, setView] = useState<'list' | 'create' | 'edit' | 'chapters'>('list')
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
  
  // Tab controller for list view
  const [activeTab, setActiveTab] = useState<'courses' | 'commissions'>('courses')

  // Affiliate management states
  const [allReferrals, setAllReferrals] = useState<any[]>([])
  const [referralsLoading, setReferralsLoading] = useState(false)

  // Payout management states
  const [payoutRequests, setPayoutRequests] = useState<any[]>([])
  const [payoutsLoading, setPayoutsLoading] = useState(false)
  const [payoutDetails, setPayoutDetails] = useState('')
  const [requestAmount, setRequestAmount] = useState('')

  // Instructor sales tracking states
  const [instructorSales, setInstructorSales] = useState<any[]>([])
  const [salesLoading, setSalesLoading] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Marketing')
  const [level, setLevel] = useState('debutant')
  const [price, setPrice] = useState('') // In EUR, e.g. 29.99
  const [durationHours, setDurationHours] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('publie')

  const fetchAllReferrals = async () => {
    if (!user) return
    setReferralsLoading(true)
    try {
      const { data, error } = await supabase
        .from('affiliate_referrals')
        .select(`
          id,
          referrer_id,
          referred_email,
          course_id,
          commission_amount,
          status,
          created_at,
          courses (
            title,
            user_id
          ),
          profiles:referrer_id (
            display_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Filter referrals to show only those belonging to the current teacher's courses
      // (Admins see all)
      const instructorReferrals = (data || []).filter((ref: any) => {
        return ref.courses?.user_id === user.id || user.role === 'admin'
      })

      setAllReferrals(instructorReferrals)
    } catch (err) {
      console.error(err)
    } finally {
      setReferralsLoading(false)
    }
  }

  useEffect(() => {
    if (view === 'list' && activeTab === 'commissions') {
      fetchAllReferrals()
    }
  }, [view, activeTab, user])

  const handleMarkAsPaid = async (referralId: number) => {
    try {
      const { error } = await supabase
        .from('affiliate_referrals')
        .update({ status: 'paye' })
        .eq('id', referralId)

      if (error) throw error
      toast.success('Commission marquée comme payée !')
      fetchAllReferrals()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la modification.')
    }
  }

  const fetchPayoutRequests = async () => {
    if (!user) return
    setPayoutsLoading(true)
    try {
      let query = supabase
        .from('payout_requests')
        .select(`
          id,
          amount,
          payment_details,
          status,
          created_at,
          profiles (
            display_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (user.role !== 'admin') {
        query = query.eq('user_id', user.id)
      }

      const { data, error } = await query
      if (error) throw error
      setPayoutRequests(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setPayoutsLoading(false)
    }
  }

  const fetchInstructorSales = async () => {
    if (!user) return
    setSalesLoading(true)
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          enrolled_at,
          course_id,
          courses (
            title,
            price,
            user_id
          ),
          profiles (
            display_name,
            email
          )
        `)

      if (error) throw error

      const filteredSales = (data || []).filter((item: any) => {
        return item.courses?.user_id === user.id || user.role === 'admin'
      })

      setInstructorSales(filteredSales)
    } catch (err) {
      console.error(err)
    } finally {
      setSalesLoading(false)
    }
  }

  useEffect(() => {
    if (view === 'list' && activeTab === 'payouts') {
      fetchPayoutRequests()
      fetchInstructorSales()
    }
  }, [view, activeTab, user])

  const handleRequestPayout = async (e: React.FormEvent, maxAvailable: number) => {
    e.preventDefault()
    if (!user || !payoutDetails.trim()) return
    const parsedAmount = Math.round(parseFloat(requestAmount) * 100)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Montant de retrait invalide.')
      return
    }
    if (parsedAmount > maxAvailable) {
      toast.error('Le montant demandé dépasse votre solde disponible.')
      return
    }

    try {
      const { error } = await supabase
        .from('payout_requests')
        .insert([{
          user_id: user.id,
          amount: parsedAmount,
          payment_details: payoutDetails.trim(),
          status: 'en_attente'
        }])

      if (error) throw error
      toast.success('Demande de reversement soumise !')
      setPayoutDetails('')
      setRequestAmount('')
      fetchPayoutRequests()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la soumission.')
    }
  }

  const handleValidatePayout = async (payoutId: number) => {
    try {
      const { error } = await supabase
        .from('payout_requests')
        .update({ status: 'valide' })
        .eq('id', payoutId)

      if (error) throw error
      toast.success('Reversement validé avec succès !')
      fetchPayoutRequests()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la validation.')
    }
  }

  const openCreateForm = () => {
    setTitle('')
    setDescription('')
    setCategory('Marketing')
    setLevel('debutant')
    setPrice('')
    setDurationHours('')
    setImageUrl('')
    setStatus('publie')
    setView('create')
  }

  const openEditForm = (course: any) => {
    setSelectedCourseId(course.id)
    setTitle(course.title || '')
    setDescription(course.description || '')
    setCategory(course.category || 'Marketing')
    setLevel(course.level || 'debutant')
    setPrice(String((course.price || 0) / 100))
    setDurationHours(String(course.durationHours || 0))
    setImageUrl(course.imageUrl || '')
    setStatus(course.status || 'publie')
    setView('edit')
  }

  const openChaptersManager = (courseId: number) => {
    setSelectedCourseId(courseId)
    setView('chapters')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedPrice = Math.round(parseFloat(price) * 100)
    if (isNaN(parsedPrice)) {
      toast.error('Prix invalide.')
      return
    }

    const payload = {
      title,
      description: description || null,
      category,
      level,
      price: parsedPrice,
      durationHours: parseInt(durationHours) || 0,
      imageUrl: imageUrl || null,
      status,
    }

    if (view === 'create') {
      createCourse.mutate(payload, {
        onSuccess: () => {
          toast.success('Formation créée avec succès !')
          setView('list')
        },
        onError: (err) => {
          toast.error(err.message || 'Erreur lors de la création.')
        },
      })
    } else if (view === 'edit' && selectedCourseId != null) {
      updateCourse.mutate(
        { ...payload, id: selectedCourseId },
        {
          onSuccess: () => {
            toast.success('Formation mise à jour !')
            setView('list')
          },
          onError: (err) => {
            toast.error(err.message || "Erreur lors de la mise à jour.")
          },
        }
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible.')) {
      deleteCourse.mutate(id, {
        onSuccess: () => {
          toast.success('Formation supprimée.')
        },
      })
    }
  }

  if (view === 'chapters' && selectedCourseId != null) {
    const activeCourse = courses?.find((c) => c.id === selectedCourseId)
    return (
      <ChaptersManagerSection
        course={activeCourse}
        onBack={() => setView('list')}
      />
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Gestion Formateur</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gérez vos cours, planifiez vos modules et validez les commissions d'affiliation.
              </p>
            </div>
            {activeTab === 'courses' && (
              <Button 
                onClick={openCreateForm} 
                className="gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold h-10 border-none shadow-md"
              >
                <Plus className="h-4 w-4" /> Nouvelle formation
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
            <TabsList>
              <TabsTrigger value="courses" className="gap-2">
                <BookOpen className="h-4 w-4" /> Mes Formations
              </TabsTrigger>
              <TabsTrigger value="commissions" className="gap-2">
                <Percent className="h-4 w-4" /> Affiliation & Commissions
              </TabsTrigger>
              <TabsTrigger value="payouts" className="gap-2">
                <DollarSign className="h-4 w-4" /> Gains & Reversements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6 mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-border rounded-xl overflow-hidden">
                      <Skeleton className="h-40 w-full" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !courses || courses.length === 0 ? (
                <EmptyState
                  icon={<BookOpen className="h-8 w-8" />}
                  title="Aucune formation"
                  description="Vous n'avez pas encore créé de formation. Cliquez sur le bouton ci-dessus pour commencer."
                  action={
                    <Button onClick={openCreateForm} className="gap-2">
                      <Plus className="h-4 w-4" /> Créer ma première formation
                    </Button>
                  }
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Dashed Add Course Card */}
                  <button
                    onClick={openCreateForm}
                    className="h-full min-h-[250px] border-2 border-dashed border-border/80 rounded-xl hover:border-teal-500/50 hover:bg-teal-500/5 transition-all flex flex-col items-center justify-center gap-3 p-6 text-center group bg-card"
                  >
                    <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors">
                      <Plus className="h-6 w-6 text-muted-foreground group-hover:text-teal-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Ajouter une formation</p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">
                        Créez un nouveau cours et ajoutez vos chapitres et supports.
                      </p>
                    </div>
                  </button>

                  {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden border border-border/80">
                      <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground/30">
                            <BookOpen className="h-10 w-10" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          <Badge variant={course.status === 'publie' ? 'default' : 'secondary'}>
                            {course.status === 'publie' ? 'Publié' : 'Brouillon'}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 space-y-4">
                        <div>
                          <h3 className="font-semibold text-base truncate">{course.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {((course.price || 0) / 100).toLocaleString('fr-FR')} € ·{' '}
                            {course.durationHours}h
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                          <Button
                            onClick={() => openEditForm(course)}
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1.5"
                          >
                            <Edit2 className="h-3.5 w-3.5" /> Modifier
                          </Button>
                          <Button
                            onClick={() => openChaptersManager(course.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1.5"
                          >
                            <ListPlus className="h-3.5 w-3.5" /> Chapitres
                          </Button>
                          <Button
                            onClick={() => handleDelete(course.id)}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6 mt-6">
              {/* Stats overview */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-amber-500/5 border-amber-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-amber-800 dark:text-amber-400">Commissions en attente de paiement</p>
                      <Clock className="h-4.5 w-4.5 text-amber-600" />
                    </div>
                    <p className="text-2xl font-bold text-amber-900 dark:text-amber-300 mt-2.5">
                      {(allReferrals.filter(r => r.status === 'en_attente').reduce((sum, r) => sum + (r.commission_amount || 0), 0) / 100).toLocaleString('fr-FR')} €
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-500/5 border-emerald-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-emerald-800 dark:text-emerald-400">Commissions payées</p>
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mt-2.5">
                      {(allReferrals.filter(r => r.status === 'paye').reduce((sum, r) => sum + (r.commission_amount || 0), 0) / 100).toLocaleString('fr-FR')} €
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Historique des ventes par parrainage</CardTitle>
                </CardHeader>
                <CardContent>
                  {referralsLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : allReferrals.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic text-center py-6">
                      Aucune vente par affiliation n'a encore été enregistrée pour vos cours.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-border/60 text-muted-foreground uppercase font-semibold text-[10px]">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Formation</th>
                            <th className="py-3 px-4">Parrain (Referrer)</th>
                            <th className="py-3 px-4">Filleul</th>
                            <th className="py-3 px-4">Commission (15%)</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allReferrals.map((ref) => {
                            const date = new Date(ref.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })
                            const amountEur = (ref.commission_amount || 0) / 100
                            const amountXof = Math.round(amountEur * 655.957)
                            const parrainName = ref.profiles?.display_name || ref.profiles?.email?.split('@')[0] || 'Inconnu'
                            return (
                              <tr key={ref.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                                <td className="py-3.5 px-4 text-muted-foreground">{date}</td>
                                <td className="py-3.5 px-4 font-medium text-foreground truncate max-w-xs">{ref.courses?.title}</td>
                                <td className="py-3.5 px-4">
                                  <span className="font-medium text-foreground">{parrainName}</span>
                                  <span className="text-[10px] text-muted-foreground block">{ref.profiles?.email}</span>
                                </td>
                                <td className="py-3.5 px-4 text-muted-foreground">{ref.referred_email}</td>
                                <td className="py-3.5 px-4 font-semibold text-primary">
                                  {amountEur.toLocaleString('fr-FR')} €
                                  <span className="text-[10px] text-muted-foreground block">~ {amountXof.toLocaleString('fr-FR')} FCFA</span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <Badge variant={ref.status === 'paye' ? 'default' : 'secondary'}>
                                    {ref.status === 'paye' ? 'Payé' : 'En attente'}
                                  </Badge>
                                </td>
                                <td className="py-3.5 px-4">
                                  {ref.status === 'en_attente' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-8 text-[10px]"
                                      onClick={() => handleMarkAsPaid(ref.id)}
                                    >
                                      Valider le paiement
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-6 mt-6">
              {(() => {
                const totalGrossSales = instructorSales.reduce((sum, item) => sum + (item.courses?.price || 0), 0)
                const totalGrossSalesEur = totalGrossSales / 100

                // Option A: 10% platform fee
                const platformFeesEur = totalGrossSalesEur * 0.10
                
                // Total affiliate payouts from this instructor's courses
                const affiliatePayouts = allReferrals.reduce((sum, ref) => sum + (ref.commission_amount || 0), 0)
                const affiliatePayoutsEur = affiliatePayouts / 100

                // Net earnings for instructor: Gross minus platform fee (10%) and affiliate commissions paid/pending (15% on referred items)
                const netInstructorEarningsEur = totalGrossSalesEur - platformFeesEur - affiliatePayoutsEur
                
                // Cumulative valid payouts already processed by admin
                const processedPayoutsEur = payoutRequests
                  .filter(r => r.status === 'valide')
                  .reduce((sum, r) => sum + (r.amount || 0), 0) / 100

                // Solde disponible = net - processed
                const availableSoldeEur = Math.max(0, netInstructorEarningsEur - processedPayoutsEur)
                const availableSoldeXof = Math.round(availableSoldeEur * 655.957)

                return (
                  <div className="space-y-6">
                    {/* Stats cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                      <Card className="border-border/80">
                        <CardContent className="pt-6">
                          <p className="text-xs text-muted-foreground font-medium">Ventes brutes (100%)</p>
                          <p className="text-xl font-bold mt-1">{totalGrossSalesEur.toLocaleString('fr-FR')} €</p>
                          <p className="text-[10px] text-muted-foreground font-semibold">~ {Math.round(totalGrossSalesEur * 655.957).toLocaleString('fr-FR')} F CFA</p>
                        </CardContent>
                      </Card>

                      <Card className="border-border/80 bg-red-500/5">
                        <CardContent className="pt-6">
                          <p className="text-xs text-red-800 dark:text-red-400 font-medium">Frais EduFlex (10%)</p>
                          <p className="text-xl font-bold mt-1 text-red-900 dark:text-red-300">{platformFeesEur.toLocaleString('fr-FR')} €</p>
                          <p className="text-[10px] text-muted-foreground font-semibold">~ {Math.round(platformFeesEur * 655.957).toLocaleString('fr-FR')} F CFA</p>
                        </CardContent>
                      </Card>

                      <Card className="border-border/80 bg-blue-500/5">
                        <CardContent className="pt-6">
                          <p className="text-xs text-blue-800 dark:text-blue-400 font-medium">Retirés / Reversés</p>
                          <p className="text-xl font-bold mt-1 text-blue-900 dark:text-blue-300">{processedPayoutsEur.toLocaleString('fr-FR')} €</p>
                          <p className="text-[10px] text-muted-foreground font-semibold">~ {Math.round(processedPayoutsEur * 655.957).toLocaleString('fr-FR')} F CFA</p>
                        </CardContent>
                      </Card>

                      <Card className="border-emerald-500/30 bg-emerald-500/5">
                        <CardContent className="pt-6">
                          <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">Solde disponible (Net)</p>
                          <p className="text-xl font-bold mt-1 text-emerald-900 dark:text-emerald-300">{availableSoldeEur.toLocaleString('fr-FR')} €</p>
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">~ {availableSoldeXof.toLocaleString('fr-FR')} F CFA</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Instructor Payout Form & Admin List */}
                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Request Form (Only show for teachers/admins requesting payout for themselves) */}
                      {user?.role !== 'admin' && (
                        <Card className="md:col-span-1 border-border/80">
                          <CardHeader>
                            <CardTitle className="text-sm font-bold">Demander un reversement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={(e) => handleRequestPayout(e, availableSoldeEur * 100)} className="space-y-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold">Montant (€)</label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="Ex: 50.00"
                                  required
                                  value={requestAmount}
                                  onChange={e => setRequestAmount(e.target.value)}
                                  className="h-9 text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold">Coordonnées de paiement (Mobile Money / RIB)</label>
                                <Input
                                  placeholder="Ex: Orange Money CI +225XXXXXXXXX"
                                  required
                                  value={payoutDetails}
                                  onChange={e => setPayoutDetails(e.target.value)}
                                  className="h-9 text-xs"
                                />
                              </div>
                              <Button type="submit" size="sm" className="w-full text-xs" disabled={availableSoldeEur <= 0}>
                                Envoyer la demande
                              </Button>
                            </form>
                          </CardContent>
                        </Card>
                      )}

                      {/* Requests List */}
                      <Card className={user?.role === 'admin' ? 'md:col-span-3 border-border/80' : 'md:col-span-2 border-border/80'}>
                        <CardHeader>
                          <CardTitle className="text-sm font-bold">
                            {user?.role === 'admin' ? 'Toutes les demandes de reversement' : 'Mes demandes de reversement'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {payoutsLoading ? (
                            <div className="space-y-2"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
                          ) : payoutRequests.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic text-center py-6">Aucune demande de reversement enregistrée.</p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-border/60 text-muted-foreground uppercase font-semibold text-[10px]">
                                    <th className="py-2.5 px-3">Date</th>
                                    {user?.role === 'admin' && <th className="py-2.5 px-3">Formateur</th>}
                                    <th className="py-2.5 px-3">Montant</th>
                                    <th className="py-2.5 px-3">Coordonnées</th>
                                    <th className="py-2.5 px-3">Statut</th>
                                    {user?.role === 'admin' && <th className="py-2.5 px-3 text-right">Action</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {payoutRequests.map((req) => {
                                    const date = new Date(req.created_at).toLocaleDateString('fr-FR', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })
                                    const amountEur = (req.amount || 0) / 100
                                    const name = req.profiles?.display_name || req.profiles?.email?.split('@')[0] || 'Formateur'
                                    return (
                                      <tr key={req.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                                        <td className="py-3 px-3 text-muted-foreground">{date}</td>
                                        {user?.role === 'admin' && (
                                          <td className="py-3 px-3">
                                            <span className="font-semibold">{name}</span>
                                            <span className="text-[10px] text-muted-foreground block">{req.profiles?.email}</span>
                                          </td>
                                        )}
                                        <td className="py-3 px-3 font-semibold text-primary">{amountEur.toLocaleString('fr-FR')} €</td>
                                        <td className="py-3 px-3 text-muted-foreground max-w-xs truncate">{req.payment_details}</td>
                                        <td className="py-3 px-3">
                                          <Badge variant={req.status === 'valide' ? 'default' : req.status === 'rejete' ? 'destructive' : 'secondary'}>
                                            {req.status === 'valide' ? 'Validé' : req.status === 'rejete' ? 'Rejeté' : 'En attente'}
                                          </Badge>
                                        </td>
                                        {user?.role === 'admin' && (
                                          <td className="py-3 px-3 text-right">
                                            {req.status === 'en_attente' && (
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-[10px]"
                                                onClick={() => handleValidatePayout(req.id)}
                                              >
                                                Valider le reversement
                                              </Button>
                                            )}
                                          </td>
                                        )}
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })()}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        /* Create/Edit Form */
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la liste
          </button>

          <Card>
            <CardHeader>
              <CardTitle>
                {view === 'create' ? 'Créer une formation' : 'Modifier la formation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Titre de la formation *</label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Apprendre React en 2026"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Présentez le programme de votre formation..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Catégorie</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Niveau</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {LEVELS.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>
                          {lvl.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Prix (€) *</label>
                    <Input
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 49.99"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Durée totale (heures)</label>
                    <Input
                      type="number"
                      min="0"
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      placeholder="Ex: 12"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">URL de l'image de couverture</label>
                  <Input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Statut</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="publie">Publiée (Visible sur le catalogue)</option>
                    <option value="brouillon">Brouillon (Masquée)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createCourse.isPending || updateCourse.isPending}
                    className="flex-1"
                  >
                    {createCourse.isPending || updateCourse.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...
                      </>
                    ) : (
                      'Sauvegarder la formation'
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setView('list')}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────────
   CHAPTERS MANAGER SUB-SECTION
   ────────────────────────────────────────────────────────────────────────────── */
function ChaptersManagerSection({ course, onBack }: { course: any; onBack: () => void }) {
  const { data: chapters, isLoading } = useChapters(course?.id)
  const { createChapter, updateChapter, deleteChapter } = useManageChapters(course?.id)

  const [formOpen, setFormOpen] = useState(false)
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [sortOrder, setSortOrder] = useState('0')

  // Quiz Editor states
  const [isQuiz, setIsQuiz] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [tempQuestion, setTempQuestion] = useState('')
  const [tempOpt1, setTempOpt1] = useState('')
  const [tempOpt2, setTempOpt2] = useState('')
  const [tempOpt3, setTempOpt3] = useState('')
  const [tempOpt4, setTempOpt4] = useState('')
  const [tempCorrectIdx, setTempCorrectIdx] = useState('0')

  // B2B livestream states
  const [chapterType, setChapterType] = useState<'standard' | 'quiz' | 'live'>('standard')
  const [scheduledAt, setScheduledAt] = useState('')
  const [liveUrl, setLiveUrl] = useState('')

  const openAddForm = () => {
    setEditingChapterId(null)
    setTitle('')
    setContent('')
    setVideoUrl('')
    setSortOrder(String((chapters?.length || 0) + 1))
    setIsQuiz(false)
    setQuestions([])
    setChapterType('standard')
    setScheduledAt('')
    setLiveUrl('')
    setFormOpen(true)
  }

  const openEditForm = (chapter: any) => {
    setEditingChapterId(chapter.id)
    setTitle(chapter.title || '')
    setContent(chapter.content || '')
    setVideoUrl(chapter.videoUrl || '')
    setSortOrder(String(chapter.sortOrder || 0))
    const hasQuiz = Array.isArray(chapter.quizData) && chapter.quizData.length > 0
    setIsQuiz(hasQuiz)
    setQuestions(hasQuiz ? chapter.quizData : [])
    setChapterType(chapter.chapterType || (hasQuiz ? 'quiz' : 'standard'))
    setScheduledAt(chapter.scheduledAt ? chapter.scheduledAt.substring(0, 16) : '')
    setLiveUrl(chapter.liveUrl || '')
    setFormOpen(true)
  }

  const addQuestion = () => {
    if (!tempQuestion.trim() || !tempOpt1.trim() || !tempOpt2.trim() || !tempOpt3.trim() || !tempOpt4.trim()) {
      toast.error('Veuillez renseigner la question et ses 4 options.')
      return
    }
    const newQ = {
      question: tempQuestion.trim(),
      options: [tempOpt1.trim(), tempOpt2.trim(), tempOpt3.trim(), tempOpt4.trim()],
      correctOptionIndex: parseInt(tempCorrectIdx),
    }
    setQuestions([...questions, newQ])
    setTempQuestion('')
    setTempOpt1('')
    setTempOpt2('')
    setTempOpt3('')
    setTempOpt4('')
    setTempCorrectIdx('0')
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (chapterType === 'quiz' && questions.length === 0) {
      toast.error('Un chapitre de type Quiz doit contenir au moins une question.')
      return
    }

    if (chapterType === 'live' && !scheduledAt) {
      toast.error('Une date et heure planifiée est obligatoire pour une classe en direct.')
      return
    }

    const payload = {
      courseId: course.id,
      title,
      content: chapterType === 'quiz' ? null : (content || null),
      videoUrl: chapterType === 'standard' ? (videoUrl || null) : null,
      sortOrder: parseInt(sortOrder) || 0,
      quizData: chapterType === 'quiz' ? questions : null,
      chapterType,
      scheduledAt: chapterType === 'live' ? (scheduledAt ? new Date(scheduledAt).toISOString() : null) : null,
      liveUrl: chapterType === 'live' ? (liveUrl || null) : null,
    }

    if (editingChapterId == null) {
      createChapter.mutate(payload, {
        onSuccess: () => {
          toast.success('Chapitre ajouté !')
          setFormOpen(false)
        },
      })
    } else {
      updateChapter.mutate(
        { ...payload, id: editingChapterId },
        {
          onSuccess: () => {
            toast.success('Chapitre mis à jour !')
            setFormOpen(false)
          },
        }
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous supprimer ce chapitre ?')) {
      deleteChapter.mutate(id, {
        onSuccess: () => {
          toast.success('Chapitre supprimé.')
        },
      })
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Retour aux formations
      </button>

      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{course?.title}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Constructeur de programme et chapitres de cours.
          </p>
        </div>
        {!formOpen && (
          <Button onClick={openAddForm} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Ajouter un chapitre
          </Button>
        )}
      </div>

      {formOpen ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>
              {editingChapterId == null ? 'Nouveau Chapitre' : 'Modifier le Chapitre'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Titre du chapitre *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: 1. Présentation générale"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format du chapitre</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { type: 'standard', label: '📖 Standard (Vidéo / Texte)', desc: 'Contenu pédagogique classique.' },
                    { type: 'quiz', label: '❓ Quiz interactif', desc: 'Évaluation des connaissances.' },
                    { type: 'live', label: '🔴 Classe en Direct (Live)', desc: 'Visioconférence Jitsi intégrée.' }
                  ].map(opt => {
                    const active = chapterType === opt.type
                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => {
                          setChapterType(opt.type as any)
                          setIsQuiz(opt.type === 'quiz')
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="block text-xs font-bold text-foreground">{opt.label}</span>
                        <span className="block text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {chapterType === 'standard' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">URL de la vidéo (MP4, YouTube, Vimeo)</label>
                    <Input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Contenu textuel (Texte / Markdown)</label>
                    <textarea
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Rédigez le texte du cours ici..."
                    />
                  </div>
                </>
              )}

              {chapterType === 'live' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Date & Heure de début planifiée *</label>
                    <Input
                      type="datetime-local"
                      required
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Lien externe alternatif (Optionnel)</label>
                    <Input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://zoom.us/j/... (Si vide, Jitsi est intégré par défaut)"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Notes & Objectifs de la session</label>
                    <textarea
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Ex: Dans cette session en direct, nous aborderons..."
                    />
                  </div>
                </>
              )}

              {chapterType === 'quiz' && (
                <div className="border border-border/80 rounded-xl p-4 bg-muted/20 space-y-4">
                  <h4 className="font-semibold text-sm">Gestion des questions du Quiz ({questions.length} question(s))</h4>

                  {questions.length > 0 && (
                    <div className="space-y-2.5">
                      {questions.map((q, i) => (
                        <div key={i} className="flex items-start justify-between p-3 rounded-lg border border-border bg-card text-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">{i + 1}. {q.question}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground mt-1">
                              {q.options.map((opt: string, idx: number) => (
                                <span key={idx} className={idx === q.correctOptionIndex ? "text-emerald-600 font-medium" : ""}>
                                  • {opt} {idx === q.correctOptionIndex ? "(Correct)" : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive h-7 px-2 hover:bg-destructive/10 shrink-0"
                            onClick={() => removeQuestion(i)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-border/50 pt-4 space-y-3">
                    <h5 className="text-xs font-semibold text-muted-foreground">Ajouter une question</h5>
                    <div className="space-y-2">
                      <Input
                        placeholder="Intitulé de la question (ex: Quel outil est utilisé pour...)"
                        value={tempQuestion}
                        onChange={e => setTempQuestion(e.target.value)}
                        className="text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Option 1" value={tempOpt1} onChange={e => setTempOpt1(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 2" value={tempOpt2} onChange={e => setTempOpt2(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 3" value={tempOpt3} onChange={e => setTempOpt3(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 4" value={tempOpt4} onChange={e => setTempOpt4(e.target.value)} className="text-xs" />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-medium text-muted-foreground shrink-0">Bonne réponse :</label>
                        <select
                          value={tempCorrectIdx}
                          onChange={e => setTempCorrectIdx(e.target.value)}
                          className="rounded-md border border-input bg-background px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="0">Option 1</option>
                          <option value="1">Option 2</option>
                          <option value="2">Option 3</option>
                          <option value="3">Option 4</option>
                        </select>
                        <Button
                          type="button"
                          onClick={addQuestion}
                          variant="secondary"
                          size="sm"
                          className="ml-auto text-xs"
                        >
                          Ajouter la question
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Ordre d'affichage</label>
                <Input
                  type="number"
                  min="0"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={createChapter.isPending || updateChapter.isPending}
                >
                  {createChapter.isPending || updateChapter.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...
                    </>
                  ) : (
                    'Sauvegarder le chapitre'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : !chapters || chapters.length === 0 ? (
        <EmptyState
          icon={<Settings className="h-8 w-8" />}
          title="Aucun chapitre"
          description="Cette formation n'a pas encore de chapitres. Ajoutez-en un pour commencer à l'étoffer."
        />
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/60 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{chapter.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {chapter.chapterType === 'live'
                      ? '🔴 Classe en Direct (Visioconférence)'
                      : (chapter.chapterType === 'quiz' || (Array.isArray(chapter.quizData) && chapter.quizData.length > 0))
                      ? `❓ Quiz (${chapter.quizData?.length || 0} question(s))`
                      : (chapter.videoUrl ? '📖 Vidéo intégrée' : '📖 Texte uniquement')
                    } · Ordre : {chapter.sortOrder}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => openEditForm(chapter)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={() => handleDelete(chapter.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
