import { Media } from "./Common/Media";
import { Product } from "./Products";

export interface CategoryInterface {
    id: number;
    parent_id: number | null;
    name: string;
    slug: string;
    description: string;
    position: number;
    is_visible: boolean;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;
    pivot: {
        shop_product_id: number;
        shop_category_id: number;
        created_at: string;
        updated_at: string;
    };
    products?: Product[],
    media?: Media[];
    [key: string]: any;
}