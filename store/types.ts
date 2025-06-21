// TODO: 이미지 편집 관련 타입 추가

export type ImageItem = {
  file: File;
  previewSrc: string;
  offset: {
    x: number;
    y: number;
  };
  zoomFactor: number;
  subtitle: string;
};

type Subtitle = {
  x: number;
  y: number;
  content: string;
  fontIndex: number;
}

export type NewImageItem = Pick<ImageItem, "file" | "previewSrc">;

export type ImagePreviewProps = {
  image: Omit<ImageItem, "file">;
};

export type ImageResizeInfo = Pick<ImageItem, "offset" | "zoomFactor">;
