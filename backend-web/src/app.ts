import express from "express"
import cors from "cors";
import { colores, productos, rubrosRoutes, subrubrosRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({ message: "Conexión exitosa a la API" });
});

app.use("/api/colores", colores);
app.use("/api/rubros", rubrosRoutes);
app.use("/api/productos", productos);
app.use("/api/subrubros", subrubrosRoutes);

export default app;