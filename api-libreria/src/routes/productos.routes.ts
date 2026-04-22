import { Router } from "express";
import { getProductos, putProducto } from "../controllers/productos.controller";
import { verificarUsuario } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getProductos);

router.put("/:id", verificarUsuario, putProducto);

export default router;
