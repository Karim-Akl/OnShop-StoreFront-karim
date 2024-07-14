import { API_ENDPOINTS } from "@utils/constants";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { defaultAPI } from "src/api/axios";
import { AxiosParamsOptionsTypes } from "src/types/Common/AxiosParams";

// ########################### Get All Products ###########################
export const fetchProductsPagination = async (
  options: AxiosParamsOptionsTypes
) => {
  const { paginate, return_all, page, includes, category_id } = options;
  const params = {
    paginate,
    return_all,
    page,
    includes,
    category_id,
  };
  const { data } = await defaultAPI.get(API_ENDPOINTS.PRODUCTS, {
    params: params,
  });
  return data;
};

export const useProductsQuery = (options: AxiosParamsOptionsTypes) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: () => fetchProductsPagination(options),
  });
};

export const useLayoutQuery = () => {
  return useQuery({
    queryKey: [API_ENDPOINTS.Layout],
    queryFn: () =>
      defaultAPI.get(API_ENDPOINTS.Layout, {
        headers: {
          "store-id": 7,
        },
      }),
  });
};

export const useProductsInfiniteQuery = (options: AxiosParamsOptionsTypes) => {
  return useInfiniteQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: ({ pageParam = `${options.page}` }) =>
      fetchProductsPagination({ ...options, page: parseInt(pageParam) }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.data?.next_page_url
        ? new URL(lastPage.data.next_page_url).searchParams.get("page")
        : null;
      return nextPage;
    },
    initialPageParam: `${options.page}`,
  });
};

// ########################### Get Single Product ###########################
export const fetchSingleProduct = async (
  options: AxiosParamsOptionsTypes,
  id: number
) => {
  const { paginate, return_all, page, includes } = options;
  const params = {
    paginate,
    return_all,
    page,
    includes,
  };
  const { data } = await defaultAPI.get(API_ENDPOINTS.PRODUCTS + "/" + id, {
    params: params,
  });
  return data;
};

export const useSingleProductQuery = (
  options: AxiosParamsOptionsTypes,
  id: number
) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS + "/" + id, options],
    queryFn: () => fetchSingleProduct(options, id),
  });
};
