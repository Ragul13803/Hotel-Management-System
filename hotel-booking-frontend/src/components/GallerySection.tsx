import { useRef, useEffect, useMemo, useState } from "react";

const GallerySection = () => {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const images = useMemo(
    () => [
      "/Boatel%20Front%20View.jpeg",
      "/Boatel%20Building%20View%201.jpeg",
      "/Boatel%20Building%20View%202.jpeg",
      "/Boatel%20Swim%20Pool%20View.jpeg",
      "/Boatel%20Bedroom.jpeg",
      "/Boatel%20Building%20View%20Bedrrom%202.jpeg",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const scrollToIndex = (idx: number) => {
    const el = galleryRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLDivElement>(".gallery-card");
    const target = items[idx];
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = prev;

        if (direction === "right") {
          next = prev + 1;
          if (next >= images.length - 3) {
            setDirection("left");
            next = images.length - 3;
          }
        } else {
          next = prev - 1;
          if (next <= 0) {
            setDirection("right");
            next = 0;
          }
        }

        return next;
      });
    }, 3000);

    return () => clearInterval(id);
  }, [direction, images.length, isPaused]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="w-full py-10 bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 my-6">
          Gallery of Estuary Dreamz BOATEL
        </h2>

        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-transparent">
          {/* Fade edges for style */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" /> */}

          <div
            ref={galleryRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 bg-transparent overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {images.map((src, idx) => (
              <div
                key={idx}
                className="gallery-card flex-shrink-0 w-1/3 aspect-square rounded-3xl overflow-hidden shadow-xl snap-start bg-gray-100"
              >
                <img
                  src={src}
                  alt={`Boatel Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
