import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormEvent, forwardRef, HTMLAttributes, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface LinkEditorProps extends HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  defaultText?: string;
  defaultIsNewTab?: boolean;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export const LinkEditBlock = forwardRef<HTMLDivElement, LinkEditorProps>(function LinkEditBlock(
  { onSave, defaultIsNewTab, defaultUrl, defaultText, className },
  ref,
) {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [url, setUrl] = useState(defaultUrl || '');
  const [text, setText] = useState(defaultText || '');
  const [isNewTab, setIsNewTab] = useState(defaultIsNewTab || false);
  const { t } = useTranslation(['app', 'editor']);

  const handleSave = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (formRef.current) {
        const isValid = Array.from(formRef.current.querySelectorAll('input')).every((input) => input.checkValidity());

        if (isValid) {
          onSave(url, text, isNewTab);
        } else {
          formRef.current.querySelectorAll('input').forEach((input) => {
            if (!input.checkValidity()) {
              input.reportValidity();
            }
          });
        }
      }
    },
    [onSave, url, text, isNewTab],
  );

  useImperativeHandle(ref, () => formRef.current!);

  return (
    <div ref={formRef}>
      <div className={cn('space-y-4', className)}>
        <div className="space-y-1">
          <Label>URL</Label>
          <Input type="url" required placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div className="space-y-1">
          <Label>
            {t('editor:toolbar.link.displayText')} ({t('optional')})
          </Label>
          <Input type="text" placeholder="Enter display text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="flex items-center space-x-2">
          <Label>{t('editor:toolbar.link.openInNewTab')}</Label>
          <Switch checked={isNewTab} onCheckedChange={setIsNewTab} />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={handleSave}>
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
});
