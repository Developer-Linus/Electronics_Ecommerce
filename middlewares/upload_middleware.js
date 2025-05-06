import multer from "multer";
import path, { extname } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Required to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
    cb(null, "uploads/")}, // Save files in uploads/ folder

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix+path.extname(file.originalname));
    }
});

// file filter
const fileFilter = (req, file, cb) => {
    const allowed = [ 'image/jpg', 'image/png', 'image/webp' ];
    cb(null, allowed.includes(file.mimetype));
}

// Export the configured multer middleware
const upload = multer({ storage, fileFilter });

export default upload;