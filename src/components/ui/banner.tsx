import { cn } from '@/lib/utils';
import { Image } from './image';

export const Banner = ({
  banner,
  classNames,
}: {
  banner: string | undefined;
  classNames?: { wrapper?: string; image?: string };
}) => {
  return (
    <Image
      src={banner}
      clickable={false}
      classNames={{ image: cn('w-full h-36 object-cover', classNames?.image), wrapper: classNames?.wrapper }}
    />
  );
};
