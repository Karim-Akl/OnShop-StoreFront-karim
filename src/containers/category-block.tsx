import Card from "@components/common/card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { ROUTES } from "@utils/routes";
import Alert from "@components/ui/alert";
import { SwiperSlide } from "swiper/react";
import { useCategoriesQuery } from "src/api/queries/home/categories/categories.query";
import { CategoryInterface } from "src/types/Categories";
import { categoriesStatic } from "@framework/static/categories";

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  type?: "rounded" | "circle";
  roundedItemCount?: number;
  roundedSpaceBetween?: number;
  imgSize?: "large";
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const CategoryBlock: React.FC<CategoriesProps> = ({
  className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  sectionHeading,
  type = "circle",
  roundedItemCount,
  roundedSpaceBetween,
  imgSize,
  // demoVariant,
  disableBorderRadius = false,
}) => {
  const breakpoints = {
    "1720": {
      slidesPerView: roundedItemCount === 5 ? 5 : 8,
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1400": {
      slidesPerView: roundedItemCount === 5 ? 5 : 7,
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1024": {
      slidesPerView: roundedItemCount === 5 ? 4 : 6,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "768": {
      slidesPerView: roundedItemCount === 5 ? 3 : 5,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "500": {
      slidesPerView: roundedItemCount === 5 ? 2 : 4,
      spaceBetween: roundedSpaceBetween || 12,
    },
    "0": {
      slidesPerView: roundedItemCount === 5 ? 2 : 3,
      spaceBetween: roundedSpaceBetween || 12,
    },
  };

  const breakpointsCircle = {
    "1720": {
      slidesPerView: 8,
      spaceBetween: 48,
    },
    "1400": {
      slidesPerView: 7,
      spaceBetween: 32,
    },
    "1025": {
      slidesPerView: 6,
      spaceBetween: 28,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    "500": {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    "0": {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  };

  // const { data, isLoading, error } = useCategoriesQuery({
  //   limit: 10,
  //   demoVariant: demoVariant || undefined,
  // });
  // const response = categoriesStatic
  // const isLoading = false
  // const error = false

  const options = {
    return_all: 1,
    includes: ["media"],
  };
  const { isLoading, data, error } = useCategoriesQuery(options);

  const response = data?.data;

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert
          // message={error?.message}
          message="An error occurred - category block - containers"
        />
      ) : (
        <Carousel
          breakpoints={type === "rounded" ? breakpoints : breakpointsCircle}
          buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
          autoplay={{
            delay: 3000,
          }}
        >
          {isLoading && !response
            ? Array.from({ length: roundedItemCount || 10 }).map((_, idx) => {
                return (
                  <SwiperSlide key={`card-circle-${idx}`}>
                    <CardRoundedLoader uniqueKey={`card-circle-${idx}`} />
                  </SwiperSlide>
                );
              })
            : response?.map((category: CategoryInterface) => (
                <SwiperSlide key={`category--key-${category.id}`}>
                  <Card
                    imgSize={imgSize}
                    item={category}
                    href={`${ROUTES.CATEGORY}/${category.id}`}
                    variant={type}
                    effectActive={true}
                    size={type === "rounded" ? "medium" : "small"}
                    disableBorderRadius={disableBorderRadius}
                    blockName="categories"
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryBlock;
