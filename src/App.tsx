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
    { id: 1, x: 120, y: 100, rotation: -5 },
    { id: 2, x: 380, y: 80, rotation: 8 },
    { id: 3, x: 640, y: 120, rotation: -3 },
    { id: 4, x: 900, y: 90, rotation: 6 },
    { id: 5, x: 120, y: 400, rotation: 4 },
    { id: 6, x: 900, y: 400, rotation: -7 },
  ]);

  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;
    
    setDragging(id);
    setDragOffset({
      x: e.clientX - photo.x,
      y: e.clientY - photo.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPhotos(photos.map(p => 
        p.id === dragging 
          ? { ...p, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : p
      ));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl border-4 border-amber-200">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-2">
              <Heart className="text-red-500 fill-red-500 animate-pulse" size={32} />
              <Heart className="text-red-500 fill-red-500 animate-pulse delay-100" size={32} />
              <Heart className="text-red-500 fill-red-500 animate-pulse delay-200" size={32} />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Happy Birthday, Dad! 🎉
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Drag the photos away to see this message!
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Thank you for all the wonderful memories we've shared together. 
              Each photo here represents a special moment that I'll cherish forever. 
              You're not just an amazing dad, but also my hero and best friend.
            </p>
            
            <p className="text-2xl font-semibold text-amber-600 mt-8">
              Here's to many more amazing years ahead! ❤️
            </p>
          </div>
        </div>
      </div>

      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`absolute w-48 h-48 bg-white rounded-lg shadow-xl cursor-move transition-shadow hover:shadow-2xl z-10 ${
            dragging === photo.id ? 'shadow-2xl scale-105' : ''
          }`}
          style={{
            left: `${photo.x}px`,
            top: `${photo.y}px`,
            transform: `rotate(${photo.rotation}deg) ${dragging === photo.id ? 'scale(1.05)' : 'scale(1)'}`,
            transition: dragging === photo.id ? 'none' : 'transform 0.2s',
          }}
          onMouseDown={(e) => handleMouseDown(e, photo.id)}
        >
          <div className="w-full h-full p-3">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center text-gray-500 text-sm text-center p-4">
              Photo {photo.id}
              <br />
              <span className="text-xs mt-2 block">
                (Replace with your actual photos)
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg">
        <p className="text-gray-700 font-medium">
          🖱️ Drag the photos to reveal the birthday message!
        </p>
      </div>
    </div>
  );
}

export default BirthdayCard;