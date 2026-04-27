"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
  className?: string;
  sizes?: string;
}

export default function ImageSlideshow({
  images,
  interval = 100,
  className = "",
  sizes = "100vw"
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image
        src={images[currentIndex]}
        alt="Slideshow image"
        fill
        sizes={sizes}
        priority
        className="object-cover"
      />
    </div>
  );
}
