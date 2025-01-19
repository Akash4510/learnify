import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "INR") {
  const formattedString = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(price);

  return formattedString[0] + " " + formattedString.slice(1);
}

export function formatDateWithMonthName(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${getMonthName(date)} ${year}`;
}

export function formatDateTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${formatDateWithMonthName(date)} ${hours}:${minutes}`;
}

export function getTimestamp(date: Date) {
  return date.getTime();
}

export function formatDateWithAMPM(date: Date) {
  return `${formatDate(date)} ${formatTimeWithAMPM(date)}`;
}

export function formatDateRelativeToNow(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  if (weeks < 4) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function getRelativeDateFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(date, today)) {
    return formatTimeWithAMPM(date);
  } else if (isSameDate(date, yesterday)) {
    return "Yesterday";
  } else {
    return formatDate(date);
  }
}

export function getTimeFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return formatTimeWithAMPM(date);
}

// Helper function to check if two dates have the same day, month, and year
function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

// Helper function to format time in 'hh:mm A' format
function formatTimeWithAMPM(date: Date) {
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${ampm}`;
}

// Helper function to format date in 'dd/mm/yy' format
function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

// Helper function to get the month name from the date
function getMonthName(date: Date) {
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

  return months[date.getMonth()];
}
