export default function Certificate({ name = 'Vansh Raj', courseTitle = 'Creative leadership' }) {
	return <section className="certificate-layout page-enter"><div className="certificate-preview"><div className="certificate-seal">L</div><p className="eyebrow">Learnsphere certifies that</p><h2>{name}</h2><p>has thoughtfully completed</p><h3>{courseTitle}</h3><div className="certificate-line" /><small>LEARNsphere / 2026</small></div><div className="certificate-copy"><span className="status-pill">Certificate unlocked</span><h2>Learning leaves a mark.</h2></div></section>
}
