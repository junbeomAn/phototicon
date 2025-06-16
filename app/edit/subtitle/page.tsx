"use client";

import React from "react";
import useSelectImage from "../resize/(hooks)/useSelectImage";
import SubtitleCanvas from "./(components)/SubtitleCanvas";
import ImageSelect from "../(components)/ImageSelect";

export default function Subtitle() {
  const { selectedIdx, handleSelect, selectedImage } = useSelectImage();

  return (
    <>
      <SubtitleCanvas image={selectedImage} />
      <ImageSelect selectedIdx={selectedIdx} handleSelect={handleSelect} />
    </>
  );
}
