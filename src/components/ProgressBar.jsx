export default function ProgressBar({ value = 0, label = 'Progress' }) {
	const safeValue = Math.min(100, Math.max(0, value))
	return <div className="progress-line" aria-label={`${label}: ${safeValue}%`} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={safeValue}><span style={{ width: `${safeValue}%` }} /></div>
}
