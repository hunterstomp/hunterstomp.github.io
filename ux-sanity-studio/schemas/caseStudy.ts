import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'UX Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
    defineField({ name: 'personaAccess', type: 'string', title: 'Access Level', options: { list: ['guest', 'vip', 'author'] } }),
    defineField({ name: 'youtubeEmbed', type: 'url', title: 'YouTube Embed Link' }),
    defineField({ name: 'ndaProtected', type: 'boolean', title: 'NDA Required?' }),
    defineField({ name: 'password', type: 'string', title: 'Password' }),
    defineField({
      name: 'flows',
      title: 'Flows',
      type: 'array',
      of: [
        {
          name: 'flow',
          title: 'Flow',
          type: 'object',
          fields: [
            defineField({ name: 'flowName', type: 'string', title: 'Flow Name' }), // e.g., Discovery, Usability Test 1
            defineField({ name: 'flowDescription', type: 'text', title: 'Flow Description' }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  name: 'caseImage',
                  type: 'image',
                  title: 'Case Image',
                  fields: [
                    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    defineField({ name: 'notes', type: 'text', title: 'Sidebar Notes' })
                  ]
                }
              ]
            })
          ]
        }
      ]
    })
  ]
})