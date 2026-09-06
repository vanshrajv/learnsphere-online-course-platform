import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login({ onSuccess }) {
	const { signIn } = useAuth()
	const [email, setEmail] = useState('')
	const submit = (event) => { event.preventDefault(); signIn({ name: 'Vansh Raj', email }); onSuccess?.() }
	return <form className="auth-form" onSubmit={submit}><button className="auth-brand" type="button" onClick={onSuccess}><span className="brand-mark">L</span> learnsphere</button><p className="eyebrow">Welcome back</p><h1>Return to <em>learning.</em></h1><p className="auth-copy">Sign in to pick up where your curiosity left off.</p><label>Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label><button className="primary-button" type="submit">Sign in <span>→</span></button></form>
}
