export function getChristmasDate(): Date {
  const date = new Date();
  date.setMonth(11);
  date.setDate(24);
  date.setHours(12, 0, 0);
  return date;
}

export function getTimeDiff(startDate: Date, endDate: Date) {
  return (endDate.getTime() - startDate.getTime()) / 1000;
}
