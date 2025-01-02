import type { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useCallback, useRef, useState } from 'react';

type ImageEditBlockProps = {
  editor: Editor;
  close: () => void;
};

export const ImageEditBlock = ({ editor, close }: ImageEditBlockProps) => {
  const { t } = useTranslation('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState('');

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const insertImages = async () => {
        const contentBucket = [];
        const filesArray = Array.from(files);

        for (const file of filesArray) {
          contentBucket.push({ src: file });
        }

        editor.commands.setImages(contentBucket);
      };

      await insertImages();
      close();
    },
    [editor, close],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (link) {
        editor.commands.setImages([{ src: link }]);
        close();
      }
    },
    [editor, link, close],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="image-link">{t('toolbar.link.displayText')}</Label>
        <div className="flex">
          <Input
            id="image-link"
            type="url"
            required
            placeholder="https://example.com"
            value={link}
            className="grow"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
          />
          <Button type="submit" className="ml-2">
            {t('toolbar.image.submit')}
          </Button>
        </div>
      </div>
      <Button type="button" className="w-full" onClick={handleClick}>
        {t('toolbar.image.description')}
      </Button>
      <input type="file" accept="image/*" ref={fileInputRef} multiple className="hidden" onChange={handleFile} />
    </form>
  );
};

export default ImageEditBlock;
