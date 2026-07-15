import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Skeleton,
  EmptyState,
} from '@blinkdotnew/ui'
import { toast } from '@blinkdotnew/ui'
import { useUserCourses, useManageCourses } from '@/hooks/useCourses'
import { useChapters, useManageChapters } from '@/hooks/useChapters'
import {
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  ListPlus,
  ArrowLeft,
  Loader2,
  Eye,
  Settings,
} from 'lucide-react'

export const Route = createFileRoute('/_app/manage-courses')({
  component: ManageCoursesPage,
})

const CATEGORIES = ['Marketing', 'Business', 'Productivité']
const LEVELS = [
  { value: 'debutant', label: 'Débutant' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
]

function ManageCoursesPage() {
  const { data: courses, isLoading } = useUserCourses()
  const { createCourse, updateCourse, deleteCourse } = useManageCourses()

  const [view, setView] = useState<'list' | 'create' | 'edit' | 'chapters'>('list')
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Marketing')
  const [level, setLevel] = useState('debutant')
  const [price, setPrice] = useState('') // In EUR, e.g. 29.99
  const [durationHours, setDurationHours] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('publie')

  const openCreateForm = () => {
    setTitle('')
    setDescription('')
    setCategory('Marketing')
    setLevel('debutant')
    setPrice('')
    setDurationHours('')
    setImageUrl('')
    setStatus('publie')
    setView('create')
  }

  const openEditForm = (course: any) => {
    setSelectedCourseId(course.id)
    setTitle(course.title || '')
    setDescription(course.description || '')
    setCategory(course.category || 'Marketing')
    setLevel(course.level || 'debutant')
    setPrice(String((course.price || 0) / 100))
    setDurationHours(String(course.durationHours || 0))
    setImageUrl(course.imageUrl || '')
    setStatus(course.status || 'publie')
    setView('edit')
  }

  const openChaptersManager = (courseId: number) => {
    setSelectedCourseId(courseId)
    setView('chapters')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedPrice = Math.round(parseFloat(price) * 100)
    if (isNaN(parsedPrice)) {
      toast.error('Prix invalide.')
      return
    }

    const payload = {
      title,
      description: description || null,
      category,
      level,
      price: parsedPrice,
      durationHours: parseInt(durationHours) || 0,
      imageUrl: imageUrl || null,
      status,
    }

    if (view === 'create') {
      createCourse.mutate(payload, {
        onSuccess: () => {
          toast.success('Formation créée avec succès !')
          setView('list')
        },
        onError: (err) => {
          toast.error(err.message || 'Erreur lors de la création.')
        },
      })
    } else if (view === 'edit' && selectedCourseId != null) {
      updateCourse.mutate(
        { ...payload, id: selectedCourseId },
        {
          onSuccess: () => {
            toast.success('Formation mise à jour !')
            setView('list')
          },
          onError: (err) => {
            toast.error(err.message || "Erreur lors de la mise à jour.")
          },
        }
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible.')) {
      deleteCourse.mutate(id, {
        onSuccess: () => {
          toast.success('Formation supprimée.')
        },
      })
    }
  }

  if (view === 'chapters' && selectedCourseId != null) {
    const activeCourse = courses?.find((c) => c.id === selectedCourseId)
    return (
      <ChaptersManagerSection
        course={activeCourse}
        onBack={() => setView('list')}
      />
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Mes Formations</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gérez vos cours, planifiez vos modules et éditez vos contenus.
              </p>
            </div>
            <Button onClick={openCreateForm} className="gap-2">
              <Plus className="h-4 w-4" /> Nouvelle formation
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : !courses || courses.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-8 w-8" />}
              title="Aucune formation"
              description="Vous n'avez pas encore créé de formation. Cliquez sur le bouton ci-dessus pour commencer."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-10 w-10 text-primary/30" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {course.category}
                    </Badge>
                    <Badge
                      className="absolute top-3 right-3"
                      variant={course.status === 'publie' ? 'default' : 'outline'}
                    >
                      {course.status === 'publie' ? 'Publiée' : 'Brouillon'}
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="font-semibold text-base truncate">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((course.price || 0) / 100).toLocaleString('fr-FR')} € ·{' '}
                        {course.durationHours}h
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button
                        onClick={() => openEditForm(course)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Modifier
                      </Button>
                      <Button
                        onClick={() => openChaptersManager(course.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5"
                      >
                        <ListPlus className="h-3.5 w-3.5" /> Chapitres
                      </Button>
                      <Button
                        onClick={() => handleDelete(course.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Create/Edit Form */
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la liste
          </button>

          <Card>
            <CardHeader>
              <CardTitle>
                {view === 'create' ? 'Créer une formation' : 'Modifier la formation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Titre de la formation *</label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Apprendre React en 2026"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Présentez le programme de votre formation..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Catégorie</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Niveau</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {LEVELS.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>
                          {lvl.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Prix (€) *</label>
                    <Input
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 49.99"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Durée totale (heures)</label>
                    <Input
                      type="number"
                      min="0"
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      placeholder="Ex: 12"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">URL de l'image de couverture</label>
                  <Input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Statut</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="publie">Publiée (Visible sur le catalogue)</option>
                    <option value="brouillon">Brouillon (Masquée)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createCourse.isPending || updateCourse.isPending}
                    className="flex-1"
                  >
                    {createCourse.isPending || updateCourse.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...
                      </>
                    ) : (
                      'Sauvegarder la formation'
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setView('list')}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────────
   CHAPTERS MANAGER SUB-SECTION
   ────────────────────────────────────────────────────────────────────────────── */
function ChaptersManagerSection({ course, onBack }: { course: any; onBack: () => void }) {
  const { data: chapters, isLoading } = useChapters(course?.id)
  const { createChapter, updateChapter, deleteChapter } = useManageChapters(course?.id)

  const [formOpen, setFormOpen] = useState(false)
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [sortOrder, setSortOrder] = useState('0')

  // Quiz Editor states
  const [isQuiz, setIsQuiz] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [tempQuestion, setTempQuestion] = useState('')
  const [tempOpt1, setTempOpt1] = useState('')
  const [tempOpt2, setTempOpt2] = useState('')
  const [tempOpt3, setTempOpt3] = useState('')
  const [tempOpt4, setTempOpt4] = useState('')
  const [tempCorrectIdx, setTempCorrectIdx] = useState('0')

  const openAddForm = () => {
    setEditingChapterId(null)
    setTitle('')
    setContent('')
    setVideoUrl('')
    setSortOrder(String((chapters?.length || 0) + 1))
    setIsQuiz(false)
    setQuestions([])
    setFormOpen(true)
  }

  const openEditForm = (chapter: any) => {
    setEditingChapterId(chapter.id)
    setTitle(chapter.title || '')
    setContent(chapter.content || '')
    setVideoUrl(chapter.videoUrl || '')
    setSortOrder(String(chapter.sortOrder || 0))
    const hasQuiz = Array.isArray(chapter.quizData) && chapter.quizData.length > 0
    setIsQuiz(hasQuiz)
    setQuestions(hasQuiz ? chapter.quizData : [])
    setFormOpen(true)
  }

  const addQuestion = () => {
    if (!tempQuestion.trim() || !tempOpt1.trim() || !tempOpt2.trim() || !tempOpt3.trim() || !tempOpt4.trim()) {
      toast.error('Veuillez renseigner la question et ses 4 options.')
      return
    }
    const newQ = {
      question: tempQuestion.trim(),
      options: [tempOpt1.trim(), tempOpt2.trim(), tempOpt3.trim(), tempOpt4.trim()],
      correctOptionIndex: parseInt(tempCorrectIdx),
    }
    setQuestions([...questions, newQ])
    setTempQuestion('')
    setTempOpt1('')
    setTempOpt2('')
    setTempOpt3('')
    setTempOpt4('')
    setTempCorrectIdx('0')
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isQuiz && questions.length === 0) {
      toast.error('Un chapitre de type Quiz doit contenir au moins une question.')
      return
    }

    const payload = {
      courseId: course.id,
      title,
      content: isQuiz ? null : (content || null),
      videoUrl: isQuiz ? null : (videoUrl || null),
      sortOrder: parseInt(sortOrder) || 0,
      quizData: isQuiz ? questions : null,
    }

    if (editingChapterId == null) {
      createChapter.mutate(payload, {
        onSuccess: () => {
          toast.success('Chapitre ajouté !')
          setFormOpen(false)
        },
      })
    } else {
      updateChapter.mutate(
        { ...payload, id: editingChapterId },
        {
          onSuccess: () => {
            toast.success('Chapitre mis à jour !')
            setFormOpen(false)
          },
        }
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous supprimer ce chapitre ?')) {
      deleteChapter.mutate(id, {
        onSuccess: () => {
          toast.success('Chapitre supprimé.')
        },
      })
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Retour aux formations
      </button>

      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{course?.title}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Constructeur de programme et chapitres de cours.
          </p>
        </div>
        {!formOpen && (
          <Button onClick={openAddForm} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Ajouter un chapitre
          </Button>
        )}
      </div>

      {formOpen ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>
              {editingChapterId == null ? 'Nouveau Chapitre' : 'Modifier le Chapitre'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Titre du chapitre *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: 1. Présentation générale"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="isQuiz"
                  checked={isQuiz}
                  onChange={e => setIsQuiz(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4.5 w-4.5 animate-none"
                />
                <label htmlFor="isQuiz" className="text-sm font-medium cursor-pointer select-none">
                  Ce chapitre est un Quiz interactif
                </label>
              </div>

              {!isQuiz ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">URL de la vidéo (MP4, YouTube, Vimeo)</label>
                    <Input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Contenu textuel (Texte / Markdown)</label>
                    <textarea
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Rédigez le texte du cours ici..."
                    />
                  </div>
                </>
              ) : (
                <div className="border border-border/80 rounded-xl p-4 bg-muted/20 space-y-4">
                  <h4 className="font-semibold text-sm">Gestion des questions du Quiz ({questions.length} question(s))</h4>

                  {questions.length > 0 && (
                    <div className="space-y-2.5">
                      {questions.map((q, i) => (
                        <div key={i} className="flex items-start justify-between p-3 rounded-lg border border-border bg-card text-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">{i + 1}. {q.question}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground mt-1">
                              {q.options.map((opt: string, idx: number) => (
                                <span key={idx} className={idx === q.correctOptionIndex ? "text-emerald-600 font-medium" : ""}>
                                  • {opt} {idx === q.correctOptionIndex ? "(Correct)" : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive h-7 px-2 hover:bg-destructive/10 shrink-0"
                            onClick={() => removeQuestion(i)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-border/50 pt-4 space-y-3">
                    <h5 className="text-xs font-semibold text-muted-foreground">Ajouter une question</h5>
                    <div className="space-y-2">
                      <Input
                        placeholder="Intitulé de la question (ex: Quel outil est utilisé pour...)"
                        value={tempQuestion}
                        onChange={e => setTempQuestion(e.target.value)}
                        className="text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Option 1" value={tempOpt1} onChange={e => setTempOpt1(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 2" value={tempOpt2} onChange={e => setTempOpt2(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 3" value={tempOpt3} onChange={e => setTempOpt3(e.target.value)} className="text-xs" />
                        <Input placeholder="Option 4" value={tempOpt4} onChange={e => setTempOpt4(e.target.value)} className="text-xs" />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-medium text-muted-foreground shrink-0">Bonne réponse :</label>
                        <select
                          value={tempCorrectIdx}
                          onChange={e => setTempCorrectIdx(e.target.value)}
                          className="rounded-md border border-input bg-background px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="0">Option 1</option>
                          <option value="1">Option 2</option>
                          <option value="2">Option 3</option>
                          <option value="3">Option 4</option>
                        </select>
                        <Button
                          type="button"
                          onClick={addQuestion}
                          variant="secondary"
                          size="sm"
                          className="ml-auto text-xs"
                        >
                          Ajouter la question
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Ordre d'affichage</label>
                <Input
                  type="number"
                  min="0"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={createChapter.isPending || updateChapter.isPending}
                >
                  {createChapter.isPending || updateChapter.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...
                    </>
                  ) : (
                    'Sauvegarder le chapitre'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : !chapters || chapters.length === 0 ? (
        <EmptyState
          icon={<Settings className="h-8 w-8" />}
          title="Aucun chapitre"
          description="Cette formation n'a pas encore de chapitres. Ajoutez-en un pour commencer à l'étoffer."
        />
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/60 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{chapter.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {Array.isArray(chapter.quizData) && chapter.quizData.length > 0 
                      ? `Quiz (${chapter.quizData.length} question(s))` 
                      : (chapter.videoUrl ? 'Vidéo intégrée' : 'Texte uniquement')
                    } · Ordre : {chapter.sortOrder}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => openEditForm(chapter)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={() => handleDelete(chapter.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
