import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.routes";

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

export default app;
