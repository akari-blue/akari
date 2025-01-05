import { useSearch } from './useSearch';

export function useTag({ tag }: { tag: string }) {
  return useSearch({ q: `#${tag}` });
}
