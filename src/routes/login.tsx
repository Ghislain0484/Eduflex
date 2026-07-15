import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Connexion — EduFlex' }, { name: 'description', content: 'Connectez-vous à votre compte EduFlex.' }] }),
  component: LoginPage,
})

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw authError
      navigate({ to: '/dashboard' })
    } catch (err: any) {
      setError(err?.message || 'Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">EduFlex</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Connectez-vous</h1>
          <p className="mt-2 text-sm text-muted-foreground">Accédez à votre tableau de bord EduFlex.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Mot de passe</label>
              <button type="button" className="text-xs text-primary hover:underline">Mot de passe oublié ?</button>
            </div>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ? <Link to="/register" className="text-primary font-medium hover:underline">Inscrivez-vous</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
