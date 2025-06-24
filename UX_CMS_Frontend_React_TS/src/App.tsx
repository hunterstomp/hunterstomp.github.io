import { useEffect, useState } from 'react'
import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'q5gam10s',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})

interface CaseStudy {
  _id: string;
  title: string;
  summary: string;
  slug: { current: string };
  personaAccess: string;
}

function App() {
  const [cases, setCases] = useState<CaseStudy[]>([])

  useEffect(() => {
    client.fetch('*[_type == "caseStudy"]{_id, title, summary, slug, personaAccess}')
      .then(data => setCases(data))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>UX Case Studies</h1>
      <ul>
        {cases.map(c => (
          <li key={c._id}>
            <h2>{c.title}</h2>
            <p>{c.summary}</p>
            <small>Access: {c.personaAccess}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
