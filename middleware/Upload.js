import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public/images");
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
            cb(null, true);
        } else {
            console.log("Only .png, .jpg and .jpeg format allowed!");
            cb(null, false);
        }
    }
});

export default upload;