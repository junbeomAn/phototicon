"use client";

import {
  TouchEvent,
  TouchEventHandler,
  TouchList,
  useEffect,
  useRef,
} from "react";
import S from "./resizer.module.scss";
import { Pos, Touch, Touches } from "./types";
import { useImageStore } from "@/store/store";

type Props = {
  src: string;
  selectedIdx: number;
};

export default function Resizer({ src, selectedIdx }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const firstRectRef = useRef<DOMRect>(null);
  const setResizeInfo = useImageStore((store) => store.setResizeInfo);
  const images = useImageStore((store) => store.images);

  const offset = images[selectedIdx]?.offset || { x: 0, y: 0 };

  let firstMove = true;
  let firstTouches: Touches = [];
  let lastScale = 1;
  let zoomFactor = images[selectedIdx]?.zoomFactor || 1;
  let nthZoom = 0;
  let lastCenter: Pos | null = null;
  let originLastCenter: Pos | null = null;
  let isZooming = false;

  const minZoomFactor = 1;
  const maxZoomFactor = 2.5;

  const resetLastZoom = () => {
    firstMove = true;
    lastScale = 1;
    nthZoom = 0;
  };

  const getDist = (a: Pos, b: Pos) => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  };

  const getRelativeTouches = <T,>(e: TouchEvent<T>) => {
    return Array.from(e.touches).map((touch) => ({
      x: touch.pageX - firstRectRef.current!.left,
      y: touch.pageY - firstRectRef.current!.top,
    }));
  };

  const getCenter = (pos: Pos[]) => {
    return {
      x: pos.reduce((acc, touch) => acc + touch.x, 0) / pos.length,
      y: pos.reduce((acc, touch) => acc + touch.y, 0) / pos.length,
    };
  };

  const update = () => {
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${zoomFactor}) translate(${
          -offset.x / zoomFactor
        }px, ${-offset.y / zoomFactor}px)`;
      }
    }, 0);
  };

  const adjustOffset = (factor: number, center: Pos) => {
    offset.x += (factor - 1) * (center.x + offset.x);
    offset.y += (factor - 1) * (center.y + offset.y);
  };

  const getTouches = (touches: TouchList) => {
    return Array.from(touches).map((touch) => ({
      x: touch.pageX,
      y: touch.pageY,
    }));
  };

  const getNextScale = (firstTouches: Touches, currTouches: Touches) => {
    const firstDist = getDist(firstTouches[0], firstTouches[1]);
    const lastDist = getDist(currTouches[0], currTouches[1]);

    return lastDist / firstDist;
  };

  const getNextZoomFactor = (growth: number, leastWeight: number) => {
    const isZoomIn = growth > 1;
    const isZoomOut = !isZoomIn;

    if (zoomFactor > maxZoomFactor && isZoomIn) {
      // 줌인 중 && 최대 줌 넘었을때
      return 1 + leastWeight;
    } else if (zoomFactor < minZoomFactor && isZoomOut) {
      // 줌아웃 중 && 최소 줌 이하일때
      return 1 - leastWeight;
    } else {
      return growth;
    }
  };

  const scale = <T,>(e: TouchEvent<T>) => {
    if (firstMove) {
      firstTouches = getTouches(e.touches);
      firstMove = false;
    }

    const currTouches = getTouches(e.touches);
    const newScale = getNextScale(firstTouches, currTouches);
    const scaleGrowth = newScale / lastScale;

    lastScale = newScale;

    const center = getCenter(getRelativeTouches(e));

    nthZoom += 1;
    // initial touches are not used because they are not accurate
    if (nthZoom <= 3) {
      return;
    }

    const originalZoomFactor = zoomFactor;
    zoomFactor *= getNextZoomFactor(scaleGrowth, 0.005);
    const factor = zoomFactor / originalZoomFactor;

    adjustOffset(factor, center);
    update();
  };

  const drag = (center: Pos) => {
    if (lastCenter) {
      offset.x += -(center.x - lastCenter.x);
      offset.y += -(center.y - lastCenter.y);
    }
    lastCenter = center;
    update();
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const center = getCenter(getRelativeTouches(e));
    if (e.touches.length > 1) {
      isZooming = true;
      scale(e);
    }
    drag(center);
  };

  const getAdjustedZoom = (factor: number) => {
    if (factor > maxZoomFactor) {
      return maxZoomFactor;
    } else if (factor < minZoomFactor) {
      return minZoomFactor;
    }
    return factor;
  };

  const correctOverZoom = (center: Touch) => {
    // 최대, 최소 줌 범위 벗어난경우 줌을 끝낼때 초기화
    const originalZoomFactor = zoomFactor;
    zoomFactor = getAdjustedZoom(zoomFactor);
    const lastFactor = zoomFactor / originalZoomFactor;

    adjustOffset(lastFactor, center);
    update();
  };

  const handleOverDrag = (
    initSize: number,
    containerSize: number,
    zoomFactor: number,
    currentOffset: number,
    baseLimit: number
  ) => {
    const zoomedSize = zoomFactor * initSize;

    if (zoomedSize < containerSize) {
      // center image if size is smaller than container
      return baseLimit - (containerSize - zoomedSize) / 2;
    } else {
      if (currentOffset < baseLimit) {
        // limit offset to base
        return baseLimit;
      } else if (currentOffset > baseLimit + (zoomedSize - containerSize)) {
        // limit offset to opposite side base
        return baseLimit + (zoomedSize - containerSize);
      }
      return currentOffset;
    }
  };

  const correctOverDrag = () => {
    if (!imgRef.current) return;

    const { width: initImgWidth, height: initImgHeight } = imgRef.current;
    const { clientWidth: resizerWidth } = document.body;
    const resizerHeight = initImgHeight;

    // Handle horizontal drag
    const leftLimit = (resizerWidth - initImgWidth) / 2;
    offset.x = handleOverDrag(
      initImgWidth,
      resizerWidth,
      zoomFactor,
      offset.x,
      leftLimit
    );

    // Handle vertical drag
    const topLimit = 0;
    offset.y = handleOverDrag(
      initImgHeight,
      resizerHeight,
      zoomFactor,
      offset.y,
      topLimit
    );

    update();
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (lastCenter) {
      // 줌 끝낼때 초기화 기준이 되는 originLastCenter 할당
      originLastCenter = lastCenter;
    }
    // 드래그 시 finger 2 -> 1 될 때 lastCenter 이전 정보 삭제
    resetLastDrag();

    if (e.touches.length === 0 && isZooming) {
      correctOverZoom(originLastCenter!);
      // 마지막 줌 상태 저장하기
      setResizeInfo(selectedIdx, { offset, zoomFactor });
      originLastCenter = null;
      isZooming = false;
    }
    correctOverDrag();
  };

  const resetLastDrag = () => {
    lastCenter = null;
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length > 1) {
      resetLastZoom();
    } else {
      resetLastDrag();
    }
  };

  useEffect(() => {
    if (imgRef.current && firstRectRef.current === null) {
      firstRectRef.current = imgRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    // execute only if src is changed
    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div
      className={S.image_resizer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="selected image" ref={imgRef} />
    </div>
  );
}
