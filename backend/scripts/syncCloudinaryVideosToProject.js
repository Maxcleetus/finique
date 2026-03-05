import fs from 'fs';
import dotenv from 'dotenv';
import cloudinary, { ensureCloudinaryConfigured } from '../config/cloudinary.js';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';

dotenv.config();
if (fs.existsSync('.env.example')) {
  dotenv.config({ path: '.env.example', override: false });
}

const toVideoKey = (url = '') => {
  const normalized = String(url).trim().toLowerCase().replace(/\?.*$/, '').replace(/#.*$/, '');
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
};

const toCanonicalVideoIdentity = (url = '') => {
  const clean = toVideoKey(url);
  if (!clean) return '';
  const cloudinaryMatch = clean.match(/\/video\/upload\/(?:(?!v\d+\/)[^/]+\/)*(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
  if (cloudinaryMatch?.[1]) return cloudinaryMatch[1];
  return clean.replace(/\.[a-z0-9]+$/i, '');
};

const isCloudinaryVideoUrl = (url = '') =>
  String(url).toLowerCase().includes('/res.cloudinary.com/') &&
  String(url).toLowerCase().includes('/video/upload/');

const fetchCloudinaryVideos = async ({ folder, maxResults = 500 }) => {
  ensureCloudinaryConfigured();
  const resources = [];
  let nextCursor;

  do {
    const response = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'video',
      prefix: folder,
      max_results: maxResults,
      next_cursor: nextCursor
    });

    resources.push(...(response.resources || []));
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return resources;
};

const dedupeProjectMedia = (media = []) => {
  const seenCanonical = new Set();
  const deduped = [];
  let removed = 0;

  for (const url of media) {
    const key = toCanonicalVideoIdentity(url) || toVideoKey(url);
    if (!key || seenCanonical.has(key)) {
      removed += 1;
      continue;
    }
    seenCanonical.add(key);
    deduped.push(url);
  }

  return { deduped, removed };
};

const main = async () => {
  const projectTitleArg = process.argv[2];
  const categoryArg = process.argv[3];
  const folderArg = process.argv[4];

  const projectTitle = projectTitleArg || process.env.CLOUDINARY_IMPORT_PROJECT_TITLE || 'Media Library';
  const category = categoryArg || process.env.CLOUDINARY_IMPORT_PROJECT_CATEGORY || 'Residential';
  const folder = folderArg || process.env.CLOUDINARY_IMPORT_FOLDER || 'finique/projects';
  const description = process.env.CLOUDINARY_IMPORT_PROJECT_DESCRIPTION || 'Imported videos synced from Cloudinary.';

  if (!['Residential', 'Commercial'].includes(category)) {
    throw new Error('Category must be Residential or Commercial');
  }

  const host = await connectDB();
  console.log(`Connected to MongoDB: ${host}`);

  let project = await Project.findOne({ title: projectTitle, category });
  if (!project) {
    project = await Project.create({
      title: projectTitle,
      category,
      description,
      media: []
    });
    console.log(`Created project: ${project.title} (${project.category})`);
  } else {
    if (!project.description && description) {
      project.description = description;
      await project.save();
    }
    console.log(`Using project: ${project.title} (${project.category})`);
  }

  const cloudinaryVideos = await fetchCloudinaryVideos({ folder });
  if (!cloudinaryVideos.length) {
    console.log(`No Cloudinary videos found in folder prefix: ${folder}`);
    return;
  }

  const videoByPublicId = new Map();
  for (const item of cloudinaryVideos) {
    if (!item?.public_id || !item?.secure_url) continue;
    const existing = videoByPublicId.get(item.public_id);
    if (!existing || Number(item.version || 0) > Number(existing.version || 0)) {
      videoByPublicId.set(item.public_id, item);
    }
  }

  const { deduped, removed } = dedupeProjectMedia(project.media || []);
  project.media = deduped;

  const normalizedFolder = String(folder).trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  const cloudinaryCanonicalSet = new Set(
    [...videoByPublicId.values()]
      .map((item) => toCanonicalVideoIdentity(item.secure_url))
      .filter(Boolean)
  );

  let removedMissingFromCloudinary = 0;
  project.media = project.media.filter((url) => {
    if (!isCloudinaryVideoUrl(url)) return true;
    const canonical = toCanonicalVideoIdentity(url);
    if (!canonical) return true;
    if (!canonical.startsWith(`${normalizedFolder}/`) && canonical !== normalizedFolder) return true;
    if (cloudinaryCanonicalSet.has(canonical)) return true;
    removedMissingFromCloudinary += 1;
    return false;
  });

  const existingCanonical = new Set(project.media.map((url) => toCanonicalVideoIdentity(url) || toVideoKey(url)));
  const existingPublicIds = new Set(project.media.map((url) => toCanonicalVideoIdentity(url)).filter(Boolean));

  let added = 0;
  let skipped = 0;

  const sortedVideos = [...videoByPublicId.values()].sort((a, b) =>
    String(a.public_id).localeCompare(String(b.public_id))
  );

  for (const video of sortedVideos) {
    const publicId = String(video.public_id || '').toLowerCase();
    const canonical = toCanonicalVideoIdentity(video.secure_url) || toVideoKey(video.secure_url);

    if (!publicId || !canonical) {
      skipped += 1;
      continue;
    }

    if (existingPublicIds.has(publicId) || existingCanonical.has(canonical)) {
      skipped += 1;
      continue;
    }

    project.media.push(video.secure_url);
    existingPublicIds.add(publicId);
    existingCanonical.add(canonical);
    added += 1;
  }

  await project.save();

  console.log('Cloudinary sync complete');
  console.log(`Folder: ${folder}`);
  console.log(`Cloudinary videos discovered: ${cloudinaryVideos.length}`);
  console.log(`Unique public IDs discovered: ${videoByPublicId.size}`);
  console.log(`Added to DB: ${added}`);
  console.log(`Skipped as duplicates/invalid: ${skipped}`);
  console.log(`Removed existing duplicates from DB: ${removed}`);
  console.log(`Removed missing from Cloudinary: ${removedMissingFromCloudinary}`);
  console.log(`Total project media: ${project.media.length}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
