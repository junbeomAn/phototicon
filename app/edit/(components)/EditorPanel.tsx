"use client";

import { useImageStore } from "@/store/store";
import S from "./editorPanel.module.scss";
import { useState } from "react";

export default function EditorPanel() {
  const images = useImageStore((store) => store.images);
  const [selected, setSelected] = useState(0);
  const selectedImage = images[selected];

  return (
    <section className={S.container}>
      <div className={S.image_editor}>
        <img src={selectedImage.previewSrc} alt="selected image" />
      </div>
    </section>
  );
}
