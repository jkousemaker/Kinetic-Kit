import { DynamicBar } from '@/components/core/dynamic-bar';

export function DynamicBarBasic() {
  return (
    <>
      <div className='fixed bottom-0 left-0 z-[9999] w-full p-5'>
        <DynamicBar />
      </div>
    </>
  );
}
