"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const TripImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-96 ml-2 overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={`/${images[currentIndex]}`}
          alt={`Trip image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          fill
          priority
        />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition">
          <ChevronLeft className="text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition">
          <ChevronRight className="text-gray-800" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-shadow">
            Découvrez Bali
          </h1>
          <p className="text-xl text-shadow">
            L&apos;île des Dieux vous attend
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripImageCarousel;
