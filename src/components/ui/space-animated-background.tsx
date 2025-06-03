
import React from 'react';
import { Facebook, Instagram, MessageCircle, Youtube, Twitter, Linkedin } from 'lucide-react';

const SpaceAnimatedBackground: React.FC = () => {
  const socialLogos = [
    { icon: Facebook, color: 'text-blue-500' },
    { icon: Instagram, color: 'text-pink-500' },
    { icon: MessageCircle, color: 'text-green-500' },
    { icon: Youtube, color: 'text-red-500' },
    { icon: Twitter, color: 'text-blue-400' },
    { icon: Linkedin, color: 'text-blue-600' }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Social media asteroids */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => {
          const SocialIcon = socialLogos[i % socialLogos.length].icon;
          const color = socialLogos[i % socialLogos.length].color;
          
          return (
            <div
              key={`asteroid-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 15 + 20}s`,
              }}
            >
              <div className={`${color} opacity-70 hover:opacity-100 transition-opacity duration-300`}>
                <SocialIcon size={Math.random() * 20 + 24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-shooting-star"
            style={{
              left: `-150px`,
              top: `${Math.random() * 100}%`,
              width: '150px',
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: '4s',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Cosmic nebula effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(251, 146, 60, 0.2) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Planet rings */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-30">
        <div className="w-full h-full border-2 border-orange-500/40 rounded-full animate-spin-slow"></div>
        <div className="absolute top-2 left-2 w-28 h-28 border border-orange-600/40 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default SpaceAnimatedBackground;
