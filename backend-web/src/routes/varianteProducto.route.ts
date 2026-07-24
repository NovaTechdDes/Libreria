import { Router } from "express";
import { deleteVarianteProducto, postVarianteProducto } from "../controllers/varianteProductos.controller";


const router = Router();


router.post("/", postVarianteProducto);
router.delete("/:id_variante", deleteVarianteProducto);


export default router;