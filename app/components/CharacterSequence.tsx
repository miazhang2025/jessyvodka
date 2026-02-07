'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type CharacterState = 'idle' | 'drinking' | 'thumbsup';

interface CharacterSequenceProps {
  onDrinkTrigger: boolean;
  onDrinkComplete: () => void;
}

export default function CharacterSequence({ onDrinkTrigger, onDrinkComplete }: CharacterSequenceProps) {
  const [currentState, setCurrentState] = useState<CharacterState>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (onDrinkTrigger && currentState === 'idle') {
      playDrinkingSequence();
    }
  }, [onDrinkTrigger]);

  const playDrinkingSequence = () => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start drinking
    setCurrentState('drinking');

    // After 0.7s, show thumbs up
    timeoutRef.current = setTimeout(() => {
      setCurrentState('thumbsup');

      // After 0.5s, go back to idle
      timeoutRef.current = setTimeout(() => {
        setCurrentState('idle');
        onDrinkComplete();
      }, 500);
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getImageSrc = () => {
    switch (currentState) {
      case 'drinking':
        return '/drinking.png';
      case 'thumbsup':
        return '/thumbsup.png';
      case 'idle':
        return '/idle.png';
      default:
        return '/idle.png';
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[500px] h-[750px]">
        <Image
          src={getImageSrc()}
          alt="Jessy"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
