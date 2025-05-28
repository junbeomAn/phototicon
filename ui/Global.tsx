"use client";

import { setScreenSize } from "@/lib/hooks/utils";
import { PropsWithChildren, useLayoutEffect } from "react";

export default function Global({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    if (window !== undefined) {
      setScreenSize();
      window.addEventListener("resize", setScreenSize);
    }

    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);
  return <>{children}</>;
}
