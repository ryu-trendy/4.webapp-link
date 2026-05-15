'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useFolderContext } from '@/lib/folder-context'

export default function DeleteFolderModal() {
  const router = useRouter()
  const pathname = usePathname()
  const { deleteTarget, closeDeleteModal, removeFolder } = useFolderContext()

  if (!deleteTarget) return null

  const handleDelete = () => {
    removeFolder(deleteTarget.id)
    closeDeleteModal()
    if (pathname === `/folder/${deleteTarget.id}`) {
      router.push('/')
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={closeDeleteModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-[var(--text)]">폴더 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-medium text-[var(--text)]">'{deleteTarget.name}'</span> 폴더를 삭제할까요?
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={closeDeleteModal}
            className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-md text-[var(--text)] secondary-btn-hover transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 text-sm bg-[var(--error)] text-white rounded-md hover:opacity-90 transition-opacity"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
