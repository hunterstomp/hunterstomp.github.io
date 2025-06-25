// pages/case-studies/[slug].js
import { sanity } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import { useState } from 'react'
import Head from 'next/head'

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
      
      <div style={{ maxWidth: 960, margin: "auto", padding: 32 }}>
        <h1>{caseStudy.title}</h1>
        {caseStudy.company && <h3 style={{ color: "#888" }}>{caseStudy.company}</h3>}
        
        {caseStudy.summary && (
          <div style={{ margin: "16px 0", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
            <strong>Summary:</strong> {caseStudy.summary}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          {caseStudy.tags?.map(tag => (
            <span key={tag} style={{ 
              padding: "3px 8px", 
              background: "#e3e3fa", 
              marginRight: 4, 
              borderRadius: 8, 
              fontSize: 12 
            }}>
              {tag}
            </span>
          ))}
          {caseStudy.ndaProtected && (
            <span style={{ 
              padding: "3px 8px", 
              background: "#ffebee", 
              color: "#c62828",
              marginLeft: 8, 
              borderRadius: 8, 
              fontSize: 12,
              fontWeight: "bold"
            }}>
              NDA Protected
            </span>
          )}
        </div>

        {caseStudy.youtubeEmbed && (
          <div style={{ margin: "24px 0" }}>
            <iframe
              width="100%"
              height="400"
              src={caseStudy.youtubeEmbed}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: 8 }}
            />
          </div>
        )}

        {caseStudy.body && (
          <div style={{ margin: "24px 0", color: "#222", lineHeight: 1.6 }}>
            <PortableText value={caseStudy.body} />
          </div>
        )}

        {caseStudy.flows?.map(flow => (
          <div key={flow.flowName} style={{ marginTop: 32, borderTop: "2px solid #eee", paddingTop: 24 }}>
            <h2 style={{ color: "#333", marginBottom: 8 }}>{flow.flowName}</h2>
            {flow.flowDescription && (
              <div style={{ fontStyle: "italic", color: "#666", marginBottom: 16 }}>
                {flow.flowDescription}
              </div>
            )}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: 16, 
              marginTop: 16 
            }}>
              {flow.images?.map((img, idx) => (
                <div key={idx} style={{ 
                  textAlign: "center", 
                  border: "1px solid #ddd", 
                  borderRadius: 8, 
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={() => openLightbox(img, flow.flowName, idx)}
                >
                  <img 
                    src={img.asset?.url} 
                    alt={img.caption || ""} 
                    style={{ 
                      width: "100%", 
                      height: "150px", 
                      objectFit: "cover",
                      display: "block"
                    }} 
                  />
                  <div style={{ 
                    padding: 8, 
                    fontSize: 12, 
                    background: "#f9f9f9",
                    minHeight: "40px",
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
          <div style={{ margin: '32px 0', padding: '16px', background: '#f8f8ff', borderRadius: 8 }}>
            <h2 style={{ marginBottom: 12 }}>Project Assets</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {caseStudy.assets.map((asset, idx) => (
                <li key={idx} style={{ marginBottom: 12 }}>
                  {asset.file && asset.file.asset && asset.file.asset.url ? (
                    <a href={asset.file.asset.url} download target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, color: '#2a4d9b', textDecoration: 'underline' }}>
                      {asset.label || `Download file ${idx + 1}`}
                    </a>
                  ) : (
                    <span style={{ color: '#aaa' }}>No file</span>
                  )}
                  {asset.description && (
                    <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{asset.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Lightbox
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          image={lightboxImage}
          notes={getCurrentNotes()}
          onNotesChange={handleNotesChange}
        />
      </div>
    </>
  )
}