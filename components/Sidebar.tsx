'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolderContext } from '@/lib/folder-context'

export default function Sidebar() {
  const pathname = usePathname()
  const { folders } = useFolderContext()

  return (
    <aside className="w-52 bg-[var(--card-bg)] border-r border-[var(--border)] flex flex-col p-2 gap-0.5 shrink-0">
      <Link
        href="/"
        className={`px-3 py-2 rounded-md text-sm transition-colors ${
          pathname === '/'
            ? 'bg-[var(--hover-bg)] text-[var(--accent)] font-medium'
            : 'text-[var(--text)] nav-item-hover'
        }`}
      >
        모든 링크
      </Link>
      {folders.length > 0 && (
        <>
          <div className="mt-3 mb-0.5 px-3 text-xs font-medium text-[var(--text-sub)] uppercase tracking-wider">
            폴더
          </div>
          <div className="flex flex-col gap-0.5">
            {folders.map((folder) => (
              <Link
                key={folder.id}
                href={`/folder/${folder.id}`}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === `/folder/${folder.id}`
                    ? 'bg-[var(--hover-bg)] text-[var(--accent)] font-medium'
                    : 'text-[var(--text)] nav-item-hover'
                }`}
              >
                📁 {folder.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </aside>
  )
}
