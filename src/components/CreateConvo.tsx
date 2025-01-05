import { Button } from './ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import { useTranslation } from 'react-i18next';
import { MessageCirclePlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HandleInput } from './ui/HandleInput';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { useNavigate } from '@tanstack/react-router';

export function CreateConvo() {
  const agent = useBlueskyStore((state) => state.agent);
  const { t } = useTranslation(['app', 'post']);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const isPending = false;
  const navigate = useNavigate();

  const onClickCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            // mobile
            'fixed bottom-16 right-2 rounded-full aspect-square size-16',
            // tablet
            'md:bottom-2',
            // desktop
            'xl:static xl:aspect-auto xl:size-auto',
          )}
        >
          <span className="hidden xl:block">{t('post:createPost')}</span>
          <MessageCirclePlusIcon className="block xl:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden p-0 border">
        <DialogHeader className="justify-between w-full p-2">
          <Button type="button" variant="ghost" onClick={onClickCancel} disabled={isPending} className="text-gray-500">
            {t('cancel')}
          </Button>
        </DialogHeader>
        <div className="p-2">
          <HandleInput
            value={value}
            onChange={setValue}
            onSelect={async (profile) => {
              const proxy = agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');
              const convo = await proxy.api.chat.bsky.convo.getConvoForMembers({
                members: [profile.did],
              });

              navigate({
                to: '/messages/$convoId',
                params: {
                  convoId: convo.data.convo.id,
                },
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
