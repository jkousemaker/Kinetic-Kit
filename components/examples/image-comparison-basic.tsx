'use client';

import ImageComparison from '@/components/core/image-comparison';
export function ImageComparisonBasic() {
  return (
    <div>
      <ImageComparison
        before='https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1887'
        after='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887'
        initialPosition={70}
        altBefore='BeforeImage'
        altAfter='AfterImage'
      />
    </div>
  );
}
