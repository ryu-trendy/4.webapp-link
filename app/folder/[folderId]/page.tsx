import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'
import { links } from '@/lib/mock-data'

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params
  const folderLinks = links.filter((link) => link.folderId === folderId)

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <LinkGrid links={folderLinks} />
        </main>
      </div>
    </div>
  )
}
