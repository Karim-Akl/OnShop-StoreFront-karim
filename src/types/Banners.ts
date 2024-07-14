import { Media } from "./Common/Media";
import { ObjectWithAnyFields } from "./Common/ObjectWithAnyFields";

export interface Banner {
    id: number;
    store_id: number;
    title: ObjectWithAnyFields;
    des?: ObjectWithAnyFields;
    url: string;
    visibility: string[] | null;
    created_at: string | Date;
    updated_at: string | Date;
    media: Media[];
    [key: string]: any;
}