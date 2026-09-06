export default function Home({ onExplore }) {
	return <section className="page-enter"><p className="eyebrow">Learn with intention</p><h1>Make space for <em>something new.</em></h1><p className="intro">A calm home for courses, progress, and the ideas you are ready to explore.</p><button className="primary-button" onClick={onExplore}>Explore courses <span>→</span></button></section>
}
