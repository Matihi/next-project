export const dateCount = (count) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const day = new Date(startOfWeek);
  day.setDate(startOfWeek.getDate() + count);
  return day.toISOString();
};
