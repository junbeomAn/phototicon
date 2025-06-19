"use client";

import { ImageItem } from "@/store/types";
import React, { useCallback, useEffect, useRef } from "react";
import { HiArrowDownTray } from "react-icons/hi2";

type Props = {
  image: ImageItem;
};

export default function Canvas({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebP 포맷으로 변환 (품질: 0.8 = 80%)
    const dataURL = canvas.toDataURL("image/webp", 1);

    // 다운로드 링크 생성
    const link = document.createElement("a");
    link.download = `phototicon-${Date.now()}.webp`;
    link.href = dataURL;

    // 링크 클릭하여 다운로드 시작
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

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
        // 이미지가 height 에 맞춰지며 canvas 가로폭에 비해 남거나 모자란 width 만큼 옮겨준다
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

      // (이동한 x 좌표 가운데 / 줌 비율) 을 계산하여 이미지가 줌 된 만큼 x 위치를 줄인다
      const centerPosX =
        (correctOffset.x + (correctOffset.x + document.body.clientWidth)) /
        2 /
        image.zoomFactor;
      // (이동한 y 좌표 bottom / 줌 비율) 을 계산하여 이미지가 줌 된 만큼 x 위치를 줄인다.
      const bottomPosY = (correctOffset.y + height) / image.zoomFactor - 25;
      // 자막 그리기
      drawSubtitle(ctx, centerPosX, bottomPosY);

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
      <button
        onClick={handleDownload}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
        }}
      >
        <HiArrowDownTray size={18} />
      </button>
    </div>
  );
}
