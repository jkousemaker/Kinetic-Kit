'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { init } from 'next/dist/compiled/webpack/webpack';

const buttonVariants = cva(
  'z-50 inline-flex overflow-hidden rounded-lg relative items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
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
        default: 'h-9 px-4 py-2 rounded-[calc(0.5rem-0.125rem)]',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function SequenceLoader({}) {
  const RippleVariants = {
    initial: { opacity: 1, scale: 0 },
    animate: { opacity: 0, scale: 1 },
  };
  return (
    <div className='pointer-events-none absolute inset-0 z-[999] overflow-hidden rounded-[calc(0.5rem-0.125rem)]'>
      <motion.div
        initial='initial'
        animate='animate'
        transition={{ staggerChildren: 0.4 }}
        className='relative grid size-full place-items-center'
      >
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
        <motion.div
          className='absolute aspect-square h-auto w-full rounded-full bg-red-500'
          variants={RippleVariants}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
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
      keyof VariantProps<typeof buttonVariants>
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  shimmer?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      shimmer = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const MotionComp = motion.create(Comp);
    return (
      <motion.div
        initial={{
          scale: 1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        whileHover={{
          scale: 1.05,
        }}
        transition={{
          stiffness: 500,
          damping: 20,
          type: 'spring',
          backgroundImage: {
            duration: 3,
            repeat: Infinity,
            ease: [0.445, 0.05, 0.55, 0.95],
          },
        }}
        className='relative flex items-center justify-center'
      >
        {shimmer && <ShimmerBorder />}
        <MotionComp
          disabled={loading}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {loading && <SequenceLoader />}
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, buttonVariants };
