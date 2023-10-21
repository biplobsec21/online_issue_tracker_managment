import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes';

import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Online issue tracker ',
  description: 'Online issue tracking management tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor='violet' >
          <NavBar />
          <main className='p-5'>
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  )
}
