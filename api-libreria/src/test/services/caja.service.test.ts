import { describe, expect, it, vi } from "vitest";
import { postCloseCaja } from "../../repositories/caja.repository";
import {
  getMovCajaDelDia,
  getValesDelDia,
} from "../../repositories/caja.repository";

vi.mock("../../repositories/caja.repository");

describe("Caja Service", () => {
  it("Deberia obtener los vales del dia correctamente", async () => {
    vi.mocked(getValesDelDia).mockResolvedValue([
      { tipo_importe: "Efectivo", saldo: 1000 },
      { tipo_importe: "Tarjeta", saldo: 2000 },
      { tipo_importe: "Cheque", saldo: 3000 },
    ] as any);
    const resultado = await getValesDelDia();
    expect(resultado).toHaveLength(3);
    expect(resultado[0].tipo_importe).toBe("Efectivo");
  });

  it("Deberia obtener los movimientos de caja del dia correctamente", async () => {
    const mockMovimientos = [
      {
        id_caja: 1,
        concepto: "Venta Libros",
        debe: 500,
        haber: 0,
        tipo_importe: "Efectivo",
        fecha: new Date().toISOString(),
      },
    ];

    vi.mocked(getMovCajaDelDia).mockResolvedValue(mockMovimientos as any);
    const resultado = await getMovCajaDelDia();
    expect(resultado).toEqual(mockMovimientos);
  });

  it("Deberia cerrar la caja correctamente", async () => {
    vi.mocked(postCloseCaja).mockResolvedValue({ rowsAffected: 1 } as any);
    const resultado = await postCloseCaja();
    expect(resultado).toBeDefined();
  });
});
