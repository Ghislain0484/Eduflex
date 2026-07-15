import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Badge, Button, Card, CardContent, Skeleton, EmptyState, toast, Input } from '@blinkdotnew/ui'
import { useCourse } from '@/hooks/useCourses'
import { useEnroll, useEnrollments } from '@/hooks/useEnrollments'
import { useChapters } from '@/hooks/useChapters'
import { useAuth } from '@/hooks/useAuth'
import { useFlutterwave } from '@/hooks/useFlutterwave'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Clock, Users, BookOpen, GraduationCap, CheckCircle, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_app/courses/$id')({
  component: CourseDetailPage,
})

const LEVEL_MAP: Record<string, string> = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' }

function CourseDetailPage() {
  const { id } = useParams({ from: '/courses/$id' } as any)
  const { data: course, isLoading, error } = useCourse(Number(id))
  const { data: chapters } = useChapters(Number(id))
  const { data: enrollments } = useEnrollments()
  const { isAuthenticated, user } = useAuth()
  const enrollMutation = useEnroll()
  const { makePayment } = useFlutterwave()
  const [enrolled, setEnrolled] = useState(false)

  // Extract ref link parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get('ref')
      if (ref) {
        sessionStorage.setItem('affiliate_ref', ref)
      }
    }
  }, [])

  // Promo code states
  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const isUserEnrolled = enrollments?.some(e => Number(e.courseId) === Number(id))

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return
    setPromoError('')
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase().trim())
        .eq('is_active', true)
        .single()

      if (error || !data) {
        setPromoError('Code promo invalide ou expiré.')
        setDiscountPercent(0)
        setPromoApplied(false)
        return
      }

      setDiscountPercent(data.discount_percent)
      setPromoApplied(true)
      toast.success(`Code appliqué ! Réduction de ${data.discount_percent}%`)
    } catch (err) {
      setPromoError('Code promo incorrect.')
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4"><Skeleton className="h-64 w-full rounded-xl" /><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !course) {
    return <div className="p-6 max-w-6xl mx-auto"><EmptyState icon={<BookOpen className="h-8 w-8" />} title="Formation introuvable" description="Cette formation n'existe pas ou n'est plus disponible." /></div>
  }

  const discountMultiplier = (100 - discountPercent) / 100
  const finalPrice = Math.round((course.price || 0) * discountMultiplier)

  const handleEnroll = async () => {
    if (!isAuthenticated || !user) return

    // Free course or 100% discount
    if (finalPrice <= 0) {
      enrollMutation.mutate(course.id, { onSuccess: () => setEnrolled(true) })
      return
    }

    // Paid course: Launch Flutterwave payment popup
    try {
      const priceInXof = Math.round((finalPrice / 100) * 655.957)
      await makePayment({
        amount: priceInXof * 100, // will be divided by 100 in the hook to pass main unit to Flutterwave
        currency: 'XOF',
        courseTitle: course.title,
        userEmail: user.email || '',
        userName: user.displayName || user.email?.split('@')[0] || 'Apprenant',
      })

      // Payment succeeded: Register enrollment in Supabase
      enrollMutation.mutate(course.id, {
        onSuccess: async () => {
          setEnrolled(true)
          toast.success('Paiement validé avec succès ! Bienvenue dans la formation.')

          // Save affiliate referral if present
          if (typeof window !== 'undefined') {
            const referrerId = sessionStorage.getItem('affiliate_ref')
            if (referrerId && referrerId !== user.id) {
              const commission = Math.round(finalPrice * 0.15) // 15% commission
              try {
                await supabase
                  .from('affiliate_referrals')
                  .insert([{
                    referrer_id: referrerId,
                    referred_email: user.email || '',
                    course_id: course.id,
                    commission_amount: commission,
                    status: 'en_attente'
                  }])
                sessionStorage.removeItem('affiliate_ref')
              } catch (affErr) {
                console.error('Affiliate referral error:', affErr)
              }
            }
          }
        },
      })
    } catch (err: any) {
      toast.error(err.message || 'Le paiement a échoué ou a été annulé.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Link to="/_app/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative">
            {course.imageUrl ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full"><BookOpen className="h-20 w-20 text-primary/20" /></div>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{course.category || 'Général'}</Badge>
            <Badge variant="outline">{LEVEL_MAP[course.level] || course.level}</Badge>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{course.description}</p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Contenu de la formation</h2>
              <div className="space-y-3">
                {chapters && chapters.length > 0 ? (
                  chapters.map((chapter, i) => (
                    <div key={chapter.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-semibold">{i + 1}</div>
                      <span className="text-sm font-medium">{chapter.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">Aucun chapitre disponible pour le moment.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-primary">
                  {discountPercent > 0 ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xs line-through text-muted-foreground">
                        {((Number(course.price) || 0) / 100).toLocaleString('fr-FR')} €
                      </span>
                      <span className="text-primary font-bold">
                        {((finalPrice || 0) / 100).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  ) : (
                    `${((Number(course.price) || 0) / 100).toLocaleString('fr-FR')} €`
                  )}
                </p>
                {finalPrice > 0 && (
                  <p className="text-sm font-semibold text-muted-foreground">
                    ~ {Math.round((finalPrice / 100) * 655.957).toLocaleString('fr-FR')} F CFA
                  </p>
                )}
                <p className="text-xs text-muted-foreground">Accès à vie</p>
              </div>

              {/* Promo Code Input */}
              {!enrolled && !isUserEnrolled && isAuthenticated && (
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="h-9 text-xs uppercase"
                    />
                    <Button 
                      type="button" 
                      onClick={handleApplyPromoCode}
                      disabled={promoApplied}
                      size="sm" 
                      className="h-9 px-3 text-xs"
                    >
                      {promoApplied ? 'Appliqué' : 'Valider'}
                    </Button>
                  </div>
                  {promoError && <p className="text-[10px] text-red-500">{promoError}</p>}
                  {promoApplied && (
                    <p className="text-[10px] text-emerald-500 font-medium">
                      Remise de {discountPercent}% activée !
                    </p>
                  )}
                </div>
              )}

              {enrolled || isUserEnrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="h-5 w-5" /><span className="text-sm font-medium">Inscription confirmée !</span>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/study/$id" params={{ id: String(course.id) }}>
                      Continuer la formation
                    </Link>
                  </Button>

                  {/* Affiliate Link Block */}
                  {isAuthenticated && user && (
                    <div className="border border-amber-500/30 rounded-xl p-4 bg-amber-500/5 dark:bg-amber-500/10 space-y-2 mt-4 text-left">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">🔗 Programme de parrainage</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Gagnez 15% de commission en partageant ce cours avec vos contacts !
                      </p>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={typeof window !== 'undefined' ? `${window.location.origin}/courses/${course.id}?ref=${user.id}` : ''}
                          className="h-8 text-[10px] bg-background/50"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="h-8 text-[10px] shrink-0"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              navigator.clipboard.writeText(`${window.location.origin}/courses/${course.id}?ref=${user.id}`)
                              toast.success('Lien de parrainage copié !')
                            }
                          }}
                        >
                          Copier
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : isAuthenticated ? (
                <Button className="w-full" size="lg" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                  {enrollMutation.isPending 
                    ? 'Inscription...' 
                    : (finalPrice <= 0) 
                      ? "S'inscrire à cette formation" 
                      : "Acheter cette formation"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg"><Link to="/login">Connectez-vous pour vous inscrire</Link></Button>
                  <p className="text-xs text-center text-muted-foreground">Pas encore de compte ? <Link to="/register" className="text-primary hover:underline">S'inscrire</Link></p>
                </div>
              )}
              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>{course.durationHours || 0} heures de contenu</span></div>
                <div className="flex items-center gap-3 text-sm"><Users className="h-4 w-4 text-muted-foreground" /><span>{Number(course.studentsCount) || 0} apprenants inscrits</span></div>
                <div className="flex items-center gap-3 text-sm"><GraduationCap className="h-4 w-4 text-muted-foreground" /><span>Certificat de complétion</span></div>
                <div className="flex items-center gap-3 text-sm"><Play className="h-4 w-4 text-muted-foreground" /><span>Accès illimité à vie</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
