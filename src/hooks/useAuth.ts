import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface AppUser {
  id: string
  email?: string
  displayName?: string
  role?: 'student' | 'teacher' | 'admin'
  academyName?: string | null
  academySlogan?: string | null
  academyColor?: string | null
  approved?: boolean
  academyPlan?: string | null
  academyLogo?: string | null
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
      let profile: any = null
      let { data, error } = await supabase
        .from('profiles')
        .select('role, display_name, academy_name, academy_slogan, academy_color, approved, academy_plan, academy_logo')
        .eq('id', sessionUser.id)
        .maybeSingle()

      if (error && error.message.includes('academy_logo')) {
        // Fallback query if client has not run database update sql yet
        const fallback = await supabase
          .from('profiles')
          .select('role, display_name, academy_name, academy_slogan, academy_color, approved, academy_plan')
          .eq('id', sessionUser.id)
          .maybeSingle()
        if (fallback.error) throw fallback.error
        profile = fallback.data
      } else if (error) {
        throw error
      } else {
        profile = data
      }

      setUser({
        id: sessionUser.id,
        email: sessionUser.email,
        displayName: profile?.display_name || sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Utilisateur',
        role: profile?.role || 'student',
        academyName: profile?.academy_name || null,
        academySlogan: profile?.academy_slogan || null,
        academyColor: profile?.academy_color || '#6366f1',
        approved: profile?.approved !== false, // default to true
        academyPlan: profile?.academy_plan || null,
        academyLogo: profile?.academy_logo || null,
      })
    } catch (e) {
      console.error('Error fetching profile:', e)
      // Fallback
      setUser({
        id: sessionUser.id,
        email: sessionUser.email,
        displayName: sessionUser.user_metadata?.display_name || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Utilisateur',
        role: 'student',
        academyName: null,
        academySlogan: null,
        academyColor: '#6366f1',
        approved: true,
        academyPlan: null,
        academyLogo: null,
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


