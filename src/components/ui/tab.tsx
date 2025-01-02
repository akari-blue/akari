import { cn } from '@/lib/utils';
import * as Ariakit from '@ariakit/react';

export const Tab = ({ name, id, selectedTab }: { name: string; id: string; selectedTab: string | null }) => {
  return (
    <Ariakit.Tab id={id} className={cn('flex h-10 items-center justify-center whitespace-nowrap px-4')}>
      <span className={cn('p-2', selectedTab === id && 'border-b-4 border-blue-500')}>{name}</span>
    </Ariakit.Tab>
  );
};
