// pages/case-studies/[slug].js
import { sanity } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import { useState } from 'react'
import Head from 'next/head'
import Navigation from '../../components/Navigation'

const CASE_STUDY_DETAIL_QUERY = `
*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  company,
  summary,
  tags,
  youtubeEmbed,
  ndaProtected,
  personaAccess,
  body,
  heroImage,
  flows[]{
    flowName,
    flowDescription,
    images[]{
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      caption,
      notes
    }
  },
  assets
}
`

export async function getStaticPaths() {
  const studies = await sanity.fetch(`*[_type == "caseStudy"]{slug}`)
  return {
    paths: studies
      .filter(s => s.slug?.current)
      .map(s => ({ params: { slug: s.slug.current } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const caseStudy = await sanity.fetch(CASE_STUDY_DETAIL_QUERY, { slug: params.slug })
  if (!caseStudy) {
    return { notFound: true }
  }
  return { props: { caseStudy } }
}

// Lightbox Component
function Lightbox({ isOpen, onClose, image, notes, onNotesChange }) {
  if (!isOpen) return null

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img 
          src={image?.asset?.url} 
          alt={image?.caption || ''} 
          className="lightbox-img"
        />
        <div className="sidebar">
          <h3>Image Notes</h3>
          <div className="caption">
            <strong>Caption:</strong> {image?.caption || 'No caption'}
          </div>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add your notes about this image..."
            className="notes-textarea"
          />
          <div className="predefined-notes">
            <strong>Designer Notes:</strong>
            <div>{image?.notes || 'No designer notes available'}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .lightbox-content {
          display: flex;
          background: #111;
          max-width: 90%;
          max-height: 90%;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        .lightbox-img {
          max-height: 90vh;
          max-width: 70vw;
          object-fit: contain;
          flex-shrink: 0;
          background: #000;
        }
        .sidebar {
          width: 300px;
          padding: 20px;
          background: #222;
          color: #eee;
          overflow-y: auto;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10000;
        }
        .close-btn:hover {
          background: rgba(0, 0, 0, 0.9);
        }
        .caption {
          margin: 10px 0;
          padding: 10px;
          background: #333;
          border-radius: 5px;
        }
        .notes-textarea {
          width: 100%;
          height: 120px;
          margin: 10px 0;
          padding: 10px;
          background: #333;
          color: #eee;
          border: 1px solid #555;
          border-radius: 5px;
          resize: vertical;
        }
        .predefined-notes {
          margin-top: 15px;
          padding: 10px;
          background: #2a2a2a;
          border-radius: 5px;
          border-left: 3px solid #007acc;
        }
      `}</style>
    </div>
  )
}

export default function CaseStudyDetail({ caseStudy }) {
  const [lightboxImage, setLightboxImage] = useState(null)
  const [userNotes, setUserNotes] = useState({})

  if (!caseStudy) return <div>Not found</div>

  const openLightbox = (image, flowName, imageIndex) => {
    const noteKey = `${caseStudy.slug.current}-${flowName}-${imageIndex}`
    setLightboxImage({ ...image, noteKey })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const handleNotesChange = (notes) => {
    if (lightboxImage?.noteKey) {
      setUserNotes(prev => ({
        ...prev,
        [lightboxImage.noteKey]: notes
      }))
      // Save to localStorage
      localStorage.setItem(`case-study-notes-${lightboxImage.noteKey}`, notes)
    }
  }

  const getCurrentNotes = () => {
    if (!lightboxImage?.noteKey) return ''
    return userNotes[lightboxImage.noteKey] || 
           (typeof window !== 'undefined' ? localStorage.getItem(`case-study-notes-${lightboxImage.noteKey}`) || '' : '')
  }

  return (
    <>
      <Head>
        <title>{caseStudy.title} - UX Case Study</title>
        <meta name="description" content={caseStudy.summary || `UX Case Study: ${caseStudy.title}`} />
        <meta property="og:title" content={`${caseStudy.title} - UX Case Study`} />
        <meta property="og:description" content={caseStudy.summary || `UX Case Study: ${caseStudy.title}`} />
      </Head>
      
      <Navigation />
      
      <main className="main-content">
        {/* Hero Section */}
        <section 
          className="case-study-hero"
          style={{
            backgroundImage: caseStudy.heroImage?.asset?.url 
              ? `url(${caseStudy.heroImage.asset.url})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="case-study-hero-content">
            <h1>{caseStudy.title}</h1>
            {caseStudy.company && <p className="company">{caseStudy.company}</p>}
          </div>
        </section>
        
        <div className="container">
          <div className="section">
            {/* Summary Section */}
            {caseStudy.summary && (
              <div style={{ 
                margin: "var(--spacing-xl) 0", 
                padding: "var(--spacing-xl)", 
                background: "var(--background-dark)", 
                borderRadius: "12px" 
              }}>
                <h3>Summary</h3>
                <p>{caseStudy.summary}</p>
              </div>
            )}

            {/* Tags and Badges */}
            <div style={{ marginBottom: "var(--spacing-xl)" }}>
              <div className="case-study-tags" style={{ marginBottom: "var(--spacing-md)" }}>
                {caseStudy.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {caseStudy.ndaProtected && (
                <span style={{ 
                  padding: "var(--spacing-xs) var(--spacing-sm)", 
                  background: "#ffebee", 
                  color: "#c62828",
                  marginRight: "var(--spacing-sm)", 
                  borderRadius: "20px", 
                  fontSize: "0.85rem",
                  fontWeight: "bold"
                }}>
                  NDA Protected
                </span>
              )}
            </div>

            {/* YouTube Embed */}
            {caseStudy.youtubeEmbed && (
              <div style={{ margin: "var(--spacing-2xl) 0" }}>
                <iframe
                  width="100%"
                  height="400"
                  src={caseStudy.youtubeEmbed}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: "12px" }}
                />
              </div>
            )}

            {/* Body Content */}
            {caseStudy.body && (
              <div style={{ margin: "var(--spacing-2xl) 0", color: "var(--text-primary)", lineHeight: 1.6 }}>
                <PortableText value={caseStudy.body} />
              </div>
            )}

            {/* Flows Section */}
            {caseStudy.flows?.map(flow => (
              <div key={flow.flowName} style={{ 
                marginTop: "var(--spacing-3xl)", 
                borderTop: "2px solid var(--border-color)", 
                paddingTop: "var(--spacing-2xl)" 
              }}>
                <h2 style={{ color: "var(--text-primary)", marginBottom: "var(--spacing-md)" }}>{flow.flowName}</h2>
                {flow.flowDescription && (
                  <div style={{ fontStyle: "italic", color: "var(--text-secondary)", marginBottom: "var(--spacing-xl)" }}>
                    {flow.flowDescription}
                  </div>
                )}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                  gap: "var(--spacing-lg)", 
                  marginTop: "var(--spacing-xl)" 
                }}>
                  {flow.images?.map((img, idx) => (
                    <div key={idx} style={{ 
                      textAlign: "center", 
                      border: "1px solid var(--border-color)", 
                      borderRadius: "12px", 
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={() => openLightbox(img, flow.flowName, idx)}
                    >
                      <img 
                        src={img.asset?.url} 
                        alt={img.caption || img.asset?._id || 'Case study image'} 
                        style={{ 
                          width: "100%", 
                          height: "200px", 
                          objectFit: "cover",
                          display: "block"
                        }} 
                      />
                      <div style={{ 
                        padding: "var(--spacing-md)", 
                        fontSize: "0.9rem", 
                        background: "var(--background-dark)",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {img.caption || `Image ${idx + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Assets Section */}
            {caseStudy.assets && caseStudy.assets.length > 0 && (
              <div style={{ 
                margin: 'var(--spacing-3xl) 0', 
                padding: 'var(--spacing-xl)', 
                background: 'var(--background-dark)', 
                borderRadius: "12px" 
              }}>
                <h2 style={{ marginBottom: "var(--spacing-lg)" }}>Project Assets</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {caseStudy.assets.map((asset, idx) => (
                    <li key={idx} style={{ marginBottom: "var(--spacing-lg)" }}>
                      {asset.file && asset.file.asset && asset.file.asset.url ? (
                        <a 
                          href={asset.file.asset.url} 
                          download 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary"
                          style={{ display: 'inline-block' }}
                        >
                          {asset.label || `Download file ${idx + 1}`}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-light)' }}>No file</span>
                      )}
                      {asset.description && (
                        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "var(--spacing-xs)" }}>
                          {asset.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Lightbox
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          image={lightboxImage}
          notes={getCurrentNotes()}
          onNotesChange={handleNotesChange}
        />
      </main>
    </>
  )
}