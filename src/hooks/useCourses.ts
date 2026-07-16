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
  profiles?: {
    displayName: string
    academyName?: string | null
    academyLogo?: string | null
    academyColor?: string | null
    academySlogan?: string | null
  } | null
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
  profiles: row.profiles ? {
    displayName: row.profiles.display_name,
    academyName: row.profiles.academy_name,
    academyLogo: row.profiles.academy_logo,
    academyColor: row.profiles.academy_color,
    academySlogan: row.profiles.academy_slogan,
  } : null
})

// ── Hooks ────────────────────────────────────────────────────────────────────

export const DEFAULT_MOCK_COURSES: Course[] = [
  {
    id: 1,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Marketing Digital de A à Z',
    description: 'Devenez un expert du marketing digital en maîtrisant les leviers indispensables pour attirer des clients en continu : référencement naturel (SEO), campagnes payantes (Google Ads, Facebook Ads), emailing et réseaux sociaux.',
    category: 'Marketing',
    price: 29900,
    durationHours: 25,
    level: 'debutant',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 145,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Business Management & Stratégie',
    description: 'Une formation complète pour tous les futurs dirigeants et entrepreneurs. Apprenez à structurer votre offre, recruter des talents, gérer votre comptabilité et piloter la croissance de votre entreprise avec des KPI précis.',
    category: 'Business',
    price: 49900,
    durationHours: 40,
    level: 'intermediaire',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'SEO & Création de Contenu',
    description: 'Apprenez à positionner votre site web sur la première page de Google. Découvrez la recherche de mots-clés, l\'optimisation technique on-page, le link building et la rédaction de contenu optimisé pour le SEO.',
    category: 'Marketing',
    price: 39900,
    durationHours: 15,
    level: 'intermediaire',
    imageUrl: 'https://images.unsplash.com/photo-1571721795195-a2ca2d33e070?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 210,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Excel Avancé : Tableaux & Analyse',
    description: 'Dominez Microsoft Excel de A à Z. Des formules logiques complexes aux Tableaux Croisés Dynamiques (TCD), en passant par les macros et l\'automatisation des tâches récurrentes.',
    category: 'Productivité',
    price: 19900,
    durationHours: 12,
    level: 'avance',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 324,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'Développement Web Moderne avec React',
    description: 'Construisez des applications web dynamiques et performantes. Apprenez React de zéro, maîtrisez les hooks, la gestion globale de l\'état, le routage et le déploiement sur les plateformes cloud.',
    category: 'Technologie',
    price: 59900,
    durationHours: 35,
    level: 'debutant',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 172,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    userId: '00000000-0000-0000-0000-000000000000',
    title: 'IA & Automatisation pour Entreprises',
    description: 'Intégrez l\'intelligence artificielle (ChatGPT, Claude, LLMs) et les outils d\'automatisation (Make, Zapier) dans les processus de votre entreprise pour diviser vos coûts par 10.',
    category: 'Business',
    price: 69900,
    durationHours: 18,
    level: 'avance',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60',
    status: 'publie',
    studentsCount: 95,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

/**
 * Fetch all published courses (status = 'publie').
 * Public read — no auth required.
 */
export function useCourses() {
  return useQuery({
    queryKey: ['courses', 'published'],
    queryFn: async () => {
      if (typeof window === 'undefined') {
        return DEFAULT_MOCK_COURSES
      }
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            profiles:user_id (
              display_name,
              academy_name,
              academy_logo,
              academy_color,
              academy_slogan
            )
          `)
          .eq('status', 'publie')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (data && data.length > 0) {
          return data.map(mapCourse)
        }
      } catch (err) {
        console.warn('Backend courses query error with logo, trying fallback select...', err)
        try {
          const { data, error } = await supabase
            .from('courses')
            .select(`
              *,
              profiles:user_id (
                display_name,
                academy_name,
                academy_color,
                academy_slogan
              )
            `)
            .eq('status', 'publie')
            .order('created_at', { ascending: false })
          if (error) throw error
          if (data && data.length > 0) {
            return data.map(mapCourse)
          }
        } catch (e2) {
          console.warn('Backend courses fallback failed, using default mock:', e2)
        }
      }
      return DEFAULT_MOCK_COURSES
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
      if (typeof window === 'undefined') {
        const found = DEFAULT_MOCK_COURSES.find(c => c.id === Number(id))
        return found || null
      }
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            profiles:user_id (
              display_name,
              academy_name,
              academy_logo,
              academy_color,
              academy_slogan
            )
          `)
          .eq('id', id)
          .maybeSingle()

        if (error) throw error
        if (data) return mapCourse(data)
      } catch (err) {
        console.warn('Backend course fetch error with logo, trying fallback select...', err)
        try {
          const { data, error } = await supabase
            .from('courses')
            .select(`
              *,
              profiles:user_id (
                display_name,
                academy_name,
                academy_color,
                academy_slogan
              )
            `)
            .eq('id', id)
            .maybeSingle()
          if (error) throw error
          if (data) return mapCourse(data)
        } catch (e2) {
          console.warn('Backend course fallback failed, using default mock:', e2)
        }
      }

      // Fallback lookup
      const found = DEFAULT_MOCK_COURSES.find(c => c.id === Number(id))
      return found || null
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
      // Guard: must have user (enabled check should prevent this, but belt-and-suspenders)
      if (!user?.id) return []
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user.id)
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
      // Guard: must have authenticated user
      if (!user?.id) throw new Error('Vous devez être connecté pour créer une formation.')
      const { data, error } = await supabase
        .from('courses')
        .insert([{
          user_id: user.id,
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


