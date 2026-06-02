import app from "./app";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const PORTLOCAL = process.env.DB_PORT || 3000;


app.listen(PORTLOCAL, () => {
  console.log(`Servidor corriendo en puerto ${PORTLOCAL} como puerto local`);
});
