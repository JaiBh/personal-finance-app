import { Category, SortBy, Theme } from "./types";

const months = [
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
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const sortByOptions: { text: string; value: SortBy }[] = [
  { text: "Latest", value: "latest" },
  { text: "Oldest", value: "oldest" },
  { text: "A to Z", value: "a-z" },
  { text: "Z to A", value: "z-a" },
  { text: "Highest", value: "highest" },
  { text: "Lowest", value: "lowest" },
];

export const categoryOptions: Category[] = [
  "bills",
  "dining-out",
  "education",
  "entertainment",
  "general",
  "groceries",
  "lifestyle",
  "personal-care",
  "shopping",
  "transportation",
];

export const themeOptions: Theme[] = [
  "army",
  "blue",
  "brown",
  "cyan",
  "gold",
  "green",
  "grey",
  "magenta",
  "navy",
  "orange",
  "pink",
  "purple",
  "red",
  "turquoise",
  "yellow",
];

export const convertDateToText = (date: Date) => {
  const formattedDate = {
    dayOfWeek: daysOfWeek[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
  return formattedDate;
};

export function formatDayWithOrdinal(day: string) {
  const dayNumber = parseInt(day, 10);

  if (dayNumber < 1 || dayNumber > 31 || isNaN(dayNumber)) {
    throw new Error("Invalid day: Input must be a number between 1 and 31.");
  }

  const suffix =
    dayNumber === 11 || dayNumber === 12 || dayNumber === 13
      ? "th"
      : dayNumber % 10 === 1
        ? "st"
        : dayNumber % 10 === 2
          ? "nd"
          : dayNumber % 10 === 3
            ? "rd"
            : "th";

  return `${dayNumber}${suffix}`;
}
