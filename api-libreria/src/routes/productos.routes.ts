import { Router } from "express";
import { getProductos, putProducto } from "../controllers/productos.controller";

const router = Router();

router.get("/", getProductos);

router.put("/:id", putProducto);

export default router;
