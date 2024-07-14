import Link from '@components/ui/link';
import Image from 'next/image';
import cn from 'classnames';
import { LinkProps } from 'next/link';

interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps['href'];
  disableBorderRadius?: boolean;
  componentWidth?: number;
  componentHeight?: number;
}

// function getImage(deviceWidth: number, imgObj: any) {
//   return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
// }
const placeholderImage = `/assets/placeholder/card-small.svg`;

export default function BannerCard({
  banner,
  className,
  variant = 'rounded',
  effectActive = false,
  classNameInner,
  href,
  disableBorderRadius = false,
  componentWidth=450,
  componentHeight=180,
}: BannerProps) {
  const { title, image } = banner;
  // const selectedImage = getImage(width, image);
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={href}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <Image
          // src={selectedImage.url}
          src={image?.original ?? placeholderImage}
          width={componentWidth}
          height={componentHeight}
          alt={title}
          quality={100}
          className={cn('bg-gray-300 object-cover w-full', {
            'rounded-md': variant === 'rounded' && !disableBorderRadius,
          })}
          priority={true}
        />
        {effectActive && (
          <div className="absolute top-0 ltr:-left-[100%] rtl:-right-[100%] h-full w-1/2 z-5 block transform ltr:-skew-x-12 rtl:skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 ltr:group-hover:animate-shine rtl:group-hover:animate-shineRTL" />
        )}
      </Link>
    </div>
  );
}
