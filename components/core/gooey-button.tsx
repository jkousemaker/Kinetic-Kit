'use client';
import * as React from 'react';
import {
  AnimatePresence,
  Transition,
  Variant,
  motion,
  MotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { ArrowBigRight } from 'lucide-react';

interface GooeyIconProps {
  children: React.ReactNode;
  prependIcon?: boolean;
}

const GooeyIcon = React.forwardRef<HTMLDivElement, GooeyIconProps>(
  ({ children, prependIcon = false }, ref) => {
    return (
      <>
        <div
          className={cn(
            'absolute inset-0 z-[-10] flex size-full justify-end',
            prependIcon && '!justify-start'
          )}
        >
          <motion.div
            variants={{
              initial: { x: '0%' },
              hover: { x: prependIcon ? '-130%' : '130%' },
            }}
            transition={{ type: 'spring', duration: 2 }}
            className='relative flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-black text-white'
            ref={ref}
          >
            {children}
          </motion.div>
        </div>
      </>
    );
  }
);

interface GooeyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement<{ size?: number }>;
  prependIcon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const GooeyButton = React.forwardRef<HTMLButtonElement, GooeyButtonProps>(
  (
    {
      children,
      className,
      icon = <ArrowBigRight size={28} />,
      prependIcon = false,
      onClick,
    },
    ref
  ) => {
    return (
      <>
        <div className='flex h-full w-full items-center justify-center [filter:_url(#gooey)]'>
          <motion.button
            initial='initial'
            animate='animate'
            whileHover='hover'
            className={cn(
              'relative inline-flex h-16 items-center rounded-xl bg-black px-6 py-0 text-xl font-bold leading-5 text-gray-200',
              className
            )}
            onClick={onClick}
            ref={ref}
          >
            {children}
            <GooeyIcon prependIcon={prependIcon}>{icon}</GooeyIcon>
          </motion.button>
        </div>

        <svg
          className='absolute hidden'
          width='0'
          height='0'
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
        >
          <defs>
            <filter id='gooey'>
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='10'
                result='blur'
              />
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10'
                result='gooey'
              />
              <feComposite in='SourceGraphic' in2='gooey' operator='atop' />
            </filter>
          </defs>
        </svg>
      </>
    );
  }
);
GooeyButton.displayName = 'GooeyButton';
export { GooeyButton };
