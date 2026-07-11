import { Router } from "express";
import { getConfig, putBannerConfig, putDescuentoConfig } from "../controllers/configuracion.controller";


const router = Router();


router.get("/", getConfig);

router.put('/descuento', putDescuentoConfig)
router.put('/banner', putBannerConfig)


export default router;