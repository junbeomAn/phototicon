import { useImages } from "@/store/store";
import { useState } from "react";

export default function useSelectImage() {
  const images = useImages()
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  return {
    handleSelect,
    selectedIdx,
    selectedImage: images[selectedIdx],
  };
}
