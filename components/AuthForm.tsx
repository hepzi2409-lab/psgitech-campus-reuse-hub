'use client'

import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthForm(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin'|'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try{
      if(mode === 'signup'){
        const { data, error } = await supabase.auth.signUp({ email, password })
        if(error) throw error
        setMessage('Check your email for a confirmation link (if email verification is enabled).')
      }else{
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if(error) throw error
        setMessage('Signed in successfully')
        // page will update via Supabase client session persistence
      }
    }catch(err:any){
      setMessage(err.message || String(err))
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 glass rounded">
      <h3 className="text-lg font-semibold mb-4">{mode === 'signin' ? 'Sign in' : 'Create account'}</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm">Email
          <input className="w-full mt-1 p-2 rounded bg-deepnavy border border-transparent focus:border-electriccyan" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
        </label>
        <label className="block text-sm">Password
          <input className="w-full mt-1 p-2 rounded bg-deepnavy border border-transparent focus:border-electriccyan" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        </label>
        <div className="flex items-center justify-between">
          <button disabled={loading} className="px-4 py-2 glass rounded">{loading ? 'Please wait...' : (mode === 'signin' ? 'Sign in' : 'Sign up')}</button>
          <button type="button" className="text-sm text-iceblue" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>{mode === 'signin' ? 'Create account' : 'Have an account?'}</button>
        </div>
      </form>
      {message && <p className="mt-3 text-sm text-secondarytext">{message}</p>}
    </div>
  )
}
