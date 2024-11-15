'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type HTMLMotionProps,
} from 'framer-motion';

const animatedButtonVariants = cva(
  'inline-flex overflow-hidden relative items-center justify-center gap-2 whitespace-nowrap  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-500/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        shimmer: 'bg-[#fb3b53] text-xs text-[#f6f6f6]',
      },
      size: {
        default: 'h-9 px-4 py-2 text-md font-medium',
        sm: 'h-8  px-3 text-xs font-medium',
        lg: 'h-10  px-8 text-lg font-medium',
        icon: 'h-9 w-9 text-sm font-medium',
      },
      radius: {
        default: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default',
    },
  }
);

function SequenceLoader({}) {
  const RippleVariants = {
    initial: { opacity: 0.5, scale: 0 },
    animate: { opacity: 0, scale: 1 },
  };
  const BounceVariants = {
    initial: { y: 0 },
    animate: { y: '50%' },
    exit: { y: 0 },
  };
  return (
    <div className='pointer-events-none absolute inset-0 grid place-items-center'>
      <motion.div
        initial='initial'
        animate='animate'
        transition={{ staggerChildren: 0.6 }}
        className='absolute grid size-full place-items-center'
      >
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
      </motion.div>
      <motion.div
        variants={{
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '100%' },
        }}
        initial='initial'
        animate='animate'
        exit='exit'
        className='relative flex size-full flex-row items-center justify-center space-x-2'
      >
        <motion.div
          className='relative aspect-square size-3 rounded-full bg-white'
          variants={BounceVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: 0.3,
            repeatType: 'mirror',
          }}
        ></motion.div>
        <motion.div
          className='relative aspect-square size-3 rounded-full bg-white'
          variants={BounceVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: 0.13,
            repeatType: 'mirror',
          }}
        ></motion.div>
        <motion.div
          className='relative aspect-square size-3 rounded-full bg-white'
          variants={BounceVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: 0,
            repeatType: 'mirror',
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
}

function ShimmerBorder({
  bgColor = '#f6f6f6',
  shimmerColor = '#FF98A4',
}: {
  bgColor?: string;
  shimmerColor?: string;
}) {
  return (
    <motion.div
      animate={{
        backgroundImage: `linear-gradient(120deg,${bgColor} calc(200% - 25%),${shimmerColor} 200%,${bgColor} calc(200% + 25%))`,
      }}
      initial={{
        backgroundImage: `linear-gradient(120deg,${bgColor} calc(-100% - 25%),${shimmerColor} -100%,${bgColor} calc(-100% + 25%))`,
      }}
      transition={{
        backgroundImage: {
          duration: 3,
          repeat: Infinity,
          ease: [0.445, 0.05, 0.55, 0.95],
        },
      }}
      className='pointer-events-none absolute box-content size-full rounded-[calc(0.5rem-0.125rem)] p-[0.125rem]'
    ></motion.div>
  );
}

// Combine the Button props with motion props
export interface AnimatedButtonProps
  extends Omit<
      HTMLMotionProps<'button'>,
      keyof VariantProps<typeof animatedButtonVariants>
    >,
    VariantProps<typeof animatedButtonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  shimmer?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      shimmer = true,
      ...props
    },
    ref
  ) => {
    const MotionButton = motion.create('button');

    const buttonVariants = {
      initial: { scale: 1 },
      whileTap: { scale: 0.9 },
      whileHover: { scale: 1.05 },
    };
    return (
      <MotionConfig transition={{ type: 'spring', duration: 1, bounce: 0.5 }}>
        <MotionButton
          disabled={loading}
          variants={buttonVariants}
          initial='initial'
          animate={loading ? 'whileLoading' : 'animate'}
          exit='exit'
          whileTap='whileTap'
          whileHover='whileHover'
          className={cn(animatedButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <motion.span
            variants={{
              initial: { y: '0%' },
              whileLoading: { y: '-100%' },
            }}
            className='relative'
          >
            {children}
          </motion.span>
          <AnimatePresence>
            {loading && <SequenceLoader key='seq' />}
          </AnimatePresence>
          {shimmer && (
            <ShimmerBorder
            />
          )}
        </MotionButton>
      </MotionConfig>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, animatedButtonVariants };
