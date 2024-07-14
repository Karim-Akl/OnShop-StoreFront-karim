import { API_ENDPOINTS } from "@utils/constants";
import { useQuery  } from '@tanstack/react-query';
import { defaultAPI } from "src/api/axios";
import { AxiosParamsOptionsTypes } from "src/types/Common/AxiosParams";
import { getDomainName } from "@contexts/store/store.context";


// ########################### Get Store Info ###########################
export const fetchStoreInfoPagination = async (options?: AxiosParamsOptionsTypes) => {
  // const { paginate, return_all, page, includes } = options;
  // const params = {
  //   paginate,
  //   return_all,
  //   page,
  //   includes,
  // };
  const domain = getDomainName()
  const { data } = await defaultAPI.get(API_ENDPOINTS.STORE_INFO, {
    headers: {
      "store-domain": domain
    }
  });
  return data;
};

export const useStoreInfoQuery = (options?: AxiosParamsOptionsTypes) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.STORE_INFO, options],
    queryFn: () => fetchStoreInfoPagination(options),
  });
};