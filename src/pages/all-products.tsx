import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { useProductsInfiniteQuery } from "src/api/queries/home/products/products.query";
import { CategoryInterface } from "src/types/Categories";
import { Product } from "src/types/Products";
import SectionHeader from "@components/common/section-header";

export default function Products() {

	const {
		query: { slug },
	} = useRouter();

	// const response = categoriesStatic[0]
	// const isLoading = false
	// const error = false
	// const { isLoading, data, error } = categoriesStatic[0]
	// const response = data

	// const [page, setPage] = useState<number>(1)
	const options = {
		paginate: 10,
		includes: ['media', 'categories'],
		page: 1,
	};
	const { isLoading, data, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useProductsInfiniteQuery(options);
	const response: Product[] = data?.pages.flatMap(page => page.data.data) || [];

	return (
		<div className="border-t-2 border-borderBottom pt-16">
			<Container>
				<SectionHeader
					sectionHeading='All Products'
				// categorySlug={categorySlug}
				/>
				<div className="pb-16 lg:pb-20">
					<ProductGrid
						className="3xl:grid-cols-6"
						data={response}
						isLoading={isLoading}
						error={error}
						hasNextPage={hasNextPage}
						loadingMore={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
					/>
				</div>
				{/* <Subscription /> */}
			</Container>
		</div>
	);
}

Products.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
