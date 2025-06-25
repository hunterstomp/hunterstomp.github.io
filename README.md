# 🚀 UX Case Study Portfolio – Project Checklist

## Content & Structure
- [ ] [Schema] All case studies have title, company, tags, body, flows, images, assets, and SEO slug
- [ ] [Source of Truth] All portfolio content is synced in Sanity (no stray Dropbox/GDrive only)
- [ ] [Naming] Project, flow, and tag names follow a consistent convention

## Data Automation
- [ ] [Script] Bulk import tool runs from folder tree, generates thumbnails, full images, and NDJSON for Sanity
- [ ] [Meta] Bridge/Lightroom metadata (tags, captions) imported into Sanity fields
- [ ] [Backup] Google Drive and periodic Sanity export working (v2)
- [ ] [AI] Alt-text script/process enabled

## Frontend
- [ ] [Sanity Client] `lib/sanity.js` (Next.js/React) working
- [ ] [Index] `/case-studies/` shows gallery of all case studies, filterable by tags
- [ ] [Slug Routing] `/case-studies/[slug]` dynamic page for detail view
- [ ] [Gallery] Flows displayed with thumbnail grid, lightbox/modal support, sidebar notes
- [ ] [Assets] Non-image downloads (with icons) grouped by project/flow
- [ ] [Navigation] Next/previous project navigation, "jump to company" chronology

## Dev & Maintenance
- [ ] [Schema] Version controlled in Git
- [ ] [Readme/Devlog] How-to-add-a-case-study and troubleshooting docs included
- [ ] [Deployment] Deploy preview enabled (Vercel/Netlify/GitHub Pages)
- [ ] [Testing] Manual "usability" test and link check performed
- [ ] [WIP Tag] Incomplete/draft studies hidden from public

## SEO & A11y
- [ ] [SEO] Sitemap, meta tags, page titles set
- [ ] [A11y] All images have alt text, Lighthouse/axe checks clean

---

## 📝 How to Add a New Case Study (Contributor Guide)

1. **Open Sanity Studio**
   - Run `npm run dev` in `ux-sanity-studio` and open the local studio URL.

2. **Create a New Case Study**
   - Click "Create new" and select "UX Case Study".
   - Fill in all required fields: `Title`, `Company`, `Summary`, `Tags`, and `Body` (main narrative).
   - The `slug` will auto-generate from the title (can be edited if needed).

3. **Add Flows and Images**
   - Under "Flows", add each major flow or phase (e.g., Discovery, Usability Test).
   - For each flow, add images. Each image can have a caption and sidebar notes.

4. **Add Assets**
   - In the "Assets" section, upload any non-image files (PDFs, docs, etc.).
   - Add a label/title and optional description for each asset.

5. **Set Access and Metadata**
   - Set persona access, NDA protection, YouTube embed, etc. as needed.

6. **Preview and Test**
   - Visit `/case-studies/` to see your new case study in the list.
   - Click through to `/case-studies/[slug]` to verify detail view, images, assets, and lightbox/modal work as expected.
   - Check that all images have captions and alt text.

7. **Troubleshooting**
   - If your case study doesn't appear, check that all required fields are filled and the slug is unique.
   - For schema or field issues, restart Sanity Studio after making changes.

8. **Ready for Review**
   - Mark incomplete/draft studies with a WIP tag to hide from public view.
   - Ask for a review or run a manual usability test before publishing.

---