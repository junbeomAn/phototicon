import { useImageStore } from "@/store/store";
import { NewImageItem } from "@/store/types";

export default function useUpload() {
  const { images, addImages } = useImageStore();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // TODO: 이미지 개수 제한

    const newImages: NewImageItem[] = Array.from(files).map((file) => ({
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
