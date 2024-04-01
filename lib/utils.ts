import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatPrice = (price: number) => {
  const formattedString = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return formattedString[0] + " " + formattedString.slice(1);
};
