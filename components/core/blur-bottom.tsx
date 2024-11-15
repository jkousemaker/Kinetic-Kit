'use client';

import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

export interface BlurBottomProps extends HTMLAttributes<HTMLDivElement> {}

const BlurBottom = React.forwardRef<HTMLDivElement, BlurBottomProps>(
  (
    {
      children,
      className,

      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'after:[-webkit-mask:_linear-gradient(180deg,_transparent 60%,_#000_95.5%,_#000)] pointer-events-none absolute bottom-0 z-10 h-[10%] w-full before:absolute before:inset-0 before:z-[1] before:backdrop-blur-[0.5px] before:[-webkit-mask:_linear-gradient(180deg,_transparent_0%,_#000_12.5%,_#000_25%,_transparent_37.5%)] before:[mask:_linear-gradient(180deg,_transparent_0%,_#000_12.5%,_#000_25%,_transparent_37.5%)] after:absolute after:inset-0 after:backdrop-blur-[32px] after:backdrop-saturate-200 after:[mask:_linear-gradient(180deg,_transparent_75%,_#000_87.5%,_#000)]',
          className
        )}
        ref={ref}
        {...props}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const mask = `linear-gradient(180deg, transparent ${12.5 * (index + 1)}%, #000 ${25 + 12.5 * index}%, #000 ${37.5 + 12.5 * index}%, transparent ${50 + 12.5 * index}%)`;
          return (
            <div
              key={`${index}-bottom-blur`}
              className='absolute inset-0'
              style={{
                zIndex: index + 2,
                backdropFilter: `blur(${2 ** index}px) `,
                WebkitBackdropFilter: `blur(${2 ** index}px) `,
                mask: mask,
                WebkitMask: mask,
              }}
            />
          );
        })}
      </div>
    );
  }
);

export { BlurBottom };
