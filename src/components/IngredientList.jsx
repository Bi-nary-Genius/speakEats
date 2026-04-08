import { useState } from 'react'
import HealthPanel from './HealthPanel'
import './IngredientList.css'

export default function IngredientList({ ingredients, onRemove, onClear }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="ingredient-list">
        <div className="ingredient-header">
          <h2>
            Your Ingredients
            <span className="ingredient-count">({ingredients.length})</span>
          </h2>
          <button className="btn-clear" onClick={onClear}>clear all</button>
        </div>

        <div className="tags">
          {ingredients.map(item => (
            <span key={item} className="tag">
              <button
                className="tag-name"
                onClick={() => setSelected(item)}
                title={`See health benefits of ${item}`}
              >
                {item}
              </button>
              <button
                className="tag-remove"
                onClick={() => onRemove(item)}
                aria-label={`Remove ${item}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <p className="tag-hint">tap any ingredient to see its health benefits</p>
      </div>

      {selected && (
        <HealthPanel
          ingredient={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
