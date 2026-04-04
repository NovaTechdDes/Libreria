import { Router } from "express";
import {
  cerrarCaja,
  getMovCaja,
  getVales,
} from "../controllers/caja.controller";

const router = Router();

router.route("/").get(getMovCaja);
router.route("/vales").get(getVales);
router.route("/cierre").post(cerrarCaja);

export default router;
