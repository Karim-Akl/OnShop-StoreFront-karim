import { API_ENDPOINTS } from "@utils/constants";
import { useQuery } from '@tanstack/react-query';
import { defaultAPI } from "src/api/axios";
import { AxiosParamsOptionsTypes } from "src/types/Common/AxiosParams";


// ########################### Get All Categories ###########################
export const fetchCategoriesPagination = async (options: AxiosParamsOptionsTypes) => {
  const { paginate, return_all, page, includes } = options;
  const params = {
    paginate,
    return_all,
    page,
    includes
  };
  const { data } = await defaultAPI.get(API_ENDPOINTS.CATEGORIES, { params: params });
  return data;
};

export const useCategoriesQuery = (options: AxiosParamsOptionsTypes) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: () => fetchCategoriesPagination(options),
  });
};


// ########################### Get Single Category ###########################
export const fetchSingleCategory = async (options: AxiosParamsOptionsTypes, id: number) => {
  const { paginate, return_all, page, includes } = options;
  const params = {
    paginate,
    return_all,
    page,
    includes
  };
  const { data } = await defaultAPI.get(API_ENDPOINTS.CATEGORIES + '/' + id, { params: params });
  return data;
};

export const useSingleCategoryQuery = (options: AxiosParamsOptionsTypes, id: number) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.CATEGORIES + '/' + id, options],
    queryFn: () => fetchSingleCategory(options, id),
  });
};