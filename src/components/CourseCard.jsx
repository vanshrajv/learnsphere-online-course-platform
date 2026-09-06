import ProgressBar from './ProgressBar'

export default function CourseCard({ course, saved = false, onOpen, onToggleSaved }) {
	return <article className="course-tile"><div className={`course-art ${course.color}`}><span>{course.icon}</span><button className="bookmark-button" onClick={() => onToggleSaved?.(course.id)} aria-label={saved ? 'Remove saved course' : 'Save course'}>{saved ? '◆' : '◇'}</button><small>{course.category}</small></div><div className="tile-body"><div className="tile-meta"><span>{course.level}</span><span>★ {course.rating}</span></div><h3>{course.title}</h3><p>{course.length} · {course.lessons} lessons</p>{course.progress > 0 && <ProgressBar value={course.progress} label={`${course.title} progress`} />}<button className="tile-action" onClick={() => onOpen?.(course)}>{course.progress === 0 ? 'Start course' : course.progress === 100 ? 'Review course' : 'Continue'} <span>↗</span></button></div></article>
}
