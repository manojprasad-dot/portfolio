import './globals.css'

export const metadata = {
  title: 'Manoj Prasad | Cybersecurity Portfolio',
  description:
    'Cybersecurity portfolio for Manoj Prasad, featuring projects, certifications, and leadership experience in cybersecurity and application security.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
