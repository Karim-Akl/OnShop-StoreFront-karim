import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "src/types/Products";
import { CategoryInterface } from "src/types/Categories";

interface ProductGridProps {
	className?: string;
	data: Product[];
	error: any;
	isLoading: any;
	hasNextPage: boolean | undefined;
	loadingMore: any;
	fetchNextPage: () => void;
}
export const ProductGrid: FC<ProductGridProps> = ({ 
	className = "", 
	data,
	error,
	isLoading,
	hasNextPage,
	loadingMore,
	fetchNextPage,
 }) => {
	// const { query } = useRouter();
	// const {
	// 	// isFetching: isLoading,
	// 	isFetchingNextPage: loadingMore,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	// data,
	// 	// error,
	// } = useProductsQuery({ limit: 10, ...query });
	if (error) return <p>{error.message}</p>;
	const { t } = useTranslation("common");

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !data?.length ? (
				// {true ? (
					<ProductFeedLoader limit={10} uniqueKey="search-product" />
				) : (
					data?.map((product:Product) => {
						// return item?.data?.map((product: Product) => (
							return <ProductCard
								key={`product--key${product.id}`}
								product={product}
								variant="grid"
							/>
						// ));
					})
				)}
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)}
			</div>
		</>
	);
};
