import { useState, useEffect, useRef } from 'react'
import './HealthPanel.css'

// Session-level cache so we don't re-fetch the same ingredient twice
const cache = new Map()

export default function HealthPanel({ ingredient, onClose }) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const panelRef              = useRef(null)

  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Trap focus & auto-focus panel
  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!ingredient) return

    if (cache.has(ingredient)) {
      setData(cache.get(ingredient))
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    setData(null)

    fetch('/api/health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredient }),
    })
      .then(r => {
        if (!r.ok) throw new Error(`Server error ${r.status}`)
        return r.json()
      })
      .then(d => {
        cache.set(ingredient, d)
        setData(d)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [ingredient])

  return (
    /* Backdrop */
    <div className="hp-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="hp-panel"
        onClick={e => e.stopPropagation()}
        ref={panelRef}
        tabIndex={-1}
      >
        {/* Close */}
        <button className="hp-close" onClick={onClose} aria-label="Close">×</button>

        {/* Header */}
        <div className="hp-header">
          <span className="hp-leaf" aria-hidden="true">🌿</span>
          <h2 className="hp-title">{ingredient}</h2>
        </div>

        {/* Content */}
        {loading && <HealthSkeleton />}

        {error && (
          <p className="hp-error">Couldn't load info right now 😅 — try again later.</p>
        )}

        {data && !loading && (
          <>
            <p className="hp-summary">{data.summary}</p>

            <ul className="hp-benefits">
              {data.benefits?.map((b, i) => (
                <li key={i} className="hp-benefit-item">
                  <span className="hp-dot" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>

            {data.learnMoreUrl && (
              <a
                className="hp-link"
                href={data.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more on {data.learnMoreSource} →
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function HealthSkeleton() {
  return (
    <div className="hp-skeleton" aria-label="Loading…">
      <div className="hp-skel-line hp-skel-line--wide" />
      <div className="hp-skel-line" />
      <div className="hp-skel-line hp-skel-line--med" />
      <div className="hp-skel-line" />
      <div className="hp-skel-line hp-skel-line--med" />
      <div className="hp-skel-line hp-skel-line--sm" />
    </div>
  )
}
