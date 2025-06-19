"use client";

import { useImageStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const images = useImageStore((store) => store.images);

  useEffect(() => {
    if (images.length === 0) {
      router.push("/");
    }
  }, [images.length, router]);

  return <>{children}</>;
}
