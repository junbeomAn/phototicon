import { useImageStore } from "@/src/entities/image/model/store";
import { ImageItem } from "@/src/entities/image/model/types";

export default function useUpload() {
  const { images, addImages } = useImageStore();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // TODO: 이미지 개수 제한

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      file,
      previewSrc: URL.createObjectURL(file),
    }));

    addImages(newImages);
  };

  //   const removeFiles = () => {

  //   }

  return {
    handleFiles,
    images,
  };
}
