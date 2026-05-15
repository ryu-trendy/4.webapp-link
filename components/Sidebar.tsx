'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolderContext } from '@/lib/folder-context'

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

export default function Sidebar() {
  const pathname = usePathname()
  const { folders, openDeleteModal, openEditModal } = useFolderContext()

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
            {folders.map((folder) => {
              const isActive = pathname === `/folder/${folder.id}`
              return (
                <div
                  key={folder.id}
                  className={`group flex items-center rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[var(--hover-bg)] text-[var(--accent)] font-medium'
                      : 'text-[var(--text)] nav-item-hover'
                  }`}
                >
                  <Link
                    href={`/folder/${folder.id}`}
                    className="flex-1 px-3 py-2 truncate"
                  >
                    📁 {folder.name}
                  </Link>
                  <button
                    onClick={() => openEditModal(folder)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-sub)] hover:text-[var(--accent)] shrink-0 p-1"
                    aria-label={`${folder.name} 수정`}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={() => openDeleteModal(folder)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-[var(--text-sub)] hover:text-[var(--error)] shrink-0"
                    aria-label={`${folder.name} 삭제`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </aside>
  )
}
