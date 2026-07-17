import { toast } from '@blinkdotnew/ui'

export function useFlutterwave() {
  const makePayment = (options: {
    amount: number // in cents
    currency?: string
    courseTitle: string
    userEmail: string
    userName: string
  }): Promise<{ transaction_id: string; tx_ref: string; status: string }> => {
    return new Promise((resolve, reject) => {
      const checkoutFunc = (window as any).FlutterwaveCheckout
      if (!checkoutFunc) {
        const errMsg = "Le script de paiement Flutterwave n'a pas pu être chargé. Veuillez vérifier votre connexion internet."
        toast.error(errMsg)
        reject(new Error(errMsg))
        return
      }

      let publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY
      if (typeof window !== 'undefined') {
        const globalConfig = localStorage.getItem('global_platform_config')
        if (globalConfig) {
          try {
            const parsed = JSON.parse(globalConfig)
            if (parsed.flutterwavePublicKey) {
              publicKey = parsed.flutterwavePublicKey
            }
          } catch {}
        }
      }

      if (!publicKey) {
        const errMsg = "La clé publique Flutterwave n'est pas configurée (Console Admin > Passerelle ou variable .env)."
        toast.error(errMsg)
        reject(new Error(errMsg))
        return
      }

      try {
        checkoutFunc({
          public_key: publicKey,
          tx_ref: `flw-eduflex-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          amount: options.amount / 100,
          currency: options.currency || 'EUR',
          payment_options: 'card,mobilemoney,ussd',
          customer: {
            email: options.userEmail,
            name: options.userName || options.userEmail.split('@')[0],
          },
          customizations: {
            title: 'EduFlex',
            description: `Achat de la formation : ${options.courseTitle}`,
            logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
          },
          callback: function (data: any) {
            if (data.status === 'successful' || data.status === 'completed') {
              resolve({
                transaction_id: String(data.transaction_id || data.id),
                tx_ref: data.tx_ref,
                status: data.status,
              })
            } else {
              reject(new Error(`Paiement non finalisé (statut: ${data.status})`))
            }
          },
          onclose: function () {
            reject(new Error('Fenêtre de paiement fermée par l\'utilisateur.'))
          },
        })
      } catch (err: any) {
        toast.error(`Erreur d'initialisation de Flutterwave : ${err.message}`)
        reject(err)
      }
    })
  }

  return { makePayment }
}
