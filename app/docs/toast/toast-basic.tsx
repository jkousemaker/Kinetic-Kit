'use client';

import { AnimatedButton } from '@/components/core/animated-button';

import { useToast } from '@/components/core/toast';
export function ToastBasic() {
  const { showToast } = useToast();
  return (
    <form
      action={() => {
        showToast({
          title: 'Saved',
          description: 'Your changes have been saved.',
        });
      }}
    >
      <AnimatedButton variant='outline' type='submit'>
        Save
      </AnimatedButton>
    </form>
  );
}
