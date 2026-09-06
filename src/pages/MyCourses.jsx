import CourseCard from '../components/CourseCard'

export default function MyCourses({ courses = [], savedIds = [], onOpen, onToggleSaved }) {
	const activeCourses = courses.filter((course) => course.progress > 0)
	return <section className="page-enter"><p className="eyebrow">Your personal collection</p><h1>My <em>learning.</em></h1><div className="course-grid">{activeCourses.map((course) => <CourseCard key={course.id} course={course} saved={savedIds.includes(course.id)} onOpen={onOpen} onToggleSaved={onToggleSaved} />)}</div></section>
}
