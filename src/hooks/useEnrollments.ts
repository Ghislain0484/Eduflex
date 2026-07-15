import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

// ── Types ────────────────────────────────────────────────────────────────────

export interface Enrollment {
  id: number
  userId: string
  courseId: number
  progressPercent: number
  enrolledAt: string
}

// Helper to map snake_case columns from Postgres/Supabase to camelCase used in React
const mapEnrollment = (row: any): Enrollment => ({
  id: Number(row.id),
  userId: row.user_id,
  courseId: Number(row.course_id),
  progressPercent: Number(row.progress_percent),
  enrolledAt: row.enrolled_at,
})

// ── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Fetch enrollments for the currently authenticated user.
 * Requires auth — skipped while loading or unauthenticated.
 */
export function useEnrollments() {
  const { user, isLoading: authLoading } = useAuth()

  return useQuery({
    queryKey: ['enrollments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user!.id)
        .order('enrolled_at', { ascending: false })

      if (error) throw error
      return (data || []).map(mapEnrollment)
    },
    enabled: !authLoading && !!user?.id,
  })
}

/**
 * Mutation to enroll the current user in a course.
 * Requires auth — callers should guard with `isAuthenticated` before invoking.
 *
 * @example
 *   const enroll = useEnroll()
 *   enroll.mutate(courseId)
 */
export function useEnroll() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (courseId: number) => {
      const { data, error } = await supabase
        .from('enrollments')
        .insert([{
          user_id: user!.id,
          course_id: courseId,
          progress_percent: 0,
        }])
        .select()
        .single()

      if (error) throw error
      return mapEnrollment(data)
    },
    onSuccess: () => {
      // Invalidate user enrollments so the list re-fetches
      queryClient.invalidateQueries({ queryKey: ['enrollments', user?.id] })
    },
  })
}

