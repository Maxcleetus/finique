import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { destroyCloudinaryAsset, uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

const getResourceType = (url) => {
  const lower = url.toLowerCase();
  if (lower.includes('/video/upload/')) return 'video';
  return 'image';
};

const destroyCloudinaryUrl = async (url) => {
  const resourceType = getResourceType(url);
  await destroyCloudinaryAsset(url, resourceType);
};

export const getProjects = asyncHandler(async (req, res) => {
  const { category, view } = req.query;
  const filter = category ? { category } : {};
  const query = Project.find(filter).sort({ createdAt: -1 });

  if (view === 'reels') {
    query.select('title category media');
    query.lean();
    res.set('Cache-Control', 'public, max-age=180');
  }

  const projects = await query;
  res.json(projects);
});

export const createProject = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  if (!title || !category) {
    res.status(400);
    throw new Error('Title and category are required');
  }

  const mediaFiles = req.files || [];
  const media = await Promise.all(
    mediaFiles.map(async (file) => {
      const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
      const uploaded = await uploadBufferToCloudinary(file.buffer, 'finique/projects', resourceType);
      return uploaded.secure_url;
    })
  );

  const project = await Project.create({
    title,
    category,
    description,
    media
  });

  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const { title, category, description } = req.body;
  if (title) project.title = title;
  if (category) project.category = category;
  if (description !== undefined) project.description = description;

  const mediaFiles = req.files || [];
  if (mediaFiles.length) {
    const uploadedMedia = await Promise.all(
      mediaFiles.map(async (file) => {
        const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
        const uploaded = await uploadBufferToCloudinary(file.buffer, 'finique/projects', resourceType);
        return uploaded.secure_url;
      })
    );
    project.media = [...project.media, ...uploadedMedia];
  }

  const updated = await project.save();
  res.json(updated);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.media?.length) {
    await Promise.all(project.media.map((url) => destroyCloudinaryUrl(url)));
  }

  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted successfully' });
});

export const deleteProjectMedia = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400);
    throw new Error('Media URL is required');
  }

  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (!project.media.includes(url)) {
    res.status(400);
    throw new Error('Media URL does not belong to this project');
  }

  project.media = project.media.filter((item) => item !== url);
  await destroyCloudinaryUrl(url);

  await project.save();
  res.json({ message: 'Media removed successfully', project });
});
