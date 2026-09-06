import CourseCard from '../components/CourseCard'

export default function Courses({ courses = [], savedIds = [], onOpen, onToggleSaved }) {
	return <section className="page-enter"><p className="eyebrow">Browse the library</p><h1>Find your next <em>rabbit hole.</em></h1><div className="course-grid large">{courses.map((course) => <CourseCard key={course.id} course={course} saved={savedIds.includes(course.id)} onOpen={onOpen} onToggleSaved={onToggleSaved} />)}</div></section>
}
