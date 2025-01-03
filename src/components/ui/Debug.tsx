import { useSettings } from '@/hooks/useSetting';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

export const Debug = ({ value, isOpen = false, className }: { value: unknown; isOpen?: boolean; className?: string }) => {
  const { experiments } = useSettings();

  if (!experiments.devMode) return null;

  return (
    <Dialog defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <div className="w-full relative h-5">
          <Button variant="ghost" className="absolute top-0 right-0">
            👀
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-2">
        <pre className={cn('text-xs text-gray-500 dark:text-gray-400 p-2 rounded-lg text-left overflow-scroll', className)}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </DialogContent>
    </Dialog>
  );
};
