import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
          <div className='mx-72 p-5 grid grid-cols-5 text-center text-xl text-red-600'>
            <Link className='' href=''>Home</Link>
            <Link className='' href=''>Testimonials</Link>
            <Link className='' href=''>Tips & Advice</Link>
            <Link className='' href=''>Contact</Link>
            <Link className='' href=''>FAQ</Link>
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
