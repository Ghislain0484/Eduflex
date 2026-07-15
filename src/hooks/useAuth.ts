import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface AppUser {
  id: string
  email?: string
  displayName?: string
}

const mapUser = (sessionUser: any): AppUser | null => {
  if (!sessionUser) return null
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    displayName: sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Utilisateur',
  }
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial fetch of session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(mapUser(session?.user ?? null))
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null))
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = () => {
    // Redirect or trigger login flow if needed (usually handled in login page)
  }
  
  const logout = () => supabase.auth.signOut()

  return { user, isLoading, isAuthenticated: !!user, login, logout }
}

