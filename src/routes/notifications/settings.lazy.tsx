import { StickyHeader } from '@/components/sticky-header';
import { Checkbox } from '@/components/ui/checkbox';
import { createLazyFileRoute } from '@tanstack/react-router';
import { FlaskConicalIcon, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/notifications/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <StickyHeader>{'notification settings'}</StickyHeader>
      <div className="p-6">
        <div className="flex flex-row gap-2">
          <FlaskConicalIcon className="flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <h1>{'notification filters'}</h1>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="priority-notifications"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {'enable priority notifications'}
                </label>
                <Checkbox
                  id="priority-notifications"
                  onClick={() => {
                    toast.error('Not implemented');
                  }}
                />
              </div>
            </div>
            <p className="bg-gray-800 p-2 rounded border border-gray-700 text-xs flex flex-row gap-2">
              <TriangleAlert className="flex-shrink-0 stroke-yellow-500" />
              <div>
                <span className="font-bold">{'Experimental'}</span>
                {
                  ": When this preference is enabled, you'll only receive reply and quote notifications from users you follow."
                }
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
