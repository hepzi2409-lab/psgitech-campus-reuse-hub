'use client'
import useSWR from 'swr'
import ListingCard from '../../components/ListingCard'

const fetcher = (url:string) => fetch(url).then(r=>r.json())

export default function Marketplace(){
  const { data, error } = useSWR('/api/listings', fetcher)
  const items = data?.items ?? []

  return (
    <div>
      <h2 className="text-2xl font-semibold">Marketplace</h2>
      <p className="text-sm text-secondarytext mt-2">List, browse, and manage campus resources here.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <div className="p-4 glass rounded-lg">No listings yet. Be the first to create one.</div>
        ) : (
          items.map((it:any)=> <ListingCard key={it.id} item={it} />)
        )}
      </div>

    </div>
  )
}
