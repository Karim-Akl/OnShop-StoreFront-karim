export const CUSTOMER = "customer";

// export const BASE_URL = "https://7.onshophq.com/api/store";  http://app.onshophq.com
export const BASE_URL = "https://app.onshophq.com/api/store";
export const ACCESS_TOKEN = "accessToken";
export const USER_AUTH = "auth";
export const USER_AUTH_ID = "user_id";
export const CURRENCY_CODE = "KWD";
export const API_ENDPOINTS = {
  Layout: "/configs",
  SIGNIN: "/auth/login",
  SIGNUP: "/auth/register",
  GETUSERDATA: "/auth/user",
  SETTINGS: "/settings",
  PRODUCTS: "/products",
  PRODUCTS_THEMES: "/product-themes",
  BRANDS: "/brands",
  SHIPPING: "/shipping-costs",
  BRANCHES: "/branches",
  BANNERS: "/banners",
  ADDONS: "/addons",
  INVOICES: "/invoices",
  INVOICES_SETTINGS: "/invoice-settings",
  BANNERS_THEMES: "/banner-themes",
  PAYMENT_GATEWAYS: "/payment-gateways",
  CATEGORIES: "/categories",
  EMPLOYEE: "/employee",
  VARIANT: "/variants",
  CATEGORIES_THEMES: "/category-themes",
  ORDERS: "/orders",
  TRAKING_ORDER: "/tracking",
  STORES: "/stores",
  STORE_INFO: "/info",
  ONLINE_STORE_INFO: "/online-store-infos",
  THEMES: "/themes",
  COUNTRIES: "/countries",
  STATE: "/kw/states",
  CHECKOUT: "/checkout",
  CITIES: (state_id: string) => `/${state_id}/cities`,
};
