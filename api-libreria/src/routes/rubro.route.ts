import { Router } from "express";
import { getRubros } from "../controllers/rubro.controller";

const router = Router();

router.get("/", getRubros);

export default router;
