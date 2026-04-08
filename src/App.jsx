import { useState } from 'react'
import VoiceInput from './components/VoiceInput'
import IngredientList from './components/IngredientList'
import MealSuggestions from './components/MealSuggestions'
import GoodEatn from './components/GoodEatn'
import RecipeModal from './components/RecipeModal'
import StruggleMealWizard from './components/StruggleMealWizard'
import WelcomeScreen from './components/WelcomeScreen'
import {
  RamenBowl,
  SmallPlant,
  HiddenCat,
} from './components/Illustrations'
import { useSavedMeals } from './hooks/useSavedMeals'
import './App.css'

const TABS = [
  { id: 'speak',    label: 'Speak It'           },
  { id: 'goodeatn', label: "Good Eat'n"         },
  { id: 'wizard',   label: 'Struggle Meal Wizard' },
]

const MOOD_QUESTIONS = [
  {
    id: 'cuisine',
    label: 'What are you feeling?',
    options: ['Italian', 'Asian', 'Mexican', 'American', 'Mediterranean', 'Anything'],
  },
  {
    id: 'time',
    label: 'How much time?',
    options: ['15 min', '30 min', '1 hour', 'Flexible'],
  },
  {
    id: 'hunger',
    label: 'How hungry?',
    options: ['Light bite', 'Proper meal', 'Absolutely starving'],
  },
]

const EMPTY_MOOD = { cuisine: null, time: null, hunger: null }

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [welcomeLeaving, setWelcomeLeaving] = useState(false)

  function handleEnter() {
    setWelcomeLeaving(true)
    setTimeout(() => setShowWelcome(false), 530)
  }

  const [activeTab,    setActiveTab]    = useState('speak')
  const [mode,         setMode]         = useState('hangry')
  const [moodPrefs,    setMoodPrefs]    = useState(EMPTY_MOOD)
  const [ingredients,  setIngredients]  = useState([])
  const [meals,        setMeals]        = useState([])
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState(null)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const { saved, saveMeal, removeMeal, updateMeal } = useSavedMeals()

  const openSavedMeal = selectedMeal
    ? (saved.find(m => m.name === selectedMeal.name) ?? null)
    : null

  function handleIngredientsDetected(detected) {
    setIngredients(prev => [...new Set([...prev, ...detected])])
    setMeals([])
    setError(null)
  }

  function removeIngredient(item) {
    setIngredients(prev => prev.filter(i => i !== item))
    setMeals([])
  }

  function clearAll() {
    setIngredients([])
    setMeals([])
    setError(null)
  }

  function toggleMoodChip(questionId, option) {
    setMoodPrefs(prev => ({
      ...prev,
      [questionId]: prev[questionId] === option ? null : option,
    }))
  }

  function switchMode(next) {
    setMode(next)
    if (next === 'hangry') setMoodPrefs(EMPTY_MOOD)
  }

  async function suggestMeals() {
    if (ingredients.length === 0) return
    setLoading(true)
    setError(null)
    setMeals([])

    // Only send mood prefs when in Moody Foodie mode and at least one pref is set
    const hasMoodContext = mode === 'moody' && Object.values(moodPrefs).some(v => v !== null)
    const body = {
      ingredients,
      ...(hasMoodContext ? { mood: moodPrefs } : {}),
    }

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      setMeals(data.meals)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {showWelcome && (
      <WelcomeScreen onEnter={handleEnter} leaving={welcomeLeaving} />
    )}
    <div className="app" style={showWelcome ? { visibility: 'hidden' } : undefined}>
      {/* ── Header ── */}
      <header className="header">
        
        <div className="header-center">
          <div className="logo-text">
            <span className="logo-speak">Speak</span>
            <span className="logo-eats">Eats</span>
          </div><p className="tagline">
  {activeTab === 'speak' && "Speak or type your ingredients — we will figure out what to cook."}
  {activeTab === 'goodeatn' && "Your saved recipes and notes."}
  {activeTab === 'wizard' && "Build a meal plan based on your budget and must haves."}
</p>
        </div>
        <div style={{width: 60}} />
      </header>


      {/* ── Tab nav ── */}
      <nav className="tab-nav" aria-label="App sections">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'goodeatn' && saved.length > 0 && (
              <span className="tab-badge">{saved.length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Tab: Speak It ── */}
      {activeTab === 'speak' && (
        <div className="tab-pane">

          <div className="speak-group">
          {/* Mode toggle */}
          <div className="mode-bar">
            <div className="mode-toggle" role="group" aria-label="Suggestion mode">
              <button
                className={`mode-btn ${mode === 'hangry' ? 'mode-btn--active' : ''}`}
                onClick={() => switchMode('hangry')}
                aria-pressed={mode === 'hangry'}
              >
                Hangry
              </button>
              <button
                className={`mode-btn ${mode === 'moody' ? 'mode-btn--active' : ''}`}
                onClick={() => switchMode('moody')}
                aria-pressed={mode === 'moody'}
              >
                Moody Foodie
              </button>
            </div>
            <p className="mode-desc">
              {mode === 'hangry'
                ? 'Straight to suggestions based on what you have.'
                : 'A few quick questions, then we tailor your results.'}
            </p>
          </div>

          {/* Moody Foodie questions */}
          {mode === 'moody' && (
            <div className="mood-card">
              {MOOD_QUESTIONS.map(q => (
                <div key={q.id} className="mood-question">
                  <p className="mood-question-label">{q.label}</p>
                  <div className="mood-chips">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        className={`mood-chip ${moodPrefs[q.id] === opt ? 'mood-chip--active' : ''}`}
                        onClick={() => toggleMoodChip(q.id, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voice / text input */}
          <VoiceInput onIngredientsDetected={handleIngredientsDetected} />
          </div>{/* end speak-group */}

          {ingredients.length > 0 && (
            <div className="action-section">
              <IngredientList
                ingredients={ingredients}
                onRemove={removeIngredient}
                onClear={clearAll}
              />
              <button
                className="btn-suggest"
                onClick={suggestMeals}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-text">
                    <span className="loading-dot" />
                    Finding your meals…
                  </span>
                ) : (
                  '✦ Suggest Meals ✦'
                )}
              </button>
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          {meals.length > 0 && (
            <div className="results-section">
              <MealSuggestions meals={meals} onCardClick={setSelectedMeal} />
              <div className="cat-corner">
                <SmallPlant />
                <HiddenCat />
              </div>
            </div>
          )}

          {meals.length === 0 && ingredients.length === 0 && (
            <div className="cat-idle">
              <HiddenCat />
            </div>
          )}
        </div>
      )}
<div className="section-group">
  {/* toggle */}
  {/* moody foodie card */}
  {/* mic card */}
</div>
      {/* ── Tab: Good Eat'n ── */}
      {activeTab === 'goodeatn' && (
        <div className="tab-pane">
          <GoodEatn
            saved={saved}
            onRemove={removeMeal}
            onOpen={meal => setSelectedMeal(meal)}
          />
        </div>
      )}

      {/* ── Tab: Struggle Meal Wizard ── */}
      {activeTab === 'wizard' && (
        <div className="tab-pane">
          <StruggleMealWizard />
        </div>
      )}

      {/* ── Recipe modal — lives outside tabs ── */}
      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          userIngredients={ingredients}
          savedMeal={openSavedMeal}
          onSave={saveMeal}
          onRemove={removeMeal}
          onUpdate={updateMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}

 <footer style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '1rem', opacity: 0.38 }}>
  <span style={{ fontSize: '0.7rem', letterSpacing: '0.3rem', color: 'var(--brown-mid)' }}>🐾🐾</span>
  <HiddenCat style={{ width: '70px', height: 'auto' }} />
</footer>

    </div>
    </>
  )
}