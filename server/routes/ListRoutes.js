import { Router } from "express";
import { distributeList } from "../controllers/ListController.js";
import upload from "../middlewares/fileUploadMiddleware.js";

const router = Router();

router.post('/distribute-list', upload.single('file') , distributeList);

export default router;