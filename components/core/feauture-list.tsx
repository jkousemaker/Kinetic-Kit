'use client';

import { cn } from '@/lib/utils';
import {
  LayoutGroup,
  motion,
  motionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import React, { useRef } from 'react';
const MotionLink = motion.create(Link);
const feautures = [
  {
    title: 'Simple',
    description:
      'Motions pick-up-and-play API is easy to start and fun to master.',
    color: '#0fd3ec',
  },
  {
    title: 'Powerful',
    description:
      'Motion is built on top of the Web Animations API, giving you the power to create complex animations.',
    color: '#f2b705',
  },
  {
    title: 'Flexible',
    description:
      'Motion is designed to adapt to your preferred workflow. Use it with any view library or none at all.',
    color: '#f2709c',
  },
  {
    title: 'Production-ready',
    description:
      'Motion is used in production by Framer, OpenAI, and more. It’s battle-tested and ready to ship.',
    color: '#2cc88f',
  },
  {
    title: 'Community-driven',
    description:
      'Motion is open-source and maintained by a team of passionate developers. Join our community on Discord.',
    color: '#ff0080',
  },
  {
    title: 'Accessible',
    description:
      'Motion is built with accessibility in mind. It’s fully compliant with the Web Content Accessibility Guidelines.',
    color: '#ff6d00',
  },
  {
    title: 'Performant',
    description:
      'Motion is built to be performant. It’s lightweight and optimized for 60fps animations.',
    color: '#1eae98',
  },
  {
    title: 'Responsive',
    description:
      'Motion is designed to work on any device. It’s responsive out of the box.',
    color: '#ff4b4b',
  },
  {
    title: 'Customizable',
    description:
      'Motion is designed to be customized. Use it to create unique animations that match your brand.',
    color: '#f2b705',
  },
  {
    title: 'Interactive',
    description:
      'Motion is designed to be interactive. Use it to create animations that respond to user input.',
    color: '#ff0080',
  },
  {
    title: 'Cross-platform',
    description:
      'Motion is designed to work on any platform. Use it to create animations for web, mobile, and more.',
    color: '#ff6d00',
  },
  {
    title: 'Modular',
    description:
      'Motion is designed to be modular. Use it to create animations that can be reused across your app.',
    color: '#1eae98',
  },
  {
    title: 'Consistent',
    description:
      'Motion is designed to be consistent. Use it to create animations that match your design system.',
    color: '#ff4b4b',
  },
];
export function FeautureList({}) {
  const [activeSection, setActiveSection] = React.useState(0);
  const currentProgress = motionValue(0);
  const y = useTransform(currentProgress, [0, 1], ['-100%', '0%']);
  return (
    <section
      style={{ height: `${feautures.length * 100}vh` }}
      className='relative w-full flex-col flex-nowrap bg-red-500/20 pt-20'
    >
      <div className='sticky top-0 flex h-screen w-full flex-none flex-col flex-nowrap items-center justify-around overflow-hidden bg-blue-300/20'>
        <div className='relative h-auto w-full max-w-screen-xl flex-none'>
          <div className='relative flex h-min w-full max-w-full flex-row flex-wrap content-start items-start justify-between overflow-visible p-5'>
            <ul className='relative m-0 flex h-min w-px flex-[0.3_0_0px] list-none flex-col flex-nowrap items-center justify-start gap-0'>
              <LayoutGroup>
                {feautures.map((feauture, index) => {
                  const isActive = activeSection === index;

                  return (
                    <motion.li
                      layout
                      className='relative h-auto w-full flex-none'
                      key={`feauture-${index}-${feauture.color}`}
                    >
                      <MotionLink
                        layout
                        className={cn(
                          'relative flex h-min w-full flex-col flex-nowrap items-start justify-center gap-3 overflow-visible py-10 pl-2.5',
                          !isActive && 'gap-0 p-0 pl-2.5'
                        )}
                        href={`./#section-${feauture.title}`}
                      >
                        <div
                          className={cn(
                            'relative flex h-min w-full flex-col flex-nowrap items-start justify-center gap-3 overflow-visible p-0'
                          )}
                        >
                          <motion.div
                            className='absolute -left-5 bottom-0 top-0 z-[1] w-1 flex-none overflow-hidden'
                            style={{
                              borderRadius: 10,
                              opacity: isActive ? 1 : 0,
                            }}
                          >
                            <motion.div style={{ y }} className='h-full'>
                              <div
                                className='absolute inset-0 flex-none overflow-visible'
                                style={{ backgroundColor: feauture.color }}
                              ></div>
                            </motion.div>
                            <div
                              className='absolute inset-0 z-[1] flex-none overflow-visible opacity-30'
                              style={{
                                borderRadius: 10,
                                backgroundColor: feauture.color,
                              }}
                            ></div>
                          </motion.div>

                          <motion.div layout className=''>
                            <motion.h3
                              layout
                              style={{ fontSize: isActive ? 32 : 24 }}
                            >
                              {feauture.title}
                            </motion.h3>
                          </motion.div>
                          <motion.div
                            layout
                            style={{
                              opacity: isActive ? 1 : 0,
                            }}
                            className={cn(
                              'absolute top-10 flex h-auto w-full flex-none shrink-0 flex-col justify-start whitespace-pre-wrap opacity-0 transition-opacity duration-100 [word-break:_break-word] [word-wrap:_break-word]',
                              isActive &&
                                'relative top-0 opacity-100 duration-1000'
                            )}
                          >
                            <p className='' style={{ fontSize: 18 }}>
                              {feauture.description}
                            </p>
                          </motion.div>
                        </div>
                      </MotionLink>
                    </motion.li>
                  );
                })}
              </LayoutGroup>
            </ul>
            <div
              className='relative h-[calc(100vh_*_.65)] max-h-[520px] w-px min-w-[350px] flex-[.6_0_0px] overflow-visible'
              style={{
                perspective: '1000px',
                borderRadius: 10,
                backgroundColor: feautures[activeSection].color,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='pointer-events-none absolute left-0 right-0 top-0 z-[1] flex h-min flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-hidden p-0'>
        {feautures.map((feauture, index) => {
          const section = useRef(null);
          const { scrollYProgress } = useScroll({
            target: section,
            offset: ['start start', 'end start'],
          });
          useMotionValueEvent(scrollYProgress, 'change', (progress) => {
            setActiveSection(index);

            console.log(index, progress);
            currentProgress.set(progress);
          });
          return (
            <div
              ref={section}
              key={`scroller-${index}-${feauture.title}`}
              className='relative h-screen w-full flex-none overflow-hidden'
            ></div>
          );
        })}
      </div>
    </section>
  );
}
