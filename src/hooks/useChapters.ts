import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export interface Chapter {
  id: number
  courseId: number
  title: string
  content: string | null
  videoUrl: string | null
  sortOrder: number
  quizData: any[] | null
  createdAt: string
}

const mapChapter = (row: any): Chapter => ({
  id: Number(row.id),
  courseId: Number(row.course_id),
  title: row.title,
  content: row.content,
  videoUrl: row.video_url,
  sortOrder: Number(row.sort_order),
  quizData: row.quiz_data || null,
  createdAt: row.created_at,
})

export function useChapters(courseId: number | undefined) {
  return useQuery({
    queryKey: ['chapters', 'course', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('course_id', courseId!)
        .order('sort_order', { ascending: true })

      if (error) throw error
      return (data || []).map(mapChapter)
    },
    enabled: courseId != null,
  })
}

export function useCompletedChapters(courseId: number | undefined) {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['completed_chapters', courseId, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('completed_chapters')
        .select('chapter_id')
        .eq('course_id', courseId!)
        .eq('user_id', user!.id)

      if (error) throw error
      return (data || []).map((row: any) => Number(row.chapter_id))
    },
    enabled: courseId != null && !!user?.id,
  })
}

export function useToggleChapterCompletion(courseId: number) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ chapterId, isCompleted }: { chapterId: number; isCompleted: boolean }) => {
      if (isCompleted) {
        // Insert completion
        const { error } = await supabase
          .from('completed_chapters')
          .insert([{
            user_id: user!.id,
            course_id: courseId,
            chapter_id: chapterId,
          }])
        if (error) throw error
      } else {
        // Delete completion
        const { error } = await supabase
          .from('completed_chapters')
          .delete()
          .eq('user_id', user!.id)
          .eq('chapter_id', chapterId)
        if (error) throw error
      }
      return { chapterId, isCompleted }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed_chapters', courseId, user?.id] })
      // Invalidate enrollments so progress percent updates on client
      queryClient.invalidateQueries({ queryKey: ['enrollments', user?.id] })
    },
  })
}

export function useManageChapters(courseId: number) {
  const queryClient = useQueryClient()

  const createChapter = useMutation({
    mutationFn: async (chapter: Omit<Chapter, 'id' | 'createdAt'>) => {
      const { data, error } = await supabase
        .from('chapters')
        .insert([{
          course_id: chapter.courseId,
          title: chapter.title,
          content: chapter.content,
          video_url: chapter.videoUrl,
          sort_order: chapter.sortOrder,
          quiz_data: chapter.quizData || null,
        }])
        .select()
        .single()

      if (error) throw error
      return mapChapter(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters', 'course', courseId] })
    },
  })

  const updateChapter = useMutation({
    mutationFn: async (chapter: Partial<Chapter> & { id: number }) => {
      const { data, error } = await supabase
        .from('chapters')
        .update({
          title: chapter.title,
          content: chapter.content,
          video_url: chapter.videoUrl,
          sort_order: chapter.sortOrder,
          quiz_data: chapter.quizData,
        })
        .eq('id', chapter.id)
        .select()
        .single()

      if (error) throw error
      return mapChapter(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters', 'course', courseId] })
    },
  })

  const deleteChapter = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('chapters')
        .delete()
        .eq('id', id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters', 'course', courseId] })
    },
  })

  return { createChapter, updateChapter, deleteChapter }
}
