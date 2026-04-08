import { useState } from 'react'
import './StruggleMealWizard.css'

const PERIODS = [
  { value: 'daily',   label: '/ day'   },
  { value: 'weekly',  label: '/ week'  },
  { value: 'monthly', label: '/ month' },
]

function mapsLink(storeName, zipCode) {
  const q = encodeURIComponent(`${storeName} near ${zipCode || 'me'}`)
  return `https://www.google.com/maps/search/${q}`
}

export default function StruggleMealWizard() {
  const [budget,  setBudget]  = useState('')
  const [period,  setPeriod]  = useState('weekly')
  const [staples, setStaples] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!budget) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/struggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: parseFloat(budget), period, staples, zipCode }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      setResult(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const budgetNum    = parseFloat(budget) || 0
  const pctUsed      = result ? Math.min((result.totalEstimated / budgetNum) * 100, 100) : 0
  const underBudget  = result ? result.budgetRemaining >= 0 : true

  return (
<section className="smw">
  {/* ── Header ── */}
  <div className="smw-header">
    <div className="smw-header-text">
      <p className="smw-subtitle">Tell me your budget. I'll make it work.</p>
    </div>
  </div>

      {/* ── Form ── */}
      <form className="smw-form" onSubmit={handleSubmit}>
        {/* Budget row */}
        <div className="smw-field-group">
          <label className="smw-label">your budget</label>
          <div className="smw-budget-row">
            <div className="smw-money-input">
              <span className="smw-dollar">$</span>
              <input
                type="number"
                className="smw-input smw-input--budget"
                placeholder="40"
                value={budget}
                min="1"
                step="any"
                onChange={e => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="smw-period-tabs">
              {PERIODS.map(p => (
                <button
                  key={p.value}
                  type="button"
                  className={`smw-period-tab ${period === p.value ? 'smw-period-tab--active' : ''}`}
                  onClick={() => setPeriod(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staples */}
        <div className="smw-field-group">
          <label className="smw-label">
            must-haves <span className="smw-label-hint"></span>
          </label>
          <input
            type="text"
            className="smw-input"
            placeholder="e.g. hot sauce, coffee, ramen..."
            value={staples}
            onChange={e => setStaples(e.target.value)}
          />
        </div>

        {/* Zip code */}
        <div className="smw-field-group">
          <label className="smw-label">
            zip code <span className="smw-label-hint"></span>
          </label>
          <input
            type="text"
            className="smw-input smw-input--zip"
            placeholder="e.g. 28205"
            value={zipCode}
            maxLength={10}
            onChange={e => setZipCode(e.target.value)}
          />
        </div>

        <button className="smw-submit" type="submit" disabled={loading || !budget}>
          {loading ? (
            <span className="smw-loading">
              <span className="smw-loading-dot" />
              working the magic…
            </span>
          ) : (
            'Work Your Magic '
          )}
        </button>
      </form>

      {error && <p className="smw-error">{error}</p>}

      {/* ── Results ── */}
      {result && (
        <div className="smw-results">
          {/* Roast */}
          <div className="smw-roast">
            <span className="smw-roast-icon"></span>
            <p className="smw-roast-text">{result.roast}</p>
          </div>

          {/* Budget bar */}
          <div className="smw-budget-summary">
            <div className="smw-budget-labels">
              <span className="smw-budget-used">
                ${result.totalEstimated?.toFixed(2)} estimated
              </span>
              <span className={`smw-budget-left ${underBudget ? '' : 'smw-budget-left--over'}`}>
                {underBudget
                  ? `$${result.budgetRemaining?.toFixed(2)} left `
                  : `$${Math.abs(result.budgetRemaining)?.toFixed(2)} over — swap one item`
                }
              </span>
            </div>
            <div className="smw-bar-track">
              <div
                className={`smw-bar-fill ${underBudget ? '' : 'smw-bar-fill--over'}`}
                style={{ width: `${pctUsed}%` }}
              />
            </div>
            <div className="smw-bar-budget-label">${budgetNum.toFixed(2)} {period}</div>
          </div>

          {/* Two-col layout: grocery list + stores */}
          <div className="smw-two-col">
            {/* Grocery list */}
            <div className="smw-panel">
              <h3 className="smw-panel-title">🛒 The List</h3>
              <ul className="smw-grocery-list">
                {result.groceryList?.map((item, i) => (
                  <li key={i} className="smw-grocery-item">
                    <div className="smw-grocery-main">
                      <span className="smw-grocery-name">{item.item}</span>
                      <span className="smw-grocery-cost">${item.estimatedCost?.toFixed(2)}</span>
                    </div>
                    {item.note && (
                      <span className="smw-grocery-note">{item.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stores */}
            <div className="smw-panel">
              <h3 className="smw-panel-title">📍 Where to Shop</h3>
              <div className="smw-stores">
                {result.stores?.map((store, i) => (
                  <div key={i} className="smw-store-card">
                    <div className="smw-store-top">
                      <span className="smw-store-name">{store.name}</span>
                      <a
                        className="smw-maps-link"
                        href={mapsLink(store.name, zipCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Find ${store.name} on Google Maps`}
                      >
                        Maps →
                      </a>
                    </div>
                    <p className="smw-store-why">{store.why}</p>
                  </div>
                ))}
              </div>

              {/* Meal ideas */}
              {result.mealIdeas?.length > 0 && (
                <div className="smw-meals-block">
                  <h3 className="smw-panel-title" style={{ marginTop: '1.25rem' }}>
                     You Can Make
                  </h3>
                  <div className="smw-meal-tags">
                    {result.mealIdeas.map((m, i) => (
                      <span key={i} className="smw-meal-tag">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pro tip */}
          {result.proTip && (
            <div className="smw-pro-tip">
              <span className="smw-pro-tip-label">wizard tip ✨</span>
              <p>{result.proTip}</p>
            </div>
          )}

          {/* Reset */}
          <button
            className="smw-reset"
            onClick={() => { setResult(null); setBudget(''); setStaples(''); setZipCode('') }}
          >
            start over
          </button>
        </div>
      )}
    </section>
  )
}
