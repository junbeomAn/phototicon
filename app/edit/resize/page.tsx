"use client";

import S from "./resize.module.scss";

import Resizer from "./(components)/Resizer";
import ImageSelect from "../(components)/ImageSelect";
import usePreventZoom from "@/lib/hooks/usePreventZoom";
import useSelectImage from "./(hooks)/useSelectImage";
import PreventOverscroll from "@/ui/PreventOverscroll";
import Header from "@/ui/Header";

export default function Resize() {
  const { handleSelect, selectedIdx, selectedImage } = useSelectImage();

  usePreventZoom();

  return (
    <PreventOverscroll>
      <Header next={"/edit/subtitle"} isNextDisabled={false} />
      <section className={S.container}>
        <Resizer src={selectedImage?.previewSrc} selectedIdx={selectedIdx} />
        <ImageSelect handleSelect={handleSelect} selectedIdx={selectedIdx} />
      </section>
    </PreventOverscroll>
  );
}
