export interface Product{
    brand: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
    type: string;
    status: string;
    validation_status: boolean;
}

export interface Validate{
    inspection_status: string;
    product_name: string;
    product_price: number;
    image: string
    inspection_id: string;
}

export interface UserValidate{
    id: number;
    user_id: number;
    verification_status: string
}

export interface ProductValidate{
    id: number;
    image: string;
    inspection_status: string;
    product_name: string;
    username: string;
}