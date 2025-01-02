import { useTranslation } from 'react-i18next';
import { useSettings } from '@/hooks/useSetting';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
  type: 'avatar' | 'post' | 'banner';
  classNames?: {
    wrapper?: string;
    image?: string;
  };
};

export const Image = ({ src, alt, type, classNames, ...props }: ImageProps) => {
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

  if (type === 'avatar') {
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
            className={cn(
              classNames?.image,
              experiments.streamerMode && 'filter blur-md',
              type === 'banner' && 'aspect-video w-full',
            )}
          />
        </DialogTrigger>
        <DialogContent className="[&>button]:bg-black [&>button]:p-1 p-2 border">
          <img
            loading="lazy"
            src={src}
            alt={alt}
            {...props}
            className={cn(experiments.streamerMode && 'filter blur-md', type === 'banner' && 'aspect-video w-full')}
          />
          <span>{alt}</span>
        </DialogContent>
      </Dialog>
    </div>
  );
};
