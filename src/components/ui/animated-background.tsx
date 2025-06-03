
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shooting-star"
            style={{
              left: `-100px`,
              top: `${Math.random() * 100}%`,
              width: '100px',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: '3s',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Floating asteroids */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`asteroid-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-purple-600 to-purple-800 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Galaxy spiral effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 border border-purple-500/20 rounded-full animate-spin-slow">
          <div className="w-80 h-80 border border-blue-500/20 rounded-full m-8 animate-spin-reverse">
            <div className="w-64 h-64 border border-purple-400/20 rounded-full m-8 animate-spin-slow">
              <div className="w-48 h-48 border border-blue-400/20 rounded-full m-8 animate-spin-reverse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
