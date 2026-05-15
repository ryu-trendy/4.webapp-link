'use client'

import { useState } from 'react'
import { useFolderContext } from '@/lib/folder-context'

export default function NewFolderModal() {
  const { isModalOpen, closeModal, addFolder, isAdding } = useFolderContext()
  const [name, setName] = useState('')

  if (!isModalOpen) return null

  const handleSave = async () => {
    const trimmed = name.trim()
    if (!trimmed || isAdding) return
    await addFolder(trimmed)
    setName('')
    closeModal()
  }

  const handleClose = () => {
    setName('')
    closeModal()
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
        <h2 className="text-base font-semibold text-[var(--text)]">새 폴더</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="폴더 이름"
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
            disabled={!name.trim() || isAdding}
            className="px-3 py-1.5 text-sm bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAdding ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  )
}
