import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { forwardRef, ElementRef, ComponentPropsWithoutRef, memo } from 'react';
import { Link } from './link';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const AvatarWrapper = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
});

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />;
});

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
      {...props}
    />
  );
});

function HoverCardInner({ handle }: { handle: string }) {
  return (
    <div className="p-2">
      <div className="text-lg font-bold">{handle}</div>
      <div className="text-sm text-gray-500">{'@' + handle}</div>
    </div>
  );
}

const AvatarInner = ({
  handle,
  avatar,
  labeler,
  list,
  className,
  hover = true,
}: {
  handle: string;
  avatar: string | undefined;
  labeler?: boolean;
  list?: boolean;
  className?: string;
  hover?: boolean;
}) => {
  const content = (
    <Link to="/profile/$handle" params={{ handle }} onClick={(event) => event.stopPropagation()}>
      <AvatarWrapper className={cn((labeler || list) && 'aspect-square rounded-sm', className)}>
        <AvatarImage src={avatar} />
        <AvatarFallback>{handle}</AvatarFallback>
      </AvatarWrapper>
    </Link>
  );
  if (!hover) return content;

  return (
    <HoverCard>
      <HoverCardTrigger>{content}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardInner handle={handle} />
      </HoverCardContent>
    </HoverCard>
  );
};

export const Avatar = memo(AvatarInner);
