export default function StatsCard({ label, value, detail, tone = 'coral', icon = '◷' }) {
	return <article className={`stat-card ${tone}`}><span className="stat-icon">{icon}</span><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>
}
