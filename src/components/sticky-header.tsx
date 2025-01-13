import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useScrollVisible } from '@/hooks/use-scroll-visible';

export const StickyHeader = ({
  children,
  backButton = true,
  className,
}: {
  children: React.ReactNode;
  backButton?: boolean;
  className?: string;
}) => {
  const isVisible = useScrollVisible();

  return (
    <div
      className={cn(
        'p-2 sticky top-0 bg-background z-40 border-b flex flex-row gap-2 items-center transform transition-transform duration-200 ease-in-out',
        className,
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      {backButton && (
        <Button variant="outline" onClick={() => history.go(-1)}>
          <ArrowLeftIcon className="size-6" />
        </Button>
      )}
      {children}
    </div>
  );
};
