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
        <Button variant="outline" className="w-fit">
          {t('createPost')}
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
