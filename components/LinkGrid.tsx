import LinkCard, { type LinkItem } from './LinkCard'

export default function LinkGrid({ links }: { links: LinkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}
