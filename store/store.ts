import { create } from "zustand";
import { ImageItem, ImageResizeInfo, NewImageItem } from "./types";

type ImageStore = {
  images: ImageItem[];
  addImages: (image: NewImageItem[]) => void;
  setResizeInfo: (index: number, info: ImageResizeInfo) => void;
  setSubtitle: (index: number, info: string) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImages: (newImages) => {
    const defaultValues = {
      offset: {
        x: 0,
        y: 0,
      },
      zoomFactor: 1,
      subtitle: "",
    };
    const imagesWithDefault: ImageItem[] = newImages.map((props) => ({
      ...props,
      ...defaultValues,
    }));
    set((prev) => ({ images: [...prev.images, ...imagesWithDefault] }));
  },
  setResizeInfo: (index, info) => {
    set((prev) => {
      const image = prev.images[index];
      const imageWitNewZoom: ImageItem = {
        ...image,
        ...info,
      };
      const newImages = [...prev.images];
      newImages[index] = imageWitNewZoom;

      return {
        images: newImages,
      };
    });
  },
  setSubtitle: (index, text) => {
    set((prev) => {
      const image = prev.images[index];
      const imageWithNewSubtitle: ImageItem = {
        ...image,
        subtitle: text,
      };
      const newImages = [...prev.images];
      newImages[index] = imageWithNewSubtitle;

      return {
        images: newImages,
      };
    });
  },
}));
