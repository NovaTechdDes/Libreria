import { Router } from "express";
import {
  cerrarCaja,
  getMovCaja,
  getVales,
} from "../controllers/caja.controller";
import { verificarUsuario } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getMovCaja);
router.route("/vales").get(getVales);
router.route("/cierre").post(verificarUsuario, cerrarCaja);

export default router;
