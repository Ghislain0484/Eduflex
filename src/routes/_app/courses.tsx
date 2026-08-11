import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Card, CardContent, Badge, Input, Skeleton, EmptyState } from '@blinkdotnew/ui'
import { useCourses, type Course } from '@/hooks/useCourses'
import { Search, BookOpen, Clock, Users, ArrowRight, Sparkles, UserCheck } from 'lucide-react'

export const Route = createFileRoute('/_app/courses')({
  component: CoursesPage,
})

const CATEGORIES = ['Tous', 'Marketing', 'Business', 'Productivité', 'Technologie', 'Webinaires']
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
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto font-sans text-left">
      
      {/* Academy Banner (Matching academie.teachizy.fr) */}
      <div className="p-8 bg-gradient-to-r from-teal-900/40 via-slate-900 to-slate-900 border border-teal-500/30 rounded-3xl shadow-lg relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="h-48 w-48 text-teal-400" />
        </div>

        <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-xs px-3 py-1 font-bold">
          Espace de Formation EduFlex
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Bienvenue sur l'Académie EduFlex
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Découvrez nos programmes de formation, ateliers et webinaires interactifs dédiés aux formateurs, créateurs de contenu et infopreneurs.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher une formation, un atelier ou un webinaire..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 text-xs h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <Skeleton className="h-44 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-8 w-8 text-teal-400" />}
          title="Aucune formation trouvée"
          description={search ? `Aucun résultat pour "${search}".` : 'Aucune formation disponible pour le moment.'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course: Course) => {
            const rawPrice = Number(course.price) || 0
            const isFree = rawPrice === 0
            const displayPriceEur = isFree ? 'Gratuit' : `${Math.round(rawPrice > 1000 ? rawPrice / 100 : rawPrice)} €`
            const displayPriceFcfa = isFree ? 'Accès libre' : `${Math.round(rawPrice > 1000 ? (rawPrice / 100) * 655.957 : rawPrice * 655.957).toLocaleString('fr-FR')} FCFA`

            return (
              <Link
                key={course.id}
                to="/courses/$id"
                params={{ id: String(course.id) } as any}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-gradient-to-br from-teal-900/20 to-slate-900 relative overflow-hidden">
                    {course.imageUrl ? (
                      <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-12 w-12 text-teal-500/30" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-400 border border-teal-500/30 text-[10px] font-bold">
                      {course.category || 'Général'}
                    </Badge>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-teal-500 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-teal-400" /> {course.durationHours || 0}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-teal-400" /> {Number(course.studentsCount) || 0} apprenants
                      </span>
                      <Badge variant="outline" className="text-[10px] border-slate-700">
                        {LEVEL_MAP[course.level] || course.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className={`text-base font-black ${isFree ? 'text-emerald-500' : 'text-teal-400'}`}>
                      {displayPriceEur}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 leading-none mt-0.5">
                      {displayPriceFcfa}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-teal-500 group-hover:text-teal-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Découvrir <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
