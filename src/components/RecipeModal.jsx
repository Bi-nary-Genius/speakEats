import { useState, useEffect, useRef } from 'react'
import './RecipeModal.css'

const REACTIONS = [
  { id: 'fire',     emoji: '🔥', label: 'Damn that was Good' },
  { id: 'star',     emoji: '⭐', label: '5 Star Meal'         },
  { id: 'worthit',  emoji: '🤤', label: 'Worth It'            },
  { id: 'obsessed', emoji: '😍', label: 'Obsessed'            },
]

function playClink() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime
    const tone = (freq, vol, decay) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = freq
      g.gain.setValueAtTime(vol, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + decay)
      o.connect(g); g.connect(ctx.destination)
      o.start(now); o.stop(now + decay)
    }
    tone(1318, 0.22, 0.55)
    tone(2637, 0.09, 0.25)
    // tiny sizzle burst
    const sr = ctx.sampleRate, bufSize = Math.floor(sr * 0.04)
    const buf = ctx.createBuffer(1, bufSize, sr)
    const d   = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1
    const src = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), gn = ctx.createGain()
    hp.type = 'highpass'; hp.frequency.value = 5000
    gn.gain.setValueAtTime(0.06, now)
    gn.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
    src.buffer = buf
    src.connect(hp); hp.connect(gn); gn.connect(ctx.destination)
    src.start(now)
  } catch { /* silent fail */ }
}

// Session cache so re-opening the same meal is instant
const recipeCache = new Map()

export default function RecipeModal({ meal, userIngredients, savedMeal, onSave, onRemove, onUpdate, onClose }) {
  const [recipe,    setRecipe]    = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  // Local copies of reaction + note so the UI is responsive before the parent re-renders
  const [reaction,  setReaction]  = useState(savedMeal?.reaction ?? null)
  const [note,      setNote]      = useState(savedMeal?.note ?? '')
  const [saveState, setSaveState] = useState(savedMeal ? 'saved' : 'idle')

  const panelRef           = useRef(null)
  const userIngredientsRef = useRef(userIngredients)

  // Keyboard close
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => { panelRef.current?.focus() }, [])

  // Fetch recipe — keyed only on meal.name; AbortController prevents
  // stale setState calls if the modal is closed before the fetch finishes.
  useEffect(() => {
    if (recipeCache.has(meal.name)) {
      setRecipe(recipeCache.get(meal.name))
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/recipe', {
      signal: controller.signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mealName: meal.name,
        description: meal.description,
        userIngredients: userIngredientsRef.current,
      }),
    })
      .then(r => { if (!r.ok) throw new Error(`Server error ${r.status}`); return r.json() })
      .then(data => { recipeCache.set(meal.name, data); setRecipe(data) })
      .catch(e => { if (e.name !== 'AbortError') setError(e.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })

    return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal.name])

  // ── Save handlers ──────────────────────────────────────────────
  function handleInstantSave() {
    playClink()
    onSave({ ...meal, savedAt: new Date().toISOString() })
    setSaveState('saved')
  }

  function handleReactionClick(r) {
    const next = reaction?.id === r.id ? null : r
    setReaction(next)
    playClink()
    onUpdate(meal.name, { reaction: next })
  }

  function handleNoteBlur() {
    if (note.trim() !== (savedMeal?.note ?? '')) {
      onUpdate(meal.name, { note: note.trim() })
    }
  }

  function handleRemove() {
    onRemove(meal.name)
    setSaveState('idle')
    setReaction(null)
    setNote('')
  }

  const alreadySaved = saveState === 'saved'

  return (
    <div className="rm-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Recipe for ${meal.name}`}>
      <div className="rm-sheet" onClick={e => e.stopPropagation()} ref={panelRef} tabIndex={-1}>

        {/* ── Top bar ── */}
        <div className="rm-topbar">
          <button className="rm-close" onClick={onClose} aria-label="Close">
            <span>←</span> back
          </button>
          {alreadySaved && (
            <span className="rm-saved-badge">
              {reaction?.emoji ? `${reaction.emoji} ` : ''}Saved to Good Eat'n
            </span>
          )}
        </div>

        {/* ── Hero ── */}
        <div className="rm-hero">
          <h2 className="rm-title">{meal.name}</h2>
          <p className="rm-tagline">{meal.description}</p>
          {recipe && (
            <div className="rm-meta">
              <span className="rm-badge">🍽️ {recipe.servings} servings</span>
              <span className="rm-badge">⏱ {recipe.time}</span>
              <span className="rm-badge">⚡ {recipe.difficulty}</span>
            </div>
          )}
        </div>

        {/* ── Recipe body ── */}
        <div className="rm-body">
          {loading && <RecipeSkeleton />}
          {error   && <p className="rm-error">Couldn't load the recipe right now 😅</p>}

          {recipe && !loading && (
            <>
              <section className="rm-section">
                <h3 className="rm-section-title">Ingredients</h3>
                <ul className="rm-ingredients">
                  {recipe.ingredients?.map((ing, i) => (
                    <li key={i} className="rm-ingredient">
                      <span className="rm-ing-dot" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rm-section">
                <h3 className="rm-section-title">How to make it</h3>
                <ol className="rm-steps">
                  {recipe.steps?.map((step, i) => (
                    <li key={i} className="rm-step">
                      <span className="rm-step-num">{i + 1}</span>
                      <span className="rm-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {recipe.tip && (
                <div className="rm-tip">
                  <span className="rm-tip-label">Chef's tip</span>
                  <p>{recipe.tip}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Save section ── */}
        <div className="rm-save-section">
          <div className="rm-save-divider">
            <span />
            <span className="rm-save-divider-text">Good Eat'n</span>
            <span />
          </div>

          {alreadySaved ? (
            /* ── Saved: rating lives here ── */
            <div className="rm-rating-area">
              <div className="rm-saved-status">
                <span className="rm-saved-check">✓ Saved to Good Eat'n</span>
                <button className="rm-remove-btn" onClick={handleRemove}>remove</button>
              </div>

              <p className="rm-rate-prompt">
                {reaction ? 'Rating:' : 'come back after cooking and rate it'}
              </p>

              <div className="rm-reactions">
                {REACTIONS.map(r => (
                  <button
                    key={r.id}
                    className={`rm-reaction-btn ${reaction?.id === r.id ? 'rm-reaction-btn--active' : ''}`}
                    onClick={() => handleReactionClick(r)}
                    title={r.label}
                  >
                    <span className="rm-reaction-emoji">{r.emoji}</span>
                    <span className="rm-reaction-label">{r.label}</span>
                  </button>
                ))}
              </div>

              <div className="rm-note-row">
                <textarea
                  className="rm-note"
                  placeholder="add a personal note... (optional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  onBlur={handleNoteBlur}
                  maxLength={200}
                  rows={2}
                />
              </div>
            </div>
          ) : (
            /* ── Not saved: one button ── */
            <button className="rm-save-btn" onClick={handleInstantSave}>
              Saved to Good Eat'n
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

function RecipeSkeleton() {
  return (
    <div className="rm-skeleton">
      <div className="rm-skel-head" />
      {[90, 75, 85, 70, 80].map((w, i) => (
        <div key={i} className="rm-skel-line" style={{ width: `${w}%` }} />
      ))}
      <div className="rm-skel-gap" />
      <div className="rm-skel-head" />
      {[95, 80, 88, 72].map((w, i) => (
        <div key={i} className="rm-skel-line" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}
