import express from "express"
import cors from "cors";
import { productos, rubrosRoutes, subrubrosRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({ message: "Conexión exitosa a la API" });
});

app.use("/api/rubros", rubrosRoutes);
app.use("/api/subrubros", subrubrosRoutes);
app.use("/api/productos", productos);

export default app;