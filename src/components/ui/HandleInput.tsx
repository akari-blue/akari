import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './Input';
import { ProfileViewBasic } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { useTranslation } from 'react-i18next';

interface HandleInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (profile: ProfileViewBasic) => void;
  placeholder?: string;
  className?: string;
}

const PUBLIC_API = 'https://public.api.bsky.app';

const searchProfiles = async (query: string) => {
  if (query.length < 1) return [];

  try {
    const response = await fetch(
      `${PUBLIC_API}/xrpc/app.bsky.actor.searchActorsTypeahead?term=${encodeURIComponent(query)}&limit=5`,
    );
    if (!response.ok) throw new Error('Failed to search profiles');

    const data = (await response.json()) as { actors: ProfileViewBasic[] };
    return data.actors;
  } catch (error) {
    console.error('Failed to search profiles:', error);
    return [];
  }
};
export function HandleInput({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter handle...',
  className = '',
}: HandleInputProps) {
  const { t } = useTranslation(['app', 'handleSearch']);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['profile-search', value],
    queryFn: () => searchProfiles(value),
    enabled: value.length > 0 && isOpen,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={className}
      />
      {isOpen && value && (
        <div className="absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">{t('loading')}</div>
          ) : profiles?.length ? (
            <ul className="max-h-60 overflow-auto">
              {profiles.map((profile) => (
                <li
                  key={profile.did}
                  className="p-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                  onClick={() => {
                    onChange(profile.handle);
                    onSelect?.(profile);
                    setIsOpen(false);
                  }}
                >
                  {profile.avatar && <img src={profile.avatar} alt={profile.handle} className="w-8 h-8 rounded-full" />}
                  <div>
                    <div className="font-medium">{profile.displayName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@{profile.handle}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">{t('handleSearch:noResultsFound')}</div>
          )}
        </div>
      )}
    </div>
  );
}
