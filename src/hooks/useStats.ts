import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export interface Profile {
  id: string
  email: string | null
  displayName: string | null
  role: 'student' | 'teacher' | 'admin'
  createdAt: string
}

export interface RecentEnrollment {
  enrolledAt: string
  courseTitle: string
  coursePrice: number
  studentName: string
}

function mapProfile(data: any): Profile {
  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    role: data.role || 'student',
    createdAt: data.created_at,
  }
}

// 1. Dashboard Stats Query Hook
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      // Get total students
      const { count: studentsCount, error: studentsErr } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student')
      if (studentsErr) throw studentsErr

      // Get active courses
      const { count: coursesCount, error: coursesErr } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'publie')
      if (coursesErr) throw coursesErr

      // Get all enrollments & courses to calculate revenue and average progress
      const { data: enrollments, error: enrollmentsErr } = await supabase
        .from('enrollments')
        .select('course_id, progress_percent')
      if (enrollmentsErr) throw enrollmentsErr

      const { data: courses, error: coursesPriceErr } = await supabase
        .from('courses')
        .select('id, price, category')
      if (coursesPriceErr) throw coursesPriceErr

      // Calculate total revenue and category-wise revenue
      let totalRevenue = 0
      const categoryMap = new Map<string, number>()
      if (enrollments && courses) {
        const courseMap = new Map<number, { price: number; category: string }>(
          courses.map(c => [c.id, { price: c.price || 0, category: c.category || 'Général' }])
        )
        enrollments.forEach(e => {
          const courseInfo = courseMap.get(e.course_id)
          if (courseInfo) {
            totalRevenue += courseInfo.price
            const current = categoryMap.get(courseInfo.category) || 0
            categoryMap.set(courseInfo.category, current + courseInfo.price)
          }
        })
      }

      const categoryRevenue = Array.from(categoryMap.entries()).map(([categorie, revenus]) => ({
        categorie,
        revenus: revenus / 100,
      }))

      // Calculate average progress
      let averageProgress = 0
      if (enrollments && enrollments.length > 0) {
        const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress_percent || 0), 0)
        averageProgress = Math.round(totalProgress / enrollments.length)
      }

      return {
        studentsCount: studentsCount || 0,
        coursesCount: coursesCount || 0,
        totalRevenue,
        averageProgress,
        categoryRevenue,
      }
    },
  })
}

// 2. Students List Hook
export function useStudentsList() {
  return useQuery({
    queryKey: ['profiles', 'students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .is('academy_name', null)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []).map(mapProfile)
    },
  })
}

// 3. Teachers List Hook
export function useTeachersList() {
  return useQuery({
    queryKey: ['profiles', 'teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher')
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []).map(mapProfile)
    },
  })
}

// 4. Recent Enrollments with Joined Student Profiles and Course Prices
export function useRecentEnrollments() {
  return useQuery({
    queryKey: ['enrollments', 'recent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          enrolled_at,
          course_id,
          user_id,
          courses (
            title,
            price
          ),
          profiles (
            display_name,
            email
          )
        `)
        .order('enrolled_at', { ascending: false })
        .limit(5)

      if (error) throw error

      return (data || []).map((item: any) => ({
        enrolledAt: item.enrolled_at,
        courseTitle: item.courses?.title || 'Formation supprimée',
        coursePrice: item.courses?.price || 0,
        studentName: item.profiles?.display_name || item.profiles?.email?.split('@')[0] || 'Apprenant',
      })) as RecentEnrollment[]
    },
  })
}

export interface EnrollmentRecord {
  id: number
  enrolledAt: string
  courseTitle: string
  coursePrice: number
  studentName: string
  studentEmail: string
  method: string
  status: string
}

export function useAllEnrollments() {
  return useQuery({
    queryKey: ['enrollments', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          enrolled_at,
          course_id,
          user_id,
          courses (
            title,
            price
          ),
          profiles (
            display_name,
            email
          )
        `)
        .order('enrolled_at', { ascending: false })

      if (error) throw error

      return (data || []).map((item: any) => ({
        id: item.id,
        enrolledAt: item.enrolled_at,
        courseTitle: item.courses?.title || 'Formation supprimée',
        coursePrice: item.courses?.price || 0,
        studentName: item.profiles?.display_name || item.profiles?.email?.split('@')[0] || 'Apprenant',
        studentEmail: item.profiles?.email || '',
        method: item.courses?.price > 0 ? 'Mobile Money / CB' : 'Gratuit',
        status: 'Payé'
      })) as EnrollmentRecord[]
    },
  })
}

export function useAcademiesList() {
  return useQuery({
    queryKey: ['profiles', 'academies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('academy_name', 'is', null)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []).map(row => ({
        id: row.id,
        email: row.email,
        displayName: row.display_name,
        role: row.role,
        academyName: row.academy_name,
        academySlogan: row.academy_slogan,
        academyColor: row.academy_color,
        approved: row.approved,
        academyPlan: row.academy_plan || 'Découverte',
        createdAt: row.created_at,
      }))
    },
  })
}
