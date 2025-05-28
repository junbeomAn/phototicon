"use client";
import { useRef } from "react";
import useUpload from "../../../lib/hooks/useUpload";

import S from "./uploadForm.module.scss";

export default function UploadForm() {
  const { handleFiles } = useUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={S.container}>
      <section className={S.upload_form} onClick={handleUploadClick}>
        +
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          ref={inputRef}
        />
      </section>
    </div>
  );
}
