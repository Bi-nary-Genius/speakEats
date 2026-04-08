import { useState, useEffect } from 'react'

const KEY = 'speakeats-rotation'

export function useSavedMeals() {
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(saved))
  }, [saved])

  const saveMeal   = (meal) => setSaved(prev =>
    prev.some(m => m.name === meal.name) ? prev : [...prev, meal]
  )
  const removeMeal = (name)          => setSaved(prev => prev.filter(m => m.name !== name))
  const updateMeal = (name, patches) => setSaved(prev =>
    prev.map(m => m.name === name ? { ...m, ...patches } : m)
  )
  const isSaved    = (name) => saved.some(m => m.name === name)

  return { saved, saveMeal, removeMeal, updateMeal, isSaved }
}
