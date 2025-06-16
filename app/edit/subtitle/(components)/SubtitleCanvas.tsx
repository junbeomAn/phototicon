"use client";

import { ImageItem } from "@/store/types";
import React, { useCallback, useEffect, useRef } from "react";

type Props = {
  image: ImageItem;
};

export default function SubtitleCanvas({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawImageWithCaption = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newImage = new Image();
    newImage.crossOrigin = "anonymous"; // crossOrigin 설정 중요
    newImage.src = image.previewSrc;

    const viewHeight = 398;
    newImage.height = viewHeight;

    newImage.onload = () => {
      const reduceRate = viewHeight / +newImage.naturalHeight;
      const width = +newImage.width * reduceRate;
      const height = +newImage.height;
      const correctOffset = {
        x: image.offset.x + (width - document.body.clientWidth) / 2,
        y: image.offset.y,
      };

      ctx.save();
      // 캔버스 사이즈 설정
      canvas.width = document.body.clientWidth;
      canvas.height = height;

      ctx.translate(-correctOffset.x, -correctOffset.y); // 먼저 위치 이동
      ctx.scale(image.zoomFactor, image.zoomFactor); // 그다음 스케일 적용

      // 이미지 그리기
      ctx.drawImage(newImage, 0, 0, width, height);

      // 자막 그리기
      //   ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      //   ctx.fillRect(0, height - 50, width, 50);

      //   ctx.fillStyle = "white";
      //   ctx.font = "20px sans-serif";
      //   ctx.textAlign = "center";

      //   ctx.fillText("caption123", 0, height - 40);
      ctx.restore();
    };
  }, [image]);

  useEffect(() => {
    if (canvasRef.current) {
      drawImageWithCaption();
    }
  }, [image, drawImageWithCaption]);

  return (
    <canvas
      ref={canvasRef}
      style={{ borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" }}
    />
  );
}
