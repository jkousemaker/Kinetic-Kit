'use client';

import { FC, useRef } from 'react';
import Image from 'next/image';
import {
  useScroll,
  useTransform,
  motion,
  UseScrollOptions,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface Picture {
  src: string;
  alt?: string;
  classes?: string;
  scaleAmount?: number;
}

interface Props {
  pictures: Picture[];
  classes?: string;
  height?: string;
  scaleRange?: {
    min: number;
    max: number;
  };
  scrollConfig?: {
    offset: UseScrollOptions['offset'];
  };
}

const GridSection: FC<Props> = ({
  pictures,
  classes,
  height = '200vh',
  scaleRange = { min: 1, max: 9 },
  scrollConfig = { offset: ['start start', 'end end'] },
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: scrollConfig.offset,
  });

  // Generate scale values dynamically based on the number of pictures
  const scales = pictures.map((_, index) => {
    const scaleAmount = pictures[index].scaleAmount || index + 1;
    const maxScale = Math.min(scaleRange.max, scaleAmount);
    return useTransform(scrollYProgress, [0, 1], [scaleRange.min, maxScale]);
  });

  return (
    <section
      ref={container}
      className={cn('relative w-full', classes)}
      style={{ height }}
    >
      <div className='sticky top-0 h-screen overflow-hidden'>
        {pictures.map(
          ({ src, alt = 'image', classes: pictureClasses }, index) => (
            <motion.div
              key={index}
              style={{ scale: scales[index] }}
              className='absolute top-0 flex h-full w-full items-center justify-center'
            >
              <div className={cn('relative', pictureClasses)}>
                <Image src={src} fill alt={alt} className='object-cover' />
              </div>
            </motion.div>
          )
        )}
      </div>
      <div className='leading-0 h-screen' />
    </section>
  );
};

export { GridSection };
