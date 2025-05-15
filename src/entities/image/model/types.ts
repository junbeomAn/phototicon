export type ImageItem = {
  file: File;
  previewSrc: string;
};

export type ImagePreviewProps = {
  image: Omit<ImageItem, "file">;
};

export type ImageStore = {
  images: ImageItem[];
  addImages: (image: ImageItem[]) => void;
};
