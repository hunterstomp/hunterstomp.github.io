// utils/seo.js
export function generateSEOTitle(caseStudy) {
  if (caseStudy.seoTitle) return caseStudy.seoTitle
  return `${caseStudy.title} - UX Case Study${caseStudy.company ? ` | ${caseStudy.company}` : ''}`
}

export function generateSEODescription(caseStudy) {
  if (caseStudy.seoDescription) return caseStudy.seoDescription
  if (caseStudy.summary) return caseStudy.summary.slice(0, 155) + '...'
  return `UX Case Study: ${caseStudy.title}${caseStudy.company ? ` at ${caseStudy.company}` : ''}. Explore the design process, user research, and solutions.`
}

export function generateStructuredData(caseStudy, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": generateSEODescription(caseStudy),
    "author": {
      "@type": "Person",
      "name": "UX Designer" // Replace with actual author name
    },
    "publisher": {
      "@type": "Organization",
      "name": "UX Portfolio" // Replace with actual organization
    },
    "datePublished": caseStudy.publishedAt || caseStudy._createdAt,
    "dateModified": caseStudy._updatedAt,
    "url": url,
    "image": caseStudy.socialImage?.asset?.url || caseStudy.flows?.[0]?.images?.[0]?.asset?.url,
    "keywords": caseStudy.tags?.join(', '),
    "articleSection": "UX Design",
    "inLanguage": "en-US"
  }
}

export function generateOpenGraphTags(caseStudy, url) {
  const title = generateSEOTitle(caseStudy)
  const description = generateSEODescription(caseStudy)
  const image = caseStudy.socialImage?.asset?.url || caseStudy.flows?.[0]?.images?.[0]?.asset?.url

  return {
    'og:title': title,
    'og:description': description,
    'og:type': 'article',
    'og:url': url,
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image
  }
}