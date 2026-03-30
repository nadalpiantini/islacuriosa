import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  bgColor: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  bgColor,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-br ${bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-4 border-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${className}`}
    >
      {/* Decorative corner element */}
      <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${gradient} opacity-20 rounded-bl-full`}></div>
      
      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
        <div className={`relative p-3 sm:p-4 bg-gradient-to-br ${gradient} rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 blur-lg rounded-2xl`}></div>
        </div>
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-gray-700 font-black mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
