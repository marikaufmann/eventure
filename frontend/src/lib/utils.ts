import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  return catName;
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


