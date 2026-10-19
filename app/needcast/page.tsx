import dynamic from 'next/dynamic'
import React from 'react'

const Sprout = dynamic(() => import('../../components/Sprout'), { ssr: false })

export default function NeedCast(){
  return (
    <div>
      <h2 className="text-2xl font-semibold">NeedCast AI — Sprout</h2>
      <p className="text-sm text-secondarytext mt-2">Chat with Sprout about borrowing, sharing, and sustainability.</p>
      <div className="mt-6 h-96 glass rounded-lg p-4">
        <Sprout />
      </div>
    </div>
  )
}
