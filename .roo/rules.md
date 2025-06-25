# Roo Project Rules

## 1. Code Quality & Structure
- All new code and edits must conform to existing code style (use Prettier/ESLint where applicable)
- Only modify schema files with clear comments about changes and reason
- New files/folders must use kebab-case or camelCase naming (never spaces or special chars)

## 2. Routing & URLs
- Dynamic pages for case studies must use slug-based routing (not _id)
- Any new routes must be SEO-friendly and avoid query string-only navigation

## 3. Asset & Image Handling
- Never remove or overwrite original image assets
- Only generate thumbnails/optimized images in dedicated folders (e.g., /thumbnails, /full)
- Never check large binaries (images, zips, video) into git—reference via asset pipeline or CDN

## 4. Automation Scripts
- All scripts (bulk upload, alt-text, etc.) must be idempotent and have clear logging
- Do not run destructive scripts (deletes, overwrites) without explicit user approval

## 5. Schema & Data
- Do not rename or delete Sanity fields without updating all references (frontend, scripts, docs)
- Any schema migration must include an update to the README/devlog

## 6. Docs & Commits
- All major changes (routes, schema, scripts) require a clear, descriptive commit message
- Update README.md whenever a contributor workflow or setup step changes

## 7. Production Safety
- Never touch .env, .env.local, secrets, or deploy keys
- Do not push to production branches without user approval (always open a PR for review)

## 8. Review Flow
- For any batch/multi-file changes, stop and request user approval before applying
- For ambiguous refactors, ask for clarification in a comment before proceeding

---

## Roo-Specific Constraints

- If a task seems potentially destructive or ambiguous, **ask for clarification** rather than guessing
- If you encounter a rule conflict, **prioritize user safety and codebase stability**