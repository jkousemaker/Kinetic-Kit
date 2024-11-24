'use client';
import * as React from 'react';
import {
  AnimatePresence,
  Transition,
  Variant,
  motion,
  MotionProps,
  animate,
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
        <span
          className={cn(
            'absolute inset-0 z-[-10] flex size-full justify-end',
            prependIcon && '!justify-start'
          )}
        >
          <motion.span
            variants={{
              initial: { x: '0%' },
              hover: { x: prependIcon ? '-130%' : '130%' },
            }}
            transition={{
              type: 'spring',
              duration: 1,
              bounce: 0.05,
            }}
            className='relative flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-black text-white'
            ref={ref}
          >
            <motion.span
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0 },
                },
                hover: {
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.1 },
                },
              }}
            >
              {children}
            </motion.span>
          </motion.span>
        </span>
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
        <motion.button
          initial='initial'
          animate='animate'
          whileHover='hover'
          className={cn(
            'relative flex h-16 items-center justify-center rounded-xl px-6 py-0 text-xl font-bold leading-5 text-gray-200 [filter:_url(#gooey)]',
            className
          )}
          onClick={onClick}
          ref={ref}
        >
          <span className='relative z-20'>{children}</span>
          <span className='absolute inset-0 z-10 rounded-xl bg-black' />
          <GooeyIcon prependIcon={prependIcon}>{icon}</GooeyIcon>
        </motion.button>

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
