import express from "express";
import cors from "cors";
import { productosRoutes, usuariosRoutes, ventasRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/test", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Conexion Existosa API Libreria",
  });
});

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/ventas", ventasRoutes);

export default app;
