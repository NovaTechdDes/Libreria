import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productosRoutes);

export default app;
