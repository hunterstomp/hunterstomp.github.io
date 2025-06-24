import { defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'UX Case Study',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'summary', type: 'text', title: 'Summary' },
    { name: 'body', type: 'array', of: [{ type: 'block' }], title: 'Body Content' },
    { name: 'images', type: 'array', of: [{ type: 'image' }], title: 'Images' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
    { name: 'personaAccess', type: 'string', title: 'Access Level', options: { list: ['guest', 'vip', 'author'] } },
    { name: 'youtubeEmbed', type: 'url', title: 'YouTube Embed Link' },
    { name: 'ndaProtected', type: 'boolean', title: 'NDA Required?' },
    { name: 'password', type: 'string', title: 'Password' }
  ]
})
