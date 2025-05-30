"use client";

import S from "./uploadPanel.module.scss";

import ImagePreview from "@/ui/ImagePreview";
import UploadForm from "./UploadForm";
import { useImageStore } from "@/store/store";

export default function UploadPanel() {
  const images = useImageStore((store) => store.images);

  return (
    <section className={S.container}>
      <div className={S.image_previewer}>
        <ul className={S.image_list}>
          {images.map((image) => (
            <li key={image.previewSrc}>
              <ImagePreview image={image} />
            </li>
          ))}
        </ul>
        {images.length === 0 && <h3>이미지를 추가하세요!</h3>}
      </div>
      <UploadForm />
    </section>
  );
}
