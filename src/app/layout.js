import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './components/Providers.jsx'
import Appbar from './components/Appbar.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Journey',
  description: 'An app for managing your goals, tasks, and reflections in one place.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
