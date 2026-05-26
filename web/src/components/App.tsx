import { useState } from 'react';
import { sampleSkills, categories } from '../hooks/data';
import { SkillCard } from './SkillCard';

export function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = sampleSkills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        article:hover { border-color: var(--border-hover) !important; background: var(--bg-card-hover) !important; transform: translateY(-2px); }
        a { text-decoration: none; }
        nav a:hover, nav button:hover { opacity: 0.75; }
        input:focus { border-color: var(--accent) !important; }
        .filter-btn:hover { border-color: var(--border-hover) !important; color: var(--text) !important; }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="var(--accent-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={styles.logoText}>skill-it</span>
            </div>

            <nav style={styles.nav}>
              <a href="https://github.com/mapas48/skill-it" target="_blank" rel="noreferrer" style={styles.navLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="#skills" style={styles.ctaButton}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Explore Skills
              </a>
            </nav>
          </div>
        </header>

        <section style={styles.hero}>
          <div style={styles.heroNoise} />
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--green)"><circle cx="12" cy="12" r="10"/></svg>
              AI-Powered Documentation
            </div>
            <h1 style={styles.heroTitle}>Turn any docs into<br/><span style={styles.heroAccent}>reusable AI skills</span></h1>
            <p style={styles.heroDesc}>skill-it transforms web documentation into structured, actionable skill files for AI agents. Pass a URL &mdash; get a complete markdown skill ready to use.</p>
            <div style={styles.heroSteps}>
              <div style={styles.heroStep}><span style={styles.heroStepNum}>01</span><span>Drop a URL</span></div>
              <div style={styles.heroArrow}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              <div style={styles.heroStep}><span style={styles.heroStepNum}>02</span><span>AI analyzes & builds</span></div>
              <div style={styles.heroArrow}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              <div style={styles.heroStep}><span style={styles.heroStepNum}>03</span><span>Get your skill .md</span></div>
            </div>
            <div style={styles.heroCode}>
              <span style={styles.heroCodeDollar}>$</span>
              <span style={styles.heroCodeCmd}>npx skill-it --url https://bun.sh/docs</span>
              <button onClick={() => navigator.clipboard.writeText('npx skill-it --url https://bun.sh/docs')} style={styles.heroCodeCopy}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
        </section>

        <section style={styles.stats}>
          <div style={styles.statsInner}>
            <div style={styles.stat}><span style={styles.statNum}>{sampleSkills.length}</span><span style={styles.statLabel}>Skills Generated</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><span style={styles.statNum}>{categories.length - 1}</span><span style={styles.statLabel}>Categories</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><span style={styles.statNum}>100%</span><span style={styles.statLabel}>Free & Open Source</span></div>
          </div>
        </section>

        <main id="skills" style={styles.main}>
          <div style={styles.controls}>
            <div style={styles.searchWrap}>
              <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search skills — name, description, or tag..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.searchInput} />
              {search && <button onClick={() => setSearch('')} style={styles.searchClear}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
            </div>

            <div style={styles.filters}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ ...styles.filterBtn, ...(activeCategory === cat ? styles.filterBtnActive : {}), }} className="filter-btn">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.resultsBar}>
            <span style={styles.resultsCount}>{filtered.length === sampleSkills.length ? `${filtered.length} skills` : `${filtered.length} of ${sampleSkills.length} skills`}</span>
            {filtered.length === 0 && <span style={styles.noResults}>No skills match your search. Try a different term.</span>}
          </div>

          <div style={styles.grid}>
            {filtered.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} />)}
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <span>Built with</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>npx <strong>autoskills</strong> &mdash; Powered by AI agents</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9, 9, 16, 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' },
  headerInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoText: { fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  nav: { display: 'flex', alignItems: 'center', gap: 16 },
  navLink: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-muted)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', transition: 'all 0.2s' },
  ctaButton: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#fff', padding: '8px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', transition: 'all 0.2s' },
  hero: { position: 'relative', padding: '100px 24px 80px', textAlign: 'center', overflow: 'hidden' },
  heroNoise: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' },
  heroContent: { position: 'relative', maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--green)', padding: '5px 14px', borderRadius: 99, background: 'rgba(34, 211, 165, 0.08)', border: '1px solid rgba(34, 211, 165, 0.2)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  heroTitle: { fontSize: 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--text)' },
  heroAccent: { background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroDesc: { fontSize: 18, lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 540 },
  heroSteps: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  heroStep: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-muted)' },
  heroStepNum: { fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' },
  heroArrow: { opacity: 0.4 },
  heroCode: { display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 16px', width: '100%', maxWidth: 540 },
  heroCodeDollar: { fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 700 },
  heroCodeCmd: { fontFamily: 'monospace', fontSize: 14, color: 'var(--text-muted)', flex: 1 },
  heroCodeCopy: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 4, transition: 'color 0.2s' },
  stats: { borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' },
  statsInner: { maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statNum: { fontSize: 28, fontWeight: 800, color: 'var(--text)' },
  statLabel: { fontSize: 13, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statDivider: { width: 1, height: 40, background: 'var(--border)' },
  main: { maxWidth: 1280, margin: '0 auto', padding: '48px 24px 80px', width: '100%', flex: 1 },
  controls: { marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: 16, color: 'var(--text-dim)', pointerEvents: 'none' },
  searchInput: { width: '100%', padding: '12px 44px', fontSize: 15, color: 'var(--text)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', outline: 'none', transition: 'border-color 0.2s' },
  searchClear: { position: 'absolute', right: 14, color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  filterBtn: { padding: '6px 16px', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 99, cursor: 'pointer', transition: 'all 0.15s' },
  filterBtnActive: { color: '#fff', background: 'var(--accent)', borderColor: 'var(--accent)' },
  resultsBar: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 },
  resultsCount: { fontSize: 13, color: 'var(--text-dim)' },
  noResults: { fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 },
  footer: { borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' },
  footerInner: { maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--text-dim)' },
};
