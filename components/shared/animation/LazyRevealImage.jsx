"use client";

import Image from "next/image";

export default function LazyRevealImage({ className = "", alt = "", ...props }) {
  const imageClassName = `${className} image-load-reveal`.trim();

  return (
    <Image
      {...props}
      alt={alt}
      data-component="lazyload"
      className={imageClassName}
    />
  );
}
