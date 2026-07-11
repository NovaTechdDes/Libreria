import { Router } from "express";

import { getColores, postColor, putColor } from "../controllers/colores.controller";


const router = Router();


router.get("/", getColores);
router.post("/", postColor);

router.put("/:id", putColor);



export default router;