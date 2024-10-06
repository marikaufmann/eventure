import { RefObject, useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  action: () => void
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const element = ref.current;
      if (!element || element.contains(e.target as Node) || null) {
        return;
      } else {
        action();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, action]);
};
