export type LinkItem = {
  id: string
  title: string
  url: string
  description: string
  folderId: string | null
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const domain = new URL(link.url).hostname

  return (
    <article className="flex flex-col gap-3 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border)] card-hover transition-colors cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-[var(--hover-bg)] flex items-center justify-center text-xs font-semibold text-[var(--text-sub)] shrink-0">
          {domain[0].toUpperCase()}
        </div>
        <span className="text-xs text-[var(--text-sub)] truncate">{domain}</span>
      </div>
      <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
        {link.title}
      </h3>
      {link.description && (
        <p className="text-xs text-[var(--text-sub)] line-clamp-2 leading-relaxed">
          {link.description}
        </p>
      )}
    </article>
  )
}
