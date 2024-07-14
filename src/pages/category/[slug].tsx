import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  useProductsInfiniteQuery,
  useProductsQuery,
} from "src/api/queries/home/products/products.query";
import { CategoryInterface } from "src/types/Categories";
import { useState } from "react";
import { Product } from "src/types/Products";

export default function Category() {
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
    includes: ["media", "categories"],
    category_id: Number(slug),
    page: 1,
  };
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProductsInfiniteQuery(options);

  //

  const response: Product[] =
    data?.pages.flatMap((page) => page.data.data) || [];
  const categoryData: CategoryInterface | undefined =
    response?.length > 0 &&
    response[0]?.categories?.find(
      (category: CategoryInterface) => category.id === Number(slug)
    );

  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <CategoryBanner
          data={categoryData}
          firstImg={data?.pages[0]?.data?.data[0]?.media?.[0]?.original_url}
          isLoading={isLoading}
          error={error}
          bannerWidth={1800}
          bannerHeight={570}
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

Category.Layout = Layout;

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
