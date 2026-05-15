'use client'

import LinkCard from './LinkCard'
import { useLinkContext } from '@/lib/link-context'

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links } = useLinkContext()
  const filtered = folderId ? links.filter(l => l.folderId === Number(folderId)) : links

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--text-sub)]">
        저장된 링크가 없습니다
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6">
      {filtered.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}
