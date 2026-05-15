'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { links as initialLinks } from '@/lib/mock-data'
import type { LinkItem } from '@/components/LinkCard'

type LinkContextType = {
  links: LinkItem[]
  addLink: (link: Omit<LinkItem, 'id'>) => void
  removeLink: (id: string) => void
  updateLink: (id: string, fields: Pick<LinkItem, 'title' | 'description' | 'folderId'>) => void
  deleteLinkTarget: LinkItem | null
  openDeleteLinkModal: (link: LinkItem) => void
  closeDeleteLinkModal: () => void
  editLinkTarget: LinkItem | null
  openEditLinkModal: (link: LinkItem) => void
  closeEditLinkModal: () => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)
  const [deleteLinkTarget, setDeleteLinkTarget] = useState<LinkItem | null>(null)
  const [editLinkTarget, setEditLinkTarget] = useState<LinkItem | null>(null)

  const addLink = (link: Omit<LinkItem, 'id'>) => {
    setLinks(prev => [...prev, { ...link, id: Date.now().toString() }])
  }

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const updateLink = (id: string, fields: Pick<LinkItem, 'title' | 'description' | 'folderId'>) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...fields } : l))
  }

  return (
    <LinkContext.Provider value={{
      links,
      addLink,
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
