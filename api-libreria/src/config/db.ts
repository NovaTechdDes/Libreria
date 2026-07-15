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
}

export const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect();

export const poolAzure = new sql.ConnectionPool(configAzure);
export const poolConnectAzure = poolAzure.connect();


