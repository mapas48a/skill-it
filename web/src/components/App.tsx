import { useState } from 'react';
import { sampleSkills, categories } from '../hooks/data';
import { SkillCard } from './SkillCard';

export function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'npx' | 'curl'>('npx');

  const handleCopy = () => {
    const textToCopy = activeTab === 'npx'
      ? 'npx @mapache47/skill-it url https://bun.sh/docs'
      : 'curl "https://skill-it-xsnzc3g8aec4.mapas48a.deno.net/skill?url=https://bun.sh/docs&prompt=Do%20it!"';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-[100] bg-bg-base/85 backdrop-blur-xl border-b border-border">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="var(--color-accent-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent">skill-it</span>
            </div>

            <nav className="flex items-center gap-4">
              <a href="https://github.com/mapas48a/skill-it" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted px-3.5 py-1.5 rounded-radius-sm border border-border transition-all duration-200 hover:opacity-75">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="#skills" className="flex items-center gap-1.5 text-sm font-semibold text-bg-base px-4.5 py-2 rounded-radius-sm bg-accent transition-all duration-200 hover:opacity-75">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Explore Skills
              </a>
            </nav>
          </div>
        </header>

        <section className="relative py-[100px] pb-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--color-accent-dim)_0%,transparent_70%)] pointer-events-none" />

          {/* Background Lines Container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[0, 1, 2, 3, 4].map((i) => {
              const isForward = i % 2 === 0;
              const topOffset = -90 + i * 45;
              const baseOpacity = [0.5, 0.7, 0.4, 0.8, 0.55][i];
              return (
                <div
                  key={i}
                  className="absolute h-px"
                  style={{
                    top: `calc(50% + ${topOffset}px)`,
                    left: '-25%',
                    width: '150%',
                    opacity: baseOpacity,
                  }}
                >
                  {/* Traveling light that fades in and out along the way */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{
                      animation: `${isForward ? 'lineChildTravelForward' : 'lineChildTravelReverse'} ${5 + i * 0.8}s ease-in-out infinite`,
                      animationDelay: `${i * 1.8}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="relative max-w-[700px] mx-auto flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent px-3.5 py-1 rounded-full bg-accent-dim border border-accent/20 uppercase tracking-wide">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-accent)"><circle cx="12" cy="12" r="10" /></svg>
              AI-Powered Documentation
            </div>
            <h1 className="text-[56px] font-extrabold leading-[1.15] tracking-[-1.5px] text-text inline md:text-[36px] md:tracking-[-1px] sm:text-[28px]">Turn any docs into reusable AI <span className="bg-gradient-to-br from-white via-accent-2 to-text-dim bg-clip-text text-transparent italic">skills</span></h1>
            <p className="text-lg leading-relaxed text-text-muted max-w-[540px] md:text-[15px]">skill-it transforms web documentation into structured, actionable skill files for AI agents. Pass a URL &mdash; get a complete markdown skill ready to use.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center md:gap-2">
              <div className="flex items-center gap-2 text-sm text-text-muted md:text-xs"><span className="text-[11px] font-bold text-accent font-mono">01</span><span>Drop a URL</span></div>
              <div className="opacity-40"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dim)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
              <div className="flex items-center gap-2 text-sm text-text-muted md:text-xs"><span className="text-[11px] font-bold text-accent font-mono">02</span><span>AI analyzes & builds</span></div>
              <div className="opacity-40"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dim)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
              <div className="flex items-center gap-2 text-sm text-text-muted md:text-xs"><span className="text-[11px] font-bold text-accent font-mono">03</span><span>Get your skill .md</span></div>
            </div>
            <div className="w-full max-w-[540px] flex flex-col items-start gap-2.5">
              {/* Tab Selector */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveTab('npx')}
                  className={`font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent ${activeTab === 'npx'
                    ? 'border-accent text-accent bg-accent-dim'
                    : 'border-border text-text-dim hover:text-text-muted hover:border-border-hover bg-transparent'
                    }`}
                >
                  npx
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent ${activeTab === 'curl'
                    ? 'border-accent text-accent bg-accent-dim'
                    : 'border-border text-text-dim hover:text-text-muted hover:border-border-hover bg-transparent'
                    }`}
                >
                  curl
                </button>
              </div>

              {/* Code Box */}
              <div className="flex items-center gap-2.5 bg-bg-card border border-border rounded-radius px-4 py-2.5 w-full md:flex-wrap md:gap-2">
                <span className="font-mono text-accent font-bold">$</span>
                <span className="font-mono text-sm text-text-muted flex-1 text-left min-w-0 break-all md:text-xs">
                  {activeTab === 'npx'
                    ? 'npx mapache47@/skill-it url https://bun.sh/docs'
                    : 'curl "https://skill-it-xsnzc3g8aec4.mapas48a.deno.net/skill?url=https://bun.sh/docs&prompt=Do%20it!"'}
                </span>
                <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-text-dim bg-transparent border-none cursor-pointer px-1.5 py-0.5 rounded transition-colors duration-200 hover:text-text-muted">
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-b border-border bg-bg-card">
          <div className="max-w-full md:max-w-[700px] mx-auto px-4 py-6 md:px-6 md:py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            <div className="flex flex-row md:flex-col items-center gap-2 md:gap-1 min-w-20">
              <span className="text-[28px] font-extrabold text-text">{sampleSkills.length}</span>
              <span className="text-xs text-text-dim tracking-wide min-w-max">Skills Generated</span>
            </div>
            <div className="w-full h-px md:w-px md:h-10 bg-border" />
            <div className="flex flex-row md:flex-col items-center gap-2 md:gap-1 min-w-20">
              <span className="text-[28px] font-extrabold text-text">{categories.length - 1}</span>
              <span className="text-xs text-text-dim tracking-wide min-w-max">Categories</span>
            </div>
            <div className="w-full h-px md:w-px md:h-10 bg-border" />
            <div className="flex flex-row md:flex-col items-center gap-2 md:gap-1 min-w-20">
              <span className="text-[28px] font-extrabold text-text">100%</span>
              <span className="text-xs text-text-dim tracking-wide min-w-max">Free & Open Source</span>
            </div>
          </div>
        </section>

        <main id="skills" className="max-w-7xl mx-auto px-6 pt-12 pb-20 w-full flex-1">
          <div className="mb-8 flex flex-col gap-4 md:gap-3">
            <div className="relative flex items-center">
              <svg className="absolute left-4 text-text-dim pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input type="text" placeholder="Search skills — name, description, or tag..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-3 pl-11 pr-11 text-[15px] text-text bg-bg-card border border-border rounded-radius outline-none transition-colors duration-200 focus:border-accent" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3.5 text-text-dim bg-transparent border-none cursor-pointer p-1 rounded flex items-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
            </div>

            <div className="flex gap-2 flex-wrap md:overflow-x-auto md:flex-nowrap md:pb-1">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-150 ${activeCategory === cat ? 'text-bg-base bg-accent border-accent' : 'text-text-muted bg-transparent border border-border hover:border-border-hover hover:text-text'} border`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-text-dim">{filtered.length === sampleSkills.length ? `${filtered.length} skills` : `${filtered.length} of ${sampleSkills.length} skills`}</span>
            {filtered.length === 0 && <span className="text-sm text-text-dim italic">No skills match your search. Try a different term.</span>}
          </div>

          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] md:grid-cols-1 md:gap-3">
            {filtered.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} />)}
          </div>
        </main>

        <footer className="border-t border-border px-6 py-6 text-center md:px-4 md:py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 text-sm text-text-dim">
            <span>Built with</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-accent)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <span>npx <strong>skills-it</strong> &mdash; Powered by AI agents</span>
          </div>
        </footer>
      </div>
    </>
  );
}
