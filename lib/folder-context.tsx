'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'

type Folder = { id: number; name: string }

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => Promise<void>
  isAdding: boolean
  removeFolder: (id: number) => Promise<void>
  updateFolder: (id: number, name: string) => Promise<void>
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
  const [folders, setFolders] = useState<Folder[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null)
  const [editTarget, setEditTarget] = useState<Folder | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const fetchFolders = async (userId: string) => {
      const { data } = await supabase
        .from('folders')
        .select('id, name')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
      if (data) setFolders(data)
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) fetchFolders(user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) fetchFolders(session.user.id)
      else setFolders([])
    })

    return () => subscription.unsubscribe()
  }, [])

  const addFolder = async (name: string) => {
    if (isAdding) return
    setIsAdding(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('folders')
        .insert({ name })
        .select('id, name')
        .single()
      if (data) setFolders(prev => [...prev, data])
    } finally {
      setIsAdding(false)
    }
  }

  const removeFolder = async (id: number) => {
    const supabase = createClient()
    await supabase.from('folders').delete().eq('id', id)
    setFolders(prev => prev.filter(f => f.id !== id))
  }

  const updateFolder = async (id: number, name: string) => {
    const supabase = createClient()
    await supabase.from('folders').update({ name }).eq('id', id)
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f))
  }

  return (
    <FolderContext.Provider value={{
      folders,
      addFolder,
      isAdding,
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
