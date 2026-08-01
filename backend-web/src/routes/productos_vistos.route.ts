import { Router } from "express";
import { getProductosVistos, postProductosVistos } from "../controllers";



const router = Router();


router.get("/", getProductosVistos);

router.post("/", postProductosVistos);


export default router;