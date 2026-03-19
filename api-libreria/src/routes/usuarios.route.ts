import { Router } from "express";
import { getUsuarioByClave } from "../controllers/usuarios.controller";

const router = Router();

router.get("/:clave", getUsuarioByClave);

export default router;
