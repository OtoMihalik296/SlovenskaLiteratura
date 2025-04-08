import React from 'react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export function Flashcard({ card, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div
      className="w-full max-w-lg h-64 cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-center font-medium text-gray-800">
              {card.question}
            </p>
          </div>
        </div>
        <div className="absolute w-full h-full bg-blue-500 rounded-xl shadow-lg p-6 backface-hidden rotate-y-180">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-center font-medium text-white">
              {card.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}