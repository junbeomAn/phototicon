"use client";

import { useImageStore } from "@/src/entities/image/model/store";
import S from "./editorPanel.module.scss";
import ImagePreview from "@/src/entities/image/ui/ImagePreview";

export default function EditorPanel() {
  const images = useImageStore((store) => store.images);

  return (
    <div>
      {images.map((image) => (
        <ImagePreview key={image.previewSrc} image={image} />
      ))}
    </div>
  );
}
