"use client";

import React, { useState } from "react";
import useSelectImage from "../resize/(hooks)/useSelectImage";
import Canvas from "./(components)/Canvas";
import ImageSelect from "../(components)/ImageSelect";
import TabBar, { Tab } from "./(components)/TabBar";
import Subtitle from "./(components)/Subtitle";
import S from "./decorate.module.scss";
import Header from "@/ui/Header";

export default function Decorate() {
  const { selectedIdx, handleSelect, selectedImage } = useSelectImage();
  const [activeTab, setActiveTab] = useState<Tab>("");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header prev="/edit/resize" next="/result" isNextDisabled={true} />
      <section className={S.container}>
        <Canvas image={selectedImage} />
        <ImageSelect selectedIdx={selectedIdx} handleSelect={handleSelect} />
        <TabBar onTabChange={handleTabChange} />
        {activeTab === "subtitle" && (
          <Subtitle
            onClose={() => setActiveTab("")}
            selectedIdx={selectedIdx}
          />
        )}
      </section>
    </>
  );
}
