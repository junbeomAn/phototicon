import { useImageStore } from "@/store/store";
import { ImageItem } from "@/store/types";

export default function useUpload() {
  const { images, addImages } = useImageStore();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // TODO: 이미지 개수 제한

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      file,
      previewSrc: URL.createObjectURL(file),
      offset: {
        x: 0,
        y: 0,
      },
      zoomFactor: 1,
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
