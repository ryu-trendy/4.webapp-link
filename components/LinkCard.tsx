export type LinkItem = {
  id: string
  title: string
  url: string
  description: string
  folderId: string | null
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const domain = new URL(link.url).hostname

  return (
    <article className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
          {domain[0].toUpperCase()}
        </div>
        <span className="text-xs text-gray-400 truncate">{domain}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
        {link.title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
        {link.description}
      </p>
    </article>
  )
}
