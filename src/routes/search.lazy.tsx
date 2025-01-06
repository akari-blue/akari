import { createLazyFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { PostCard } from '../components/PostCard';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useSearch } from '@/lib/bluesky/hooks/useSearch';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2Icon, SearchIcon, XIcon } from 'lucide-react';
import { StickyHeader } from '@/components/sticky-header';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { Link } from '@/components/ui/Link';
import { Loading } from '@/components/ui/loading';

export const Route = createLazyFileRoute('/search')({
  component: Search,
});

function Search() {
  const { t } = useTranslation('search');
  const q = Route.useSearch().q ?? '';
  const [search, setSearch] = useState(q);
  const { data: posts, isLoading } = useSearch({ q });
  const navigate = useNavigate();
  const location = useLocation();
  const setSearchHistory = useSearchHistory((store) => store.setSearchHistory);
  const searchHistory = useSearchHistory((store) => store.history.slice(0).reverse());

  function syncQueryString() {
    setSearch(q);
  }

  // Sync query string with search input
  useEffect(syncQueryString, [location.search, q]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/search?q=${q}`} />
      </Helmet>
      <div className="flex flex-col pb-safe-or-16 md:pb-safe-or-2">
        <StickyHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // Prevent empty searches
              if (!search.trim()) return;
              // Prevent duplicate searches
              if (search === q) return;
              // Update search history
              setSearchHistory((state) => {
                return {
                  ...state,
                  history: [...state.history, search],
                };
              });
              // Navigate to search page
              navigate({ to: '/search', search: { q: search } });
            }}
            className="flex flex-row gap-2 flex-grow"
          >
            <div className="flex flex-row flex-grow items-center border rounded-sm pl-2 focus-within:ring-1 focus-within:ring-ring">
              <SearchIcon className="text-foreground" />
              <Input
                id="search"
                placeholder="search"
                value={search}
                className="border-none focus-visible:ring-0"
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
        {isLoading && <Loading />}
        {posts === undefined && !isLoading && (
          <div className="flex flex-col p-4 gap-2">
            <div className="font-bold">{'recent searches'}</div>
            <div>
              {searchHistory.map((search) => (
                <Link className="flex justify-between" key={search} to="/search" search={{ q: search }}>
                  {search}
                  <XIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setSearchHistory((state) => {
                        return {
                          ...state,
                          history: state.history.filter((item) => item !== search),
                        };
                      });
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
