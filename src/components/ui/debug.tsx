import { useSettings } from '@/hooks/use-setting';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog';
import { VisuallyHidden } from '@ariakit/react';
import { useTranslation } from 'react-i18next';

export const Debug = ({ value, isOpen = false, className }: { value: unknown; isOpen?: boolean; className?: string }) => {
  const { experiments } = useSettings();
  const { t } = useTranslation('app');

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
      <VisuallyHidden>
        <DialogTitle>{t('debug')}</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="max-w-2xl p-2" aria-describedby={undefined}>
        <pre className={cn('text-xs text-gray-500 dark:text-gray-400 p-2 rounded-lg text-left overflow-scroll', className)}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </DialogContent>
    </Dialog>
  );
};
