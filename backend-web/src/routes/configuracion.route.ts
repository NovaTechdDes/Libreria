import { Router } from "express";
import { getConfig, putBannerConfig, putDescuentoConfig, putMostrarPreciosConfig } from "../controllers/configuracion.controller";


const router = Router();


router.get("/", getConfig);

router.put('/descuento', putDescuentoConfig)
router.put('/banner', putBannerConfig)
router.put('/mostrar-precios', putMostrarPreciosConfig)


export default router;