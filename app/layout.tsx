import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'PSGiTECH Campus Reuse Hub',
  description: 'Reuse. Share. Borrow. Reduce. Reimagine.'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <aside className="w-64 p-4 glass">
            <h2 className="text-xl font-semibold">PSGiTECH Reuse Hub</h2>
            <nav className="mt-6">
              <ul className="space-y-2 text-sm text-secondarytext">
                <li><a href="/" className="block py-1">Home</a></li>
                <li><a href="/marketplace" className="block py-1">Marketplace</a></li>
                <li><a href="/needcast" className="block py-1">NeedCast AI</a></li>
                <li><a href="/map" className="block py-1">Campus Map</a></li>
                <li><a href="/borrowloop" className="block py-1">BorrowLoop</a></li>
                <li><a href="/ecoroute" className="block py-1">Eco-Route</a></li>
                <li><a href="/repair" className="block py-1">Repair Studio</a></li>
                <li><a href="/passport" className="block py-1">Circular Passport</a></li>
                <li><a href="/community" className="block py-1">Community</a></li>
                <li><a href="/profile" className="block py-1">Profile</a></li>
                <li><a href="/settings" className="block py-1">Settings</a></li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
