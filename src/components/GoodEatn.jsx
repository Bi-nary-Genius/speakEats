import './GoodEatn.css'

export default function GoodEatn({ saved, onRemove, onOpen }) {
  return (
    <section className="goodeatn">
<div className="goodeatn-header">
  <div>

    
  </div>
  {saved.length > 0 && (
    <span className="goodeatn-count">{saved.length} saved recipes</span>
  )}
</div>

      {saved.length === 0 ? (
        <p className="goodeatn-empty">
          Nothing saved yet — head to Speak It, pick a meal, and add it to your rotation 🍽️
        </p>
      ) : (
        <ul className="goodeatn-list">
          {saved.map((meal) => (
            <li
              key={meal.name}
              className="goodeatn-item"
              onClick={() => onOpen?.(meal)}
              style={{ cursor: onOpen ? 'pointer' : 'default' }}
            >
              {meal.reaction && (
                <span className="goodeatn-emoji" title={meal.reaction.label}>
                  {meal.reaction.emoji}
                </span>
              )}
              <div className="goodeatn-info">
                <span className="goodeatn-name">{meal.name}</span>
                {meal.note ? (
                  <span className="goodeatn-note">"{meal.note}"</span>
                ) : meal.reaction ? (
                  <span className="goodeatn-reaction-label">{meal.reaction.label}</span>
                ) : (
                  <span className="goodeatn-reaction-label goodeatn-unrated">tap to rate ✨</span>
                )}
              </div>
              <button
                className="goodeatn-remove"
                onClick={e => { e.stopPropagation(); onRemove(meal.name) }}
                aria-label={`Remove ${meal.name} from rotation`}
                title="Remove from rotation"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
