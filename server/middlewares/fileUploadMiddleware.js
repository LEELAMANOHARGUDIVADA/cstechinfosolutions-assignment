import multer from "multer";
import path from "path";

const fileTypes = ['.csv', '.xlsx', '.xls'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (fileTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only CSV, XLSX, and XLS files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
