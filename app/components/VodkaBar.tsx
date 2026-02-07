'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

interface VodkaBarProps {
  onVodkaDragged: () => void;
}

export default function VodkaBar({ onVodkaDragged }: VodkaBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vodkasRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(Draggable);

      vodkasRef.current.forEach((vodka, index) => {
        if (vodka) {
          const draggableInstance = Draggable.create(vodka, {
            type: 'x,y',
            bounds: window,
            inertia: true,
            zIndexBoost: true,
            onDragEnd: function() {
              const rect = this.target.getBoundingClientRect();
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;

              // Check if dragged near the center (within 150px)
              const distance = Math.sqrt(
                Math.pow(rect.left + rect.width / 2 - centerX, 2) +
                Math.pow(rect.top + rect.height / 2 - centerY, 2)
              );

              if (distance < 150) {
                onVodkaDragged();
                
                // Animate bottle disappearing
                gsap.to(this.target, {
                  scale: 0,
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    // Reset position and appearance
                    gsap.set(this.target, { x: 0, y: 0, scale: 1, opacity: 1 });
                  }
                });
              } else {
                // Snap back to original position
                gsap.to(this.target, {
                  x: 0,
                  y: 0,
                  duration: 0.5,
                  ease: 'back.out(1.7)'
                });
              }
            }
          })[0];
        }
      });
    }
  }, [onVodkaDragged]);

  const vodkas = [
    { src: '/vodka1.png', alt: 'Velvet Vodka' },
    { src: '/vodka2.png', alt: 'Crystal Vodka' },
    { src: '/vodka3.png', alt: 'Folk Vodka' },
    { src: '/vodka1.png', alt: 'Velvet Vodka' },
  ];

  return (
    <>
      {/* Bar Container */}
      <div
        ref={containerRef}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gray-200/30 backdrop-blur-sm rounded-l-3xl p-2 md:p-4 z-30 border-2 border-white/40"
      >
        <div className="flex flex-col gap-3 md:gap-6 items-center max-h-[400px] md:max-h-[600px] py-2 md:py-4">
          {vodkas.map((vodka, index) => (
            <div
              key={index}
              ref={(el) => { vodkasRef.current[index] = el; }}
              className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform relative"
              style={{ zIndex: 9999 }}
            >
              <div className="relative w-12 h-20 md:w-20 md:h-32 rounded-xl p-1 md:p-2 ">
                <Image
                  src={vodka.src}
                  alt={vodka.alt}
                  fill
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
