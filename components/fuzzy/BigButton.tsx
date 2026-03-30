import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BigButtonProps {
  title: string;
  description: string;
  emoji?: string;
  icon: LucideIcon;
  gradient: string;
  bgColor: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BigButton({
  title,
  description,
  emoji,
  icon: Icon,
  gradient,
  bgColor,
  onClick,
  href,
  className = '',
  children,
}: BigButtonProps) {
  const baseClasses = `relative ${bgColor} backdrop-blur-sm rounded-[35%] sm:rounded-[2.5rem] p-6 sm:p-8 border-4 border-white shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 overflow-hidden`;

  const content = (
    <>
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-20 rounded-bl-full`}></div>
      <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${gradient} opacity-20 rounded-tr-full`}></div>
      
      <div className="relative z-10">
        {/* Icon Badge with glow */}
        <div className={`relative inline-flex p-4 sm:p-5 bg-gradient-to-br ${gradient} rounded-[30%] sm:rounded-3xl shadow-xl mb-4 group-hover:scale-125 transition-transform duration-300 border-4 border-white`}>
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10 drop-shadow-lg" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 blur-xl rounded-[30%] group-hover:opacity-75 transition-opacity`}></div>
        </div>

        {/* Title with optional emoji */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          {emoji && <span className="text-3xl sm:text-4xl animate-bounce">{emoji}</span>}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-bold mb-4">
          {description}
        </p>

        {/* Optional children (badges, extra content) */}
        {children}
        
        {/* Hover sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-2 right-2 text-2xl animate-pulse">✨</div>
          <div className="absolute bottom-2 left-2 text-xl animate-pulse">⭐</div>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group relative block text-left ${className}`}>
        <div className={baseClasses}>{content}</div>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group relative text-left w-full ${className}`}
    >
      <div className={baseClasses}>{content}</div>
    </button>
  );
}
