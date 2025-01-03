import { Image } from './Image';

export const Banner = ({ banner }: { banner: string | undefined }) => {
  return <Image src={banner} clickable={false} classNames={{ image: 'w-full h-32 object-cover' }} />;
};
