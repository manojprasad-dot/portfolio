import './globals.css'

export const metadata = {
  title: 'Manoj Prasad | Cybersecurity Portfolio',
  description:
    'Cybersecurity portfolio for Manoj Prasad, featuring projects, certifications, and a performance-focused running dashboard.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
