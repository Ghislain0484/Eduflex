import { useEffect, useRef, useState } from 'react'

interface JitsiMeetProps {
  roomName: string
  displayName: string
  email?: string
  domain?: string
  isModerator?: boolean
  onMeetLeave?: () => void
}

/**
 * Premium Jitsi Meet integration utilizing Jitsi Meet External API script.
 * Dynamically binds meeting options, participant names, moderator status, and toolbar toggles.
 */
export function JitsiMeet({
  roomName,
  displayName,
  email = '',
  domain = 'meet.jit.si',
  isModerator = false,
  onMeetLeave
}: JitsiMeetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [apiLoaded, setApiLoaded] = useState(false)
  const apiInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Dynamic loading of Jitsi External API Script
    const scriptId = 'jitsi-external-api-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement

    const initJitsi = () => {
      setApiLoaded(true)
    }

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = `https://${domain}/external_api.js`
      script.async = true
      script.onload = initJitsi
      document.body.appendChild(script)
    } else {
      if ((window as any).JitsiMeetExternalAPI) {
        initJitsi()
      } else {
        script.onload = initJitsi
      }
    }

    return () => {
      if (apiInstanceRef.current) {
        apiInstanceRef.current.dispose()
      }
    }
  }, [domain])

  useEffect(() => {
    if (!apiLoaded || !containerRef.current || !(window as any).JitsiMeetExternalAPI) return

    if (apiInstanceRef.current) {
      apiInstanceRef.current.dispose()
    }

    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: containerRef.current,
      configOverwrite: {
        startWithAudioMuted: !isModerator,
        startWithVideoMuted: !isModerator,
        prejoinPageEnabled: true,
        disableInviteFunctions: true, // Secure: restrict sharing invites outside EduFlex
        enableWelcomePage: false,
        toolbarButtons: [
          'camera',
          'chat',
          'closedcaptions',
          'desktop',
          'download',
          'embedmeeting',
          'etherpad',
          'feedback',
          'filmstrip',
          'fullscreen',
          'hangup',
          'help',
          'highlight',
          'invite',
          'linktosalesforce',
          'livestreaming',
          'microphone',
          'noisesuppression',
          'participants-pane',
          'profile',
          'raisehand',
          'recording',
          'security',
          'select-background',
          'settings',
          'shareaudio',
          'sharedvideo',
          'shortcuts',
          'stats',
          'tileview',
          'toggle-camera',
          'videoquality',
          'whiteboard'
        ]
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        MOBILE_APP_PROMO: false
      },
      userInfo: {
        displayName: displayName,
        email: email
      }
    }

    try {
      const api = new (window as any).JitsiMeetExternalAPI(domain, options)
      apiInstanceRef.current = api

      api.addEventListener('readyToClose', () => {
        if (onMeetLeave) onMeetLeave()
      })
    } catch (err) {
      console.error("JitsiMeetExternalAPI instantiation failed:", err)
    }

    return () => {
      if (apiInstanceRef.current) {
        apiInstanceRef.current.dispose()
        apiInstanceRef.current = null
      }
    }
  }, [apiLoaded, roomName, displayName, email, domain, isModerator])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-border" />
  )
}
export default JitsiMeet
