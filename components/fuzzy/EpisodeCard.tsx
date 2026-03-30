'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface EpisodeCardProps {
  title: string;
  thumbnailEmoji?: string;
  characterId?: string;
  character?: string;
  grumbleId?: string | null;
  grumble?: string | null;
  episodeNumber?: number;
  seasonNumber?: number;
  watchProgress?: number; // 0-100
  onClick?: () => void;
  className?: string;
}

// Caribbean color palettes for cards without thumbnails
const CARD_PALETTES = [
  { from: '#00B4D8', to: '#0077B6', accent: '#023E8A', pattern: 'waves' },
  { from: '#F4A261', to: '#E76F51', accent: '#D62828', pattern: 'dots' },
  { from: '#70E000', to: '#38B000', accent: '#008000', pattern: 'leaves' },
  { from: '#9B5DE5', to: '#7B2FF7', accent: '#5A189A', pattern: 'waves' },
  { from: '#FFD166', to: '#EFB100', accent: '#CC8B00', pattern: 'dots' },
  { from: '#2EC4B6', to: '#20A39E', accent: '#0B7A75', pattern: 'leaves' },
  { from: '#FF6B6B', to: '#EE5A24', accent: '#C0392B', pattern: 'waves' },
  { from: '#A8DADC', to: '#457B9D', accent: '#1D3557', pattern: 'dots' },
];

function generateSvgBg(palette: typeof CARD_PALETTES[0], seed: number): string {
  const { from, to, accent, pattern } = palette;
  const base = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/></linearGradient></defs><rect width="400" height="240" fill="url(#g)"/>`;

  if (pattern === 'waves') {
    return `${base}<path d="M0 170 Q60 140 120 170 T240 170 T360 170 T480 170 V240 H0Z" fill="${accent}" opacity=".25"/><path d="M0 190 Q60 160 120 190 T240 190 T360 190 T480 190 V240 H0Z" fill="${accent}" opacity=".15"/><circle cx="320" cy="50" r="30" fill="#fff" opacity=".12"/></svg>`;
  }
  if (pattern === 'dots') {
    const dots = Array.from({ length: 12 }, (_, i) => {
      const x = 30 + ((i + seed) % 6) * 70;
      const y = 25 + Math.floor(((i + seed) % 12) / 6) * 60 + ((i * 17) % 30);
      const r = 6 + ((i * 7 + seed) % 10);
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${(0.06 + ((i * 3) % 8) * 0.015).toFixed(2)}"/>`;
    }).join('');
    return `${base}${dots}<path d="M0 200 Q100 175 200 210 T400 195 V240 H0Z" fill="${accent}" opacity=".2"/></svg>`;
  }
  // leaves
  const leaves = [
    `<ellipse cx="60" cy="40" rx="35" ry="12" transform="rotate(-25 60 40)" fill="#fff" opacity=".09"/>`,
    `<ellipse cx="330" cy="70" rx="30" ry="10" transform="rotate(20 330 70)" fill="#fff" opacity=".07"/>`,
    `<ellipse cx="180" cy="120" rx="40" ry="13" transform="rotate(-10 180 120)" fill="#fff" opacity=".06"/>`,
    `<ellipse cx="100" cy="200" rx="35" ry="11" transform="rotate(30 100 200)" fill="#fff" opacity=".08"/>`,
  ].join('');
  return `${base}${leaves}<path d="M-10 200 Q90 175 200 210 T410 195 V240 H0Z" fill="${accent}" opacity=".2"/></svg>`;
}

export function EpisodeCard({
  title,
  thumbnailEmoji = '🎬',
  characterId,
  character,
  grumbleId,
  grumble,
  episodeNumber,
  seasonNumber = 1,
  watchProgress,
  onClick,
  className,
}: EpisodeCardProps) {
  const [hovered, setHovered] = useState(false);

  const episodeLabel =
    episodeNumber != null
      ? `T${String(seasonNumber).padStart(2, '0')}E${String(episodeNumber).padStart(2, '0')}`
      : null;

  // Pick a palette based on episode number for variety
  const seed = (episodeNumber ?? 1) + (seasonNumber ?? 1) * 10;
  const palette = CARD_PALETTES[seed % CARD_PALETTES.length];
  const svgBg = generateSvgBg(palette, seed);
  const encodedSvg = `data:image/svg+xml,${encodeURIComponent(svgBg)}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative rounded-2xl overflow-hidden',
        'transition-all duration-300',
        'cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
        'bg-white/[0.07] backdrop-blur-md border border-white/10 hover:border-white/25',
        'hover:scale-[1.03] hover:shadow-2xl',
        className,
      )}
      style={{
        boxShadow: hovered
          ? `0 16px 32px ${palette.accent}30, 0 4px 12px rgba(0,0,0,0.2)`
          : '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      {/* Thumbnail area with SVG tropical background */}
      <div
        className="relative aspect-video flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url("${encodedSvg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Character image or emoji */}
        {characterId ? (
          <img
            src={`/characters/${characterId}.png`}
            alt={character ?? characterId}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain transition-transform duration-300 drop-shadow-lg"
            style={{
              transform: hovered ? 'scale(1.2) rotate(-3deg)' : 'scale(1)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
            }}
          />
        ) : (
          <span
            className="text-6xl sm:text-7xl transition-transform duration-300 select-none"
            style={{
              transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            }}
          >
            {thumbnailEmoji}
          </span>
        )}

        {/* Play button overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? 'rgba(0,0,0,0.12)' : 'transparent',
          }}
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.92)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.5)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill={palette.to} />
            </svg>
          </div>
        </div>

        {/* Episode label */}
        {episodeLabel && (
          <div
            className="absolute bottom-2 left-2.5 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              letterSpacing: '0.03em',
            }}
          >
            {episodeLabel}
          </div>
        )}

        {/* Episode number circle */}
        {episodeNumber != null && (
          <div
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {episodeNumber}
          </div>
        )}

        {/* Watch progress bar */}
        {watchProgress != null && watchProgress > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, watchProgress))}%`,
                background: `linear-gradient(to right, ${palette.from}, ${palette.to})`,
              }}
            />
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate group-hover:text-cyan-100 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-white/60 flex-wrap">
          {character && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: `${palette.from}22`,
                color: palette.from,
              }}
            >
              {characterId && (
                <img
                  src={`/characters/${characterId}.png`}
                  alt=""
                  className="w-4 h-4 rounded-full"
                />
              )}
              {character}
            </span>
          )}
          {grumble && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-300 text-xs font-medium">
              {grumbleId && (
                <img
                  src={`/characters/${grumbleId}.png`}
                  alt=""
                  className="w-4 h-4 rounded-full"
                />
              )}
              vs {grumble}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
