import { Router } from "express";
import { getDetalleVenta } from "../controllers/detalleVenta.controller";


const router = Router();

router.route("/").get(getDetalleVenta);

export default router;
