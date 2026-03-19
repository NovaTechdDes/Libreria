import express from "express";
import cors from "cors";
import { productosRoutes, usuariosRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Conexion Existosa API Libreria",
  });
});

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);

export default app;
