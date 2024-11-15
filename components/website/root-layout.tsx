'use client';

export default function RLayout({ children }: { children: React.ReactNode }) {
  return <div className='isolate min-h-screen'>{children}</div>;
}
