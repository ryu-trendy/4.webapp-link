'use client'

import { useState, useEffect } from 'react'
import { useLinkContext } from '@/lib/link-context'
import { useFolderContext } from '@/lib/folder-context'

export default function EditLinkModal() {
  const { editLinkTarget, closeEditLinkModal, updateLink } = useLinkContext()
  const { folders } = useFolderContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [folderId, setFolderId] = useState('')

  useEffect(() => {
    if (editLinkTarget) {
      setTitle(editLinkTarget.title)
      setDescription(editLinkTarget.description)
      setFolderId(editLinkTarget.folderId ?? '')
    }
  }, [editLinkTarget])

  if (!editLinkTarget) return null

  const handleSave = () => {
    if (!title.trim()) return
    updateLink(editLinkTarget.id, {
      title: title.trim(),
      description: description.trim(),
      folderId: folderId || null,
    })
    closeEditLinkModal()
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={closeEditLinkModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-96 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">폴더</label>
          <select
            value={folderId}
            onChange={e => setFolderId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)]"
          >
            <option value="">폴더 없음</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoFocus
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">설명</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] resize-none"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={closeEditLinkModal}
            className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-md text-[var(--text)] secondary-btn-hover transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-3 py-1.5 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
