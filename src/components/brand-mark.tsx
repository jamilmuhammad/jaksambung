export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="JakSambung">
      <svg viewBox="0 0 34 34" aria-hidden="true" className="brand-mark">
        <path d="M5 6h10v7H9v8h6v7H5V6Z" fill="currentColor" />
        <path d="M19 6h10v22H19v-7h6v-8h-6V6Z" fill="currentColor" />
        <path d="M12 14h10v6H12z" fill="var(--signal)" />
      </svg>
      {!compact && <span>JakSambung</span>}
    </span>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
