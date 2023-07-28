export interface Product{
    brand: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
}

export interface Validate{
    inspection_status: string;
    product_name: string;
    product_price: number;
    image: string
}