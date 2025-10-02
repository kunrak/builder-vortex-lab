import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  "https://cdn.builder.io/api/v1/image/assets%2Fe9cf1274d4a548b5b703928693a3d4c4%2F05aae1f218fb4f5eaacb648e2531d199?format=webp&width=800",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
];

export default function Index() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 md:gap-8">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_38%] min-w-0 px-2"
                >
                  <div
                    className={`relative rounded-[32px] overflow-hidden shadow-lg transition-all duration-300 ${
                      index === selectedIndex
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-60"
                    }`}
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-black" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-black" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-12">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-3 h-3 bg-[#FFB200] ring-2 ring-white ring-offset-2 ring-offset-gray-100"
                  : "w-3 h-3 bg-white border border-gray-300 hover:bg-gray-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
