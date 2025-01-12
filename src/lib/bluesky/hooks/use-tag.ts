import { useSearch } from './use-search';

export function useTag({ tag }: { tag: string }) {
  return useSearch({ q: `#${tag}` });
}
