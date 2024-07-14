import { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface BannerCardLoaderProps {
  componentWidth: any;
  componentHeight: any;
  uniqueKey:any;
}

const BannerCardLoader: FC<BannerCardLoaderProps> = ({
  componentWidth,
  componentHeight,
  uniqueKey,
  ...props
}) => (
  <ContentLoader
    speed={2}
    width={componentWidth}
    height={componentHeight}
    viewBox={`0 0 ${componentWidth} ${componentHeight}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="w-full h-auto"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    <rect x="0" y="0" rx="0" ry="0" width="50%" height="100%" />

  </ContentLoader>
);

export default BannerCardLoader;
