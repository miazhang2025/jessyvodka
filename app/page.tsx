'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CharacterSequence from './components/CharacterSequence';
import VodkaBar from './components/VodkaBar';
import Footer from './components/Footer';
import Image from 'next/image';

export default function Home() {
  const [drinkTrigger, setDrinkTrigger] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVodkaDragged = () => {
    setDrinkTrigger(true);
  };

  const handleDrinkComplete = () => {
    setDrinkTrigger(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x * 1}px, ${mousePos.y * 1}px)` }}
      >
        <Image
          src="/Background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Title - Always centered */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <div 
            className="transition-transform duration-300 ease-out"
            style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
          >
            <p className="text-6xl md:text-7xl font-black text-white tracking-wider drop-shadow-2xl whitespace-nowrap" style={{ fontFamily: 'var(--font-bayon)' }}>
              JESSYWANG.VODKA
            </p>
          </div>
        </div>

        {/* Character at the bottom */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-20">
          <div 
            className="transition-transform duration-300 ease-out"
            style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}
          >
            <CharacterSequence 
              onDrinkTrigger={drinkTrigger}
              onDrinkComplete={handleDrinkComplete}
            />
          </div>
        </div>

        {/* Vodka Bar */}
        <VodkaBar onVodkaDragged={handleVodkaDragged} />

        <Footer />
      </div>
    </div>
  );
}
