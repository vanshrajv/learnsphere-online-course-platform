import ProgressBar from '../components/ProgressBar'

export default function LearnCourse({ course, onComplete }) {
	if (!course) return null
	return <section className="page-enter"><p className="eyebrow">Now learning</p><h1>{course.title}</h1><p className="intro">Lesson 8 of {course.lessons}. Take your time and make the ideas your own.</p><ProgressBar value={course.progress} label="Course progress" /><button className="primary-button" onClick={() => onComplete?.(course.id)}>Mark lesson complete <span>✓</span></button></section>
}
