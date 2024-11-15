'use client';
import { GooeyButton } from '@/components/core/gooey-button';
import { ArrowBigDownDash } from 'lucide-react';
import Link from 'next/link';

export function GooeyButtonLink() {
  return (
    <GooeyButton>
      <Link href='/'>hover me</Link>
    </GooeyButton>
  );
}
