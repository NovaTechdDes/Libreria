import { Router } from "express";
import { getVentasDelDia } from "../controllers/ventas.controller";

const router = Router();

router.get("/", getVentasDelDia);

export default router;
