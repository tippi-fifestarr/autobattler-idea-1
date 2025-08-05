import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevDocs Autobattler',
  description: 'An asynchronous autobattler game with documentation-themed champions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dev-gray min-h-screen">
        {children}
      </body>
    </html>
  )
} 