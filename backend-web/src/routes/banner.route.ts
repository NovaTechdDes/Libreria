import { Router } from "express";
import { deleteBanner, getBanners, postBanner, putBanner, putStatusBanner } from "../controllers";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});



const router = Router();

router.get("/", getBanners);
router.post("/", upload.single("image"), postBanner);
router.delete("/:id", deleteBanner);
router.put('/status/:id', putStatusBanner);
router.put('/:id', upload.single("image"), putBanner);

export default router;