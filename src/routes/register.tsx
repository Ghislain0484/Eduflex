import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Sparkles, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'

export const Route = createFileRoute('/register')({
  head: () => ({ meta: [{ title: 'Inscription — EduFlex' }, { name: 'description', content: 'Créez votre compte EduFlex et commencez à gérer vos formations.' }] }),
  component: RegisterPage,
})

function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptCGV, setAcceptCGV] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // EduFlex+ White Label customization options on signup
  const [isAcademy, setIsAcademy] = useState(false)
  const [academyName, setAcademyName] = useState('')
  const [academySlogan, setAcademySlogan] = useState('')

  if (!isLoading && isAuthenticated) {
    navigate({ to: '/dashboard' })
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary/20 border-t-primary" />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!acceptCGV) { setError('Vous devez accepter les conditions générales.'); return }
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return }
    setLoading(true)
    try {
      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: `${prenom} ${nom}`,
            full_name: `${prenom} ${nom}`,
          },
        },
      })
      if (authError) throw authError

      // If registered as a White-Label Academy (EduFlex+ option), pre-configure profile settings
      if (signUpData?.user && isAcademy) {
        // Wait briefly for Supabase database trigger to insert profile row
        await new Promise(resolve => setTimeout(resolve, 800))
        
        await supabase
          .from('profiles')
          .update({
            academy_name: academyName || `${prenom} ${nom} Académie`,
            academy_slogan: academySlogan || 'Votre excellence en ligne',
            academy_color: '#0d9488', // Default custom color: Teal
            role: 'teacher',          // Grant instructor permissions
          })
          .eq('id', signUpData.user.id)
      }

      navigate({ to: '/dashboard' })
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue lors de l\'inscription.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-dvh flex">
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-10">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center"><Sparkles className="h-5 w-5 text-primary-foreground" /></div>
              <span className="font-bold text-lg tracking-tight">EduFlex</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Créez votre compte</h1>
            <p className="mt-2 text-muted-foreground">Commencez à gérer vos formations en quelques minutes.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-sm font-medium">Prénom <span className="text-destructive">*</span></label><Input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Jean" required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Nom <span className="text-destructive">*</span></label><Input value={nom} onChange={e => setNom(e.target.value)} placeholder="Dupont" required /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium">Adresse email <span className="text-destructive">*</span></label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jean@exemple.fr" required /></div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe <span className="text-destructive">*</span></label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="8 caractères minimum" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t border-border/40">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAcademy} 
                  onChange={e => setIsAcademy(e.target.checked)} 
                  className="h-4 w-4 rounded border-border accent-teal-600" 
                />
                <span className="text-xs font-semibold text-teal-600">
                  Créer une Académie en marque blanche (Offre EduFlex+)
                </span>
              </label>

              {isAcademy && (
                <div className="space-y-3 p-3 bg-teal-950/20 border border-teal-900/40 rounded-xl animate-fade-in">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Nom de votre Académie</label>
                    <Input 
                      value={academyName} 
                      onChange={e => setAcademyName(e.target.value)} 
                      placeholder="Ex: HEC Abidjan, Académie Digitale..." 
                      required={isAcademy}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Slogan de l'académie</label>
                    <Input 
                      value={academySlogan} 
                      onChange={e => setAcademySlogan(e.target.value)} 
                      placeholder="Ex: Votre avenir commence ici" 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={acceptCGV} onChange={e => setAcceptCGV(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                <span className="text-xs text-muted-foreground leading-relaxed">J'accepte les <span className="underline">conditions générales</span> et la <span className="underline">politique de confidentialité</span> d'EduFlex. <span className="text-destructive">*</span></span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                <span className="text-xs text-muted-foreground leading-relaxed"><strong>La Lettre EduFlex</strong> — Recevoir chaque mois des astuces et actualités.</span>
              </label>
            </div>
            {error && <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer mon compte'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Déjà un compte ? <Link to="/login" className="text-primary font-medium hover:underline">Connectez-vous</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 items-center justify-center p-12">
        <div className="max-w-md space-y-8">
          <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center"><Sparkles className="h-8 w-8 text-primary" /></div>
          <h2 className="text-3xl font-bold tracking-tight">Rejoignez la communauté EduFlex</h2>
          <div className="space-y-4">
            {['Zéro installation — accessible partout', 'Mises à jour gratuites et régulières', 'Sans aucun engagement', 'Transactions 100% sécurisées', 'Entreprise 100% Française'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0"><Check className="h-3 w-3" /></div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
