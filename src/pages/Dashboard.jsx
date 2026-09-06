import StatsCard from '../components/StatsCard'

export default function Dashboard({ completed = 1 }) {
	return <section className="page-enter"><p className="eyebrow">Your overview</p><h1>Keep your <em>momentum.</em></h1><div className="stats-grid"><StatsCard label="Learning hours" value="24.5" detail="+12% this month" tone="coral" /><StatsCard label="Courses completed" value={String(completed).padStart(2, '0')} detail="Keep the momentum" tone="blue" /><StatsCard label="Current streak" value="07" detail="Best: 14 days" tone="gold" /></div></section>
}
