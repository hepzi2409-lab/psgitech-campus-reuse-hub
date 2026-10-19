import type { NextApiRequest, NextApiResponse } from 'next'

type Message = { role: string; content: string }

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_MESSAGES_PER_WINDOW = 30

const ipCounters: Record<string, { ts: number; count: number }> = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const counter = ipCounters[ip as string] || { ts: now, count: 0 }
  if(now - counter.ts > RATE_LIMIT_WINDOW){
    counter.ts = now
    counter.count = 0
  }
  if(counter.count > MAX_MESSAGES_PER_WINDOW){
    res.status(429).json({ error: 'Rate limit exceeded' })
    return
  }
  counter.count += 1
  ipCounters[ip as string] = counter

  if(req.method !== 'POST'){
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { messages } = req.body as { messages?: Message[] }
  if(!messages || !Array.isArray(messages)){
    return res.status(400).json({ error: 'Invalid request' })
  }

  if(messages.join('\n').length > 5000){
    return res.status(400).json({ error: 'Messages too long' })
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if(!OPENAI_KEY){
    return res.status(503).json({ error: 'AI provider not configured' })
  }

  // system prompt — Sprout identity
  const systemPrompt = {
    role: 'system',
    content: 'You are Sprout, the PSGiTECH Campus Reuse Hub assistant. Provide concise, campus-focused, helpful answers about borrowing, lending, sustainability, and the website features. Be transparent that you are an AI assistant.'
  }

  const payload = {
    model: 'gpt-4o-mini',
    messages: [systemPrompt, ...(messages as Message[])],
    max_tokens: 500
  }

  try{
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    })

    if(!r.ok){
      const text = await r.text()
      return res.status(502).json({ error: 'AI provider error', details: text })
    }

    const data = await r.json()
    const reply = data.choices?.[0]?.message ?? { role: 'assistant', content: 'No response from AI' }
    return res.status(200).json({ reply })
  }catch(err){
    console.error('AI error', err)
    return res.status(500).json({ error: 'Internal error' })
  }
}
