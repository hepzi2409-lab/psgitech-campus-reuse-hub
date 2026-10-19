import React from 'react'

export default function ListingCard({ item }:{ item:any }){
  return (
    <div className="p-4 glass rounded-lg">
      <div className="h-40 bg-secondaryblue rounded mb-3 flex items-center justify-center text-sm text-secondarytext">{item.images && item.images.length > 0 ? (
        <img src={item.images[0]} alt={item.title} className="object-cover h-full w-full rounded" />
      ) : 'No image'}</div>
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-secondarytext mt-1">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-iceblue">{item.condition ?? 'Unknown'}</span>
        <button className="px-3 py-1 glass rounded text-sm">Request</button>
      </div>
    </div>
  )
}
