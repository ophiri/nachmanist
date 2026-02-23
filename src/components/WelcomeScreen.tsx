import { RabbiNachmanPortrait } from './RabbiNachmanPortrait'

interface Props {
  onSuggestionClick: (text: string) => void
}

const suggestions = [
  'איך להתמודד עם קשיים בחיים?',
  'מה רבי נחמן אומר על שמחה?',
  'איך לחזק את האמונה?',
  'ספר לי על התיקון הכללי',
  'מה המשמעות של התבודדות?',
  'איך מתמודדים עם עצבות?',
]

export function WelcomeScreen({ onSuggestionClick }: Props) {
  return (
    <div className="welcome-screen">
      <div className="welcome-portrait">
        <RabbiNachmanPortrait />
      </div>
      <h1 className="welcome-title">נחמניסט</h1>
      <p className="welcome-subtitle">
        יועץ רוחני בהשראת תורתו של רבי נחמן מברסלב
      </p>
      <p className="welcome-quote">
        "כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל"
      </p>

      <div className="suggestions-grid">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="suggestion-card"
            onClick={() => onSuggestionClick(s)}
          >
            <span className="suggestion-icon">✨</span>
            <span>{s}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
