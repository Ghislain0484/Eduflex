import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Card, CardContent, Badge, Input, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { useCourses, type Course } from '@/hooks/useCourses'
import { Search, BookOpen, Clock, Users, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_app/courses')({
  component: CoursesPage,
})

const CATEGORIES = ['Tous', 'Marketing', 'Business', 'Productivité']
const LEVEL_MAP: Record<string, string> = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' }

function CoursesPage() {
  const { data: courses, isLoading } = useCourses()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tous')
  const courseList = Array.isArray(courses) ? courses : []

  const filtered = useMemo(() => {
    return courseList.filter((c: Course) => {
      const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase())
      const matchCat = activeCategory === 'Tous' || c.category === activeCategory
      return matchSearch && matchCat
    })
  }, [courseList, search, activeCategory])

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Catalogue de formations</h1>
        <p className="text-muted-foreground text-sm mt-1">Explorez nos formations et développez vos compétences.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher une formation..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <Skeleton className="h-44 w-full" />
              <div className="p-5 space-y-3"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-1/2" /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<BookOpen className="h-8 w-8" />} title="Aucune formation trouvée" description={search ? `Aucun résultat pour "${search}".` : 'Aucune formation disponible.'} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course: Course) => (
            <Link key={course.id} to="/courses/$id" params={{ id: String(course.id) } as any} className="group rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="h-44 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                {course.imageUrl ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="flex items-center justify-center h-full"><BookOpen className="h-12 w-12 text-primary/30" /></div>}
                <Badge className="absolute top-3 left-3" variant="secondary">{course.category || 'Général'}</Badge>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                {course.description && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.durationHours || 0}h</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{Number(course.studentsCount) || 0}</span>
                  <Badge variant="outline" className="text-[10px]">{LEVEL_MAP[course.level] || course.level}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-lg font-bold text-primary">{((Number(course.price) || 0) / 100).toLocaleString('fr-FR')} €</span>
                  <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Découvrir <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
