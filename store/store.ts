import { create } from "zustand";
import { ImageItem, ImageResizeInfo } from "./types";

type ImageStore = {
  images: ImageItem[];
  addImages: (image: ImageItem[]) => void;
  setResizeInfo: (index: number, info: ImageResizeInfo) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImages: (images) => {
    set((prev) => ({ images: [...prev.images, ...images] }));
  },
  setResizeInfo: (index, info) => {
    set((prev) => {
      const newImage = prev.images[index];
      const imageWithZoom: ImageItem = {
        ...newImage,
        ...info,
      };
      const newImages = [...prev.images];
      newImages[index] = imageWithZoom;

      return {
        images: newImages,
      };
    });
  },
}));
