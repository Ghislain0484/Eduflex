//#region src/utils/sms.ts
/**
* Loads SMS configuration from localStorage.
*/
function getSMSConfig() {
	if (typeof window === "undefined") return {
		provider: "twilio",
		accountSid: "",
		authToken: "",
		senderId: "EDUFLEX",
		enabledEvents: {
			purchase: false,
			withdrawal: false
		}
	};
	const saved = localStorage.getItem("global_sms_config");
	if (saved) try {
		return JSON.parse(saved);
	} catch {}
	return {
		provider: "twilio",
		accountSid: "",
		authToken: "",
		senderId: "EDUFLEX",
		enabledEvents: {
			purchase: false,
			withdrawal: false
		}
	};
}
/**
* Sends a notification SMS to a phone number.
*/
async function sendSMS(to, message) {
	const config = getSMSConfig();
	console.log(`[SMS OUTBOX] Destination: ${to} | Sender: ${config.senderId} | Gateway: ${config.provider} | Message: ${message}`);
	if (!config.accountSid || !config.authToken) {
		console.warn("SMS Gateway not fully configured. Notification simulated.");
		return true;
	}
	try {
		if (config.provider === "twilio") {
			const authHeader = btoa(`${config.accountSid}:${config.authToken}`);
			const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`;
			const params = new URLSearchParams();
			params.append("To", to);
			params.append("From", config.senderId);
			params.append("Body", message);
			const res = await fetch(twilioUrl, {
				method: "POST",
				headers: {
					"Authorization": `Basic ${authHeader}`,
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: params.toString()
			});
			if (!res.ok) throw new Error(`Twilio Gateway Error: ${res.statusText}`);
		}
		return true;
	} catch (err) {
		console.error("Failed to deliver SMS:", err);
		return false;
	}
}
//#endregion
export { sendSMS };
