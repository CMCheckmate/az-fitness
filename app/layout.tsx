import type { Metadata } from 'next';
import '@/app/components/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | AZ-Fitness',
    default: 'AZ-Fitness',
  },
  description: 'Personal training service provider',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='overflow-x-hidden'>
        {children}
      </body>
    </html>
  );
}
