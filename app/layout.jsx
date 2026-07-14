import './globals.css'

export const metadata = {
  title: 'Manoj Prasad | Cybersecurity Portfolio',
  description:
    'Cybersecurity portfolio for Manoj Prasad, featuring projects, certifications, and leadership experience in cybersecurity and application security.',
}

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Manoj Prasad A",
    "primaryImageOfPage": "https://manojprasad.vercel.app/assets/images/hero-portrait.png",
    "mainEntity": {
      "@type": "Person",
      "name": "Manoj Prasad A",
      "jobTitle": "Cybersecurity Analyst",
      "description": "Cybersecurity student with hands-on experience building secure applications, APIs, and real-world security projects. Skilled in Python, backend development, threat detection, and penetration testing.",
      "url": "https://manojprasad.vercel.app",
      "sameAs": [
        "https://github.com/manojprasad-dot",
        "https://linkedin.com/in/manoj-prasad-92b2322b7"
      ],
      "knowsAbout": [
        "Cybersecurity",
        "Penetration Testing",
        "Threat Detection",
        "Application Security",
        "API Security",
        "Python Development"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "SRM Valliammai Engineering College"
      }
    }
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
