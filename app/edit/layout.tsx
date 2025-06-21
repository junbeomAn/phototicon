"use client";

import { useImages } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const images = useImages();

  useEffect(() => {
    if (images.length === 0) {
      router.push("/");
    }
  }, [images.length, router]);

  return <>{children}</>;
}
