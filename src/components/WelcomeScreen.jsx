import welcomeImg from '../../images/welcomepage.png'
import './WelcomeScreen.css'

export default function WelcomeScreen({ onEnter, leaving }) {
  return (
    <div className={`welcome-screen${leaving ? ' leaving' : ''}`}>
      {/*
      
      <div className="welcome-hero">
        <img
          src={welcomeImg}
          alt="A warm kitchen scene with fresh ingredients"
          className="welcome-image"
        />
        <div className="welcome-overlay" />
      </div>
      */}
      <div
  className="welcome-hero"
  style={{ backgroundImage: `url(${welcomeImg})` }}
>
  <div className="welcome-overlay" />
</div>

      <div className="welcome-content">
        <div className="welcome-logo">
          <span className="welcome-logo-speak">Speak</span>
          <span className="welcome-logo-eats">Eats</span>
        </div>

        <p className="welcome-tagline">
          Speak or type what you have in your kitchen<br />
          and turn it into something delicious
        </p>

        <button className="welcome-cta" onClick={onEnter}>
          <span className="welcome-cta-icon">✦</span>
          Let's Cook
          <span className="welcome-cta-icon">✦</span>
        </button>
      </div>
    </div>
  )
}
