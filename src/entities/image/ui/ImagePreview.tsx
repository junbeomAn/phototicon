import Image from "next/image";
import { ImagePreviewProps } from "../model/types";

export default function ImagePreview({ image }: ImagePreviewProps) {
  return (
    <Image
      src={image.previewSrc}
      width={200}
      height={100}
      alt="upload-preview"
    />
  );
}
