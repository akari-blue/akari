import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, error, ...props }, ref) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm',
        'border-gray-200 dark:border-gray-800',
        'text-gray-900 dark:text-gray-100',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
