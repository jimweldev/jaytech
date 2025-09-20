import { useEffect, useRef, useState } from 'react';
import ReactImage from '@/components/image/react-image';

const CHAR_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/~`';

const RandomizeLetters = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => {
  const letters = text.split('');
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const intervalRef = useRef<number | null>(null);

  const startRandomize = () => {
    const start = Date.now();
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed > 800) {
        stopRandomize();
        return;
      }

      letterRefs.current.forEach(el => {
        if (el) {
          const randChar =
            CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
          el.textContent = randChar;
        }
      });
    }, 50);
  };

  const stopRandomize = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    letterRefs.current.forEach((el, i) => {
      if (el) el.textContent = letters[i];
    });
  };

  useEffect(() => {
    if (isActive) startRandomize();
    else stopRandomize();
    return stopRandomize; // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <span className="inline-block">
      {letters.map((char, i) => (
        <span
          key={i}
          ref={el => {
            if (el) letterRefs.current[i] = el;
          }}
          className="inline-block"
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const GlitchyLogo = ({ isActive }: { isActive: boolean }) => {
  const [filterStyle, setFilterStyle] = useState({
    filter: 'brightness(1) contrast(1)',
  });
  const [pathStyles, setPathStyles] = useState([
    {
      transform: 'translateX(0px) translateY(0px)',
      transformOrigin: '50% 50%',
      opacity: 1,
    },
    {
      transform: 'translateX(0px) translateY(0px)',
      transformOrigin: '50% 50%',
      opacity: 1,
    },
  ]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const randomizeStyles = () => {
    setFilterStyle({
      filter: `brightness(${(Math.random() * 2 + 0.5).toFixed(2)}) contrast(${(Math.random() * 2 + 0.5).toFixed(2)})`,
    });

    setPathStyles([
      {
        transform: `translateX(${(Math.random() - 0.5) * 20}px) translateY(${(Math.random() - 0.5) * 20}px)`,
        transformOrigin: `${Math.random() * 100}% ${Math.random() * 100}%`,
        opacity: Number(Math.random().toFixed(2)),
      },
      {
        transform: `translateX(${(Math.random() - 0.5) * 20}px) translateY(${(Math.random() - 0.5) * 20}px)`,
        transformOrigin: `${Math.random() * 100}% ${Math.random() * 100}%`,
        opacity: Number(Math.random().toFixed(2)),
      },
    ]);
  };

  const startGlitch = () => {
    const start = Date.now();
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed > 1000) {
        stopGlitch();
        return;
      }
      randomizeStyles();
    }, 50);
  };

  const stopGlitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setFilterStyle({ filter: 'brightness(1) contrast(1)' });
    setPathStyles([
      {
        transform: 'translateX(0px) translateY(0px)',
        transformOrigin: '50% 50%',
        opacity: 1,
      },
      {
        transform: 'translateX(0px) translateY(0px)',
        transformOrigin: '50% 50%',
        opacity: 1,
      },
    ]);
  };

  useEffect(() => {
    if (isActive) startGlitch();
    else stopGlitch();
    return stopGlitch; // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={filterStyle}
    >
      <g transform="translate(5,15) scale(0.1)">
        <path
          d="M140 20 H80 V40 H120 V120 C120 140 100 140 100 140 H60 V160 H100 C140 160 140 120 140 120 V20 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={pathStyles[0]}
        />
      </g>
      <g transform="translate(20,15) scale(0.1)">
        <path
          d="M60 20 H180 V40 H130 V160 H110 V40 H60 V20 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={pathStyles[1]}
        />
      </g>
    </svg>
  );
};

export default function LogoWithHover() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="inline-flex cursor-pointer items-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <GlitchyLogo isActive={isHover} /> */}
      <ReactImage className="size-7" src="/logos/logo.png" alt="logo" />
      <span className="ml-2 font-mono text-lg font-semibold tracking-tight sm:text-2xl">
        <RandomizeLetters text="JayTech" isActive={isHover} />
      </span>
    </div>
  );
}
