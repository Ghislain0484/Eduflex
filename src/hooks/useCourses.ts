import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

// ── Types ────────────────────────────────────────────────────────────────────

export interface Course {
  id: number
  userId: string
  title: string
  description: string | null
  category: string | null
  price: number
  durationHours: number
  level: string
  imageUrl: string | null
  status: string
  studentsCount: number
  createdAt: string
  updatedAt: string
}

// Helper to map snake_case columns from Postgres/Supabase to camelCase used in React
const mapCourse = (row: any): Course => ({
  id: Number(row.id),
  userId: row.user_id,
  title: row.title,
  description: row.description,
  category: row.category,
  price: Number(row.price),
  durationHours: Number(row.duration_hours),
  level: row.level,
  imageUrl: row.image_url,
  status: row.status,
  studentsCount: Number(row.students_count),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

// ── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Fetch all published courses (status = 'publie').
 * Public read — no auth required.
 */
export function useCourses() {
  return useQuery({
    queryKey: ['courses', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'publie')
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []).map(mapCourse)
    },
  })
}

/**
 * Fetch a single course by ID.
 * Public read — no auth required.
 */
export function useCourse(id: number | undefined) {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      return data ? mapCourse(data) : null
    },
    enabled: id != null,
  })
}

/**
 * Fetch courses created by the currently authenticated user.
 * Requires auth — skipped while loading or unauthenticated.
 */
export function useUserCourses() {
  const { user, isLoading: authLoading } = useAuth()

  return useQuery({
    queryKey: ['courses', 'user', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []).map(mapCourse)
    },
    enabled: !authLoading && !!user?.id,
  })
}

export function useManageCourses() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const createCourse = useMutation({
    mutationFn: async (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'studentsCount' | 'userId'>) => {
      const { data, error } = await supabase
        .from('courses')
        .insert([{
          user_id: user!.id,
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
          duration_hours: course.durationHours,
          level: course.level,
          image_url: course.imageUrl,
          status: course.status,
          students_count: 0
        }])
        .select()
        .single()

      if (error) throw error
      return mapCourse(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  const updateCourse = useMutation({
    mutationFn: async (course: Partial<Course> & { id: number }) => {
      const { data, error } = await supabase
        .from('courses')
        .update({
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
          duration_hours: course.durationHours,
          level: course.level,
          image_url: course.imageUrl,
          status: course.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', course.id)
        .select()
        .single()

      if (error) throw error
      return mapCourse(data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['courses', variables.id] })
    }
  })

  const deleteCourse = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  return { createCourse, updateCourse, deleteCourse }
}


