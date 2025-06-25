// lib/sanity.js
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'q5gam10s',        // your project ID
  dataset: 'production',        // or your chosen dataset
  useCdn: true,                 // good for public portfolio
  apiVersion: '2023-06-25'      // use today's date or your preferred version
})