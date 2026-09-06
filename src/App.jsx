import { useEffect, useMemo, useState } from 'react'
import { useTheme } from './context/ThemeContext'
import Login from './pages/Login'

const courseSeed = [
  { id: 1, title: 'Product design essentials', category: 'Design', level: 'Beginner', length: '6h 20m', lessons: 18, progress: 68, rating: '4.9', color: 'coral', icon: '✦', description: 'Build confident product decisions through research, systems, and thoughtful visual design.' },
  { id: 2, title: 'Modern JavaScript systems', category: 'Development', level: 'Intermediate', length: '8h 10m', lessons: 24, progress: 34, rating: '4.8', color: 'blue', icon: '</>', description: 'A practical path through modern JavaScript, architecture, and maintainable front-end systems.' },
  { id: 3, title: 'The art of storytelling', category: 'Business', level: 'Beginner', length: '4h 45m', lessons: 12, progress: 0, rating: '4.7', color: 'lavender', icon: '◒', description: 'Shape ideas into clear stories that move teams, customers, and communities forward.' },
  { id: 4, title: 'Data thinking for everyone', category: 'Data', level: 'Intermediate', length: '5h 30m', lessons: 16, progress: 12, rating: '4.9', color: 'mint', icon: '⌁', description: 'Turn messy information into useful decisions with a calm, human approach to data.' },
  { id: 5, title: 'Creative leadership', category: 'Business', level: 'Advanced', length: '3h 50m', lessons: 10, progress: 100, rating: '4.8', color: 'gold', icon: '◎', description: 'Lead creative teams with clarity, feedback rituals, and a culture that keeps momentum.' },
  { id: 6, title: 'Motion for interfaces', category: 'Design', level: 'Intermediate', length: '4h 10m', lessons: 14, progress: 0, rating: '4.6', color: 'peach', icon: '↗', description: 'Use motion to make digital products feel legible, responsive, and alive.' },
]

const navItems = [
  ['overview', 'Overview', '⌂'],
  ['courses', 'Explore courses', '⌕'],
  ['library', 'My learning', '▣'],
  ['certificates', 'Certificates', '◇'],
]

function App() {
  const [activeView, setActiveView] = useState('overview')
  const [courses, setCourses] = useState(courseSeed)
  const [bookmarks, setBookmarks] = useState([3])
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [toast, setToast] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [lessonOpen, setLessonOpen] = useState(false)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesQuery = `${course.title} ${course.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === 'All' || course.category === category)
  }), [category, courses, query])

  const continueCourse = courses.find((course) => course.progress > 0 && course.progress < 100)
  const completed = courses.filter((course) => course.progress === 100).length
  const toggleBookmark = (id) => {
    setBookmarks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    setToast(bookmarks.includes(id) ? 'Removed from your saved list' : 'Saved to your learning list')
  }
  const openCourse = (course) => setSelectedCourse(course)
  const startLesson = () => {
    if (!selectedCourse) return
    setCourses((current) => current.map((course) => course.id === selectedCourse.id && course.progress === 0 ? { ...course, progress: 8 } : course))
    setLessonOpen(true)
    setToast('Lesson opened. Your progress is saved.')
  }
  const goTo = (view) => {
    setActiveView(view)
    setSelectedCourse(null)
    setProfileOpen(false)
    setThemeOpen(false)
  }

  if (loginOpen) {
    return <main className="auth-shell"><Login onSuccess={() => { setLoginOpen(false); setToast('Welcome back to Learnsphere.') }} /></main>
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => goTo('overview')} aria-label="Go to overview"><span className="brand-mark">L</span><span>learn<span>sphere</span></span></button>
        <div className="profile-mini">
          <div className="avatar">VR</div>
          <div><strong>Vansh Raj</strong><span>Curious learner</span></div>
          <button className="icon-button" onClick={() => setProfileOpen((open) => !open)} aria-label="Open account menu">•••</button>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <span className="nav-label">Workspace</span>
          {navItems.map(([id, label, icon]) => <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => goTo(id)}><span className="nav-icon">{icon}</span>{label}{id === 'library' && <span className="nav-count">3</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="flame">✹</div><div><strong>7 day streak</strong><span>Keep your rhythm going</span></div></div>
          <button className="nav-item" onClick={() => setThemeOpen((open) => !open)}><span className="nav-icon">☼</span>Themes</button>
          {themeOpen && <div className="theme-picker"><span>Appearance</span><button className={theme === 'light' ? 'selected' : ''} onClick={() => setTheme('light')}>☀ Light</button><button className={theme === 'dark' ? 'selected' : ''} onClick={() => setTheme('dark')}>☾ Dark</button></div>}
          <button className="nav-item muted" onClick={() => setToast('Your workspace is ready for you.') }><span className="nav-icon">?</span>Help center</button>
        </div>
        {profileOpen && <div className="account-popover"><strong>Vansh Raj</strong><span>vansh@example.com</span><button onClick={() => setToast('Your account settings are ready.')}>Account settings</button><button onClick={() => { setProfileOpen(false); setLoginOpen(true) }}>Sign out</button></div>}
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{navItems.find(([id]) => id === activeView)?.[1] || 'Overview'}</strong></div><div className="top-actions"><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your courses" aria-label="Search your courses" /><kbd>⌘ K</kbd></label><button className="notification" onClick={() => setToast('You have 2 new learning updates.')} aria-label="View notifications">♢<i /></button><button className="top-avatar" onClick={() => setProfileOpen((open) => !open)}>VR</button></div></header>

        {activeView === 'overview' && <Overview continueCourse={continueCourse} completed={completed} onOpen={openCourse} onGo={goTo} onBookmark={toggleBookmark} bookmarks={bookmarks} />}
        {activeView === 'courses' && <CoursesPage courses={filteredCourses} category={category} setCategory={setCategory} onOpen={openCourse} onBookmark={toggleBookmark} bookmarks={bookmarks} />}
        {activeView === 'library' && <LibraryPage courses={courses.filter((course) => course.progress > 0)} bookmarks={bookmarks} onOpen={openCourse} onBookmark={toggleBookmark} />}
        {activeView === 'certificates' && <CertificatesPage completed={completed} onGo={goTo} />}

        <footer className="app-footer"><span>Learn with intention.</span><span>© 2024 Learnsphere</span></footer>
      </main>

      {selectedCourse && !lessonOpen && <CourseModal course={selectedCourse} bookmarked={bookmarks.includes(selectedCourse.id)} onClose={() => setSelectedCourse(null)} onStart={startLesson} onBookmark={() => toggleBookmark(selectedCourse.id)} />}
      {lessonOpen && selectedCourse && <LessonModal course={selectedCourse} onClose={() => { setLessonOpen(false); setSelectedCourse(null) }} onComplete={() => { setCourses((current) => current.map((course) => course.id === selectedCourse.id ? { ...course, progress: 100 } : course)); setToast('Lesson complete. Beautiful work.'); setLessonOpen(false); setSelectedCourse(null) }} />}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </div>
  )
}

function Overview({ continueCourse, completed, onOpen, onGo, onBookmark, bookmarks }) {
  return <div className="page-enter"><section className="welcome-row"><div><p className="eyebrow">Monday, September 06, 2026</p><h1>Make space for<br /><em>something new.</em></h1><p className="intro">A little progress, every day, adds up to a life of interesting ideas.</p></div><div className="orbital-art" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbital-dot" /></div></section>
    <section className="stats-grid"><Stat label="Learning hours" value="24.5" detail="+12% this month" tone="coral" icon="◷" /><Stat label="Courses completed" value={String(completed).padStart(2, '0')} detail="Keep the momentum" tone="blue" icon="✓" /><Stat label="Current streak" value="07" detail="Best: 14 days" tone="gold" icon="✹" /><Stat label="Skill points" value="1,240" detail="Top 18% this month" tone="mint" icon="↗" /></section>
    <section className="section-heading"><div><p className="eyebrow">Pick up where you left off</p><h2>Your learning path</h2></div><button className="text-button" onClick={() => onGo('library')}>View all <span>→</span></button></section>
    {continueCourse && <article className="continue-card"><div className={`course-art ${continueCourse.color}`}><span>{continueCourse.icon}</span><small>{continueCourse.category}</small></div><div className="continue-info"><div className="card-kicker"><span>IN PROGRESS</span><span>{continueCourse.progress}% complete</span></div><h3>{continueCourse.title}</h3><p>Lesson 8 of {continueCourse.lessons} · The foundations of a good system</p><div className="progress-line"><span style={{ width: `${continueCourse.progress}%` }} /></div><button className="primary-button" onClick={() => onOpen(continueCourse)}>Continue learning <span>→</span></button></div><button className="bookmark-button" onClick={() => onBookmark(continueCourse.id)} aria-label="Save course">{bookmarks.includes(continueCourse.id) ? '◆' : '◇'}</button></article>}
    <section className="section-heading compact"><div><p className="eyebrow">Curated for your curiosity</p><h2>Fresh perspectives</h2></div><button className="text-button" onClick={() => onGo('courses')}>Explore all <span>→</span></button></section><div className="course-grid">{courseSeed.slice(0, 3).map((course) => <CourseTile key={course.id} course={course} onOpen={onOpen} onBookmark={onBookmark} bookmarked={bookmarks.includes(course.id)} />)}</div>
  </div>
}

function CoursesPage({ courses, category, setCategory, onOpen, onBookmark, bookmarks }) {
  return <div className="page-enter"><div className="page-title"><div><p className="eyebrow">Browse the library</p><h1>Find your next <em>rabbit hole.</em></h1></div><div className="title-note">{courses.length} courses<br /><span>made for curious minds</span></div></div><div className="filter-row"><div className="chips">{['All', 'Design', 'Development', 'Business', 'Data'].map((item) => <button key={item} className={category === item ? 'chip active' : 'chip'} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">Sorted by recommended</span></div><div className="course-grid large">{courses.map((course) => <CourseTile key={course.id} course={course} onOpen={onOpen} onBookmark={onBookmark} bookmarked={bookmarks.includes(course.id)} />)}</div>{courses.length === 0 && <EmptyState />}</div>
}

function LibraryPage({ courses, bookmarks, onOpen, onBookmark }) {
  return <div className="page-enter"><div className="page-title"><div><p className="eyebrow">Your personal collection</p><h1>My <em>learning.</em></h1></div><div className="title-note">{courses.length} active courses<br /><span>you are doing great</span></div></div><div className="library-tabs"><button className="selected">In progress <b>{courses.filter((course) => course.progress < 100).length}</b></button><button>Saved <b>{bookmarks.length}</b></button><button>Completed <b>{courses.filter((course) => course.progress === 100).length}</b></button></div><div className="course-grid">{courses.map((course) => <CourseTile key={course.id} course={course} onOpen={onOpen} onBookmark={onBookmark} bookmarked={bookmarks.includes(course.id)} />)}</div></div>
}

function CertificatesPage({ completed, onGo }) {
  return <div className="page-enter"><div className="page-title"><div><p className="eyebrow">Proof of progress</p><h1>Moments worth <em>keeping.</em></h1></div></div><div className="certificate-layout"><div className="certificate-preview"><div className="certificate-seal">L</div><p className="eyebrow">Learnsphere certifies that</p><h2>Vansh Raj</h2><p>has thoughtfully completed</p><h3>Creative leadership</h3><div className="certificate-line" /><small>LEARNsphere / 2026</small></div><div className="certificate-copy"><span className="status-pill">{completed} certificate unlocked</span><h2>Learning leaves a mark.</h2><p>Your completed courses become a record of the questions you chose to explore and the skills you chose to build.</p><button className="primary-button" onClick={() => onGo('courses')}>Discover another course <span>→</span></button></div></div></div>
}

function CourseTile({ course, onOpen, onBookmark, bookmarked }) { return <article className="course-tile"><div className={`course-art ${course.color}`}><span>{course.icon}</span><button className="bookmark-button" onClick={() => onBookmark(course.id)} aria-label="Save course">{bookmarked ? '◆' : '◇'}</button><small>{course.category}</small></div><div className="tile-body"><div className="tile-meta"><span>{course.level}</span><span>★ {course.rating}</span></div><h3>{course.title}</h3><p>{course.length} · {course.lessons} lessons</p>{course.progress > 0 && <div className="mini-progress"><span style={{ width: `${course.progress}%` }} /></div>}<button className="tile-action" onClick={() => onOpen(course)}>{course.progress === 0 ? 'Start course' : course.progress === 100 ? 'Review course' : 'Continue'} <span>↗</span></button></div></article> }
function Stat({ label, value, detail, tone, icon }) { return <div className={`stat-card ${tone}`}><span className="stat-icon">{icon}</span><p>{label}</p><strong>{value}</strong><small>{detail}</small></div> }
function EmptyState() { return <div className="empty-state"><span>⌕</span><h2>No courses found</h2><p>Try another search or category.</p></div> }
function CourseModal({ course, bookmarked, onClose, onStart, onBookmark }) { return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal course-modal"><button className="modal-close" onClick={onClose} aria-label="Close">×</button><div className={`modal-art course-art ${course.color}`}><span>{course.icon}</span></div><div className="modal-content"><div className="tile-meta"><span>{course.category} · {course.level}</span><span>★ {course.rating}</span></div><h2>{course.title}</h2><p>{course.description}</p><div className="modal-facts"><span><b>{course.lessons}</b> lessons</span><span><b>{course.length}</b> total time</span><span><b>Certificate</b> included</span></div><div className="modal-actions"><button className="primary-button" onClick={onStart}>{course.progress ? 'Continue learning' : 'Start learning'} <span>→</span></button><button className="secondary-button" onClick={onBookmark}>{bookmarked ? 'Saved' : 'Save for later'} {bookmarked ? '◆' : '◇'}</button></div></div></div></div> }
function LessonModal({ course, onClose, onComplete }) { return <div className="modal-backdrop"><div className="modal lesson-modal"><button className="modal-close" onClick={onClose} aria-label="Close">×</button><div className={`lesson-visual ${course.color}`}><span>{course.icon}</span><small>LESSON 08 / 18</small></div><div className="lesson-copy"><p className="eyebrow">{course.title}</p><h2>Build a system that feels like you.</h2><p>Great work showing up. This lesson explores the small decisions that help a system stay clear as it grows.</p><div className="lesson-quote">“Clarity is a form of kindness.”</div><div className="lesson-footer"><span>12 min read</span><button className="primary-button" onClick={onComplete}>Mark complete <span>✓</span></button></div></div></div></div> }

export default App
