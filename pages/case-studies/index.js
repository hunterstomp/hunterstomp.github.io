// pages/case-studies/index.js
import Link from 'next/link'
import { useState } from 'react'
import { sanity } from '../../lib/sanity'

const CASE_STUDY_LIST_QUERY = `
*[_type == "caseStudy"]{
  _id,
  title,
  slug,
  company,
  summary,
  tags,
}
`

export async function getStaticProps() {
  const caseStudies = await sanity.fetch(CASE_STUDY_LIST_QUERY)
  const allTags = Array.from(new Set(caseStudies.flatMap(cs => cs.tags ?? [])))
  return { props: { caseStudies, allTags } }
}

export default function CaseStudiesIndex({ caseStudies, allTags }) {
  const [selectedTag, setSelectedTag] = useState(null)
  const filtered = selectedTag
    ? caseStudies.filter(cs => cs.tags && cs.tags.includes(selectedTag))
    : caseStudies

  return (
    <div style={{ maxWidth: 760, margin: "auto", padding: 32 }}>
      <h1>All UX Case Studies</h1>
      <div style={{ marginBottom: 16 }}>
        <strong>Filter by tag:</strong>
        <button
          style={{
            margin: "0 5px",
            padding: "3px 8px",
            background: !selectedTag ? "#444" : "#e3e3fa",
            color: !selectedTag ? "#fff" : "#000",
            borderRadius: 8,
          }}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            style={{
              margin: "0 5px",
              padding: "3px 8px",
              background: selectedTag === tag ? "#444" : "#e3e3fa",
              color: selectedTag === tag ? "#fff" : "#000",
              borderRadius: 8,
            }}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul>
        {filtered.map(cs => (
          <li key={cs._id} style={{ marginBottom: 20 }}>
            <Link href={`/case-studies/${cs.slug.current}`}>
              <a style={{ fontSize: 20, fontWeight: 500 }}>
                {cs.title}
              </a>
            </Link>
            <span style={{ color: "#666", marginLeft: 8 }}>{cs.company}</span>
            <div style={{ fontSize: 12, marginTop: 2 }}>
              {cs.tags?.map(tag => (
                <span key={tag} style={{ background: "#eee", borderRadius: 8, marginRight: 4, padding: "1px 6px" }}>{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}