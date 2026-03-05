import cloudinary, { ensureCloudinaryConfigured } from '../config/cloudinary.js';

export const uploadBufferToCloudinary = (buffer, folder, resourceType = 'image') =>
  new Promise((resolve, reject) => {
    ensureCloudinaryConfigured();
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

export const destroyCloudinaryAsset = async (url, resourceType = 'image') => {
  ensureCloudinaryConfigured();
  const publicId = extractPublicIdFromUrl(url);
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export const extractPublicIdFromUrl = (url) => {
  const segments = url.split('/upload/');
  if (segments.length < 2) return null;
  const pathPart = segments[1].split('/').slice(1).join('/');
  const noExt = pathPart.replace(/\.[^/.]+$/, '');
  return noExt;
};
