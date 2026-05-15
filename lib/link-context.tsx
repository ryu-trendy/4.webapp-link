'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { links as initialLinks } from '@/lib/mock-data'
import type { LinkItem } from '@/components/LinkCard'

type LinkContextType = {
  links: LinkItem[]
  addLink: (link: Omit<LinkItem, 'id'>) => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)

  const addLink = (link: Omit<LinkItem, 'id'>) => {
    setLinks(prev => [...prev, { ...link, id: Date.now().toString() }])
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinkContext() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error('useLinkContext must be used within LinkProvider')
  return ctx
}
