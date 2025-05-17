"use client";

import { useImageStore } from "@/src/entities/image/model/store";
import Header from "@/src/shared/ui/Header/Header";
import UploadPanel from "@/src/widgets/UploadPanel/UploadPanel";

export default function Upload() {
  const next = "/edit";
  const images = useImageStore((store) => store.images);

  return (
    <div>
      <main>
        <Header next={next} isNextDisabled={images.length === 0} />
        <UploadPanel />
      </main>
    </div>
  );
}
