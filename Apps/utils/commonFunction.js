import dayjs from "dayjs";

export function convertNumber(value) {
  return parseInt(value, 10);
}

export function truncateString(text, maxLength = 50) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function calculateDaysAgo(createdAt) {
  // Parse the createdAt date using Day.js
  const createdDate = dayjs(createdAt);

  // Get the current date using Day.js
  const currentDate = dayjs();

  // Calculate the difference in days between the current date and the created date
  const differenceInDays = currentDate.diff(createdDate, "day");

  return differenceInDays;
}

export const formatDateandTime = (date) => {
  return !!date ? dayjs(date).format("DD MMM, YYYY hh:mm A") : "";
};
