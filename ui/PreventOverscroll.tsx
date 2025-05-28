"use client";

import { handleOverscroll } from "@/lib/hooks/utils";
import { PropsWithChildren, useEffect } from "react";

export default function PreventOverscroll({ children }: PropsWithChildren) {
  useEffect(() => {
    handleOverscroll(false);

    return () => {
      handleOverscroll(true);
    };
  }, []);
  return <>{children}</>;
}
