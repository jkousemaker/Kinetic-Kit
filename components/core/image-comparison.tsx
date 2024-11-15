'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';
import { useMouse } from '@/hooks/useMouse';
import { useMeasure } from '@/hooks/useMeasure';
import {
  useTransform,
  motion,
  m,
  motionValue,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';

type ImageComparisonProps = {
  before: string;
  after: string;
  initialPosition?: number;
  altBefore?: string;
  altAfter?: string;
};

export default function ImageComparison({
  before,
  after,

  initialPosition = 70,
  altBefore = 'Before',
  altAfter = 'After',
}: ImageComparisonProps) {
  const [mouse, parentRef] = useMouse();
  const [ref, { width, height }] = useMeasure();
  const elementX = useSpring(initialPosition, {
    stiffness: 1000,
    damping: 100,
  });

  return (
    <div
      className='relative h-[200px] w-[250px] cursor-pointer overflow-hidden rounded-3xl md:h-[346px] md:w-[500px]'
      ref={parentRef}
      onMouseMove={() => {
        if (width && height) {
          elementX.set((mouse.elementX! / width) * 100);
        }
      }}
    >
      <div ref={ref} className='relative size-full'>
        <Image
          src={before}
          alt={altBefore}
          className='absolute left-0 top-0 h-full w-full object-cover'
          fill
        />
        <motion.div
          className='absolute left-0 top-0 h-full w-full object-cover'
          style={{
            clipPath: useMotionTemplate`inset(0% 0% 0% ${elementX}%)`,
          }}
        >
          <Image
            src={after}
            alt={altAfter}
            className='relative size-full object-cover'
            fill
          />
        </motion.div>

        <motion.div
          className='absolute right-1 top-0 z-10 flex h-full w-full items-center'
          style={{
            x: useMotionTemplate`${elementX}%`,
          }}
        >
          <div className='h-full w-2 cursor-move bg-white'></div>
          <div className='relative mt-8 flex h-10 w-10 -translate-x-6 translate-y-14 transform cursor-move items-center justify-center rounded-full bg-white'>
            <div className='relative size-8'>
              <ChevronsLeftRight size={10} className='size-full text-black' />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
