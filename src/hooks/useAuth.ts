import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  // 1. Session Query — cached in react-query to prevent duplicate calls
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['auth_session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    },
    staleTime: Infinity, // Maintain stable session state
  })

  // 2. Profile/User Query — depends on session user id
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['auth_user', session?.user?.id],
    queryFn: async () => {
      const sessionUser = session?.user
      if (!sessionUser) return null

      try {
        let profile: any = null
        const { data, error } = await supabase
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

        return {
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
        } as AppUser
      } catch (e) {
        console.error('Error fetching profile:', e)
        // Fallback profile if fetch fails
        return {
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
        } as AppUser
      }
    },
    enabled: session !== undefined && !!session?.user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes caching for the profile
  })

  // Synchronize state changes globally via onAuthStateChange
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      // Update session query cache
      queryClient.setQueryData(['auth_session'], newSession)
      
      // If logging out, clear auth user cache
      if (!newSession) {
        queryClient.setQueryData(['auth_user', undefined], null)
        queryClient.invalidateQueries({ queryKey: ['auth_user'] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['auth_user', newSession.user.id] })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  const login = () => {
    // Handled in login page
  }
  
  const logout = async () => {
    await supabase.auth.signOut()
    queryClient.clear() // Clear all query caches on logout
  }

  const isLoading = isSessionLoading || (session !== undefined && !!session?.user?.id && isUserLoading)

  return { 
    user: user || null, 
    isLoading, 
    isAuthenticated: !!user, 
    login, 
    logout 
  }
}
