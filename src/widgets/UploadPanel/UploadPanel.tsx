"use client";

import UploadForm from "@/src/features/upload/ui/UploadForm";
import S from "./uploadPanel.module.scss";

export default function UploadPanel() {
  return (
    <section className={S.container}>
      <h3>
        포토티콘으로 만들 <br />
        이미지를 <br />
        선택해주세요
      </h3>
      <UploadForm />
    </section>
  );
}
