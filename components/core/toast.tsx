// toast.tsx
'use client';

import { CrossIcon } from 'lucide-react';
import * as RadixToast from '@radix-ui/react-toast';
import {
  AnimatePresence,
  motion,
  motionValue,
  useDragControls,
  useTransform,
  cubicBezier,
  useSpring,
} from 'framer-motion';
import {
  ElementRef,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

const swipeThreshold = 100;

const ToastContext = createContext<{
  showToast: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
}>({
  showToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<
    { id: string; title: string; description: string }[]
  >([]);

  function showToast({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    setMessages((toasts) => [
      ...toasts,
      {
        id: window.crypto.randomUUID(),
        title,
        description,
      },
    ]);
  }

  return (
    <RadixToast.Provider swipeThreshold={swipeThreshold}>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>

      <AnimatePresence mode='popLayout'>
        {messages.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            onClose={() =>
              setMessages((toasts) => toasts.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </AnimatePresence>

      <RadixToast.Viewport className='fixed right-4 top-4 flex w-80 flex-col-reverse gap-3 max-sm:top-20' />
    </RadixToast.Provider>
  );
}

const Toast = forwardRef<
  ElementRef<typeof RadixToast.Root>,
  {
    onClose: () => void;
    title: string;
    description?: string;
  }
>(function Toast({ onClose, title, description }, forwardedRef) {
  let width = 320;
  let margin = 16;
  const x = useSpring(0);
  const opacity = useTransform(
    x,
    [0, swipeThreshold * 0.7, swipeThreshold],
    [1, 0.7, 0]
  );
  return (
    <RadixToast.Root
      ref={forwardedRef}
      asChild
      forceMount
      onOpenChange={onClose}
      style={{ userSelect: 'auto' }}
      duration={25000}
      onSwipeMove={(event) => {
        console.log(event.detail.delta.x);
        x.set(event.detail.delta.x);
      }}
      onSwipeCancel={(event) => {
        if (event.detail.delta.x <= swipeThreshold) {
          console.log('swipe cancel');
          x.set(0);
        }
      }}
    >
      <motion.li
        drag='x'
        dragConstraints={{ left: 0, right: 300 }}
        dragElastic={0.2}
        dragSnapToOrigin
        //dragMomentum={false}
        layout
        initial={{ x: width + margin }}
        animate={{ x: 0 }}
        exit={{
          x: width + margin,
          //opacity: 0,
          zIndex: -1,
          transition: {
            opacity: {
              duration: 0.2,
            },
          },
        }}
        transition={{
          type: 'spring',
          mass: 1,
          damping: 30,
          stiffness: 200,
        }}
        style={{ width, WebkitTapHighlightColor: 'transparent', opacity }}
      >
        <div className='flex items-center justify-between overflow-hidden whitespace-nowrap rounded-lg border border-gray-600 bg-gray-700 text-sm text-white shadow-sm backdrop-blur'>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription className='truncate p-4'>
            {description}
          </ToastDescription>
          <RadixToast.Close className='border-l border-gray-600/50 p-4 text-gray-500 transition hover:bg-gray-600/30 hover:text-gray-300 active:text-white'>
            <CrossIcon size={30} className='h-5 w-5' />
          </RadixToast.Close>
        </div>
      </motion.li>
    </RadixToast.Root>
  );
});
const ToastTitle = forwardRef<
  React.ElementRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className, ...props }, ref) => (
  <RadixToast.Title
    ref={ref}
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
));
ToastTitle.displayName = RadixToast.Title.displayName;
const ToastDescription = forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>
>(({ className, ...props }, ref) => (
  <RadixToast.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = RadixToast.Description.displayName;
const ToastAction = forwardRef<
  React.ElementRef<typeof RadixToast.Action>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Action>
>(({ className, ...props }, ref) => (
  <RadixToast.Action
    ref={ref}
    className={cn(
      'hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = RadixToast.Action.displayName;
