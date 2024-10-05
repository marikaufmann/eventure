import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as apiClient from "@/api-client";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { FetchedEventType } from "../../../backend/src/shared/types";
import { useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BreadcrumbType = {
  label: string;
  href: string;
  isCurrent: boolean;
};

export const generateBreadcrumbs = (path: string): BreadcrumbType[] => {
  const pathArray = path.split("/").filter((segment) => segment);
  let currentPath = "";

  return pathArray.map((segment, index) => {
    currentPath += `/${segment}`;
    return {
      label: handleCapitalize(segment),
      href: currentPath,
      isCurrent: index === pathArray.length - 1,
    };
  });
};

export const handleCapitalize = (input: string) => {
  const replacedInput = input.replace(/\+/g, "%20");
  const decodedString = decodeURIComponent(replacedInput);

  const words = decodedString.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const catName = capitalizedWords.join(" ");
  return input === "r&b" ? "R&B" : catName;
};

export const handleLinkFormat = (category: string) => {
  const formatCategory = (array: string[], separator: string) => {
    return array.map((item) => item.toLowerCase()).join(separator);
  };

  if (category.includes(" / ")) {
    const slashArray = category.split(" / ");
    return formatCategory(slashArray, "+%2F+");
  }
  if (category.includes(" & ")) {
    const ampersandArray = category.split(" & ");
    return formatCategory(ampersandArray, "+%26+");
  }
  if (category.includes(" ")) {
    const spaceArray = category.split(" ");
    return formatCategory(spaceArray, "%20");
  }
  return category.toLowerCase();
};

export const getCloudImageLink = (category: string) => {
  const formatLink = (array: string[], separator: string) => {
    return array.join(separator);
  };
  if (category.includes(" / ")) {
    return formatLink(category.split(" / "), "_");
  }
  if (category.includes(" & ")) {
    return formatLink(category.split(" & "), "_");
  }
  if (category.includes("&")) {
    return formatLink(category.split("&"), "_");
  }
  if (category.includes(" ")) {
    return formatLink(category.split(" "), "%20");
  }
  if (category.includes("+%2F+")) {
    return formatLink(category.split("+%2F+"), "_");
  }
  if (category.includes("+%26+")) {
    return formatLink(category.split("+%26+"), "_");
  }
  return category;
};

export const containsOnlyLetters = (str: string) => /^[A-Za-z\s]+$/.test(str);

export const useFetchCategories = ({
  location,
  categories,
  date,
  hasTrendingEvents,
  setHasTrendingEvents,
}: {
  location: string;
  categories: string[];
  date?: Date;
  hasTrendingEvents?: boolean;
  setHasTrendingEvents?: React.Dispatch<React.SetStateAction<boolean>>;
}): { results: UseQueryResult<FetchedEventType[]>[]; allFetched: boolean } => {
  const results = useQueries({
    queries: categories.map((category) => {
      return {
        queryKey: ["trendingEvents", location, category, date],
        queryFn: () =>
          apiClient.fetchEvents({
            location,
            isTopEvents: true,
            category,
            date,
          }),
        enabled: !!location && hasTrendingEvents,
      };
    }),
  });

  const allFetched = results.every(
    (result) => result.isSuccess || result.isError
  );

  useEffect(() => {
    if (allFetched) {
      setHasTrendingEvents && setHasTrendingEvents(false);
    }
  }, [allFetched, setHasTrendingEvents]);
  return { results, allFetched };
};

export const formatDate = (date: Date | undefined | string) => {
  if (!date) {
    return "Date TBA";
  }
  const validDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(validDate.getTime())) {
    return "Invalid Date";
  }

  return validDate.toDateString();
};

export const addOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};
