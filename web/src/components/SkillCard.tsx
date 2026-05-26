import type { Skill } from '../hooks/data';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <article
      style={{
        ...cardStyles.card,
        animation: `fadeSlideIn 0.4s ease-out ${index * 60}ms both`,
      }}
    >
      <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={cardStyles.cardTop}>
        <div style={cardStyles.iconWrap}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <span style={cardStyles.category}>{skill.category}</span>
      </div>

      <h3 style={cardStyles.name}>{skill.name}</h3>
      <p style={cardStyles.desc}>{skill.description}</p>

      <div style={cardStyles.tags}>
        {skill.tags.map((tag) => (
          <span key={tag} style={cardStyles.tag}>{tag}</span>
        ))}
      </div>

      <div style={cardStyles.footer}>
        <a
          href={skill.url}
          target="_blank"
          rel="noreferrer"
          style={cardStyles.visitBtn}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View source
        </a>
        <div style={cardStyles.meta}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span style={cardStyles.downloads}>{skill.downloads.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

const cardStyles: Record<string, React.CSSProperties> = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
    cursor: 'default',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--accent-dim)',
    borderRadius: 'var(--radius-sm)',
  },
  category: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-dim)',
    padding: '3px 10px',
    borderRadius: 99,
    background: 'var(--tag-bg)',
    border: '1px solid var(--border)',
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text)',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
  desc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: 'var(--text-muted)',
    flex: 1,
  },
  tags: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 11,
    color: 'var(--accent-2)',
    padding: '2px 10px',
    borderRadius: 99,
    background: 'var(--accent-dim)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 12,
    borderTop: '1px solid var(--border)',
  },
  visitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  downloads: {
    fontSize: 12,
    color: 'var(--text-dim)',
  },
};
