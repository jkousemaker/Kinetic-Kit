'use client';
import Image from 'next/image';
import ScrollTransform from '@/components/core/scroll-transform';
export function ScrollTransformBasic() {
  return (
    <div className='h-[900px] w-[300px]'>
      <ScrollTransform>
        <Image src='/eb-27-lamp-edouard-wilfrid-buquet.jpg' alt='dev' fill />
      </ScrollTransform>
    </div>
  );
}
