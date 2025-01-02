import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { useSettings } from '../../hooks/useSetting';
import { useTranslation } from 'react-i18next';

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
  const [showAltText, setShowAltText] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const altButtonOnClick = () => {
    setShowAltText((prev) => !prev);
  };
  const imageOnClick = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullscreen]);

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

  return (
    <>
      <div className={cn('relative', classNames?.wrapper)}>
        {alt &&
          type === 'post' &&
          (showAltText ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white"
              onClick={altButtonOnClick}
            >
              {alt}
            </div>
          ) : (
            <button className="absolute bottom-1 right-1 z-10 p-2 text-white bg-black bg-opacity-50 rounded-bl-md text-xs font-bold font-mono">
              ALT
            </button>
          ))}
        <img
          loading="lazy"
          src={src}
          alt={alt}
          {...props}
          onClick={imageOnClick}
          className={cn(
            classNames?.image,
            experiments.streamerMode && 'filter blur-md',
            type === 'banner' && 'aspect-video w-full',
          )}
        />
      </div>
      {isFullscreen && (
        <div className="z-50" onClick={imageOnClick}>
          <div className="relative">
            <div className="fixed top-0 bottom-0 left-0 right-0">
              <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-90" />
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                <img
                  src={src}
                  alt={alt}
                  {...props}
                  className={cn(classNames?.image, 'h-full w-full', experiments.streamerMode && 'filter blur-md')}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
