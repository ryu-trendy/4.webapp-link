'use client'

import Link from 'next/link'
import { useFolderContext } from '@/lib/folder-context'

export default function Header() {
  const { openModal } = useFolderContext()

  return (
    <header className="flex items-center justify-between px-4 h-12 bg-[var(--card-bg)]/90 border-b border-[var(--border)] shrink-0 sticky top-0 backdrop-blur-sm z-10">
      <Link href="/" className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={openModal}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-[var(--border)] text-[var(--text)] rounded-md secondary-btn-hover transition-colors"
        >
          + 새 폴더
        </button>
        <Link
          href="/new"
          className="flex items-center gap-1 px-3 py-1.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors"
        >
          + 새 링크
        </Link>
      </div>
    </header>
  )
}
