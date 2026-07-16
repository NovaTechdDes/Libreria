import { Router } from "express";
import { getRubros } from "../controllers/rubros.controller";


const router = Router();


router.get("/", getRubros);


export default router;