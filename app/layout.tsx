import type { Metadata } from 'next'
import { inter } from '@/app/ui/fonts'
import Navigation from '@/app/ui/navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'AZ-Fitness',
  description: 'Personal training service provider',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='shadow-lg'>
          <h1 className='mx-44 py-10 text-5xl text-red-600 font-bold border-b-2 border-red-600'>A to Z Fitness</h1>
          <div className='mx-72 p-5'>
            <Navigation />
          </div>
        </div>

        <div className=''>
          {children}
        </div>

        <div className='p-10 text-center'>
          <h3 className='py-5 text-xl text-red-600 font-bold'>A to Z Fitness</h3>
          <h4 className='text-red-600'>aran.ziegler@gmail.com</h4>
          <h4 className='text-red-600'>022 017 0799</h4>
          <p className='pt-10 text-red-600'>©2023 by AZ Fitness</p>
        </div>
      </body>
    </html>
  )
}
