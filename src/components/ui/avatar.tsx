import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { Link } from './Link';

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

export const Avatar = ({
  handle,
  avatar,
  labeler,
  list,
  className,
}: {
  handle: string;
  avatar: string | undefined;
  labeler?: boolean;
  list?: boolean;
  className?: string;
}) => {
  return (
    <Link to="/profile/$handle" params={{ handle }}>
      <AvatarWrapper className={cn((labeler || list) && 'aspect-square rounded-sm', className)}>
        <AvatarImage src={avatar} />
        <AvatarFallback>{handle}</AvatarFallback>
      </AvatarWrapper>
    </Link>
  );
};
