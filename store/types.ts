// TODO: 이미지 편집 관련 타입 추가

export type ImageItem = {
  file: File;
  previewSrc: string;
  originX: number;
  originY: number;
};

export type ImagePreviewProps = {
  image: Omit<ImageItem, "file">;
};

export type ImageStore = {
  images: ImageItem[];
  addImages: (image: ImageItem[]) => void;
};
