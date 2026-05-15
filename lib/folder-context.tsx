'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { folders as initialFolders } from '@/lib/mock-data'

type Folder = { id: string; name: string }

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
  removeFolder: (id: string) => void
  updateFolder: (id: string, name: string) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  deleteTarget: Folder | null
  openDeleteModal: (folder: Folder) => void
  closeDeleteModal: () => void
  editTarget: Folder | null
  openEditModal: (folder: Folder) => void
  closeEditModal: () => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null)
  const [editTarget, setEditTarget] = useState<Folder | null>(null)

  const addFolder = (name: string) => {
    setFolders(prev => [...prev, { id: Date.now().toString(), name }])
  }

  const removeFolder = (id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id))
  }

  const updateFolder = (id: string, name: string) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f))
  }

  return (
    <FolderContext.Provider value={{
      folders,
      addFolder,
      removeFolder,
      updateFolder,
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
      deleteTarget,
      openDeleteModal: (folder) => setDeleteTarget(folder),
      closeDeleteModal: () => setDeleteTarget(null),
      editTarget,
      openEditModal: (folder) => setEditTarget(folder),
      closeEditModal: () => setEditTarget(null),
    }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolderContext() {
  const ctx = useContext(FolderContext)
  if (!ctx) throw new Error('useFolderContext must be used within FolderProvider')
  return ctx
}
