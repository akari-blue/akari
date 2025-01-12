import { cn } from '@/lib/utils';
import * as Ariakit from '@ariakit/react';

export const TabList = ({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) => {
  return (
    <Ariakit.TabList
      className={cn(
        'flex flex-row max-w-full overflow-x-scroll overflow-y-hidden scrollbar-hide border-b touch-none touch-pan-x',
        className,
      )}
      aria-label={label}
    >
      {children}
    </Ariakit.TabList>
  );
};
