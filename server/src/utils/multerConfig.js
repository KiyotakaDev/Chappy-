import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

export { upload, uploadPath }