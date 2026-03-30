import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconGradient?: string;
  characterImage?: string;
  characterAlt?: string;
  showSparkles?: boolean;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  icon: Icon,
  iconGradient = 'from-purple-500 to-blue-600',
  characterImage,
  characterAlt = 'Personaje',
  showSparkles = false,
  className = '',
}: HeroSectionProps) {
  return (
    <div className={`relative text-center mb-8 sm:mb-12 ${className}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-10 right-1/4 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Character or Icon */}
      {characterImage ? (
        <div className="relative inline-block mb-6 z-10">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-full h-full">
              <Image
                src={characterImage}
                alt={characterAlt}
                fill
                className="object-contain drop-shadow-2xl animate-bounce"
                priority
              />
            </div>
          </div>
          {showSparkles && (
            <>
              <div className="absolute -top-2 -right-2 text-4xl sm:text-5xl animate-bounce z-20">✨</div>
              <div className="absolute -bottom-2 -left-2 text-4xl sm:text-5xl animate-pulse z-20">⭐</div>
              <div className="absolute top-1/2 -right-8 text-3xl animate-pulse z-20" style={{ animationDelay: '0.5s' }}>🌟</div>
            </>
          )}
        </div>
      ) : Icon ? (
        <div className="relative inline-block mb-6 z-10">
          <div className={`relative inline-block p-4 sm:p-5 bg-gradient-to-br ${iconGradient} rounded-3xl sm:rounded-[2.5rem] shadow-2xl border-4 border-white`}>
            <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10" />
            <div className={`absolute inset-0 bg-gradient-to-br ${iconGradient} opacity-50 blur-xl rounded-3xl`}></div>
          </div>
          {showSparkles && (
            <>
              <div className="absolute -top-2 -right-2 text-3xl animate-bounce z-20">✨</div>
              <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse z-20">⭐</div>
            </>
          )}
        </div>
      ) : null}

      {/* Title */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-4xl sm:text-5xl md:text-6xl animate-bounce">🎯</span>
          {title}
          <span className="text-4xl sm:text-5xl md:text-6xl animate-pulse">✨</span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-bold max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
