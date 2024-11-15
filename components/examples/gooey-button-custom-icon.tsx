'use client';
import { GooeyButton } from '@/components/core/gooey-button';
import { ArrowBigDownDash } from 'lucide-react';
export function GooeyButtonCustomIcon() {
  return (
    <GooeyButton prependIcon icon={<ArrowBigDownDash size={28} />}>
      hover me
    </GooeyButton>
  );
}
