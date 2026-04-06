import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sin importarlos en cada archivo
    environment: "node", // Entorno de ejecución para las pruebas (nuestro backend corre en Node)
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"], // Dónde buscar los archivos de prueba
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "dist/"],
    },
  },
});
