'use client';
import { AnimatedButton } from '@/components/core/animated-button';
import Link from 'next/link';
import React from 'react';

export function AnimatedButtonBasic() {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className='flex justify-center gap-2'>
      <AnimatedButton
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
        variant='default'
        size='lg'
      >
        Click me
      </AnimatedButton>
      <AnimatedButton>Link</AnimatedButton>
    </div>
  );
}
