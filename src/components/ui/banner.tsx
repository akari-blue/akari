import { Image } from './image';

export const Banner = ({ banner }: { banner: string | undefined }) => {
  return <Image src={banner} clickable={false} classNames={{ image: 'w-full h-36 object-cover' }} />;
};
