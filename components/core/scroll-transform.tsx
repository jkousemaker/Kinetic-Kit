'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
export default function ScrollTransform({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={container} className='relative size-full'>
      <motion.div className='relative size-full' style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
