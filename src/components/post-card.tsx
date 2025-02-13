import {
  AlertTriangleIcon,
  ClipboardIcon,
  Ellipsis,
  EyeOffIcon,
  FilterIcon,
  LucideFileQuestion,
  Quote,
  SendHorizonalIcon,
  ShareIcon,
  UserRoundPlusIcon,
  VolumeOffIcon,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { MessageCircle, Heart, Repeat } from 'lucide-react';
import { useLike } from '../lib/bluesky/hooks/use-like';
import { BSkyPost } from '../lib/bluesky/types/bsky-post';
import { cn } from '../lib/utils';
import { useRepost } from '../lib/bluesky/hooks/use-repost';
import { FacetedText } from './faceted-text';
import { Link } from './ui/link';
import { useSettings } from '../hooks/use-setting';
import { FormattedNumber } from './ui/formatted-number';
import TimeAgo from 'react-timeago-i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/use-auth';
import { Handle } from './ui/handle';
import { FormattedText } from './ui/formatted-text';
import { Avatar } from './ui/avatar';
import { useUnlike } from '@/lib/bluesky/hooks/use-unlike';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { memo, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePlausible } from '@/hooks/use-plausible';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { usePostLabels } from '@/lib/bluesky/hooks/use-post-labels';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { ErrorBoundary } from './error-boundary';
import { PostEmbed } from './post-embed';
import { Badge } from './ui/badge';

const contextToText = (context: string) => {
  if (context === 'following') return 'following';
  if (context === 'friends') return 'friends';
  if (context === 'popfriends') return 'popular friends';
  if (context.startsWith('t-')) return `trending in ${context.slice(2)}`;

  return context;
};

const BetterContext = ({ context }: { context?: string }) => {
  if (!context) return null;

  return (
    <span title="Reason the post was included in the feed" className="text-gray-500 dark:text-gray-400">
      {` · `}
      {contextToText(context)}
    </span>
  );
};

const PostDropdownMenu = ({ post, setTranslatedText }: { post: BSkyPost; setTranslatedText: (text: string) => void }) => {
  const { trackEvent } = usePlausible();
  const isAuthenticated = useBlueskyStore((state) => state.isAuthenticated);
  const isProd = window.location.hostname === 'akari.blue';
  const handleTranslate = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const currentLanguage = navigator.language.split('-')[0];
    const langs = post.record.langs?.filter((lang) => lang.split('-')[0] !== currentLanguage) ?? [];
    const source = (langs.length === 1 ? langs[0] : 'auto') ?? 'auto';
    toast.info('Translating post text from ' + source + ' to ' + currentLanguage);
    const response = await fetch(isProd ? 'https://translate.akari.blue' : 'http://localhost:8787', {
      method: 'POST',
      body: JSON.stringify({
        q: post.record.text,
        // fall back to auto detection if the lanauge is the same as the current language
        source: source === currentLanguage ? 'auto' : source,
        target: navigator.language,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = (await response.json()) as {
      alternatives: [];
      detectedLanguage: {
        confidence: number;
        language: string;
      };
      translatedText: string;
    };
    setTranslatedText(json.translatedText);
    trackEvent('translate', { language: source });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-sm hover:bg-neutral-500 hover:bg-opacity-10 group">
        <Ellipsis size={20} className="group-hover:text-white transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-between" onClick={handleTranslate}>
          {'translate'} <LucideFileQuestion />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between"
          onClick={(event) => {
            event.stopPropagation();
            navigator.clipboard.writeText(post.record.text);
            toast.info('Copied post text to clipboard');
            trackEvent('copyToClipboard', { type: 'post-text' });
          }}
        >
          {'copy post text'} <ClipboardIcon />
        </DropdownMenuItem>
        {isAuthenticated && (
          <DropdownMenuItem
            className="justify-between"
            onClick={(event) => {
              event.stopPropagation();
              toast.error('Not implemented');
            }}
          >
            {'send via direct message'} <SendHorizonalIcon />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="justify-between"
          onClick={(event) => {
            event.stopPropagation();
            navigator.clipboard.writeText(
              `https://akari.blue/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`,
            );
            toast.info('Copied post link to clipboard');
            trackEvent('copyToClipboard', { type: 'post-link' });
          }}
        >
          {'copy link to post'} <ShareIcon />
        </DropdownMenuItem>
        {isAuthenticated && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'mute thread'} <VolumeOffIcon />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'mute words & tags'} <FilterIcon />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'hide reply for me'} <EyeOffIcon />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'hide reply for everyone'} <EyeOffIcon />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'block account'} <UserRoundPlusIcon />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="justify-between"
              onClick={(event) => {
                event.stopPropagation();
                toast.error('Not implemented');
              }}
            >
              {'report account'} <AlertTriangleIcon />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

async function decryptPrivatePost(post: BSkyPost) {
  // If no encryption data, return the regular text
  if (!post.record.encryption || !post.record.encryptedText) {
    return post.record.text;
  }

  const { algorithm } = post.record.encryption;
  const { key, length } = post.record.encryption.key;
  const encryptedText = post.record.encryptedText;

  try {
    // Convert key string to array buffer
    const keyData = new TextEncoder().encode(key);

    // Import the raw key
    const cryptoKey = await window.crypto.subtle.importKey('raw', keyData, { name: algorithm, length: length }, false, [
      'decrypt',
    ]);

    // Decode base64 encrypted text
    const encryptedData = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));

    // First 16 bytes should be IV
    const iv = encryptedData.slice(0, 16);
    const data = encryptedData.slice(16);

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: algorithm,
        iv: iv,
      },
      cryptoKey,
      data,
    );

    // Convert the decrypted array buffer back to text
    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error('Decryption failed:', error);
    return 'decryption failed';
  }
}

type PostCardInnerProps = {
  post: BSkyPost;
  context?: string;
  className?: string;
  parent?: boolean;
};

function PostCardInner({ post, context, className, parent = false }: PostCardInnerProps) {
  const { t } = useTranslation(['app', 'post']);
  const agent = useBlueskyStore((state) => state.agent);
  const like = useLike();
  const unlike = useUnlike();
  const repost = useRepost();
  const { isAuthenticated } = useAuth();
  const { experiments } = useSettings();
  const navigate = useNavigate();
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const { moderation } = usePostLabels({ agent, post });
  const isPrivatePost = !!post.record.encryptedText;
  const [postText, setPostText] = useState<string>(isPrivatePost ? 'decrypting private post...' : post.record.text);

  useEffect(() => {
    if (isPrivatePost) {
      decryptPrivatePost(post).then(setPostText);
    }
  }, [isPrivatePost, post]);

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!post) return;

    // unlike
    if (post.viewer?.like) {
      unlike.mutate({ uri: post.viewer.like });
      return;
    }

    // like
    like.mutate({ uri: post.uri, cid: post.cid });
  };

  const handleRepost = (uri: string, cid: string) => {
    repost.mutate({ uri, cid });
  };

  // Hide post if it's filtered
  if (moderation?.ui('contentList').filter) return null;
  const contentMedia = moderation?.ui('contentMedia');
  const moderationMediaLabel = contentMedia?.blurs[0]?.type === 'label' ? contentMedia.blurs[0]?.labelDef.locales[0] : null;
  const profileLabels = moderation?.ui('profileList').informs.filter((label) => label.type === 'label');
  const moderationFilter = moderation?.ui('contentMedia').filter;

  const onClick = () => {
    const cellText = document.getSelection();
    if (cellText?.type === 'Range') return;

    navigate({
      to: '/profile/$handle/post/$postId',
      params: { handle: post.author.handle, postId: post.uri.split('/').pop()! },
    });
  };

  return (
    <div className="hover:bg-neutral-500 hover:bg-opacity-10 hover:cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <div className={cn('p-3 w-full gap-2 flex flex-row', className)} onClick={onClick} id={post.uri}>
          <div className="flex-shrink-0">
            <Avatar handle={post.author.handle} avatar={post.author.avatar} />
            {parent && <div className="border-l-2 border-gray-700 h-full ml-4 -mt-4" />}
          </div>
          <div className="w-full">
            <div>
              <div>
                <Link
                  to="/profile/$handle"
                  params={{ handle: post.author.handle }}
                  className="font-medium text-gray-900 dark:text-gray-100"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {post.author.displayName || post.author.handle}
                </Link>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <Link
                  to="/profile/$handle"
                  params={{ handle: post.author.handle }}
                  className="hover:no-underline"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Handle handle={post.author.handle} />
                </Link>
                {' · '}
                <Link
                  to="/profile/$handle/post/$postId"
                  params={{
                    handle: post.author.handle,
                    postId: post.uri.split('/').pop()!,
                  }}
                  className="hover:no-underline"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <TimeAgo date={post.record.createdAt} />
                </Link>
                {!experiments.zenMode && <BetterContext context={context} />}
              </div>
            </div>
            <div className="flex gap-1 py-1">
              {profileLabels?.map((label) => (
                <Badge title={label.labelDef.locales[0]!.description} key={label.label.uri}>
                  {label.labelDef.locales[0]!.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 dark:text-gray-200">
                {translatedText ? (
                  <div className="flex flex-col">
                    <FormattedText text={translatedText} />
                    <Link className="text-xs text-gray-500 dark:text-gray-400" href="https://libretranslate.com">
                      {`translated from ${post.record.langs?.[0] ?? 'unknown'} to ${navigator.language.split('-')[0]} by libretranslate.com`}
                    </Link>
                  </div>
                ) : post.record.facets ? (
                  <FacetedText text={postText} facets={post.record.facets} />
                ) : (
                  <FormattedText text={postText} />
                )}
              </p>
              <ErrorBoundary>
                {moderationFilter ? null : moderationMediaLabel ? (
                  <Accordion type="single" collapsible onClick={(event) => event.stopPropagation()}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="w-full group">
                        <div className="flex items-center space-x-2 rounded-sm hover:bg-neutral-500 hover:bg-opacity-10 gap-1 border justify-between p-2">
                          <div className="flex items-center gap-1">
                            <AlertTriangleIcon size={20} />
                            {moderationMediaLabel?.name}
                          </div>
                          <div className="group-data-[state=open]:hidden">{'show'}</div>
                          <div className="hidden group-data-[state=open]:flex">{'hide'}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <ErrorBoundary>{post.embed && <PostEmbed embed={post.embed} />}</ErrorBoundary>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  post.embed && <PostEmbed embed={post.embed} />
                )}
              </ErrorBoundary>
              <div className="flex items-center text-gray-500 dark:text-gray-400 justify-between">
                <Link
                  to="/profile/$handle/post/$postId"
                  params={{ handle: post.author.handle, postId: post.uri.split('/').pop()! }}
                  className="flex items-center space-x-2 hover:text-blue-500 transition-colors hover:no-underline p-2 rounded-sm hover:bg-neutral-500 hover:bg-opacity-10"
                >
                  <MessageCircle size={20} />
                  {!experiments.zenMode && <FormattedNumber value={post.replyCount} />}
                  <span className="hidden xl:block">{t('replies')}</span>
                </Link>
                {!(experiments.zenMode && !isAuthenticated) && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={cn(
                          'flex items-center space-x-2 p-2 rounded-sm hover:bg-neutral-500 hover:bg-opacity-10',
                          post.viewer?.repost ? 'text-green-500' : 'hover:text-green-500',
                        )}
                      >
                        <Repeat size={20} className={cn(post.viewer?.repost ? 'stroke-current' : '')} />
                        {!experiments.zenMode && <FormattedNumber value={post.repostCount} />}
                        <span className="hidden xl:block">{t('reposts')}</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {post.viewer?.repost ? (
                          <DropdownMenuItem
                            className="justify-between"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            {'undo repost'} <Repeat />
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="justify-between"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRepost(post.uri, post.cid);
                            }}
                            disabled={repost.isPending || !isAuthenticated}
                          >
                            {'repost'} <Repeat />
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="justify-between"
                          onClick={(event) => {
                            event.stopPropagation();
                            toast.error('Not implemented');
                          }}
                        >
                          {'quote post'} <Quote />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                      onClick={handleLike}
                      disabled={like.isPending || unlike.isPaused || !isAuthenticated}
                      className={cn(
                        'flex items-center space-x-2 transition-colors p-2 rounded-sm hover:bg-neutral-500 hover:bg-opacity-10',
                        post.viewer?.like ? 'text-pink-500' : 'hover:text-pink-500',
                      )}
                    >
                      <Heart size={20} className={cn(post.viewer?.like ? 'fill-current' : '')} />
                      {!experiments.zenMode && <FormattedNumber value={post.likeCount} />}
                      <span className="hidden xl:block">{t('likes')}</span>
                    </button>
                    <PostDropdownMenu post={post} setTranslatedText={setTranslatedText} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type PostCardProps = {
  post: BSkyPost | null | undefined;
  context?: string;
  className?: string;
  parent?: boolean;
};

export const PostCard = memo(function PostCard({ post, ...props }: PostCardProps) {
  if (!post) return null;

  return <PostCardInner {...props} post={post} />;
});
