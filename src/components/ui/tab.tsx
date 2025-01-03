import { cn } from '@/lib/utils';
import * as Ariakit from '@ariakit/react';

export const Tab = ({ name, id, selectedTab }: { name: string; id: string; selectedTab: string | undefined | null }) => {
  return (
    <Ariakit.Tab id={id} className={cn('flex h-10 items-center justify-center whitespace-nowrap px-4')}>
      <span
        className={cn(
          'p-2 border-b-4 border-b-transparent text-neutral-500 hover:text-white hover:border-blue-500',
          selectedTab === id && 'border-blue-500 text-white',
        )}
      >
        {name}
      </span>
    </Ariakit.Tab>
  );
};
