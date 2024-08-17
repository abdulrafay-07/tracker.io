import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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
    <html lang='en'>
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
