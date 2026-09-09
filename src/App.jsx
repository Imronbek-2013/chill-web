import { useState } from 'react'
import './App.css'

function App() {
  const [balance, setBalance] = useState(2450000)
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Telefon to'lovi", time: 'Bugun, 14:32', amount: 45000, type: 'outgoing', icon: 'T' },
    { id: 2, title: 'Maosh tushumi', time: 'Kecha, 09:10', amount: 3200000, type: 'incoming', icon: 'K' },
    { id: 3, title: 'Supermarket', time: '12 sentyabr, 18:45', amount: 128500, type: 'outgoing', icon: 'S' },
  ])

  const getAmount = () => Number(amount.replace(/\D/g, ''))

  const addTransaction = (type, transactionAmount) => {
    const now = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    setTransactions((currentTransactions) => [
      {
        id: Date.now(),
        title: type === 'incoming' ? "Hisob to'ldirildi" : 'Naqd pul yechildi',
        time: `Bugun, ${now}`,
        amount: transactionAmount,
        type,
        icon: type === 'incoming' ? '+' : '−',
      },
      ...currentTransactions,
    ])
    setAmount('')
    setError('')
  }

  const addFunds = () => {
    const transactionAmount = getAmount()
    if (transactionAmount <= 0) {
      setError("Iltimos, musbat miqdor kiriting.")
      return
    }
    setBalance((currentBalance) => currentBalance + transactionAmount)
    addTransaction('incoming', transactionAmount)
  }

  const withdrawFunds = () => {
    const transactionAmount = getAmount()
    if (transactionAmount <= 0) {
      setError("Iltimos, musbat miqdor kiriting.")
      return
    }
    if (transactionAmount > balance) {
      setError("Balansda yetarli mablag' mavjud emas.")
      return
    }
    setBalance((currentBalance) => currentBalance - transactionAmount)
    addTransaction('outgoing', transactionAmount)
  }

  const formatMoney = (amount) => {
    return `${amount.toLocaleString('uz-UZ')} so'm`
  }

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === 'incoming')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const expenseTotal = transactions
    .filter((transaction) => transaction.type === 'outgoing')
    .reduce((total, transaction) => total + transaction.amount, 0)

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
          <div className="amount-form">
            <label htmlFor="amount">Amal summasi</label>
            <div className="amount-input-wrap">
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/\D/g, ''))}
                placeholder="Masalan, 100 000"
                aria-describedby={error ? 'amount-error' : undefined}
              />
              <span>so'm</span>
            </div>
            {error && <p className="form-error" id="amount-error" role="alert">{error}</p>}
          </div>
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
            <div><p>Kirimlar</p><strong>{formatMoney(incomeTotal)}</strong></div>
          </article>
          <article className="info-card">
            <span className="info-icon expense-icon">↘</span>
            <div><p>Chiqimlar</p><strong>{formatMoney(expenseTotal)}</strong></div>
          </article>
        </section>

        <section className="transactions" aria-label="So'nggi amallar">
          <div className="section-heading"><h2>So'nggi amallar</h2><button type="button">Barchasi</button></div>
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span className={`transaction-icon ${transaction.type === 'incoming' ? 'income' : ''}`}>{transaction.icon}</span>
                <div><strong>{transaction.title}</strong><small>{transaction.time}</small></div>
                <b className={transaction.type}>{transaction.type === 'incoming' ? '+' : '−'} {formatMoney(transaction.amount)}</b>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  )
}

export default App