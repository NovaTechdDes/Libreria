import { Router } from "express";
import { deleteVarianteProducto, postVarianteProducto } from "../controllers/varianteProductos.controller";


const router = Router();


router.post("/", postVarianteProducto);
router.post("/:id", deleteVarianteProducto);


export default router;