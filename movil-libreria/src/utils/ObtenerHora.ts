/**
 * Obtiene la hora formateada (HH:MM) de un objeto Date.
 * @param fecha Objeto Date
 * @returns String formateado "HH:MM"
 */
export const obtenerHora = (fecha: Date): string => {
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  return `${horas}:${minutos}`;
};
