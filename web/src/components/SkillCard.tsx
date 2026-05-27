import type { Skill } from '../hooks/data';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <article
      className="bg-bg-card border border-border rounded-radius p-5 flex flex-col gap-3 transition-[border-color,background,transform] duration-200 cursor-default hover:border-border-hover hover:bg-bg-card-hover hover:-translate-y-0.5 animate-fade-slide-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 flex items-center justify-center bg-accent-dim rounded-radius-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-dim px-2.5 py-0.5 rounded-full bg-tag-bg border border-border">{skill.category}</span>
      </div>

      <h3 className="text-[15px] font-bold text-text font-mono">{skill.name}</h3>
      <p className="text-[13px] leading-relaxed text-text-muted flex-1">{skill.description}</p>

      <div className="flex gap-1.5 flex-wrap">
        {skill.tags.map((tag) => (
          <span key={tag} className="text-[11px] text-accent-2 px-2.5 py-0.5 rounded-full bg-accent-dim">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1 pt-3 border-t border-border">
        <a
          href={skill.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[12px] font-semibold text-text-muted transition-colors duration-200 hover:text-text"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View source
        </a>
        <span className="text-[11px] text-text-dim">{skill.date}</span>
      </div>
    </article>
  );
}
