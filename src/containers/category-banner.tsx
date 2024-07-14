import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import { CategoryInterface } from "src/types/Categories";
import BannerCardRoundedLoader from "@components/ui/loaders/banner-card-rounded-loader";
import {
  fetchSingleCategory,
  useSingleCategoryQuery,
} from "src/api/queries/home/categories/categories.query";
import { AxiosParamsOptionsTypes } from "src/types/Common/AxiosParams";

interface CategoryBannerProps {
  className?: string;
  data: CategoryInterface | undefined;
  error: any;
  isLoading: any;
  firstImg?: string;
  bannerWidth?: number;
  bannerHeight?: number;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  className = "mb-7",
  data,
  error,
  firstImg,
  isLoading,
  bannerWidth = 1800,
  bannerHeight = 570,
}) => {
  const options: AxiosParamsOptionsTypes = {
    includes: ["media"],
  };
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useSingleCategoryQuery(options, Number(data?.id));

  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <BannerCardRoundedLoader
        uniqueKey={`card-circle`}
        componentWidth={bannerWidth}
        componentHeight={bannerHeight}
      />
    );

  const { locale } = useRouter();
  const dir = getDirection(locale);
  const placeholderImage = `/assets/placeholder/category-banner.svg`;

  return (
    <div
      className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
    >
      <div className="hidden md:flex w-full relative">
        <Image
          src={
            // dir === 'rtl'
            //   ? '/assets/images/category-banner-reverse.jpg'
            //   : '/assets/images/category-banner.jpg'
            category?.data?.media[0]?.original_url ?? placeholderImage
          }
          alt="Category Banner"
          width={bannerWidth}
          height={bannerHeight}
          className={`rounded-md w-full ${
            dir === "rtl" ? "transform scale-x-[-1]" : ""
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-4 rounded-md flex justify-start items-center  w-full h-full">
            <h2
              className="glow-text text-white text-4xl opacity-75 font-bold translate-x-40"
              style={{
                textShadow:
                  "0 0 2px rgba(255, 255, 255, 0.8), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.8), 0 0 22px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              {data?.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
