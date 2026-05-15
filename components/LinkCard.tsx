'use client'

import { useState } from 'react'
import { useLinkContext } from '@/lib/link-context'

export type LinkItem = {
  id: string
  title: string
  url: string
  description: string
  thumbnail?: string
  folderId: string | null
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const [imgError, setImgError] = useState(false)
  const { openDeleteLinkModal, openEditLinkModal } = useLinkContext()
  const domain = new URL(link.url).hostname

  return (
    <article className="group relative flex flex-col bg-[var(--card-bg)] rounded-lg border border-[var(--border)] card-hover transition-colors cursor-pointer overflow-hidden">
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

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); openEditLinkModal(link) }}
          className="p-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-md text-[var(--text-sub)] hover:text-[var(--accent)] hover:border-[var(--accent)]"
          aria-label="링크 수정"
        >
          <PencilIcon />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); openDeleteLinkModal(link) }}
          className="p-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-md text-[var(--text-sub)] hover:text-[var(--error)] hover:border-[var(--error)]"
          aria-label="링크 삭제"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  )
}
