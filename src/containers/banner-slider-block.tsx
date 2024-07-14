import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";
import { BannersStatic } from "@framework/static/banners";
import Alert from "@components/ui/alert";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";
import BannerCardRoundedLoader from "@components/ui/loaders/banner-card-rounded-loader";

interface BannerProps {
	className?: string;
}

const breakpoints = {
	"0": {
		slidesPerView: 2,
	},
};

const data = BannersStatic
const isLoading = false
const error = false


const BannerSliderBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
	const componentWidth = width < 480 ? 450 : 1080
	const componentHeight = width < 480 ? 180 : 340
	return (
		<div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
			<div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
				{error ? (
					<Alert
						// message={error?.message} 
						message="An error occurred - banner slider block - containers"
					/>
				) : (
					<Carousel
						breakpoints={breakpoints}
						centeredSlides={true}
						loop={true}
						autoplay={{
							delay: 4000,
						}}
						pagination={{
							clickable: true,
						}}
						paginationVariant="circle"
						buttonGroupClassName="hidden"
					>

						{isLoading && !data
							? Array.from({ length: 5 }).map((_, idx) => {
								return (
									<SwiperSlide key={`card-circle-${idx}`}>
										<BannerCardRoundedLoader 
										uniqueKey={`card-circle-${idx}`}
										componentWidth={componentWidth}
										componentHeight={componentHeight}
										/>
									</SwiperSlide>
								);
							})
							:
							data.map((banner: any) => (
								<SwiperSlide
									key={`banner--key${banner.id}`}
									className="px-1.5 md:px-2.5 xl:px-3.5"
								>
									<BannerCard
										banner={banner}
										effectActive={true}
										href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
										componentWidth={componentWidth}
										componentHeight={componentHeight}
									/>
								</SwiperSlide>
							))}
					</Carousel>
				)}
			</div>
		</div>
	);
};

export default BannerSliderBlock;
