import { Router } from "express";
import { getSubrubros } from "../controllers";



const router = Router();


router.get("/", getSubrubros);


export default router;