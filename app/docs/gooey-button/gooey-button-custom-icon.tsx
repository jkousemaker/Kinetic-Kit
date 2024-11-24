import { GooeyButton } from '@/components/core/gooey-button';
import { ArrowBigDownDash } from 'lucide-react';
export function GooeyButtonCustomIcon() {
  return (
    <GooeyButton Icon={ArrowBigDownDash} iconPlacement='left'>
      hover me
    </GooeyButton>
  );
}
