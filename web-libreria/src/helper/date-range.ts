export type DateRange = "today" | "week" | "30days" | "month" | "year" | "custom";

export function getDateRange(range: DateRange) {
  const now = new Date();

  let from = new Date();
  const to = new Date();

  switch (range) {
    case "today":
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
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
    }
}