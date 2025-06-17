import React from "react";
import { HiPhoto } from "react-icons/hi2";
import { RxText } from "react-icons/rx";

import { MdOutlinePreview } from "react-icons/md";
import S from "./tabBar.module.scss";

export type Tab = "" | "subtitle" | "sticker" | "preview";

interface Props {
  onTabChange: (tab: Tab) => void;
}

export default function TabBar({ onTabChange }: Props) {
  return (
    <div className={S.container}>
      <button className={`${S.tab}`} onClick={() => onTabChange("subtitle")}>
        <RxText size={24} />
        <span>텍스트</span>
      </button>
      <button className={`${S.tab}`} onClick={() => onTabChange("sticker")}>
        <HiPhoto size={24} />
        <span>스티커</span>
      </button>
      <button className={`${S.tab}`} onClick={() => onTabChange("preview")}>
        <MdOutlinePreview size={24} />
        <span>미리보기</span>
      </button>
    </div>
  );
}
