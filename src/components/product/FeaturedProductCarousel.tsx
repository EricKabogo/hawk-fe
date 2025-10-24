'use client';

import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedProductCarouselProps {
  products: Product[];
}

const FeaturedProductCarousel = ({ products }: FeaturedProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Ensure autoplay restarts after manual navigation
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi.on('pointerDown', () => {
      autoplay.stop();
    });

    emblaApi.on('pointerUp', () => {
      autoplay.play();
    });
  }, [emblaApi]);

  if (products.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 pl-4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 hidden md:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 hidden md:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>
    </div>
  );
};

export default FeaturedProductCarousel;
