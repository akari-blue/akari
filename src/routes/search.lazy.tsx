import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { PostCard } from '../components/PostCard';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useSearch } from '@/lib/bluesky/hooks/useSearch';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { StickyHeader } from '@/components/sticky-header';

export const Route = createLazyFileRoute('/search')({
  component: Search,
});

function Search() {
  const { t } = useTranslation('search');
  const [search, setSearch] = useState('');
  const q = Route.useSearch().q ?? '';
  const { data: posts, isLoading } = useSearch({ q });
  const router = useRouter();

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/search?q=${q}`} />
      </Helmet>
      <div className="flex flex-col gap-4 pb-safe-or-16 md:pb-safe-or-2">
        <StickyHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              router.navigate({ to: '/search', search: { q: search } });
            }}
            className="flex flex-row gap-2"
          >
            <div className="flex flex-col gap-2 flex-grow">
              <Input
                id="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading ? (
                <div className="flex flex-row gap-2">
                  <Loader2Icon className="animate-spin" /> {t('searching')}
                </div>
              ) : (
                t('search')
              )}
            </Button>
          </form>
        </StickyHeader>
        {posts?.map((post) => <PostCard key={post.uri} post={post} />)}
        {posts?.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <p>{t('noResults')}</p>
          </div>
        )}
      </div>
    </>
  );
}
