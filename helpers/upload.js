import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


const tmpDir = path.join(process.cwd(), "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir
});

 export const upload = multer({ storage: multerConfig });