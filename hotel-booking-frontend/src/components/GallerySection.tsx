import React, { useRef, useEffect, useMemo, useState } from "react";

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
  const [scrollDirection, setScrollDirection] = useState("right"); // New state for scroll direction

  const scrollToIndex = (idx: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const items = el.querySelectorAll("img");
    const target = items[idx] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        let nextIndex = prev;
        if (scrollDirection === "right") {
          nextIndex = (prev + 1) % images.length;
          if (nextIndex === 0) { // Reached end, reverse direction
            setScrollDirection("left");
            nextIndex = images.length - 1; // Start from second last when reversing
          }
        } else {
          nextIndex = (prev - 1 + images.length) % images.length;
          if (nextIndex === images.length - 1) { // Reached beginning, reverse direction
            setScrollDirection("right");
            nextIndex = 0; // Start from second when reversing
          }
        }
        return nextIndex;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [isPaused, images.length, scrollDirection]); // Add scrollDirection to dependencies

  useEffect(() => {
    scrollToIndex(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const move = (dir: "left" | "right") => {
    setCurrentIndex((prev) => {
      const next = dir === "left" ? (prev - 1 + images.length) % images.length : (prev + 1) % images.length;
      return next;
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-50 py-10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-6">Gallery: Estuary Dreamz BOATEL</h2>

        <button
          aria-label="Previous image"
          onClick={() => move("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          aria-label="Next image"
          onClick={() => move("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blue-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-blue-50 to-transparent z-10" />

          <div
            ref={galleryRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex items-center gap-6 px-6 py-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
            {images.map((src, idx) => (
              <img
                key={src + idx}
                src={src}
                alt={`Boatel Gallery ${idx + 1}`}
                className="h-64 md:h-72 lg:h-80 w-auto rounded-3xl shadow-xl border-4 border-white object-cover snap-start"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
