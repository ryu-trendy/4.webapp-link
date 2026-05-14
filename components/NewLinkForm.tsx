'use client'

import { useState } from 'react'

type Folder = {
  id: string
  name: string
}

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState('')

  return (
    <div className="p-8 max-w-lg w-full">
      <h2 className="text-xl font-bold text-[var(--text)] mb-6">새 링크 추가</h2>
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
            링크 URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)]"
          >
            <option value="">폴더 선택 (선택 사항)</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  )
}
