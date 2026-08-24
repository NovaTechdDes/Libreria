import { Router } from "express";
import { getRubros, putDescuentoRubro } from "../controllers/rubros.controller";


const router = Router();


router.get("/", getRubros);
router.put("/descuento/:id", putDescuentoRubro)


export default router;