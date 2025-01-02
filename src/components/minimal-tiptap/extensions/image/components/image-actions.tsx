import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ClipboardCopyIcon, DotsHorizontalIcon, DownloadIcon, Link2Icon, SizeIcon } from '@radix-ui/react-icons';
import { forwardRef, memo, ReactNode, Ref, useCallback, useMemo, useState } from 'react';

type ImageActionsProps = {
  shouldMerge?: boolean;
  isLink?: boolean;
  onView?: () => void;
  onDownload?: () => void;
  onCopy?: () => void;
  onCopyLink?: () => void;
};

export const ActionWrapper = memo(
  forwardRef(function ActionWrapper(
    { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute right-3 top-3 flex flex-row rounded px-0.5 opacity-0 group-hover/node-image:opacity-100',
          'border-[0.5px] bg-[var(--mt-bg-secondary)] [backdrop-filter:saturate(1.8)_blur(20px)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }),
);

interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  tooltip: string;
}

export const ActionButton = memo(
  forwardRef(function ActionButton({ icon, tooltip, className, ...props }: ActionButtonProps, ref: Ref<HTMLButtonElement>) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              'relative flex h-7 w-7 flex-row rounded-none p-0 text-muted-foreground hover:text-foreground',
              'bg-transparent hover:bg-transparent',
              className,
            )}
            {...props}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tooltip}</TooltipContent>
      </Tooltip>
    );
  }),
);

type ActionKey = 'onView' | 'onDownload' | 'onCopy' | 'onCopyLink';

const ActionItems: Array<{
  key: ActionKey;
  icon: ReactNode;
  tooltip: string;
  isLink?: boolean;
}> = [
  { key: 'onView', icon: <SizeIcon className="size-4" />, tooltip: 'View image' },
  { key: 'onDownload', icon: <DownloadIcon className="size-4" />, tooltip: 'Download image' },
  { key: 'onCopy', icon: <ClipboardCopyIcon className="size-4" />, tooltip: 'Copy image to clipboard' },
  { key: 'onCopyLink', icon: <Link2Icon className="size-4" />, tooltip: 'Copy image link', isLink: true },
];

export const ImageActions = memo(function ImageActions({
  shouldMerge = false,
  isLink = false,
  ...actions
}: ImageActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = useCallback((e: React.MouseEvent, action: (() => void) | undefined) => {
    e.preventDefault();
    e.stopPropagation();
    action?.();
  }, []);

  const filteredActions = useMemo(() => ActionItems.filter((item) => isLink || !item.isLink), [isLink]);

  return (
    <ActionWrapper className={cn({ 'opacity-100': isOpen })}>
      {shouldMerge ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <ActionButton
              icon={<DotsHorizontalIcon className="size-4" />}
              tooltip="Open menu"
              onClick={(e) => e.preventDefault()}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {filteredActions.map(({ key, icon, tooltip }) => (
              <DropdownMenuItem key={key} onClick={(e) => handleAction(e, actions[key])}>
                <div className="flex flex-row items-center gap-2">
                  {icon}
                  <span>{tooltip}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        filteredActions.map(({ key, icon, tooltip }) => (
          <ActionButton key={key} icon={icon} tooltip={tooltip} onClick={(e) => handleAction(e, actions[key])} />
        ))
      )}
    </ActionWrapper>
  );
});
