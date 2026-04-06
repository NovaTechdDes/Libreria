import { describe, it, expect, vi } from "vitest";
import * as service from "../../services/usuarios.service";
import * as repo from "../../repositories/usuarios.repositores";

// Simulamos el módulo del repositorio para evitar conexiones reales a la BD
vi.mock("../../repositories/usuarios.repositores");

describe("Usuarios Service", () => {
  it("debería obtener un usuario correctamente por su clave", async () => {
    // Datos de prueba
    const mockUsuario = {
      id_usuario: 1,
      denominacion: "Admin Test",
      administrador: 1,
    };

    // Configuramos el mock para devolver los datos de prueba

    vi.mocked(repo.getUsuario).mockResolvedValue(mockUsuario);

    // Ejecutamos la función a probar
    const resultado = await service.obtenerUsuario("clave123");

    // Verificaciones
    expect(resultado).toEqual(mockUsuario);
    expect(repo.getUsuario).toHaveBeenCalledWith("clave123");
    expect(repo.getUsuario).toHaveBeenCalledTimes(1);
  });

  it("debería devolver undefined si el usuario no existe", async () => {
    vi.mocked(repo.getUsuario).mockResolvedValue(undefined);

    const resultado = await service.obtenerUsuario("clave_inexistente");

    expect(resultado).toBeUndefined();
    expect(repo.getUsuario).toHaveBeenCalledWith("clave_inexistente");
  });
});
