'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Folder = {
  id: string
  name: string
}

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col p-4 gap-1 shrink-0">
      <Link
        href="/"
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          pathname === '/'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        All
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === `/folder/${folder.id}`
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📁 {folder.name}
          </Link>
        ))}
      </div>
    </aside>
  )
}
