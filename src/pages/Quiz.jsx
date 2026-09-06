import { useState } from 'react'

export default function Quiz({ onFinish }) {
	const [answer, setAnswer] = useState('')
	return <section className="page-enter"><p className="eyebrow">Quick check</p><h1>What makes a system <em>clear?</em></h1><div className="chips">{['Good defaults', 'More options', 'Less structure'].map((option) => <button key={option} className={answer === option ? 'chip active' : 'chip'} onClick={() => setAnswer(option)}>{option}</button>)}</div>{answer && <button className="primary-button" onClick={() => onFinish?.(answer)}>Finish quiz <span>✓</span></button>}</section>
}
