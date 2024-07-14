import { Media } from "./Common/Media";

export interface Variant {
    id: number;
    product_id: number;
    cost: string | number;
    price: string | number;
    old_price: string | number;
    policies: {
        backorder: boolean;
        requires_shipping: boolean;
        pickup: boolean;
        dine_in: boolean;
    };
    visibility: string[];
    barcode: string;
    sku: string;
    specifications: { [key: string]: any } | null;
    created_at: string | Date;
    updated_at: string | Date;
    media?: Media[];
    [key: string]: any;
}