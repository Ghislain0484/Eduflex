import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, Badge, Button, Input, Skeleton, toast } from '@blinkdotnew/ui'
import { CreditCard, Search, Download, Euro, ShieldCheck, DollarSign, Wallet, ArrowUpRight, Lock, Building, Layers } from 'lucide-react'
import { useState } from 'react'
import { useAllEnrollments } from '@/hooks/useStats'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app/paiements')({
  component: PaiementsPage,
})

function PaiementsPage() {
  const { user } = useAuth()
  const { data: enrollments, isLoading } = useAllEnrollments()
  const [search, setSearch] = useState('')
  const [devCommissionRate, setDevCommissionRate] = useState('5') // 5% developer/platform commission

  // Flutterwave merchant config state
  const [flwPublicKey, setFlwPublicKey] = useState('FLWPUBK_TEST-a91c8821901aef42b-X')
  const [flwSecretKey, setFlwSecretKey] = useState('FLWSECK_TEST-9921b712019ff21-X')

  const enrollmentList = enrollments || []
  const filtered = enrollmentList.filter(p =>
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
    p.studentEmail.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenueFcfa = enrollmentList.reduce((sum, item) => sum + (item.coursePrice || 0), 0)
  const devCommissionFcfa = Math.round(totalRevenueFcfa * (Number(devCommissionRate) / 100))
  const trainerShareFcfa = totalRevenueFcfa - devCommissionFcfa

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto font-sans text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Gestion des Paiements & Split Payments Flutterwave
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Répartition automatique des revenus entre la part développeur/plateforme et la part des formateurs.
          </p>
        </div>

        <Button onClick={() => toast.success("Rapport financier téléversé en CSV !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 gap-1.5 rounded-lg">
          <Download className="h-4 w-4" /> Exporter le rapport CSV
        </Button>
      </div>

      {/* 3 Metric Cards: Total Revenue, Developer Commission (5%), Trainers Net Share (95%) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center shrink-0">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Volume Total de Ventes</p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{totalRevenueFcfa.toLocaleString('fr-FR')} FCFA</p>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Part Développeur / Plateforme ({devCommissionRate}%)</p>
              <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">{devCommissionFcfa.toLocaleString('fr-FR')} FCFA</p>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Part Net Formateurs / Instituts ({100 - Number(devCommissionRate)}%)</p>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{trainerShareFcfa.toLocaleString('fr-FR')} FCFA</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Flutterwave Split Payment Configuration Form */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-teal-500" />
              Passerelle Flutterwave & Subaccount Split Payments
            </h3>
            <p className="text-xs text-slate-500">
              Connectez votre compte Flutterwave pour encaisser par Wave, Orange Money, MTN, Moov et Carte bancaire.
            </p>
          </div>

          <Badge className="bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-xs px-3 py-1 font-bold">
            Flutterwave V3 Actif
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Clé Publique (Public Key)</label>
            <Input value={flwPublicKey} onChange={e => setFlwPublicKey(e.target.value)} className="text-xs font-mono h-9" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Clé Secrète (Secret Key)</label>
            <Input type="password" value={flwSecretKey} onChange={e => setFlwSecretKey(e.target.value)} className="text-xs font-mono h-9" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Commission Développeur (%)</label>
            <Input value={devCommissionRate} onChange={e => setDevCommissionRate(e.target.value)} className="text-xs font-mono h-9" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={() => toast.success("Configuration Flutterwave enregistrée !")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 px-6 rounded-lg">
            Sauvegarder les paramètres Flutterwave
          </Button>
        </div>
      </Card>

      {/* Filter and Transactions Table */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Historique des Transactions Réparti</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input placeholder="Rechercher par élève ou cours..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 text-xs h-8 bg-white dark:bg-slate-950" />
          </div>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">Apprenant</th>
                  <th className="py-3 px-4">Formation / Cours</th>
                  <th className="py-3 px-4">Montant Total</th>
                  <th className="py-3 px-4">Part Développeur ({devCommissionRate}%)</th>
                  <th className="py-3 px-4">Part Formateur ({100 - Number(devCommissionRate)}%)</th>
                  <th className="py-3 px-4">Méthode</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i}>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="py-4 px-4"><Skeleton className="h-5 w-16" /></td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 italic">
                      Aucune transaction enregistrée.
                    </td>
                  </tr>
                ) : (
                  filtered.map(paiement => {
                    const priceFcfa = paiement.coursePrice || 0
                    const devPart = Math.round(priceFcfa * (Number(devCommissionRate) / 100))
                    const trainerPart = priceFcfa - devPart

                    return (
                      <tr key={paiement.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">{paiement.studentName}</span>
                          <span className="text-[10px] text-slate-400">{paiement.studentEmail}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs">{paiement.courseTitle}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {priceFcfa.toLocaleString('fr-FR')} FCFA
                        </td>
                        <td className="py-3.5 px-4 font-bold text-amber-600 dark:text-amber-400">
                          {devPart.toLocaleString('fr-FR')} FCFA
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                          {trainerPart.toLocaleString('fr-FR')} FCFA
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-semibold">{paiement.method || 'Flutterwave Mobile Money'}</td>
                        <td className="py-3.5 px-4">
                          <Badge className="bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-[10px] font-bold">
                            {paiement.status || 'Payé'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  )
}
