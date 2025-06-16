import { useEffect } from "react";

export default function usePreventZoom() {
  useEffect(() => {
    function preventZoom(e: TouchEvent) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }
    document.documentElement.addEventListener("touchmove", preventZoom, {
      passive: false,
    });
    document.addEventListener("touchmove", preventZoom, { passive: false });
    return () => {
      document.removeEventListener("touchmove", preventZoom);
      document.documentElement.removeEventListener("touchmove", preventZoom);
    };
  }, []);
}
