"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import { eyesBackdrop } from "@/data/siteData";

const EYES_SECTION_VIDEO = "https://ochi.design/wp-content/uploads/2025/09/ochi.design-Presentation-Agency-1.mp4";

export default function EyesShowcaseSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <section className="relative -z-[1] overflow-hidden bg-ochi-gray100">
      <div className="h-full w-full overflow-hidden">
        <ScrollProgressShift
          className="xl:h-[calc(100vh+1.5rem)]"
          fromMultiplier={-0.83}
          toMultiplier={0.72}
          offset={["start end", "end start"]}
        >
          <div
            className={`group relative grid h-full min-h-[30rem] w-full cursor-pointer overflow-hidden${isPlaying ? " video--is-playing" : ""}`}
            onClick={togglePlayback}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={EYES_SECTION_VIDEO}
              playsInline
              loop
              muted
              preload="metadata"
            />

            <div
              data-component="video-poster"
              className={`relative h-full w-full transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
            >
              <Image
                src={eyesBackdrop}
                alt="Top-view workspace visual"
                fill
                sizes="100vw"
                loading="lazy"
                className="h-full w-full max-w-full bg-ochi-gray200 object-cover [transform:scale(1.2)]"
              />
            </div>

            <ScrollProgressShift
              className="absolute inset-0 z-[2]"
              fromMultiplier={0}
              toMultiplier={-0.17}
              offset={["start end", "end start"]}
            >
              <div className="flex h-full w-full items-center justify-center p-[3rem] min-[375px]:p-[6rem]">
                <div className="w-full max-w-[44rem]" data-scroll-call="eyes">
                  <MouseReactiveEyesSvg label="play" />
                </div>
              </div>
            </ScrollProgressShift>

            <div
              className={`absolute bottom-0 right-0 z-[3] px-[1.5rem] py-[3rem] transition-opacity duration-300 xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 ${
                isPlaying ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <button
                type="button"
                className="btn btn--primary btn--small"
                onClick={(event) => {
                  event.stopPropagation();
                  void togglePlayback();
                }}
              >
                <span className="btn__text">Pause</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </button>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </section>
  );
}
