'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFolderContext } from '@/lib/folder-context'
import { useLinkContext } from '@/lib/link-context'

export default function NewLinkForm() {
  const router = useRouter()
  const { folders } = useFolderContext()
  const { addLink } = useLinkContext()

  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    const trimmed = url.trim()
    if (!trimmed) return

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(trimmed)}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || '링크 정보를 가져올 수 없습니다')

      await addLink({
        title: data.title || trimmed,
        url: trimmed,
        description: data.description || '',
        thumbnail: data.image || undefined,
        folderId: folderId ? Number(folderId) : null,
      })

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

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
            onChange={(e) => { setUrl(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="https://example.com"
            disabled={isLoading}
            className="w-full px-3 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50"
          />
          {error && (
            <p className="text-xs text-[var(--error)]">{error}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] disabled:opacity-50"
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
          onClick={handleSave}
          disabled={!url.trim() || isLoading}
          className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              링크 정보 가져오는 중…
            </>
          ) : (
            '저장'
          )}
        </button>
      </div>
    </div>
  )
}
