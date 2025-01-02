import { useState } from 'react';
import { useSettings } from '@/hooks/useSetting';
import { cn } from '@/lib/utils';
import { Button } from './button';

export const Debug = ({ value, isOpen = false, className }: { value: unknown; isOpen?: boolean; className?: string }) => {
  const { experiments } = useSettings();
  const [open, setOpen] = useState(isOpen);
  const onClick = () => {
    setOpen((prev) => !prev);
  };

  if (!experiments.devMode) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row justify-end">
        <Button onClick={onClick} className="h-5" variant="ghost">
          👀
        </Button>
      </div>
      <div>
        {open && (
          <pre
            className={cn(
              'border border-gray-200 dark:border-neutral-800 ',
              'text-sm text-gray-500 dark:text-gray-400 p-2 rounded-lg overflow-auto h-64 text-left',
              className,
            )}
          >
            {JSON.stringify(value, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
