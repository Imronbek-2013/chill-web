import React from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0)

  const plusOne = () => {
    setScore((currentScore) => currentScore + 1)
  }

  const minusOne = () => {
    setScore((currentScore) => currentScore - 1)
  }

  const reset = () => {
    setScore(0)
  }

  const addMuch = () => {
    setScore((currentScore) => currentScore + 10000)
  }

  return (
    <main className="app-shell">
      <section className="score-card" aria-label="Scoreboard">
        <div className="card-header">
          <div>
            <p className="eyebrow">Live counter</p>
            <h1>Scoreboard</h1>
          </div>
          <span className="status-dot" aria-label="Active" />
        </div>

        <div className="score-display" aria-live="polite">
          <span className="score-label">Current score</span>
          <strong>{score.toLocaleString()}</strong>
        </div>

        <div className="controls" aria-label="Score controls">
          <button className="control-button" onClick={minusOne} aria-label="Decrease score">
            <span aria-hidden="true">−</span>
          </button>
          <button className="control-button primary" onClick={plusOne} aria-label="Increase score">
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <div className="quick-actions">
          <button className="boost-button" onClick={addMuch}>+10,000</button>
          <button className="reset-button" onClick={reset}>Reset</button>
        </div>
      </section>
    </main>
  )
}

export default App