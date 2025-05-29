"use client";

import { useImageStore } from "@/store/store";
import S from "./editorPanel.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Resizer from "./Resizer";
import { useRouter } from "next/navigation";
import ImageSelect from "./ImageSelect";

export default function EditorPanel() {
  const images = useImageStore((store) => store.images);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const router = useRouter();
  const selectedImage = images[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

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

  useLayoutEffect(() => {
    if (images.length === 0) {
      router.push("/");
    }
  }, [images.length, router]);

  return (
    <section className={S.container}>
      <Resizer src={selectedImage?.previewSrc} selectedIdx={selectedIdx} />
      <ImageSelect handleSelect={handleSelect} selectedIdx={selectedIdx} />
    </section>
  );
}
