import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST!,
    database: process.env.DB_NAME,
    
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export const poolPromise = new sql.ConnectionPool(config).connect()
.then(pool => {
     console.log("✅ Conectado a Azure SQL");
        return pool;
})
.catch(err => {
    console.log("❌ No se pudo conectar a la base de datos", err);
    throw new Error("Error de conexión a la base de datos");
})