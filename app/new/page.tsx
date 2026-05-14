import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import NewLinkForm from '@/components/NewLinkForm'
import { folders } from '@/lib/mock-data'

export default function NewPage() {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <NewLinkForm folders={folders} />
        </main>
      </div>
    </div>
  )
}
