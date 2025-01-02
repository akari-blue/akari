import { useCreatePost } from '../lib/bluesky/hooks/useCreatePost';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { type JSONContent } from '@tiptap/react';
import { MinimalTiptapEditor } from './minimal-tiptap';
import { Facet } from '@atproto/api';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { convertJSONToPost } from './convert';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useTranslation } from 'react-i18next';
import { PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CreatePost() {
  const { t } = useTranslation('post');
  const { mutate, isPending } = useCreatePost();
  const [value, setValue] = useState<JSONContent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [converted, setConverted] = useState<{
    text: string;
    facets: Facet[];
    position: number;
  } | null>(null);
  const { isAuthenticated } = useBlueskyStore();

  useEffect(() => {
    if (!value) return;
    setConverted(convertJSONToPost(value));
  }, [value]);

  const onClick = () => {
    if (!converted) return;

    mutate(
      {
        text: converted.text,
        facets: converted.facets ?? [],
      },
      {
        onSuccess() {
          setValue(null);
          setConverted(null);
          setIsOpen(false);
        },
      },
    );
  };

  if (!isAuthenticated) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            // mobile
            'fixed bottom-20 right-2 rounded-full aspect-square size-16',
            // tablet
            'md:bottom-2',
            // desktop
            'lg:relative lg:right-0 lg:rounded-none lg:aspect-auto lg:size-auto lg:w-fit',
          )}
        >
          <span className="hidden lg:block">{t('createPost')}</span>
          <PencilIcon className="block lg:hidden size-10" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('createPost')}</DialogTitle>
        </DialogHeader>
        <MinimalTiptapEditor
          value={value}
          onChange={(value) => setValue(value as JSONContent)}
          className="w-full"
          output="json"
          placeholder="Type something..."
          autofocus={true}
          editable={!isPending}
          editorClassName="focus:outline-none"
        />
        <DialogFooter className="justify-end">
          <Button type="button" variant="secondary" onClick={onClick} disabled={isPending}>
            {isPending ? 'Posting...' : 'Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
