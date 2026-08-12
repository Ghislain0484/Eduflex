import { toast } from "@blinkdotnew/ui";
//#region src/hooks/useFlutterwave.ts
function useFlutterwave() {
	const makePayment = (options) => {
		return new Promise((resolve, reject) => {
			const checkoutFunc = window.FlutterwaveCheckout;
			if (!checkoutFunc) {
				const errMsg = "Le script de paiement Flutterwave n'a pas pu être chargé. Veuillez vérifier votre connexion internet.";
				toast.error(errMsg);
				reject(new Error(errMsg));
				return;
			}
			let publicKey = "FLWPUBK_TEST-YOUR_PUBLIC_KEY_HERE";
			if (typeof window !== "undefined") {
				const globalConfig = localStorage.getItem("global_platform_config");
				if (globalConfig) try {
					const parsed = JSON.parse(globalConfig);
					if (parsed.flutterwavePublicKey) publicKey = parsed.flutterwavePublicKey;
				} catch {}
			}
			if (!publicKey) {
				const errMsg = "La clé publique Flutterwave n'est pas configurée (Console Admin > Passerelle ou variable .env).";
				toast.error(errMsg);
				reject(new Error(errMsg));
				return;
			}
			const currency = options.currency || "XOF";
			const paymentAmount = options.amount;
			const flwPayload = {
				public_key: publicKey,
				tx_ref: `flw-eduflex-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
				amount: paymentAmount,
				currency,
				payment_options: "card,mobilemoney,ussd,banktransfer",
				customer: {
					email: options.userEmail,
					name: options.userName || options.userEmail.split("@")[0]
				},
				customizations: {
					title: "EduFlex Académie",
					description: `Achat de la formation : ${options.courseTitle}`,
					logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80"
				},
				callback: function(data) {
					if (data.status === "successful" || data.status === "completed") resolve({
						transaction_id: String(data.transaction_id || data.id),
						tx_ref: data.tx_ref,
						status: data.status
					});
					else reject(/* @__PURE__ */ new Error(`Paiement non finalisé (statut: ${data.status})`));
				},
				onclose: function() {
					reject(/* @__PURE__ */ new Error("Fenêtre de paiement fermée par l'utilisateur."));
				}
			};
			if (options.subaccountId) {
				const devCommissionPercent = options.devCommissionRate ?? 5;
				flwPayload.subaccounts = [{
					id: options.subaccountId,
					transaction_charge_type: "percentage",
					transaction_charge: 100 - devCommissionPercent
				}];
			}
			try {
				checkoutFunc(flwPayload);
			} catch (err) {
				toast.error(`Erreur d'initialisation de Flutterwave : ${err.message}`);
				reject(err);
			}
		});
	};
	return { makePayment };
}
//#endregion
export { useFlutterwave as t };
