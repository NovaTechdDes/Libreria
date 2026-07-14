import express from "express"
import cors from "cors";
import { banner, colores, configuracion, productos, rubrosRoutes, subrubrosRoutes, varianteProducto } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({ message: "Conexión exitosa a la API" });
});

app.use("/api/banners", banner);
app.use("/api/colores", colores);
app.use("/api/configuracion", configuracion);
app.use("/api/rubros", rubrosRoutes);
app.use("/api/productos", productos);
app.use("/api/subrubros", subrubrosRoutes);
app.use("/api/varianteProducto", varianteProducto);

export default app;