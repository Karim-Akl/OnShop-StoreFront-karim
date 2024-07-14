

export interface Brand {
    id: number;
    name: string;
    slug: string;
    website: string;
    description: string;
    position: number;
    is_visible: boolean;
    seo_title: string | null;
    seo_description: string | null;
    sort: number;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}