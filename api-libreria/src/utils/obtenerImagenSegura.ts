import path from "path";
import fs from "fs/promises";

export const obtenerImagenSegura = async (
  codigo: string,
  servidor?: boolean,
) => {
  const extensiones = ["png", "jpg", "jpeg", "gif", "webp"];

  if (!codigo) return "";

  for (const ext of extensiones) {
    const rutaFisica = path.join(process.cwd(), "uploads", `${codigo}.${ext}`);

    try {
      await fs.access(rutaFisica);

      if (servidor) {
        return `${process.env.BASE_URL}/uploads/${codigo}.${ext}`;
      } else {
        return `http://${process.env.SERVIDOR_HOST}:${process.env.DB_PORT}/uploads/${codigo}.${ext}`;
      }
    } catch (error) {
      continue;
    }
  }

  return "";
};
