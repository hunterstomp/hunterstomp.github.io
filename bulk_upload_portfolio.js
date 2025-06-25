// bulk_upload_portfolio.js
//
// v1.0 - Walks your Portfolio/Company/Project/Flow folders, optimizes images,
// reads Bridge/XMP tags/captions/notes, generates NDJSON for Sanity import.
// (Add Google Drive/AI alt-text/advanced manifest support in v2)
//
// Dependencies (install with npm):
// npm install sharp @sanity/client sanitize-filename fast-glob exifr

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const sanitize = require('sanitize-filename');
const fg = require('fast-glob');
const exifr = require('exifr');

// Set these to your project:
const THUMB_SIZE = 512; // square thumbnails for gallery
const FULL_SIZE = 2560; // max width/height for full images

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const ASSET_EXTS = ['.pdf', '.docx', '.doc', '.ppt', '.pptx', '.zip', '.fig', '.xd', '.sketch', '.csv', '.xlsx'];

function isImage(file) {
  return IMAGE_EXTS.includes(path.extname(file).toLowerCase());
}
function isAsset(file) {
  return ASSET_EXTS.includes(path.extname(file).toLowerCase());
}

// Util: Convert filename to caption
function filenameToCaption(filename) {
  return sanitize(path.parse(filename).name.replace(/[_\-]/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Util: Detect flow from folder
function getFlowNameFromPath(fp) {
  // Try to use last folder in path (before file)
  return path.basename(path.dirname(fp));
}

// Util: Detect project/company from path (flexible, grabs last 3 folders)
function getProjectCompanyFromPath(fp) {
  const segs = fp.split(path.sep);
  if (segs.length >= 4) {
    return {
      company: segs[segs.length - 4],
      project: segs[segs.length - 3]
    };
  } else if (segs.length >= 3) {
    return {
      company: segs[segs.length - 3],
      project: segs[segs.length - 2]
    };
  }
  return { company: 'Unknown', project: 'Unknown' };
}

// Read XMP/EXIF (Bridge metadata)
async function readMetadata(file) {
  try {
    const meta = await exifr.parse(file, { userComment: true, description: true, imageDescription: true, title: true, subject: true });
    return {
      caption: meta?.description || meta?.imageDescription || meta?.title || filenameToCaption(file),
      notes: meta?.userComment || meta?.subject || ''
    };
  } catch {
    return { caption: filenameToCaption(file), notes: '' };
  }
}

async function processImage(file, thumbsDir, fullDir) {
  // Make thumbnail
  const thumbOut = path.join(thumbsDir, path.basename(file));
  const fullOut = path.join(fullDir, path.basename(file));
  await sharp(file)
    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' })
    .toFile(thumbOut);

  // Make full-res (max size, keep aspect)
  await sharp(file)
    .resize(FULL_SIZE, FULL_SIZE, { fit: 'inside', withoutEnlargement: true })
    .toFile(fullOut);

  return { thumb: thumbOut, full: fullOut };
}

async function walkPortfolio(rootDir) {
  const allFiles = await fg(['**/*.*'], { cwd: rootDir, absolute: true, onlyFiles: true });
  // Build company > project > flows > files structure
  let projects = {};

  for (let file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    const { company, project } = getProjectCompanyFromPath(file);
    if (!projects[project]) {
      projects[project] = {
        company,
        project,
        flows: {},
        assets: [],
      };
    }
    if (isImage(file)) {
      const flow = getFlowNameFromPath(file);
      if (!projects[project].flows[flow]) projects[project].flows[flow] = [];
      const { caption, notes } = await readMetadata(file);
      projects[project].flows[flow].push({
        file,
        caption,
        notes,
      });
    } else if (isAsset(file)) {
      projects[project].assets.push({ file, ext });
    }
  }
  return projects;
}

// Output NDJSON (Sanity import format)
function generateNDJSON(projects, outputDir) {
  let ndjson = '';
  for (let projKey in projects) {
    const proj = projects[projKey];
    const doc = {
      _type: 'caseStudy',
      title: proj.project,
      company: proj.company,
      flows: [],
      assets: [],
    };
    for (let flowKey in proj.flows) {
      const flow = proj.flows[flowKey];
      doc.flows.push({
        flowName: flowKey,
        flowDescription: '', // Add from elsewhere or manually
        images: flow.map(img => ({
          assetPath: img.file,
          caption: img.caption,
          notes: img.notes,
        })),
      });
    }
    doc.assets = proj.assets.map(a => ({
      assetPath: a.file,
      ext: a.ext,
    }));
    ndjson += JSON.stringify(doc) + '\n';
  }
  fs.writeFileSync(path.join(outputDir, 'dummy-content.ndjson'), ndjson);
  console.log(`NDJSON written to ${outputDir}/dummy-content.ndjson`);
}

async function main() {
  const rootDir = process.argv[2] || './Portfolio';
  const outputDir = process.argv[3] || './_output';
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'thumbnails'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'full'), { recursive: true });

  console.log(`Walking: ${rootDir}`);
  const projects = await walkPortfolio(rootDir);

  // Process images
  for (let projKey in projects) {
    for (let flowKey in projects[projKey].flows) {
      for (let img of projects[projKey].flows[flowKey]) {
        const out = await processImage(img.file, path.join(outputDir, 'thumbnails'), path.join(outputDir, 'full'));
        img.thumb = out.thumb;
        img.full = out.full;
      }
    }
  }

  generateNDJSON(projects, outputDir);
}

main().catch(err => console.error(err));