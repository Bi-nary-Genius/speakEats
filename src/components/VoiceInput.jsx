import { useState, useRef, useEffect } from 'react'
import './VoiceInput.css'

export default function VoiceInput({ onIngredientsDetected }) {
  const [listening,  setListening]  = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported,  setSupported]  = useState(true)
  const [inputVal,   setInputVal]   = useState('')
  const [micError,   setMicError]   = useState(null)
  const recognitionRef = useRef(null)
  const textInputRef   = useRef(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous    = true
    recognition.interimResults = true
    recognition.lang          = 'en-US'

    recognition.onresult = (event) => {
      let interim = '', final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) final += t
        else interim += t
      }
      setTranscript(final || interim)
      if (final) {
        const parsed = parseIngredients(final)
        if (parsed.length > 0) onIngredientsDetected(parsed)
      }
    }

    recognition.onerror = (event) => {
      setListening(false)
      const messages = {
        'not-allowed':       'Microphone access was denied. Please allow microphone access in your browser settings.',
        'permission-denied': 'Microphone access was denied. Please allow microphone access in your browser settings.',
        'no-speech':         'No speech was detected. Please try again.',
        'audio-capture':     'No microphone was found. Please check that one is connected.',
        'network':           'A network error occurred. Please check your connection and try again.',
        'aborted':           null, // user stopped intentionally — no message
      }
      const msg = messages[event.error] ?? 'Something went wrong with the microphone. Please try again.'
      if (msg) setMicError(msg)
    }
    recognition.onend   = () => setListening(false)
    recognitionRef.current = recognition
  }, [onIngredientsDetected])

  function parseIngredients(text) {
    return text
      .toLowerCase()
      .replace(/\band\b/g, ',')
      .split(/[,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 1)
  }

  function toggleListening() {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      setTranscript('')
      setMicError(null)
      recognitionRef.current.start()
      setListening(true)
    }
  }

  function handleTextAdd() {
    const parsed = parseIngredients(inputVal)
    if (parsed.length === 0) return
    onIngredientsDetected(parsed)
    setInputVal('')
    textInputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleTextAdd()
    }
  }

  // ── Text input row (shared between supported + unsupported) ──
  const textRow = (
    <div className="text-row">
      <input
        ref={textInputRef}
        type="text"
        className="text-ingredient-input"
        placeholder="e.g. chicken, garlic, rice..."
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Type an ingredient"
      />
      <button
        className="text-add-btn"
        onClick={handleTextAdd}
        disabled={!inputVal.trim()}
        aria-label="Add ingredient"
      >
        <PlusIcon />
      </button>
    </div>
  )

  // ── Unsupported: lead with text input, note at bottom ──
  if (!supported) {
    return (
      <div className="voice-card">
        <div className="unsupported-inner">
          <p className="unsupported-lead">What's in your kitchen?</p>
          <p className="unsupported-sub">type your ingredients below</p>
          {textRow}
          <p className="unsupported-note">
            🎤 Voice recognition isn't available in this browser
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`voice-card ${listening ? 'voice-card--active' : ''}`}>
      <p className="voice-helper-text">Start by speaking or typing ingredients you already have.</p>
      {/* ── Mic section ── */}
      <div className="voice-inner">
        <button
          className={`mic-btn ${listening ? 'listening' : ''}`}
          onClick={toggleListening}
          aria-label={listening ? 'Stop listening' : 'Start listening'}
        >
          {listening && (
            <>
              <span className="ripple ripple-1" />
              <span className="ripple ripple-2" />
              <span className="ripple ripple-3" />
            </>
          )}
          <span className="mic-icon-wrap">
            <MicSVG listening={listening} />
          </span>
        </button>

        <div className="mic-label">
          {listening
            ? <span className="mic-label--active">I'm listening…</span>
            : <span className="mic-label--idle">tap the mic &amp; start speaking</span>
          }
        </div>

        {listening && (
          <p className="voice-hint">
            e.g. &ldquo;chicken, garlic, and tomatoes&rdquo;
          </p>
        )}
      </div>

      {transcript && (
        <div className="transcript-strip">
          <span className="transcript-ear">🎤</span>
          <span className="transcript-text">{transcript}</span>
        </div>
      )}

      {micError && (
        <p className="mic-error" role="alert">{micError}</p>
      )}

      {/* ── Divider ── */}
      <div className="or-divider">
        <span className="or-divider-line" />
        <span className="or-divider-text">or type it in</span>
        <span className="or-divider-line" />
      </div>

      {/* ── Text input ── */}
      {textRow}
    </div>
  )
}

function MicSVG({ listening }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mic-svg ${listening ? 'mic-svg--on' : ''}`}
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  )
}
