import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/', 'video/'];
  if (allowed.some((type) => file.mimetype.startsWith(type))) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter
});
