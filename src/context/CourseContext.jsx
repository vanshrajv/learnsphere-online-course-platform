import { createContext, useContext, useMemo, useState } from 'react'
import { courses as initialCourses } from '../data/courses'

const CourseContext = createContext(null)

export function CourseProvider({ children }) {
	const [courseList, setCourseList] = useState(initialCourses)
	const [savedIds, setSavedIds] = useState([3])
	const toggleSaved = (courseId) => setSavedIds((current) => current.includes(courseId) ? current.filter((id) => id !== courseId) : [...current, courseId])
	const updateProgress = (courseId, progress) => setCourseList((current) => current.map((course) => course.id === courseId ? { ...course, progress } : course))
	const savedCourses = useMemo(() => courseList.filter((course) => savedIds.includes(course.id)), [courseList, savedIds])

	return <CourseContext.Provider value={{ courses: courseList, savedIds, savedCourses, toggleSaved, updateProgress }}>{children}</CourseContext.Provider>
}

export function useCourses() {
	const context = useContext(CourseContext)
	if (!context) throw new Error('useCourses must be used inside CourseProvider')
	return context
}
