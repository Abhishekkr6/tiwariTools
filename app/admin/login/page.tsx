"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm p-8 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-zinc-400 text-sm">Enter password to manage content</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition"
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <Button type="submit" className="w-full py-6 font-medium">
            Unlock Dashboard
          </Button>
        </form>
      </div>
    </div>
  )
}
