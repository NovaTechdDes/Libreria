import { Router } from "express";
import { getSubrubroPorRubro, getSubrubros } from "../controllers";



const router = Router();


router.get("/", getSubrubros);
router.get('/rubro/:idRubro', getSubrubroPorRubro)


export default router;