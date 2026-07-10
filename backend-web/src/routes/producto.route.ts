import { Router } from "express";

import { getProductos } from "../controllers";


const router = Router();


router.get("/", getProductos);


export default router;