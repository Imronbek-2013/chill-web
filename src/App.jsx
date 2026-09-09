import { useState } from 'react'
import './App.css'

function App() {
  const [balance, setBalance] = useState(2450000)

  const addFunds = () => {
    setBalance((currentBalance) => currentBalance + 50000)
  }

  const withdrawFunds = () => {
    setBalance((currentBalance) => Math.max(0, currentBalance - 50000))
  }

  const formatMoney = (amount) => {
    return `${amount.toLocaleString('uz-UZ')} so'm`
  }

  return (
    <main className="app-shell">
      <section className="bank-dashboard" aria-label="Milliy bank dashboardi">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Shaxsiy bank</p>
            <h1>Assalomu alaykum, Imronbek</h1>
          </div>
          <button className="avatar" type="button" aria-label="Profilni ochish">A</button>
        </header>

        <section className="balance-card" aria-label="Asosiy hisob balansi">
          <div className="balance-heading">
            <span>Umumiy balans</span>
            <span className="account-status"><span className="status-dot" /> Faol</span>
          </div>
          <strong className="balance-amount" aria-live="polite">{formatMoney(balance)}</strong>
          <p className="account-number">Uzcard •••• 4821</p>
          <div className="balance-actions" aria-label="Hisob amallari">
            <button className="action-button light" type="button" onClick={addFunds}>
              <span aria-hidden="true">↓</span> Pul qo'shish
            </button>
            <button className="action-button dark" type="button" onClick={withdrawFunds}>
              <span aria-hidden="true">↑</span> Pul yechish
            </button>
          </div>
        </section>

        <section className="overview-grid" aria-label="Hisob ma'lumotlari">
          <article className="info-card">
            <span className="info-icon income-icon">↗</span>
            <div><p>Kirimlar</p><strong>{formatMoney(1850000)}</strong></div>
          </article>
          <article className="info-card">
            <span className="info-icon expense-icon">↘</span>
            <div><p>Chiqimlar</p><strong>{formatMoney(640000)}</strong></div>
          </article>
        </section>

        <section className="transactions" aria-label="So'nggi amallar">
          <div className="section-heading"><h2>So'nggi amallar</h2><button type="button">Barchasi</button></div>
          <ul className="transaction-list">
            <li><span className="transaction-icon">T</span><div><strong>Telefon to'lovi</strong><small>Bugun, 14:32</small></div><b className="outgoing">− 45 000 so'm</b></li>
            <li><span className="transaction-icon income">K</span><div><strong>Maosh tushumi</strong><small>Kecha, 09:10</small></div><b className="incoming">+ 3 200 000 so'm</b></li>
            <li><span className="transaction-icon">S</span><div><strong>Supermarket</strong><small>12 sentyabr, 18:45</small></div><b className="outgoing">− 128 500 so'm</b></li>
          </ul>
        </section>
      </section>
    </main>
  )
}

export default App