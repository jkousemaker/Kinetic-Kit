'use client';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  LayoutGroup,
  MotionConfig,
} from 'framer-motion';
import * as React from 'react';
import { Bell } from 'lucide-react';
interface DynamicBarProps {
  side?: 'left' | 'right';
}

export function DynamicBar({ side = 'right' }: DynamicBarProps) {
  const [status, setStatus] = React.useState(false);
  //create a state with array of strings as notifications and set it to empty array
  const [notification, setNotification] = React.useState<string[]>([]);
  const hasNotification = notification.length > 0;
  //create a function to add notification
  const addNotification = () => {
    //add a new notification to the array
    setNotification([
      ...notification,
      `New notification ${notification.length + 1}`,
    ]);
  };
  //create a useEffect that sets status to true when notification is added and then sets it to false after 3 seconds
  React.useEffect(() => {
    if (notification.length) {
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
      }, 3000);
    }
  }, [notification]);
  return (
    <MotionConfig
      transition={{ type: 'spring', duration: 1, bounce: status ? 0.35 : 0.2 }}
    >
      <motion.div
        layout
        className={cn(
          'flex size-full cursor-pointer',
          status
            ? '!justify-center'
            : side === 'right'
              ? 'justify-end'
              : 'justify-start'
        )}
      >
        <button onClick={() => setStatus(!status)}>Add</button>
        <motion.div
          onClick={() => addNotification()}
          layout
          transition={{
            type: 'spring',
            duration: 1,
            bounce: status ? 0.35 : 0.2,
            delay: hasNotification && status ? 1 : 0,
          }}
          style={{ borderRadius: '999px' }}
          className='flex flex-row gap-5 overflow-hidden bg-white p-5 dark:bg-slate-900'
        >
          <motion.div
            layout='position'
            className='relative grid place-items-center'
          >
            {hasNotification && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='absolute right-0 top-0 grid size-6 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border-[3px] bg-red-500 text-xs'
              >
                <span>{notification.length}</span>
              </motion.span>
            )}
            <motion.span
              animate={{
                rotate: hasNotification && status ? [null, 30, -30, 0] : 0,
              }}
              transition={{ duration: 1 }}
            >
              <Bell size={32} />
            </motion.span>
          </motion.div>

          {status && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='relative z-50'
            >
              {notification.length <= 0
                ? 'No notification'
                : notification[notification.length - 1]}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
