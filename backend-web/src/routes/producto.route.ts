import { Router } from "express";

import { getProductoById, getProductos, putActivoProducto, putIsStock, putProductoById, putVisiblePrecio } from "../controllers";


const router = Router();


router.get("/", getProductos);
router.get('/:id_producto', getProductoById)

router.put('/activo', putActivoProducto)
router.put('/visible-precio', putVisiblePrecio)
router.put('/stock', putIsStock)
router.put('/:id_producto', putProductoById)


export default router;