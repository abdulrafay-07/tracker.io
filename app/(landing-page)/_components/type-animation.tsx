'use client'

import { ReactTyped } from 'react-typed';

interface TypeAnimationProps {
   text: string;
   className?: string;
   typeSpeed?: number;
   loop?: boolean;
   showCursor?: boolean;
};

export const TypeAnimation = ({
   text,
   className,
   typeSpeed = 100,
   loop = false,
   showCursor = false,
}: TypeAnimationProps) => {
   return (
      <ReactTyped
         strings={[`${text}`]}
         className={className}
         typeSpeed={typeSpeed}
         loop={loop}
         showCursor={showCursor}
         cursorChar={showCursor ? '_' : ''}
      />
   )
};