"use client";

import { TouchEvent, TouchEventHandler, useEffect, useRef } from "react";
import S from "./resizer.module.scss";
import { Pos, Touches } from "./types";

type Props = {
  src: string;
};

export default function Resizer({ src }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const firstRectRef = useRef<DOMRect>(null);
  // const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgRef.current && firstRectRef.current === null) {
      firstRectRef.current = imgRef.current.getBoundingClientRect();
    }
  }, []);
  const offset = {
    x: 0,
    y: 0,
  };

  let firstMove = true;
  let firstTouches: Touches = [];
  let lastScale = 1;
  let zoomFactor = 1;
  let nthZoom = 0;
  let lastCenter: Pos | null = null;
  let originLastCenter: Pos | null = null;
  const minZoomFactor = 1;
  const maxZoomFactor = 2.5;

  function resetLastZoom() {
    firstMove = true;
    lastScale = 1;
    nthZoom = 0;
  }

  function getDist(a: Pos, b: Pos) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  function getRelativeTouches<T>(e: TouchEvent<T>) {
    return Array.from(e.touches).map((touch) => ({
      x: touch.pageX - firstRectRef.current!.left,
      y: touch.pageY - firstRectRef.current!.top,
    }));
  }
  function getCenter(pos: Pos[]) {
    return {
      x: pos.reduce((acc, touch) => acc + touch.x, 0) / pos.length,
      y: pos.reduce((acc, touch) => acc + touch.y, 0) / pos.length,
    };
  }

  function update() {
    // console.log(`${-offset.x} ${-offset.y}`);
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${zoomFactor}) translate(${
          -offset.x / zoomFactor
        }px, ${-offset.y / zoomFactor}px)`;
      }
    }, 0);
  }

  function adjustOffset(factor: number, center: Pos) {
    offset.x += (factor - 1) * (center.x + offset.x);
    offset.y += (factor - 1) * (center.y + offset.y);
  }

  function handleZoom<T>(e: TouchEvent<T>) {
    if (firstMove) {
      firstTouches = Array.from(e.touches).map((touch) => ({
        x: touch.pageX,
        y: touch.pageY,
      }));
      firstMove = false;
    }

    const currTouches = Array.from(e.touches).map((touch) => ({
      x: touch.pageX,
      y: touch.pageY,
    }));

    const firstDist = getDist(firstTouches[0], firstTouches[1]);
    const lastDist = getDist(currTouches[0], currTouches[1]);

    const newScale = lastDist / firstDist;
    const scaleGrowth = newScale / lastScale;
    const isZoomIn = scaleGrowth > 1;
    const isZoomOut = !isZoomIn;

    lastScale = newScale;

    const center = getCenter(getRelativeTouches(e));

    nthZoom += 1;
    if (nthZoom <= 3) {
      return;
    }

    const originalZoomFactor = zoomFactor;
    // console.log(zoomFactor);
    if (zoomFactor > maxZoomFactor && isZoomIn) {
      // 줌인 중 && 최대 줌 넘었을때
      zoomFactor *= 1.005;
    } else if (zoomFactor < minZoomFactor && isZoomOut) {
      // 줌아웃 중 && 최소 줌 이하일때
      zoomFactor *= 0.995;
    } else {
      zoomFactor *= scaleGrowth;
    }

    const factor = zoomFactor / originalZoomFactor;

    adjustOffset(factor, center);
    update();
  }

  function handleDrag(center: Pos) {
    if (lastCenter) {
      offset.x += -(center.x - lastCenter.x);
      offset.y += -(center.y - lastCenter.y);
    }
    lastCenter = center;
    update();
  }

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const center = getCenter(getRelativeTouches(e));
    if (e.touches.length > 1) {
      handleZoom(e);
    }
    handleDrag(center);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (lastCenter) {
      // 줌 끝낼때 초기화 기준이 되는 originLastCenter 할당
      originLastCenter = lastCenter;
    }
    // 드래그 시 finger 2 -> 1 될 때 lastCenter 이전 정보 삭제
    lastCenter = null;

    if (e.touches.length === 0) {
      // 최대, 최소 줌 범위 벗어난경우 줌을 끝낼때 초기화
      const originalZoomFactor = zoomFactor;

      if (zoomFactor > maxZoomFactor) {
        zoomFactor = maxZoomFactor;
      } else if (zoomFactor < minZoomFactor) {
        zoomFactor = minZoomFactor;
      }
      const factor = zoomFactor / originalZoomFactor;

      adjustOffset(factor, originLastCenter!);
      update();
      originLastCenter = null;
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length > 1) {
      resetLastZoom();
    } else {
      lastCenter = null;
    }
  };

  return (
    <div
      className={S.image_resizer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <img src={src} alt="selected image" ref={imgRef} />
    </div>
  );
}
