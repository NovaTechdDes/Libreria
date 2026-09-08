import { Router } from "express";
import { getUsuarioByClave, login } from "../controllers/usuarios.controller";

const router = Router();

router.post("/login", login);
router.get("/:clave", getUsuarioByClave);

export default router;
