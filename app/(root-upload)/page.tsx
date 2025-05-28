"use client";

import { useImageStore } from "@/store/store";
import S from "./page.module.scss";
import UploadPanel from "./(components)/UploadPanel";
import Header from "@/ui/Header";

export default function Upload() {
  const next = "/edit";
  const images = useImageStore((store) => store.images);

  return (
    <main className={S.conatiner}>
      <Header next={next} isNextDisabled={images.length === 0} />
      <UploadPanel />
    </main>
  );
}
