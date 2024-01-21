import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import '@/app/ui/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | AZ-Fitness',
    default: 'AZ-Fitness',
  },
  description: 'Personal training service provider',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
