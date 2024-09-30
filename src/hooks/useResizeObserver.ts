import { useEffect, useRef } from "react";

type ResizeObserverCallback = (entries: ResizeObserverEntry) => void;

export const useResizeObserver = <T extends HTMLElement>(
  callback: ResizeObserverCallback
): React.MutableRefObject<T | null> => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(callback);
    });

    const element = elementRef.current;

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
      resizeObserver.disconnect();
    };
  }, [callback]);

  return elementRef;
};
