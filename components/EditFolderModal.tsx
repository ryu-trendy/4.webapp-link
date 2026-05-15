'use client'

import { useState, useEffect } from 'react'
import { useFolderContext } from '@/lib/folder-context'

export default function EditFolderModal() {
  const { editTarget, closeEditModal, updateFolder } = useFolderContext()
  const [name, setName] = useState('')

  useEffect(() => {
    if (editTarget) setName(editTarget.name)
  }, [editTarget])

  if (!editTarget) return null

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    updateFolder(editTarget.id, trimmed)
    closeEditModal()
  }

  const handleClose = () => {
    closeEditModal()
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 이름 수정</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          autoFocus
          className="border border-[var(--border)] rounded-md px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-md text-[var(--text)] secondary-btn-hover transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-3 py-1.5 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
