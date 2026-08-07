export type DateRange = "today" | "week" | "30days" | "month" | "year" | "custom";

export function getDateRange(range: DateRange) {
  const now = new Date();

  let currentFrom = new Date();
  const currentTo = new Date(now);

  currentTo.setDate(currentTo.getDate() + 1);
  currentTo.setHours(0, 0, 0, 0);

  let previousFrom = new Date();
  let previousTo = new Date();


  switch (range) {
    case "today":
      currentFrom.setHours(0, 0, 0, 0);
      
      previousFrom = new Date(currentFrom);
      previousFrom.setDate(previousFrom.getDate() - 1);

      previousTo = new Date(currentFrom);
      break;

    case "week":
      currentFrom.setDate(now.getDate() - 6);
      currentFrom.setHours(0, 0, 0, 0);

      previousFrom = new Date(currentFrom);
      previousFrom.setDate(previousFrom.getDate() - 7);

      previousTo = new Date(currentFrom);
      break;

    case "30days":
      currentFrom.setDate(now.getDate() - 29);
      currentFrom.setHours(0, 0, 0, 0);

       previousFrom = new Date(currentFrom);
      previousFrom.setDate(previousFrom.getDate() - 30);

      previousTo = new Date(currentFrom);
      break;

    case "month":
      currentFrom = new Date(now.getFullYear(), now.getMonth(), 1);

      previousFrom = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      previousTo = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "year":
      currentFrom = new Date(now.getFullYear(), 0, 1);

      previousFrom = new Date(now.getFullYear() - 1, 0, 1);
      previousTo = new Date(now.getFullYear(), 0, 1);
      break;

    case "custom":
      currentFrom.setDate(now.getDate() - 29);
      currentFrom.setHours(0, 0, 0, 0);

      previousFrom = new Date(currentFrom);
      previousFrom.setDate(previousFrom.getDate() - 30);

      previousTo = new Date(currentFrom);
      break;
  }

  return {
    current: {
      from: currentFrom.toISOString(),
      to: currentTo.toISOString(),
    },
    
    previous: {
      from: previousFrom.toISOString(),
      to: previousTo.toISOString(),
    },
  };
}
