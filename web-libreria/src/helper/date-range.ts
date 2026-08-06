export type DateRange = "today" | "week" | "30days" | "month" | "year" | "custom";

export function getDateRange(range: DateRange) {
  const now = new Date();

  let from = new Date();
  // Vercel Web Analytics agrupa por días completos UTC. 
  // Para incluir el día de hoy hasta el final, el 'until' debe ser el comienzo del día de mañana.
  const to = new Date(now);
  to.setDate(to.getDate() + 1);
  to.setHours(0, 0, 0, 0);

  switch (range) {
    case "today":
      from.setHours(0, 0, 0, 0);
      break;

    case "week":
      from.setDate(now.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      break;

    case "30days":
      from.setDate(now.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      break;

    case "month":
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "year":
      from = new Date(now.getFullYear(), 0, 1);
      break;

    case "custom":
      // Por defecto los últimos 30 días si es personalizado
      from.setDate(now.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      break;
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}