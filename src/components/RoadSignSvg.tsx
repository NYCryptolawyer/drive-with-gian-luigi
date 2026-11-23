import React from 'react';
import type { RoadSignId } from '../types';

interface RoadSignSvgProps {
  signId: RoadSignId;
  size?: number;
  className?: string;
  hideLabel?: boolean;
  label?: string;
}

export const RoadSignSvg: React.FC<RoadSignSvgProps> = ({
  signId,
  size = 136,
  className = '',
  hideLabel = false,
  label,
}) => {
  const ariaLabel = hideLabel ? 'New York State road sign' : label ?? signId.replace(/-/g, ' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={ariaLabel}
      className={`select-none shrink-0 drop-shadow-sm ${className}`}
    >
      {renderSignArtwork(signId)}
    </svg>
  );
};

function renderSignArtwork(signId: RoadSignId) {
  switch (signId) {
    case 'stop':
      return (
        <g>
          <polygon
            points="38,8 82,8 112,38 112,82 82,112 38,112 8,82 8,38"
            fill="#C81E1E"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          <polygon
            points="40,12 80,12 108,40 108,80 80,108 40,108 12,80 12,40"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <text
            x="60"
            y="69"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="28"
            fontWeight="800"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            STOP
          </text>
        </g>
      );

    case 'yield':
      return (
        <g>
          <polygon
            points="10,16 110,16 60,108"
            fill="#C81E1E"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon points="24,25 96,25 60,91" fill="#FFFFFF" strokeLinejoin="round" />
          <text
            x="60"
            y="49"
            textAnchor="middle"
            fill="#C81E1E"
            fontSize="16"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            YIELD
          </text>
        </g>
      );

    case 'wrong-way':
      return (
        <g>
          <rect x="8" y="24" width="104" height="72" rx="8" fill="#C81E1E" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="12" y="28" width="96" height="64" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <text
            x="60"
            y="55"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="19"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            WRONG
          </text>
          <text
            x="60"
            y="78"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="19"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            WAY
          </text>
        </g>
      );

    case 'do-not-enter':
      return (
        <g>
          <rect x="12" y="12" width="96" height="96" rx="8" fill="#FFFFFF" stroke="#233044" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="41" fill="#C81E1E" />
          <rect x="27" y="52" width="66" height="16" rx="2" fill="#FFFFFF" />
          <text
            x="60"
            y="43"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            DO NOT
          </text>
          <text
            x="60"
            y="84"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ENTER
          </text>
        </g>
      );

    case 'no-right-turn':
      return (
        <g>
          <rect x="12" y="12" width="96" height="96" rx="8" fill="#FFFFFF" stroke="#233044" strokeWidth="2.5" />
          <path
            d="M44 82 V50 Q44 40 54 40 H74"
            fill="none"
            stroke="#111827"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <polygon points="71,30 88,40 71,50" fill="#111827" />
          <circle cx="60" cy="60" r="36" fill="none" stroke="#C81E1E" strokeWidth="8" />
          <line x1="35" y1="35" x2="85" y2="85" stroke="#C81E1E" strokeWidth="8" strokeLinecap="round" />
        </g>
      );

    case 'no-u-turn':
      return (
        <g>
          <rect x="12" y="12" width="96" height="96" rx="8" fill="#FFFFFF" stroke="#233044" strokeWidth="2.5" />
          <path
            d="M44 82 V48 A16 16 0 0 1 76 48 V66"
            fill="none"
            stroke="#111827"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <polygon points="66,64 76,81 86,64" fill="#111827" />
          <circle cx="60" cy="60" r="36" fill="none" stroke="#C81E1E" strokeWidth="8" />
          <line x1="35" y1="35" x2="85" y2="85" stroke="#C81E1E" strokeWidth="8" strokeLinecap="round" />
        </g>
      );

    case 'one-way':
      return (
        <g>
          <rect x="8" y="34" width="104" height="52" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
          <rect x="12" y="38" width="96" height="44" rx="4" fill="#111827" />
          <polygon points="20,52 76,52 76,43 101,60 76,77 76,68 20,68" fill="#FFFFFF" />
          <text
            x="55"
            y="64"
            textAnchor="middle"
            fill="#111827"
            fontSize="12"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ONE WAY
          </text>
        </g>
      );

    case 'speed-limit-55':
      return (
        <g>
          <rect x="20" y="8" width="80" height="104" rx="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
          <rect x="24" y="12" width="72" height="96" rx="4" fill="none" stroke="#111827" strokeWidth="2" />
          <text
            x="60"
            y="32"
            textAnchor="middle"
            fill="#111827"
            fontSize="13.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            SPEED
          </text>
          <text
            x="60"
            y="49"
            textAnchor="middle"
            fill="#111827"
            fontSize="13.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            LIMIT
          </text>
          <text
            x="60"
            y="94"
            textAnchor="middle"
            fill="#111827"
            fontSize="41"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            55
          </text>
        </g>
      );

    case 'keep-right':
      return (
        <g>
          <rect x="20" y="8" width="80" height="104" rx="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
          <rect x="24" y="12" width="72" height="96" rx="4" fill="none" stroke="#111827" strokeWidth="2" />
          <text
            x="60"
            y="29"
            textAnchor="middle"
            fill="#111827"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            KEEP
          </text>
          <text
            x="60"
            y="43"
            textAnchor="middle"
            fill="#111827"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            RIGHT
          </text>
          {/* Median island pill */}
          <rect x="35" y="75" width="12" height="24" rx="6" fill="#111827" />
          {/* Curved arrow passing to the right */}
          <path
            d="M41 70 C41 56, 74 56, 74 72 V88"
            fill="none"
            stroke="#111827"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="66,85 82,85 74,99" fill="#111827" />
        </g>
      );

    case 'no-standing':
      return (
        <g>
          <rect x="20" y="8" width="80" height="104" rx="7" fill="#FFFFFF" stroke="#C81E1E" strokeWidth="2.5" />
          <rect x="24" y="12" width="72" height="96" rx="4" fill="none" stroke="#C81E1E" strokeWidth="2" />
          <text
            x="60"
            y="34"
            textAnchor="middle"
            fill="#C81E1E"
            fontSize="16"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            NO
          </text>
          <text
            x="60"
            y="53"
            textAnchor="middle"
            fill="#C81E1E"
            fontSize="12"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            STANDING
          </text>
          <text
            x="60"
            y="72"
            textAnchor="middle"
            fill="#C81E1E"
            fontSize="12"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ANY
          </text>
          <text
            x="60"
            y="90"
            textAnchor="middle"
            fill="#C81E1E"
            fontSize="12"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            TIME
          </text>
        </g>
      );

    case 'school-zone':
      return (
        <g>
          <polygon
            points="60,8 109,46 93,108 27,108 11,46"
            fill="#C9E71E"
            stroke="#111827"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="60,13 104,48 89,103 31,103 16,48"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Larger child walking */}
          <circle cx="46" cy="44" r="6" fill="#111827" />
          <path
            d="M46 51 L43 68 L36 90 M45 68 L53 90 M37 58 L55 56"
            stroke="#111827"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Smaller child walking */}
          <circle cx="72" cy="51" r="5" fill="#111827" />
          <path
            d="M72 57 L70 72 L64 90 M71 72 L79 90 M62 63 L80 61"
            stroke="#111827"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      );

    case 'railroad-advance':
      return (
        <g>
          <circle cx="60" cy="60" r="49" fill="#FACC15" stroke="#111827" strokeWidth="3" />
          <circle cx="60" cy="60" r="44" fill="none" stroke="#111827" strokeWidth="2.5" />
          <line x1="27" y1="27" x2="93" y2="93" stroke="#111827" strokeWidth="7.5" strokeLinecap="round" />
          <line x1="93" y1="27" x2="27" y2="93" stroke="#111827" strokeWidth="7.5" strokeLinecap="round" />
          <text
            x="33"
            y="67"
            textAnchor="middle"
            fill="#111827"
            fontSize="22"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            R
          </text>
          <text
            x="87"
            y="67"
            textAnchor="middle"
            fill="#111827"
            fontSize="22"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            R
          </text>
        </g>
      );

    case 'no-passing-zone':
      return (
        <g>
          <polygon
            points="10,24 112,60 10,96"
            fill="#FACC15"
            stroke="#111827"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="14,29 102,60 14,91"
            fill="none"
            stroke="#111827"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <text
            x="44"
            y="51"
            textAnchor="middle"
            fill="#111827"
            fontSize="11.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            NO
          </text>
          <text
            x="45"
            y="65"
            textAnchor="middle"
            fill="#111827"
            fontSize="11.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            PASSING
          </text>
          <text
            x="42"
            y="78"
            textAnchor="middle"
            fill="#111827"
            fontSize="11.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ZONE
          </text>
        </g>
      );

    case 'deer-crossing':
      return (
        <g>
          {yellowDiamond()}
          {/* Leaping deer silhouette */}
          <path
            d="M34 68 C40 58, 52 57, 62 56 L68 42 L74 40 M69 41 L74 33 M71 41 L79 34 M68 45 L82 47 L79 52 L69 51 L65 63 L78 78 M63 63 L55 82 M43 65 L32 82 M41 63 L27 72"
            fill="none"
            stroke="#111827"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="53" cy="60" rx="14" ry="7" fill="#111827" transform="rotate(-10 53 60)" />
        </g>
      );

    case 'slippery-when-wet':
      return (
        <g>
          {yellowDiamond()}
          {/* Car */}
          <path
            d="M43 44 L48 33 H72 L77 44 H81 V55 H39 V44 Z"
            fill="#111827"
          />
          <rect x="49" y="36" width="22" height="7" fill="#FACC15" rx="1" />
          {/* Wavy skid tracks */}
          <path
            d="M47 59 C39 67, 56 75, 45 86"
            fill="none"
            stroke="#111827"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M73 59 C65 67, 82 75, 71 86"
            fill="none"
            stroke="#111827"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      );

    case 'merge':
      return (
        <g>
          {yellowDiamond()}
          <line x1="65" y1="86" x2="65" y2="39" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
          <polygon points="54,42 65,24 76,42" fill="#111827" />
          <path d="M40 80 Q56 64 65 55" fill="none" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
        </g>
      );

    case 'divided-highway-begins':
      return (
        <g>
          {yellowDiamond()}
          {/* Top median island */}
          <path d="M51 35 C51 28, 69 28, 69 35 V54 H51 Z" fill="#111827" />
          {/* Left arrow */}
          <path d="M40 42 V64 Q40 73 48 79 V87" fill="none" stroke="#111827" strokeWidth="5.5" strokeLinecap="round" />
          <polygon points="32,45 40,30 48,45" fill="#111827" />
          {/* Right arrow */}
          <path d="M80 82 V64 Q80 55 72 52" fill="none" stroke="#111827" strokeWidth="5.5" strokeLinecap="round" />
          <polygon points="72,78 80,93 88,78" fill="#111827" />
        </g>
      );

    case 'winding-road':
      return (
        <g>
          {yellowDiamond()}
          <path
            d="M52 88 C52 75, 72 72, 72 60 C72 48, 48 48, 48 36"
            fill="none"
            stroke="#111827"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <polygon points="37,39 48,22 59,39" fill="#111827" />
        </g>
      );

    case 'signal-ahead':
      return (
        <g>
          {yellowDiamond()}
          <rect x="47" y="29" width="26" height="62" rx="6" fill="#111827" />
          <circle cx="60" cy="41" r="6.8" fill="#EF4444" />
          <circle cx="60" cy="60" r="6.8" fill="#FACC15" />
          <circle cx="60" cy="79" r="6.8" fill="#22C55E" />
        </g>
      );

    case 'pedestrian-crossing':
      return (
        <g>
          {yellowDiamond('#C9E71E')}
          <circle cx="60" cy="36" r="6.5" fill="#111827" />
          <path
            d="M60 44 L57 62 L46 86 M59 62 L71 86 M47 54 L60 48 L72 56"
            fill="none"
            stroke="#111827"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="39" y1="89" x2="81" y2="89" stroke="#111827" strokeWidth="3.5" strokeDasharray="5 4" />
        </g>
      );

    case 'road-work-ahead':
      return (
        <g>
          <polygon
            points="60,7 113,60 60,113 7,60"
            fill="#F97316"
            stroke="#111827"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="60,13 107,60 60,107 13,60"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="60"
            y="48"
            textAnchor="middle"
            fill="#111827"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ROAD
          </text>
          <text
            x="60"
            y="64"
            textAnchor="middle"
            fill="#111827"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            WORK
          </text>
          <text
            x="60"
            y="80"
            textAnchor="middle"
            fill="#111827"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            AHEAD
          </text>
        </g>
      );

    case 'hospital-service':
      return (
        <g>
          <rect x="14" y="14" width="92" height="92" rx="10" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="19" y="19" width="82" height="82" rx="7" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="60"
            y="81"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="64"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            H
          </text>
        </g>
      );
  }
}

function yellowDiamond(fill = '#FACC15') {
  return (
    <>
      <polygon
        points="60,7 113,60 60,113 7,60"
        fill={fill}
        stroke="#111827"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points="60,13 107,60 60,107 13,60"
        fill="none"
        stroke="#111827"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  );
}
