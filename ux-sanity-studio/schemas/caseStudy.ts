export default {
  name: 'caseStudy',
  title: 'UX Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    { name: 'company', type: 'string', title: 'Company' },
    { name: 'summary', type: 'text', title: 'Summary' },
    { 
      name: 'personaAccess', 
      type: 'string', 
      title: 'Access Level', 
      options: { 
        list: ['guest', 'vip', 'author'] 
      } 
    },
    { name: 'youtubeEmbed', type: 'url', title: 'YouTube Embed Link' },
    { name: 'ndaProtected', type: 'boolean', title: 'NDA Required?' },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      description: 'Keywords for filtering and search (e.g. healthcare, NDA, triage)'
    },
    {
      name: 'body',
      type: 'array',
      title: 'Case Study Body',
      of: [{ type: 'block' }],
      description: 'Rich text/portable text for main narrative or summary'
    },
    {
      name: 'flows',
      title: 'Flows',
      type: 'array',
      of: [
        {
          name: 'flow',
          title: 'Flow',
          type: 'object',
          fields: [
            { name: 'flowName', type: 'string', title: 'Flow Name' }, // e.g., Discovery, Usability Test 1
            { name: 'flowDescription', type: 'text', title: 'Flow Description' },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  name: 'caseImage',
                  type: 'image',
                  title: 'Case Image',
                  fields: [
                    { name: 'caption', type: 'string', title: 'Caption' },
                    { name: 'notes', type: 'text', title: 'Sidebar Notes' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'file', type: 'file', title: 'File' },
            { name: 'label', type: 'string', title: 'Label/Title' },
            { name: 'description', type: 'text', title: 'Description', description: 'Optional notes or context for this asset.' }
          ]
        }
      ],
      description: 'Non-image downloads (PDFs, docs, etc.)'
    }
  ]
}