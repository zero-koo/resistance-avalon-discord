import { useCallback, useState } from "react";

import { useResizeObserver } from "./useResizeObserver";

type DOMRect = Omit<DOMRectReadOnly, "toJSON">;

export const useBoundingClientRect = <T extends HTMLDivElement>(): [
  React.MutableRefObject<T | null>,
  DOMRect | undefined,
] => {
  const [rect, setRect] = useState<DOMRect | undefined>(undefined);

  // Callback function to update boundingClientRect whenever size changes
  const handleResize = useCallback((entry: ResizeObserverEntry) => {
    if (entry?.target instanceof HTMLDivElement) {
      setRect(entry.target.getBoundingClientRect());
    }
  }, []);

  // Use the useResizeObserver hook to listen to size changes
  const ref = useResizeObserver<T>(handleResize);

  return [ref, rect];
};
