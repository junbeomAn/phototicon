import { useImages } from "@/store/store";
import S from "./imageSelect.module.scss";

type Props = {
  handleSelect: (idx: number) => void;
  selectedIdx: number;
};

export default function ImageSelect({ handleSelect, selectedIdx }: Props) {
  const images = useImages();

  return (
    <ul className={S.container}>
      {images.map((img, i) => (
        <li
          key={i}
          onClick={() => handleSelect(i)}
          className={i === selectedIdx ? S.selected : ""}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.previewSrc} alt={`upload-${i}`} />
        </li>
      ))}
    </ul>
  );
}
