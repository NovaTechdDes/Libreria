/**
 * Obtiene la fecha actual en formato YYYY-MM-DD según la zona horaria de Argentina.
 * Esto evita desfases a partir de las 21:00hs local al comparar con UTC.
 */
export function getLocalDateString(): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}
