"use client";

import React from "react";

import S from "./subtitle.module.scss";
import { useImageStore } from "@/store/store";

type Props = {
  onClose: () => void;
  selectedIdx: number;
};

export default function Subtitle({ onClose, selectedIdx }: Props) {
  const { images, setSubtitle } = useImageStore();

  return (
    <div className={S.overlay} onClick={onClose}>
      <div className={S.container} onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          type="text"
          name="subtitle"
          value={images[selectedIdx].subtitle}
          onChange={(e) => setSubtitle(selectedIdx, e.target.value)}
          placeholder=""
          className={S.input}
        />
      </div>
    </div>
  );
}
