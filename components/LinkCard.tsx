'use client'

import { useState } from 'react'

export type LinkItem = {
  id: string
  title: string
  url: string
  description: string
  thumbnail?: string
  folderId: string | null
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const [imgError, setImgError] = useState(false)
  const domain = new URL(link.url).hostname

  return (
    <article className="flex flex-col bg-[var(--card-bg)] rounded-lg border border-[var(--border)] card-hover transition-colors cursor-pointer overflow-hidden">
      {link.thumbnail && !imgError && (
        <div className="w-full h-36 bg-[var(--hover-bg)] shrink-0 overflow-hidden">
          <img
            src={link.thumbnail}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-4">
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
      </div>
    </article>
  )
}
