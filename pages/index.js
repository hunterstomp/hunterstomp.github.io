import Head from 'next/head'
import Link from 'next/link'
import { sanity } from '../lib/sanity'
import Navigation from '../components/Navigation'
import ParallaxHero from '../components/ParallaxHero'

const CASE_STUDY_LIST_QUERY = `
*[_type == "caseStudy"]{
  _id,
  title,
  slug,
  company,
  summary,
  tags,
  heroImage
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
        <title>Q10UX - User Experience Portfolio of Quentin Little</title>
        <meta name="description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design. View my case studies and portfolio." />
        <meta property="og:title" content="Quentin Little - User Experience Designer / Researcher" />
        <meta property="og:description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design. View my case studies and portfolio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio.q10ux.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quentin Little" />
        <meta name="twitter:description" content="UX Designer and Researcher specializing in user experience design, research, and digital product design." />
      </Head>
      
      <Navigation />
      
      <main className="main-content">
        {/* Parallax Hero Section */}
        <ParallaxHero />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Better Experiences. Real Results.</h1>
            <p>Creating user-centered digital experiences through research, design, and strategic thinking</p>
            <Link href="/case-studies" passHref legacyBehavior>
              <a className="btn">View My Work</a>
            </Link>
          </div>
        </section>

        {/* Featured Case Studies Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-4">
              <h2>Featured Case Studies</h2>
              <p>Explore my latest UX projects and design solutions</p>
            </div>
            
            <div className="case-studies-grid">
              {caseStudies.map(cs => (
                <div key={cs._id} className="case-study-card">
                  <div 
                    className="case-study-image"
                    style={{
                      backgroundImage: cs.heroImage?.asset?.url 
                        ? `url(${cs.heroImage.asset.url})`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <div className="case-study-overlay">
                      <Link href={`/case-studies/${cs.slug.current}`} passHref legacyBehavior>
                        <a className="btn">View Case Study</a>
                      </Link>
                    </div>
                  </div>
                  <div className="case-study-content">
                    <h3 className="case-study-title">{cs.title}</h3>
                    <p className="case-study-company">{cs.company}</p>
                    <p className="case-study-summary">{cs.summary}</p>
                    <div className="case-study-tags">
                      {cs.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <Link href="/case-studies" passHref legacyBehavior>
                <a className="btn btn-secondary">View All Case Studies</a>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section" style={{ background: 'var(--background-dark)' }}>
          <div className="container">
            <div className="text-center">
              <h2>About Me</h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                I specialize in creating user-centered digital experiences through research, design, and strategic thinking. 
                My work focuses on solving complex problems with intuitive, accessible, and engaging solutions that drive 
                meaningful user outcomes and business results.
              </p>
              <div style={{ marginTop: 'var(--spacing-xl)' }}>
                <Link href="/about" passHref legacyBehavior>
                  <a className="btn">Learn More About Me</a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          background: 'var(--secondary-color)', 
          color: 'white', 
          padding: 'var(--spacing-2xl) 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <p>© 2024 Q10UX Design.  All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
} 