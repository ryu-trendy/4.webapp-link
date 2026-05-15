'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { LinkItem } from '@/components/LinkCard'

type LinkContextType = {
  links: LinkItem[]
  addLink: (link: Omit<LinkItem, 'id'>) => Promise<void>
  isAdding: boolean
  removeLink: (id: number) => void
  updateLink: (id: number, fields: Pick<LinkItem, 'title' | 'description' | 'folderId'>) => Promise<void>
  deleteLinkTarget: LinkItem | null
  openDeleteLinkModal: (link: LinkItem) => void
  closeDeleteLinkModal: () => void
  editLinkTarget: LinkItem | null
  openEditLinkModal: (link: LinkItem) => void
  closeEditLinkModal: () => void
}

const LinkContext = createContext<LinkContextType | null>(null)

function rowToLinkItem(row: {
  id: number
  url: string
  title: string | null
  description: string | null
  thumbnail_url: string | null
  folder_id: number | null
}): LinkItem {
  return {
    id: row.id,
    url: row.url,
    title: row.title ?? '',
    description: row.description ?? '',
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id,
  }
}

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [deleteLinkTarget, setDeleteLinkTarget] = useState<LinkItem | null>(null)
  const [editLinkTarget, setEditLinkTarget] = useState<LinkItem | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('links')
      .select('id, url, title, description, thumbnail_url, folder_id')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data.map(rowToLinkItem))
      })
  }, [])

  const addLink = async (link: Omit<LinkItem, 'id'>) => {
    if (isAdding) return
    setIsAdding(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('links')
        .insert({
          url: link.url,
          title: link.title || null,
          description: link.description || null,
          thumbnail_url: link.thumbnail ?? null,
          folder_id: link.folderId,
        })
        .select('id, url, title, description, thumbnail_url, folder_id')
        .single()
      if (data) setLinks(prev => [rowToLinkItem(data), ...prev])
    } finally {
      setIsAdding(false)
    }
  }

  const removeLink = (id: number) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const updateLink = async (id: number, fields: Pick<LinkItem, 'title' | 'description' | 'folderId'>) => {
    const supabase = createClient()
    await supabase
      .from('links')
      .update({ title: fields.title, description: fields.description, folder_id: fields.folderId })
      .eq('id', id)
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...fields } : l))
  }

  return (
    <LinkContext.Provider value={{
      links,
      addLink,
      isAdding,
      removeLink,
      updateLink,
      deleteLinkTarget,
      openDeleteLinkModal: (link) => setDeleteLinkTarget(link),
      closeDeleteLinkModal: () => setDeleteLinkTarget(null),
      editLinkTarget,
      openEditLinkModal: (link) => setEditLinkTarget(link),
      closeEditLinkModal: () => setEditLinkTarget(null),
    }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinkContext() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error('useLinkContext must be used within LinkProvider')
  return ctx
}
