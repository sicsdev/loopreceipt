export const checkLeapYear = (year: number) => {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }
  return false;
};
export const getNumDaysMonthWise = (year: number) => {
  return [
    31,
    checkLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
};
export const compareOnlyDate = (start: Date, end: Date) => {
  return (
    start.getFullYear() - end.getFullYear() ||
    start.getMonth() - end.getMonth() ||
    start.getDate() - end.getDate()
  );
};
