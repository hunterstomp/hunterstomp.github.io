import Head from 'next/head'
import Link from 'next/link'
import { sanity } from '../lib/sanity'

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
  // Filter out case studies without slugs and show only first 3
  const validCaseStudies = caseStudies
    .filter(cs => cs.slug?.current)
    .slice(0, 3)
  return { props: { caseStudies: validCaseStudies } }
}

export default function Home({ caseStudies }) {
  return (
    <>
      <Head>
        <title>Hunter Stomp - UX Designer & Researcher</title>
        <meta name="description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design. View my case studies and portfolio." />
        <meta property="og:title" content="Hunter Stomp - UX Designer & Researcher" />
        <meta property="og:description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design. View my case studies and portfolio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hunterstomp.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hunter Stomp - UX Designer & Researcher" />
        <meta name="twitter:description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design." />
      </Head>
      
      <div style={{ maxWidth: 960, margin: "auto", padding: 32 }}>
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>Hunter Stomp</h1>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: 24 }}>
            UX Designer & Researcher
          </p>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: 600, margin: "auto", lineHeight: 1.6 }}>
            I specialize in creating user-centered digital experiences through research, design, and strategic thinking. 
            My work focuses on solving complex problems with intuitive, accessible, and engaging solutions.
          </p>
        </header>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 24 }}>Featured Case Studies</h2>
          <div style={{ display: "grid", gap: 24 }}>
            {caseStudies.map(cs => (
              <div key={cs._id} style={{ 
                border: "1px solid #eee", 
                borderRadius: 8, 
                padding: 24,
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
              >
                <Link href={`/case-studies/${cs.slug.current}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div>
                    <h3 style={{ marginBottom: 8, color: "#333" }}>{cs.title}</h3>
                    <p style={{ color: "#666", marginBottom: 8 }}>{cs.company}</p>
                    <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.5 }}>
                      {cs.summary}
                    </p>
                    <div style={{ marginTop: 12 }}>
                      {cs.tags?.map(tag => (
                        <span key={tag} style={{ 
                          background: "#f0f0f0", 
                          borderRadius: 12, 
                          padding: "4px 8px", 
                          marginRight: 8, 
                          fontSize: "0.8rem",
                          color: "#666"
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/case-studies/" style={{ 
              background: "#007acc", 
              color: "white", 
              padding: "12px 24px", 
              borderRadius: 6, 
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-block"
            }}>
              View All Case Studies
            </Link>
          </div>
        </section>

        <footer style={{ textAlign: "center", color: "#888", fontSize: "0.9rem" }}>
          <p>© 2024 Hunter Stomp. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
} 