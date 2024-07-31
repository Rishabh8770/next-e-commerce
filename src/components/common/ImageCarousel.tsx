"use client"

import { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: CarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full flex justify-center">
      <img
        src={images[currentImageIndex]}
        alt={`Product image ${currentImageIndex + 1}`}
        className="size-96 rounded-md"
      />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
        <button
          onClick={() =>
            setCurrentImageIndex((prevIndex) =>
              (prevIndex - 1 + images.length) % images.length
            )
          }
          className="border text-2xl border-gray-500 px-2 rounded-full"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <button
          onClick={() =>
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
          className="border text-2xl border-gray-500 px-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
