import { Router } from "express";
import { login } from "../controllers";
import { validarJWT } from "../middleware/auth.middleware";


const router = Router();

router.post('/login', login)

router.get(
    "/me",
    validarJWT,
    (req, res) => {

        res.json({
            ok: true,
            mensaje: "Token válido"
        });

    }
);


export default router;