import { useAuth } from '../context/AuthContext'

export default function Profile() {
	const { user, signOut } = useAuth()
	return <section className="page-enter"><p className="eyebrow">Your account</p><h1>{user?.name || 'Your'} <em>profile.</em></h1><p className="intro">{user?.email || 'You are currently signed out.'}</p><button className="secondary-button" onClick={signOut}>Sign out</button></section>
}
