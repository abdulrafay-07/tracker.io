import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

const font = Montserrat({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'tracker.io',
  description: "Track your X's",
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
