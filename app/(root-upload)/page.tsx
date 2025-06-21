"use client";

import { useImages } from "@/store/store";
import S from "./root.module.scss";
import UploadPanel from "./(components)/UploadPanel";
import Header from "@/ui/Header";

export default function Upload() {
  const images = useImages();

  return (
    <main className={S.conatiner}>
      <Header next={"/edit/resize"} isNextDisabled={images.length === 0} />
      <UploadPanel />
    </main>
  );
}
