import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface Photo {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

interface DragOffset {
  x: number;
  y: number;
}

function BirthdayCard() {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, x: 10, y: 15, rotation: -5 },
    { id: 2, x: 60, y: 10, rotation: 8 },
    { id: 3, x: 15, y: 60, rotation: -3 },
    { id: 4, x: 70, y: 65, rotation: 6 },
    { id: 5, x: 5, y: 35, rotation: 4 },
    { id: 6, x: 75, y: 40, rotation: -7 },
  ]);

  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });

  const getEventCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const photo = photos.find(p => p.id === id);
    if (!photo) return;
    
    const coords = getEventCoordinates(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    setDragging(id);
    setDragOffset({
      x: coords.x - rect.left,
      y: coords.y - rect.top
    });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (dragging) {
      e.preventDefault();
      const coords = getEventCoordinates(e);
      const containerRect = e.currentTarget.getBoundingClientRect();
      
      const newX = ((coords.x - dragOffset.x - containerRect.left) / containerRect.width) * 100;
      const newY = ((coords.y - dragOffset.y - containerRect.top) / containerRect.height) * 100;
      
      setPhotos(photos.map(p =>
        p.id === dragging
          ? { ...p, x: Math.max(0, Math.min(85, newX)), y: Math.max(0, Math.min(85, newY)) }
          : p
      ));
    }
  };

  const handleEnd = () => {
    setDragging(null);
  };

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden touch-none"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-12 mx-2 sm:mx-4 max-w-xs sm:max-w-md md:max-w-2xl border-2 md:border-4 border-amber-200">
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex justify-center gap-1 sm:gap-2">
              <Heart className="text-red-500 fill-red-500 animate-pulse" size={20} />
              <Heart className="text-red-500 fill-red-500 animate-pulse delay-100" size={20} />
              <Heart className="text-red-500 fill-red-500 animate-pulse delay-200" size={20} />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
              Happy Birthday, Dad! 🎉
            </h1>
            
            <p className="text-sm sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Drag the photos away to see this message!
            </p>
            
            <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Thank you for all the wonderful memories we've shared together.
              Each photo here represents a special moment that I'll cherish forever.
              You're not just an amazing dad, but also my hero and best friend.
            </p>
            
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-600 mt-4 md:mt-8">
              Here's to many more amazing years ahead! ❤️
            </p>
          </div>
        </div>
      </div>

      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`absolute w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-white rounded-lg shadow-xl cursor-move transition-shadow hover:shadow-2xl z-10 ${
            dragging === photo.id ? 'shadow-2xl scale-105' : ''
          }`}
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
            transform: `rotate(${photo.rotation}deg) ${dragging === photo.id ? 'scale(1.05)' : 'scale(1)'}`,
            transition: dragging === photo.id ? 'none' : 'transform 0.2s',
          }}
          onMouseDown={(e) => handleStart(e, photo.id)}
          onTouchStart={(e) => handleStart(e, photo.id)}
        >
          <div className="w-full h-full p-2 sm:p-3">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center text-gray-500 text-xs sm:text-sm text-center p-2 sm:p-4">
              Photo {photo.id}
              <br />
              <span className="text-xs mt-1 sm:mt-2 block">
                (Replace with your actual photos)
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mx-4">
        <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base text-center">
          📱 Drag the photos to reveal the birthday message!
        </p>
      </div>
    </div>
  );
}

export default BirthdayCard;