import axios from "axios";
import { GetServerSidePropsContext } from "next/types";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, BASE_URL } from "src/utils/constants";
import { fetchStoreInfo } from "@contexts/store/store.context";

const VALIDATION_ERRORS_RESPONSE = 422;
const UNAUTHENTICATED_ERROR = 401;
const TOO_MANY_REQUESTS_ERROR = 429;

export const defaultAPI = axios.create({
  baseURL: BASE_URL,
});

export const authToken = `Bearer ${Cookies.get("accessToken") || ""}`;

// const isServer = () => {
//   return typeof window === "undefined";
// };

let locale = "";
let context = <GetServerSidePropsContext>{};

export const setLocale = (_locale: string) => {
  locale = _locale;
};

export const getLocale = () => locale;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

let storeId: string | null = null;

const initializeAxios = async () => {
  storeId = await fetchStoreInfo();
  
  defaultAPI.interceptors.response.use(
    function (response) {
      console.log("running ... ");
      // console.log('response',response);
      const SHOW_TOAST = false;
      if (SHOW_TOAST) {
        if (response.data.message) {
          // toast.dismiss();
          // toast.success(response.data.message);
        }
      }
  
      return response;
    },
    function (error) {
  
      if (!error.response) {
        // Network error
        // toast.dismiss();
        // toast.error("Network error. Please check your connection and try again.");
        return Promise.reject(error);
      }
  
      
      const STATUS_CODE = error?.response?.status;
      // const errorMessage = error?.response?.data?.message;
      if (STATUS_CODE === VALIDATION_ERRORS_RESPONSE) {
        // const responseErrors = error.response.data.data;
        // const firstErrorKey = Object.keys(responseErrors)[0];
  
        // toast.dismiss();
  
        // toast.error(`${errorMessage}`);
      } if (STATUS_CODE === TOO_MANY_REQUESTS_ERROR) {
  
        const retryAfter = Number(error.response.headers['retry-after']) || 2;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(defaultAPI.request(error.config));
          }, retryAfter * 2000);
        });
  
  
      } else if (STATUS_CODE === UNAUTHENTICATED_ERROR && error.config.url !== "/auth/jwt/login") {
        Cookies.remove(ACCESS_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);
        return (window.location.href = "/auth/jwt/login");
      } else {
        // toast.dismiss();
        // toast.error(error.response.data.message);
      }
  
      return Promise.reject(error);
    }
  );

  defaultAPI.interceptors.request.use(
    (config) => {
      config.headers!.Authorization = `Bearer ${Cookies.get(ACCESS_TOKEN)}`;
      // if (!isServer()) {
      //     config.headers.Locale = window.location.pathname.slice(1, 3) == 'ar' ? "ar" : "en";
      // }
      // if (isServer() && context?.req?.cookies) {
      //     config.headers.Locale = context?.req?.cookies?.NEXT_LOCALE || "en";
      // }
      config.headers!.Accept = "application/json";
      config.headers!['store-id'] = storeId;
      console.log("config.headers:", config.headers);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

initializeAxios();
