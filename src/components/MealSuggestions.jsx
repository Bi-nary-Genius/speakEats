import './MealSuggestions.css'

export default function MealSuggestions({ meals, onCardClick }) {
  return (
    <div className="meal-suggestions">
      <div className="meals-heading">
        <h2>Tonight's Ideas</h2>
        <span className="meals-heading-rule" />
      </div>
      <p className="meals-hint">tap a meal to see the full recipe</p>

      <div className="meals-grid">
        {meals.map((meal, i) => (
          <button
            key={i}
            className="meal-card"
            onClick={() => onCardClick(meal)}
          >
            <div className="meal-number">{String(i + 1).padStart(2, '0')}</div>
            <div className="meal-body">
              <h3 className="meal-name">{meal.name}</h3>
              <p className="meal-desc">{meal.description}</p>
              {meal.missingIngredients?.length > 0 && (
                <p className="meal-missing">
                  <strong>You might also need:</strong>{' '}
                  {meal.missingIngredients.join(', ')}
                </p>
              )}
            </div>
            <span className="meal-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
