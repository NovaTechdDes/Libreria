import { LazyStore } from "@tauri-apps/plugin-store";

// Store persistente en el disco del usuario (se guarda en AppData/Local a través de Tauri)
export const appStore = new LazyStore("settings.json");

// Variable en memoria para sincronización síncrona en las peticiones Axios
let cachedServerUrl = "";

// Función para inicializar y cargar la URL guardada (Tauri Store con fallback a localStorage)
export const initAppStore = async (): Promise<string | null> => {
  try {
    // 1. Intentar cargar desde el store persistente de Tauri
    await appStore.init();
    const saved = await appStore.get<any>("server_url");
    if (saved !== undefined && saved !== null) {
      const url = typeof saved === "string" ? saved : saved.value;
      if (url && typeof url === "string" && url.trim() !== "") {
        cachedServerUrl = url.trim();
        try {
          localStorage.setItem("server_url", cachedServerUrl);
        } catch (_) {}
        return cachedServerUrl;
      }
    }
  } catch (error) {
    console.error("Error cargando store persistente de Tauri:", error);
  }

  // 2. Respaldo inmediato con localStorage si Tauri store aún no cargó o no existe
  try {
    const local = localStorage.getItem("server_url");
    if (local && local.trim() !== "") {
      cachedServerUrl = local.trim();
      // Sincronizar en segundo plano al store de Tauri
      try {
        await appStore.set("server_url", { value: cachedServerUrl });
        await appStore.save();
      } catch (_) {}
      return cachedServerUrl;
    }
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
  }

  return null;
};

// Getter síncrono para Axios
export const getServerUrl = () => cachedServerUrl;

// Setter asíncrono para guardar físicamente en ambos almacenamientos
export const setServerUrl = async (url: string) => {
  const cleanUrl = url.trim();
  cachedServerUrl = cleanUrl;

  // 1. Guardar en localStorage de inmediato
  try {
    localStorage.setItem("server_url", cleanUrl);
  } catch (err) {
    console.error("Error guardando en localStorage:", err);
  }

  // 2. Guardar en el store persistente de Tauri
  try {
    await appStore.init();
    await appStore.set("server_url", { value: cleanUrl });
    await appStore.save();
  } catch (err) {
    console.error("Error guardando en appStore de Tauri:", err);
  }
};
