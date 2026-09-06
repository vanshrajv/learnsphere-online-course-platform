import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState({ name: 'Vansh Raj', email: 'vansh@example.com' })
	const signOut = () => setUser(null)
	const signIn = (nextUser) => setUser(nextUser)

	return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used inside AuthProvider')
	return context
}
