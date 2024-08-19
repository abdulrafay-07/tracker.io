import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

import { Navbar } from './(landing-page)/_components/navbar';

const font = Montserrat({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'tracker.io',
  description: "Track your X's",
  icons: {
    icon: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={font.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};