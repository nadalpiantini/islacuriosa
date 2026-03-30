import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  gradient: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'p-2',
    icon: 'w-4 h-4',
    rounded: 'rounded-lg',
  },
  md: {
    container: 'p-3',
    icon: 'w-6 h-6',
    rounded: 'rounded-xl',
  },
  lg: {
    container: 'p-4 sm:p-5',
    icon: 'w-10 h-10 sm:w-12 sm:h-12',
    rounded: 'rounded-2xl sm:rounded-3xl',
  },
};

export function IconBadge({
  icon: Icon,
  gradient,
  size = 'md',
  className = '',
}: IconBadgeProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={`inline-flex ${sizes.container} bg-gradient-to-br ${gradient} ${sizes.rounded} shadow-lg ${className}`}
    >
      <Icon className={`${sizes.icon} text-white`} />
    </div>
  );
}
