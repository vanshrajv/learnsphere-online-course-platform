import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => localStorage.getItem('learnsphere-theme') || 'light')

	useEffect(() => {
		document.documentElement.dataset.theme = theme
		localStorage.setItem('learnsphere-theme', theme)
	}, [theme])

	const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')

	return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used inside ThemeProvider')
	return context
}
