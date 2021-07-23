export const days = ["S", "M", "T", "W", "T", "F", "S"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const shortMonth = (i: number) => {
  return months[i].slice(0, 3);
};
export const dmy = (d?: Date | null) => {
  if (!d) return "";
  return `${d.getDate()} ${shortMonth(d.getMonth())}, ${d.getFullYear()}`;
};
export const dm = (d: Date) => {
  return `${d.getDate()} ${shortMonth(d.getMonth())}`;
};
export const twoDateString = (d1: Date, d2: Date) => {
  if (d1.getFullYear() !== d2.getFullYear()) {
    // year different
    // 1 Jan, 2020 - 2 Feb, 2021
    return `${dmy(d1)} - ${dmy(d2)}`;
  } else if (d1.getMonth() !== d2.getMonth()) {
    // year same but month different
    // 22 Jan - 26 Mar, 2020
    return `${dm(d1)} - ${dm(d2)}, ${d1.getFullYear()}`;
  } else if (d1.getDate() !== d2.getDate()) {
    // year and month same
    // 22 - 26 Mar, 2020
    return `${d1.getDate()} - ${d2.getDate()} ${shortMonth(
      d1.getMonth()
    )}, ${d1.getFullYear()}`;
  } else {
    // 26 Mar, 2020
    return dmy(d1);
  }
};
