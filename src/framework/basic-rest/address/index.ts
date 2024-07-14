// import http from "@framework/utils/http";
// import { useQuery } from "@tanstack/react-query";
// import { API_ENDPOINTS, BASE_URL } from "@utils/constants";
// import { AxiosResponse } from "axios";
// import { CityApiResponse } from "src/types/Common/City";
// import { StateApiResponse } from "src/types/Common/State";

// export function useGetState() {

//   return useQuery({
//     queryKey: [API_ENDPOINTS.STATE],
//     queryFn: (): AxiosResponse<StateApiResponse> => {
//       return http.get(`${BASE_URL}${API_ENDPOINTS.STATE}`);
//     },
//   });

// }



// export function useGetCitiesByStateId(stateId: string) {
//   // if (!stateId) return {}
//   return useQuery({
//     queryKey: [API_ENDPOINTS.CITIES(stateId)],
//     queryFn: (): AxiosResponse<CityApiResponse> => {
//       return http.get(`${BASE_URL}${API_ENDPOINTS.CITIES(stateId)}`);
//     },
//   });
// }

import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, BASE_URL } from "@utils/constants";
import { AxiosResponse } from "axios";
import { defaultAPI } from "src/api/axios";
import { CityApiResponse } from "src/types/Common/City";
import { StateApiResponse } from "src/types/Common/State";

export function useGetState() {
  return useQuery({
    queryKey: [API_ENDPOINTS.STATE],
    queryFn: async (): Promise<AxiosResponse<StateApiResponse>> => {
      const response = await defaultAPI.get(`${BASE_URL}${API_ENDPOINTS.STATE}`);
      return response;
    },
  });
}



export function useGetCitiesByStateId(stateId: string) {
  return useQuery({
    queryKey: [API_ENDPOINTS.CITIES(stateId)],
    queryFn: async (): Promise<AxiosResponse<CityApiResponse>> => {
      const response = await defaultAPI.get(`${BASE_URL}${API_ENDPOINTS.CITIES(stateId)}`);
      return response;
    },
  });
}