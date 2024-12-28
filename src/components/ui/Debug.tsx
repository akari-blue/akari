import { useState } from 'react';
import { useSettings } from '../../hooks/useSetting';
import { cn } from '@/lib/utils';

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
        <button onClick={onClick} className="mt-[-20px] h-5 ">
          👀
        </button>
      </div>
      <div>
        {open && (
          <pre
            className={cn(
              'text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto h-64 text-left',
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
