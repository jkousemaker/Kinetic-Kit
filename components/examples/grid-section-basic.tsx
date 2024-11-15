'use client';
import { GridSection } from '@/components/core/grid-section';
const pictures = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528',
    alt: 'Portrait 1',
    classes: 'relative w-[25%] h-[25%]',
    scaleAmount: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1887',
    alt: 'Portrait 2',
    classes: 'relative top-[-30%] left-[5%] w-[35%] h-[30%]',
    scaleAmount: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887',
    alt: 'Portrait 3',
    classes: 'relative top-[-29%] left-[-25%] w-[20%] h-[28%]',
    scaleAmount: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974',
    alt: 'Portrait 4',
    classes: 'relative left-[27.5%] w-[25%] h-[25%]',
    scaleAmount: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?q=80&w=1974',
    alt: 'Portrait 5',
    classes: 'relative left-[-27.5%] w-[25%] h-[25%]',
    scaleAmount: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071',
    alt: 'Portrait 6',
    classes: 'relative top-[27.5%] left-[5%] w-[20%] h-[25%]',
    scaleAmount: 8,
  },
  {
    src: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070',
    alt: 'Portrait 7',
    classes: 'relative top-[22.5%] left-[25%] w-[15%] h-[15%]',
    scaleAmount: 9,
  },
];
export function GridSectionBasic() {
  return (
    <>
      <GridSection pictures={pictures} />
    </>
  );
}
