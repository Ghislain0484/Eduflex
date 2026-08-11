import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  Button,
  Input,
  toast,
} from '@blinkdotnew/ui'
import {
  Palette,
  Upload,
  Globe,
  Plus,
  Trash2,
  CheckCircle2,
  Share2
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/personnalisation')({
  component: PersonnalisationPage,
})

function PersonnalisationPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'design' | 'pages' | 'learner'>('design')

  // Colors state
  const [primaryColor, setPrimaryColor] = useState('#0d9488')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [titleColor, setTitleColor] = useState('#0f172a')
  const [textColor, setTextColor] = useState('#334155')
  const [btnColor, setBtnColor] = useState('#0d9488')
  const [btnTextColor, setBtnTextColor] = useState('#ffffff')

  // Social links state
  const [socialType, setSocialType] = useState('Site Web')
  const [socialLink, setSocialLink] = useState('')
  const [socialList, setSocialList] = useState<{ id: number; type: string; url: string }[]>([
    { id: 1, type: 'WhatsApp', url: 'https://wa.me/225070000000' }
  ])

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!socialLink.trim()) {
      toast.error("Veuillez entrer une URL valide.")
      return
    }
    setSocialList([...socialList, { id: Date.now(), type: socialType, url: socialLink }])
    setSocialLink('')
    toast.success("Lien réseau social ajouté !")
  }

  const handleRemoveSocial = (id: number) => {
    setSocialList(socialList.filter(s => s.id !== id))
    toast.success("Lien supprimé.")
  }

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto text-left font-sans">
      
      {/* Top Header Upgrade Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 border border-emerald-500/35 rounded-lg shadow-xs gap-4">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Débloquer <strong className="text-emerald-600 dark:text-emerald-400">TOUTES</strong> les fonctionnalités pour profiter du meilleur de EduFlex
        </span>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md border-none px-6 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
          <Link to="/tarifs">
            Débloquer 🫱
          </Link>
        </Button>
      </div>

      {/* Main Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Personnalisez votre plateforme
        </h1>
      </div>

      {/* Navigation Tabs (Matching Screenshot 4) */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('design')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'design' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Design
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'pages' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Pages
        </button>
        <button
          onClick={() => setActiveTab('learner')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'learner' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
        >
          Espace apprenant
        </button>
      </div>

      {/* TAB 1: DESIGN (Matching Screenshot 4) */}
      {activeTab === 'design' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* Left Explanation Column */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Créez votre image de marque
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Pour se différencier des autres formations en ligne, il faut être identifiable et reconnaissable. EduFlex vous permet de choisir <strong className="text-slate-900 dark:text-white">votre logo et vos couleurs</strong>.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ces éléments apparaîtront sur votre page d'accueil accessible en <Link to="/courses" target="_blank" className="text-teal-500 hover:underline font-semibold">cliquant ici</Link>.
              </p>
            </div>

            {/* Right Brand Identity Form (Matching Screenshot 4) */}
            <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-6">
              
              {/* Dropzones for Logo & Favicon */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Logo (1024x1024 max)</label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-6 text-center hover:border-teal-500 cursor-pointer transition-colors space-y-2 bg-slate-50 dark:bg-slate-950">
                    <Upload className="h-6 w-6 text-slate-400 mx-auto" />
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Cliquez ou glissez votre image</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Favicon (64x64 max, en PNG)</label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-6 text-center hover:border-teal-500 cursor-pointer transition-colors space-y-2 bg-slate-50 dark:bg-slate-950">
                    <Upload className="h-6 w-6 text-slate-400 mx-auto" />
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Cliquez ou glissez votre image</p>
                  </div>
                </div>
              </div>

              {/* Color Pickers Grid (Matching Screenshot 4) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur principale</label>
                  <div className="flex gap-2">
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur d'arrière-plan</label>
                  <div className="flex gap-2">
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur des titres</label>
                  <div className="flex gap-2">
                    <input type="color" value={titleColor} onChange={e => setTitleColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={titleColor} onChange={e => setTitleColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur des textes</label>
                  <div className="flex gap-2">
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={textColor} onChange={e => setTextColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur des boutons</label>
                  <div className="flex gap-2">
                    <input type="color" value={btnColor} onChange={e => setBtnColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={btnColor} onChange={e => setBtnColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Couleur du texte des boutons</label>
                  <div className="flex gap-2">
                    <input type="color" value={btnTextColor} onChange={e => setBtnTextColor(e.target.value)} className="h-9 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-800 p-0.5" />
                    <Input value={btnTextColor} onChange={e => setBtnTextColor(e.target.value)} className="text-xs font-mono h-9" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={() => toast.success("Thème visuel de l'académie mis à jour !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
                  Mettre à jour
                </Button>
              </div>
            </Card>
          </div>

          {/* Social Links Section (Matching Screenshot 4) */}
          <div className="grid gap-6 lg:grid-cols-12 items-start border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Vos liens sociaux
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Ajoutez des liens vers un site externe, votre page Facebook, Twitter, Instagram, WhatsApp ou n'importe quelle autre page qui aidera vos apprenants à en savoir plus sur vous.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ces liens apparaîtront sur votre page d'accueil accessible en <Link to="/courses" target="_blank" className="text-teal-500 hover:underline font-semibold">cliquant ici</Link>.
              </p>
            </div>

            <Card className="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
              <form onSubmit={handleAddSocial} className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lien vers une page web</label>
                <div className="flex gap-2">
                  <select
                    value={socialType}
                    onChange={e => setSocialType(e.target.value)}
                    className="h-9 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none px-3 cursor-pointer shrink-0"
                  >
                    <option value="Site Web">Site Web</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                  <Input
                    placeholder="Entrez votre lien (https://monsite.fr)"
                    value={socialLink}
                    onChange={e => setSocialLink(e.target.value)}
                    className="text-xs h-9 bg-white dark:bg-slate-950 flex-1"
                  />
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-4 rounded-lg shrink-0">
                    Ajouter
                  </Button>
                </div>
              </form>

              {socialList.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Liens ajoutés :</span>
                  <div className="space-y-1.5">
                    {socialList.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">{item.type} : <span className="text-slate-600 dark:text-slate-300 font-normal">{item.url}</span></span>
                        <button onClick={() => handleRemoveSocial(item.id)} className="text-red-500 hover:text-red-400 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs text-xs text-slate-500">
          Personnalisation des pages de destination et mentions légales...
        </Card>
      )}

      {activeTab === 'learner' && (
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs text-xs text-slate-500">
          Personnalisation du thème et du lecteur de cours de l'espace apprenant...
        </Card>
      )}

    </div>
  )
}
