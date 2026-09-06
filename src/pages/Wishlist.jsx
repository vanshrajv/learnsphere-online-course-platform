import CourseCard from '../components/CourseCard'

export default function Wishlist({ courses = [], savedIds = [], onOpen, onToggleSaved }) {
	const savedCourses = courses.filter((course) => savedIds.includes(course.id))
	return <section className="page-enter"><p className="eyebrow">Saved for later</p><h1>Your <em>wishlist.</em></h1><div className="course-grid">{savedCourses.map((course) => <CourseCard key={course.id} course={course} saved onOpen={onOpen} onToggleSaved={onToggleSaved} />)}</div></section>
}
