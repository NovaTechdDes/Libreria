import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  }
};

const configAzure = {
  user: process.env.DB_USER_AZURE,
  password: process.env.DB_PASSWORD_AZURE,
  server: process.env.DB_HOST_AZURE as string,
  database: process.env.DB_NAME_AZURE as string,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  }
}

export const pool = new sql.ConnectionPool(config);
export const poolAzure = new sql.ConnectionPool(configAzure);

// Listeners para loguear errores del pool sin tirar el servidor
pool.on("error", (err) => {
  console.error("Error en el pool de SQL Server Local:", err);
});
poolAzure.on("error", (err) => {
  console.error("Error en el pool de Azure SQL:", err);
});

// Iniciar conexiones en segundo plano al arrancar la app
pool.connect().then(() => console.log("Conectado a SQL Server Local")).catch((err) => {
  console.error("Error al conectar con SQL Server Local al iniciar:", err);
});
poolAzure.connect().then(() => console.log("Conectado a Azure SQL")).catch((err) => {
  console.error("Error al conectar con Azure SQL al iniciar:", err);
});

async function getConnectedPool(targetPool: sql.ConnectionPool): Promise<sql.ConnectionPool> {
  if (targetPool.connected) {
    return targetPool;
  }
  if (targetPool.connecting) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getConnectedPool(targetPool);
  }
  try {
    return await targetPool.connect();
  } catch (error) {
    console.error("Fallo al conectar con la base de datos:", error);
    throw error;
  }
}
// Objeto "thenable" compatible 100% con tu sintaxis actual `await poolConnect;`
export const poolConnect: PromiseLike<sql.ConnectionPool> = {
  then: (resolve: any, reject: any) => getConnectedPool(pool).then(resolve, reject),
};
export const poolConnectAzure: PromiseLike<sql.ConnectionPool> = {
  then: (resolve: any, reject: any) => getConnectedPool(poolAzure).then(resolve, reject),
};


