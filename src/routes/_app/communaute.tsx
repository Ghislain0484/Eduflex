import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Input,
  Avatar,
  AvatarFallback,
  toast,
} from '@blinkdotnew/ui'
import {
  MessageSquare,
  Users,
  Send,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  Search,
  Plus,
  Pin
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/communaute')({
  component: CommunautePage,
})

interface Post {
  id: number
  author: string
  role: string
  avatar: string
  time: string
  title: string
  content: string
  likes: number
  replies: number
  pinned?: boolean
}

function CommunautePage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: user?.displayName || 'Formateur Principal',
      role: 'Enseignant',
      avatar: 'FP',
      time: 'Il y a 2h',
      title: 'Bienvenue dans la communauté EduFlex ! 🚀',
      content: 'Posez vos questions, échangez vos retours d\'expérience et entraidez-vous sur les cours.',
      likes: 12,
      replies: 4,
      pinned: true
    },
    {
      id: 2,
      author: 'Moussa Diakité',
      role: 'Élève',
      avatar: 'MD',
      time: 'Il y a 5h',
      title: 'Question sur l\'exercice du Chapitre 3',
      content: 'Est-ce que quelqu\'un a réussi à résoudre la deuxième partie du cas pratique Excel ?',
      likes: 3,
      replies: 2
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return
    setIsPosting(true)
    setTimeout(() => {
      setPosts([
        {
          id: Date.now(),
          author: user?.displayName || 'Utilisateur',
          role: user?.role === 'teacher' ? 'Enseignant' : 'Élève',
          avatar: (user?.displayName || 'U').slice(0, 2).toUpperCase(),
          time: 'À l\'instant',
          title: newTitle,
          content: newContent,
          likes: 0,
          replies: 0
        },
        ...posts
      ])
      setNewTitle('')
      setNewContent('')
      setIsPosting(false)
      toast.success("Publication publiée sur le forum !")
    }, 400)
  }

  const handleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left">
      
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-teal-400" />
            Communauté & Entraide
          </h1>
          <p className="text-xs text-slate-400">
            Espace d'échange en temps réel entre apprenants et formateurs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Create Post Form */}
          <Card className="border border-border/80 bg-card p-5">
            <form onSubmit={handleCreatePost} className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Créer une discussion</h3>
              <Input
                placeholder="Titre de votre sujet..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="text-xs"
              />
              <textarea
                placeholder="Exprimez-vous ou posez une question..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-ring resize-none"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPosting || !newTitle.trim()} size="sm" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Publier
                </Button>
              </div>
            </form>
          </Card>

          {/* Posts list */}
          <div className="space-y-3">
            {posts.map(post => (
              <Card key={post.id} className="border border-border/70 bg-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs font-bold bg-teal-500/10 text-teal-500">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{post.author}</span>
                        <Badge className="text-[9px] bg-slate-800 text-slate-300 border-none font-semibold">
                          {post.role}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{post.time}</span>
                    </div>
                  </div>
                  {post.pinned && (
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] font-bold flex items-center gap-1">
                      <Pin className="h-3 w-3" /> Épinglé
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white leading-snug">{post.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-border/40 text-xs text-muted-foreground">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 hover:text-teal-400 transition-colors font-medium"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> {post.likes} J'aime
                  </button>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.replies} Réponses
                  </span>
                </div>
              </Card>
            ))}
          </div>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card className="border border-border/70 bg-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Membres Actifs</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-4 w-4 text-teal-400" />
              <span>142 apprenants inscrits dans l'académie.</span>
            </div>
          </Card>
        </div>
      </div>

    </div>
  )
}
