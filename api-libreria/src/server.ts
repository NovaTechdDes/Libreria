import app from "./app";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const PORTLOCAL = process.env.DB_PORT || 3000;
const PORT = process.env.PORT || 3001;

// const options = {
//   key: fs.readFileSync("./cert/key.pem"),
//   cert: fs.readFileSync("./cert/cert.pem"),
// };

app.listen(PORTLOCAL, () => {
  console.log(`Servidor corriendo en puerto ${PORTLOCAL} como puerto local`);
});

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Servidor corriendo en puerto ${PORT} como puerto https`);
// });
