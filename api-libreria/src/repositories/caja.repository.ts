import { pool } from "../config/db";

export async function getValesDelDia() {
  const fecha = new Date().toISOString().split("T")[0];

  const query = `
    SELECT tipo_importe, SUM(ISNULL(haber, 0)) - SUM(ISNULL(debe, 0)) as saldo
     FROM caja WHERE fecha = '${fecha}'
     GROUP BY tipo_importe`;

  const result = await pool.request().query(query);

  if (result.recordset.length === 0) {
    return [
      {
        tipo_importe: "Efectivo",
        saldo: 0,
      },
      {
        tipo_importe: "Crédito",
        saldo: 0,
      },
      {
        tipo_importe: "Débito",
        saldo: 0,
      },
    ];
  }

  const tieneEfectivo = result.recordset.some(
    (elem) => elem.tipo_importe === "Efectivo",
  );

  const tieneCredito = result.recordset.some(
    (elem) => elem.tipo_importe === "Credito",
  );

  const tieneDebito = result.recordset.some(
    (elem) => elem.tipo_importe === "Debito",
  );

  if (!tieneEfectivo) {
    result.recordset.push({
      tipo_importe: "Efectivo",
      saldo: 0,
    });
  }

  if (!tieneCredito) {
    result.recordset.push({
      tipo_importe: "Crédito",
      saldo: 0,
    });
  }
  if (!tieneDebito) {
    result.recordset.push({
      tipo_importe: "Débito",
      saldo: 0,
    });
  }

  return result.recordset;
}

export async function getMovCajaDelDia() {
  const fecha = new Date().toISOString().split("T")[0];

  const query = `
    SELECT * FROM caja WHERE fecha = '${fecha}'`;

  const result = await pool.request().query(query);
  return result.recordset;
}

export async function postCloseCaja() {
  const fecha = new Date().toISOString().split("T")[0];

  const query = `
  INSERT INTO caja (id_tipo, fecha, hora, concepto, tipo_mov, debe, haber, tipo_importe)
  SELECT 9, @fecha, GETDATE(), 'Cierre caja: ' + tipo_importe, 'Egreso', -1 * saldo, NULL, tipo_importe
  FROM (SELECT tipo_importe, SUM(ISNULL(debe,0)) - SUM(ISNULL(haber,0)) AS saldo
    FROM caja
    WHERE fecha = @fecha GROUP BY tipo_importe) AS subquery
    WHERE ABS(saldo) > 0`;

  const result = await pool.request().input("fecha", fecha).query(query);
  return result.recordset;
}
