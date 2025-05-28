import { ImagePreviewProps } from "../store/types";

export default function ImagePreview({ image }: ImagePreviewProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={image.previewSrc} alt="upload-preview" />;
}
