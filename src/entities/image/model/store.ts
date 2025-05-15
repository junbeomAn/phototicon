import { create } from "zustand";
import { ImageStore } from "./types";

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImages: (images) => {
    set((prev) => ({ images: [...prev.images, ...images] }));
  },
}));
