import './globals.css'

export const metadata = {
  title: 'Manoj Prasad - Portfolio',
  description: 'Personal portfolio and performance dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
