export const isTodayDate = (date: Date | string) => {
  if (!date) return false;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};
