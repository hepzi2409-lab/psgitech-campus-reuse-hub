import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseServer'
import { supabase as supabaseAnon } from '../../lib/supabaseClient'

const MOCK = [
  {
    id: 'mock-1',
    title: '3D Printer Filament (1kg)',
    description: 'PLA filament spool in white — unused partial roll.',
    condition: 'Good',
    images: [],
    is_available: true
  },
  {
    id: 'mock-2',
    title: 'Arduino Starter Kit',
    description: 'Includes Uno board, cables, sensors, and breadboard.',
    condition: 'Used',
    images: [],
    is_available: true
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    // Prefer server-side admin client if available
    try{
      if(process.env.SUPABASE_SERVICE_ROLE_KEY){
        const { data, error } = await supabaseAdmin.from('reuse_items').select('*').order('created_at', { ascending: false }).limit(100)
        if(error) throw error
        return res.status(200).json({ items: data })
      }

      // Fallback to anon client if configured
      if(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY){
        const { data, error } = await supabaseAnon.from('reuse_items').select('*').order('created_at', { ascending: false }).limit(50)
        if(error) throw error
        return res.status(200).json({ items: data })
      }

      // Final fallback: return mock data
      return res.status(200).json({ items: MOCK })
    }catch(err:any){
      console.error('Listings GET error', err.message ?? err)
      return res.status(502).json({ error: 'Failed to fetch listings', details: String(err) })
    }
  }

  if(req.method === 'POST'){
    // Create a new listing — requires server-side key
    if(!process.env.SUPABASE_SERVICE_ROLE_KEY){
      return res.status(503).json({ error: 'Server not configured for creating listings. Set SUPABASE_SERVICE_ROLE_KEY.' })
    }

    const { title, description, condition, images } = req.body
    if(!title){
      return res.status(400).json({ error: 'Missing title' })
    }

    try{
      const { data, error } = await supabaseAdmin.from('reuse_items').insert([{ title, description, condition, images }]).select().single()
      if(error) throw error
      return res.status(201).json({ item: data })
    }catch(err:any){
      console.error('Listings POST error', err.message ?? err)
      return res.status(500).json({ error: 'Failed to create listing' })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end('Method Not Allowed')
}
