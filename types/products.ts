export interface ProductProps {
    id: number; // bigint
    title: string; // text
    price: number; // real
    description?: string; // character varying (optional)
    images: string[]; // text[]
    created_at: Date; // timestamp with time zone
    category?: string; // text (optional)
    stock_quantity?: number; // integer (optional)
    rating?: number;
    quantity?:number; // numeric (optional)
    comments?: Array<Record<string, any>>;
    gender:string // integer (optional)
}
