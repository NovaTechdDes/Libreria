import { Router } from "express";
import {
  getProductos,
  putProducto,
  searchProductos,
} from "../controllers/productos.controller";

const router = Router();

router.get("/", getProductos);

router.get("/search/:texto", searchProductos);

router.put("/:id", putProducto);

export default router;
