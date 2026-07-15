import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface AppUser {
  id: string
  email?: string
  displayName?: string
  role?: 'student' | 'teacher' | 'admin'
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfileAndSetUser = async (sessionUser: any) => {
    if (!sessionUser) {
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, display_name')
        .eq('id', sessionUser.id)
        .maybeSingle()

      if (error) throw error

      setUser({
        id: sessionUser.id,
        email: sessionUser.email,
        displayName: profile?.display_name || sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Utilisateur',
        role: profile?.role || 'student',
      })
    } catch (e) {
      console.error('Error fetching profile:', e)
      // Fallback
      setUser({
        id: sessionUser.id,
        email: sessionUser.email,
        displayName: sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Utilisateur',
        role: 'student',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch of session
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfileAndSetUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchProfileAndSetUser(session?.user ?? null)
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


