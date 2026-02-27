export interface AutoPart{
    code?: string;
    name: string;
    description: string;
    stock: number;
    min_stock: number;
    unit_price: number;
    category?: number;
    brand?: number;
    provider?: number;
    storage_location: string;
}