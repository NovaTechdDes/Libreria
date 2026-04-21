import express from "express";
import cors from "cors";
import {
  cajaRoutes,
  productosRoutes,
  rubroRoutes,
  usuariosRoutes,
  ventasRoutes,
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/test", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Conexion Existosa API Libreria",
  });
});

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/caja", cajaRoutes);
app.use("/rubro", rubroRoutes);

export default app;
