const fs = require('fs')
const path = require('path')
const { sanity } = require('./lib/sanity')

const SITE_URL = 'https://hunterstomp.com'

async function fetchSlugs() {
  // Fetch all published case study slugs from Sanity
  const query = '*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }'
  return await sanity.fetch(query)
}

function buildSitemap(urls) {
  const urlSet = urls.map(url => `    <url>\n      <loc>${url}</loc>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n    </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet}\n</urlset>`
}

async function main() {
  const slugs = await fetchSlugs()
  const urls = slugs.map(s => `${SITE_URL}/case-studies/${s.slug}`)
  // Add homepage and /case-studies/ index
  urls.unshift(`${SITE_URL}/case-studies/`)
  urls.unshift(`${SITE_URL}/`)
  const sitemap = buildSitemap(urls)
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap)
  console.log('sitemap.xml generated with', urls.length, 'URLs')
}

main().catch(err => {
  console.error('Error generating sitemap:', err)
  process.exit(1)
}) 