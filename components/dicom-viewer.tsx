"use client";

import React, { useEffect, useRef, useState } from "react";
import cornerstone from "cornerstone-core";
import { initializeCornerstone } from "@/lib/cornerstone";

export function DicomViewer({ dicomUrl }: { dicomUrl: string }) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && viewerRef.current) {
      const element = viewerRef.current;

      try {
        initializeCornerstone();

        cornerstone.enable(element);

        cornerstone.loadAndCacheImage(dicomUrl).then((image) => {
          cornerstone.displayImage(element, image);

          const containerElement = containerRef.current;

          if (containerElement) {
            const onWheel = (event: WheelEvent) => {
              event.preventDefault();
              const delta = Math.sign(event.deltaY);
              let newFrame = currentFrame + delta;

              if (newFrame < 0) {
                newFrame = 0;
              } else if (newFrame >= 180) {
                newFrame = 180 - 1;
              }

              setCurrentFrame(newFrame);
            };
            containerElement.addEventListener("wheel", onWheel);

            return () => {
              containerElement.removeEventListener("wheel", onWheel);
            };
          }
        });
      } catch (error) {
        console.error("Error enabling Cornerstone:", error);
      }
    }
  }, [dicomUrl, currentFrame]);

  useEffect(() => {
    if (viewerRef.current) {
      const element = viewerRef.current;
      const frameId = `${dicomUrl}?frame=${currentFrame}`;

      cornerstone
        .loadAndCacheImage(frameId)
        .then((frame) => {
          cornerstone.displayImage(element, frame);
        })
        .catch((error) => {
          console.error("Error displaying frame:", error);
        });
    }
  }, [currentFrame, dicomUrl]);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full bg-black justify-center items-center relative"
    >
      <div className="flex w-96 h-96" ref={viewerRef} />
      <div className="text-white absolute bottom-4 right-4 font-bold">
        IM: <span className="text-primary-brand">{currentFrame + 1}</span>/{180}
      </div>
    </div>
  );
}
