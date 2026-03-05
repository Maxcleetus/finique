import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary, { ensureCloudinaryConfigured } from '../config/cloudinary.js';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';

dotenv.config();
if (fs.existsSync('.env.example')) {
  dotenv.config({ path: '.env.example', override: false });
}

const allowedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.avif',
  '.heic',
  '.mp4',
  '.mov',
  '.mkv',
  '.avi',
  '.webm'
]);

const videoExtensions = new Set(['.mp4', '.mov', '.mkv', '.avi', '.webm']);

const isVideoFile = (fileName) => videoExtensions.has(path.extname(fileName).toLowerCase());

const isAllowedMediaFile = (fileName) => allowedExtensions.has(path.extname(fileName).toLowerCase());

const uploadFile = async (absolutePath, resourceType) => {
  ensureCloudinaryConfigured();

  const stats = await fs.promises.stat(absolutePath);
  const threshold = 100 * 1024 * 1024;

  if (resourceType === 'video' && stats.size > threshold) {
    return cloudinary.uploader.upload_large(absolutePath, {
      folder: 'finique/projects',
      resource_type: 'video'
    });
  }

  return cloudinary.uploader.upload(absolutePath, {
    folder: 'finique/projects',
    resource_type: resourceType
  });
};

const main = async () => {
  const sourceArg = process.argv[2];
  const projectTitleArg = process.argv[3];

  const sourceDir = sourceArg
    ? path.resolve(process.cwd(), sourceArg)
    : path.resolve(process.cwd(), '../frontend/src/assets');

  const projectTitle = projectTitleArg || process.env.MEDIA_IMPORT_PROJECT_TITLE || 'Media Library';
  const category = process.env.MEDIA_IMPORT_PROJECT_CATEGORY || 'Residential';
  const description = process.env.MEDIA_IMPORT_PROJECT_DESCRIPTION || 'Imported media library from local assets.';

  if (!['Residential', 'Commercial'].includes(category)) {
    throw new Error('MEDIA_IMPORT_PROJECT_CATEGORY must be Residential or Commercial');
  }

  const dirStats = await fs.promises.stat(sourceDir).catch(() => null);
  if (!dirStats || !dirStats.isDirectory()) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  const files = (await fs.promises.readdir(sourceDir))
    .filter((entry) => isAllowedMediaFile(entry))
    .sort((a, b) => a.localeCompare(b));

  if (!files.length) {
    console.log(`No supported media files found in ${sourceDir}`);
    return;
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
    console.log(`Using existing project: ${project.title} (${project.category})`);
  }

  const existingMedia = new Set(project.media);
  let uploadedCount = 0;
  let skippedCount = 0;

  for (const fileName of files) {
    const absolutePath = path.join(sourceDir, fileName);
    const resourceType = isVideoFile(fileName) ? 'video' : 'image';

    try {
      const uploaded = await uploadFile(absolutePath, resourceType);
      if (!existingMedia.has(uploaded.secure_url)) {
        project.media.push(uploaded.secure_url);
        existingMedia.add(uploaded.secure_url);
        uploadedCount += 1;
        console.log(`Uploaded: ${fileName}`);
      } else {
        skippedCount += 1;
        console.log(`Skipped duplicate URL: ${fileName}`);
      }
    } catch (error) {
      skippedCount += 1;
      console.error(`Failed: ${fileName} -> ${error.message}`);
    }
  }

  await project.save();

  console.log('Import complete');
  console.log(`Project: ${project.title}`);
  console.log(`Uploaded: ${uploadedCount}`);
  console.log(`Skipped/Failed: ${skippedCount}`);
  console.log(`Total media in project: ${project.media.length}`);

  process.exit(0);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
