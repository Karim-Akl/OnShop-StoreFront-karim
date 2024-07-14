export interface CheckoutInputType {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    // country: string;
    state: string;
    city: string;
    streetAddress: string;
    save: boolean;
    note?: string;
    [key: string]: any;
}
type ProductType = {
    id: number;
    shop_brand_id: number | null;
    name: string;
    slug: string;
    sku: string;
    barcode: string;
    description: string | null;
    qty: number;
    security_stock: number;
    featured: boolean;
    is_visible: boolean;
    old_price: string;
    price: string;
    cost: string;
    type: string | null;
    backorder: boolean;
    requires_shipping: boolean;
    published_at: string;
    seo_title: string | null;
    seo_description: string | null;
    weight_value: string;
    weight_unit: string;
    height_value: string;
    height_unit: string;
    width_value: string;
    width_unit: string;
    depth_value: string;
    depth_unit: string;
    volume_value: string;
    volume_unit: string;
    created_at: string;
    updated_at: string;
    'App\\Models\\Store': string | null;
    store_id: number;
};


export type OrderResponse = {
    cose?: number
    id: number;
    shop_customer_id: number;
    number: string;
    total_price: number;
    status: string;
    currency: string;
    shipping_price: number;
    shipping_method: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    address: {
        id: number;
        addressable_type: string;
        addressable_id: number;
        country: string;
        street: string;
        city: string;
        state: string;
        zip: string | null;
        created_at: string;
        updated_at: string;
    };
    customer: {
        id: number;
        name: string;
        email: string;
        photo: string | null;
        gender: string;
        phone: string;
        birthday: string | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    };
    items: {
        id: number;
        shop_order_id: number;
        shop_product_id: number;
        qty: number;
        unit_price: number;
        created_at: string;
        updated_at: string;
        product: ProductType
        sort: number;
    }[];
    payments: any[];

};

/* 
{
    "items" : [
        {
            "shop_product_id"    : 1,
            "qty"      : 1
        },
        {
            "shop_product_id"    : 2,
            "qty"      : 3
        },
        {
            "shop_product_id"    : 5,
            "qty"      : 1
        }
    ],
    "first_name"  : "name",
    "last_name"   : "last name", //
    "email"       : "mail@info.com",
    "phone"       : "012*********", //
    "country"     : "1", // Country ID
    "street"      : "ST 16", // Optinal
    "city"        : "city id ", // Optinal
    "state"       : "state id", // Optinal
    "zip"         : "81511", // Optinal
    "gender"      : "male - female " // [male,female]
}


*/