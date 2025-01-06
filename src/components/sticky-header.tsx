import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';

export const StickyHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-2 sticky top-0 bg-background z-50 border-b flex flex-row gap-2 items-center">
    <Button variant="outline" onClick={() => history.go(-1)}>
      <ArrowLeftIcon className="size-6" />
    </Button>
    {children}
  </div>
);
