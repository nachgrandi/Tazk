import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.resolve('./src/public/uploads'),
    filename: (_req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

export = multer({ storage });