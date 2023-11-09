import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 },
  storage,
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
