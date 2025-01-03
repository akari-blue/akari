import { useTranslation } from 'react-i18next';
import { useSettings } from '@/hooks/useSetting';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog';
import { VisuallyHidden } from '@ariakit/react';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
  classNames?: {
    wrapper?: string;
    image?: string;
  };
  clickable?: boolean;
};

export const Image = ({ src, alt, classNames, clickable = true, ...props }: ImageProps) => {
  const { experiments } = useSettings();
  const { t } = useTranslation('image');

  if (!src) {
    return (
      <div
        className={cn(
          'bg-neutral-200 dark:bg-neutral-600 text-black dark:text-white text-center aspect-square justify-center items-center flex',
          classNames?.image,
        )}
      >
        <span>{t('noImage')}</span>
      </div>
    );
  }

  if (!clickable) {
    return (
      <img
        loading="lazy"
        src={src}
        alt={alt}
        {...props}
        className={cn(classNames?.image, experiments.streamerMode && 'filter blur-md')}
      />
    );
  }

  return (
    <div className={classNames?.wrapper}>
      <Dialog>
        <DialogTrigger asChild>
          <img
            loading="lazy"
            src={src}
            alt={alt}
            {...props}
            className={cn(classNames?.image, experiments.streamerMode && 'filter blur-md')}
          />
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>{alt}</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="[&>button]:bg-black [&>button]:p-1 p-2 border">
          <img loading="lazy" src={src} alt={alt} {...props} className={cn(experiments.streamerMode && 'filter blur-md')} />
          <span>{alt}</span>
        </DialogContent>
      </Dialog>
    </div>
  );
};
