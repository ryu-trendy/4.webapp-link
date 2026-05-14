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
    <div className="flex flex-col gap-6 p-8 max-w-lg w-full">
      <h2 className="text-lg font-semibold text-gray-900">새 링크 추가</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            링크 URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder" className="text-sm font-medium text-gray-700">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors bg-white text-gray-700"
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
          className="mt-2 w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  )
}
