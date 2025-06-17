"use client";

import { ImageItem } from "@/store/types";
import React, { useCallback, useEffect, useRef } from "react";

type Props = {
  image: ImageItem;
};

export default function Canvas({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawSubtitle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const subtitleText = image.subtitle;
      if (!subtitleText) return;

      ctx.fillStyle = "white";
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(subtitleText, x, y);
    },
    [image]
  );

  const drawImageWithCaption = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newImage = new Image();
    newImage.crossOrigin = "anonymous";
    newImage.src = image.previewSrc;

    const viewHeight = 398;
    newImage.height = viewHeight;

    newImage.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const reduceRate = viewHeight / +newImage.naturalHeight;
      const width = +newImage.width * reduceRate;
      const height = +newImage.height;

      const correctOffset = {
        x: image.offset.x + (width - document.body.clientWidth) / 2,
        y: image.offset.y,
      };

      ctx.save();

      canvas.width = document.body.clientWidth * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${document.body.clientWidth}px`;
      canvas.style.height = `${height}px`;

      ctx.translate(-correctOffset.x * dpr, -correctOffset.y * dpr); // 이동
      ctx.scale(image.zoomFactor * dpr, image.zoomFactor * dpr); // 스케일

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 이미지 그리기
      ctx.drawImage(newImage, 0, 0, width, height);
      const centerX =
        (correctOffset.x + (correctOffset.x + document.body.clientWidth)) / 2;
      // 자막 그리기
      drawSubtitle(ctx, centerX, height - 25);

      ctx.restore();
    };
  }, [image, drawSubtitle]);

  useEffect(() => {
    if (canvasRef.current) {
      drawImageWithCaption();
    }
  }, [image, drawImageWithCaption]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" }}
      />
    </div>
  );
}
