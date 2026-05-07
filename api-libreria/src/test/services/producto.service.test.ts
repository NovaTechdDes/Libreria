import { describe, it, expect, vi } from "vitest";
import * as service from "../../services/productos.service";
import * as repo from "../../repositories/productos.repository";

// Simulamos el módulo del repositorio para evitar conexiones reales a la BD
vi.mock("../../repositories/productos.repository");

describe("Producto Service", () => {
  it("debería obtener los productos correctamente", async () => {
    // Datos de prueba
    const mockProducto = {
      id_producto: 1,
      denominacion: "Producto Test",
      precio: 100,
      stock: 10,
      codigo: "123",
      descripcion: "Descripcion Test",
      cantidad: 10,
      id_rubro: 1,
      id_proveedor: 1,
      stock_minimo: 1,
      eliminado: false,
      id_articulo: 1,
      activo: true,
    };

    // Configuramos el mock para devolver los datos de prueba
    vi.mocked(repo.getProductos).mockResolvedValue([mockProducto]);

    // Ejecutamos la función a probar
    const resultado = await service.obtenerProductos();

    // Verificaciones
    expect(resultado).toEqual([mockProducto]);
    expect(repo.getProductos).toHaveBeenCalledTimes(1);
  });

  it("Deberia actualizar el producto Correctamente si vienen los dos datos", async () => {
    const mockProducto = {
      id_producto: 1,
      precio: 2000,
      stock: 20,
    };

    vi.mocked(repo.putProducto).mockResolvedValue(true);

    const resultado = await service.putProducto(mockProducto);

    expect(resultado).toEqual(true);
    expect(repo.putProducto).toHaveBeenCalledTimes(1);
  });
});
