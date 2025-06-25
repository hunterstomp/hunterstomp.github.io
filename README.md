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
## 📦 Asset & Binary Handling

- All image and video originals remain untouched by scripts.
- All optimized images go into `/thumbnails/` and `/full/` (these folders are gitignored).
- Never commit ZIP, video, export, or NDJSON files to git.
- For large files, upload to Google Drive/Dropbox/S3/CDN and reference with a link in the docs.
- If you’ve already checked in binaries:
    1. Move to external storage and paste a `.link.txt` stub in their place.
    2. Run `git rm --cached path/to/file`.
    3. Add pattern to `.gitignore`.
    4. Commit and push.

**All contributors: Keep the repo clean and lightweight!**
---## Asset & Binary File Policy

- Original source images for portfolio projects are never altered or deleted by scripts.
- Optimized images (thumbnails, full) are generated in `/thumbnails/` and `/full/` folders, which are ignored by git.
- All large binaries (ZIP, video, exports, NDJSON) must **not** be checked into the git repo.  
  - Use Google Drive, Dropbox, S3, or a public CDN to store/share these files.
  - In the repo, reference external asset links in the relevant markdown or documentation files.

### Moving Existing Binaries Out of Git

If you have already checked in large binaries:
1. Move the file(s) to your external storage (Google Drive, etc.)
2. Replace the file in your repo with a small `.md` or `.txt` link file, e.g.:
    ```
    # Moved to external storage
    This asset is now stored at: https://drive.google.com/xyz123abc
    ```
3. Remove from git tracking:
    ```
    git rm --cached path/to/bigfile.zip
    ```
4. Add the file or folder to your `.gitignore`
5. Commit the change

---

**All contributors:**  
Never add raw images, videos, or large exports to the repo! Use links/reference files only.

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