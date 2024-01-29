export interface ProductType {
    id: number;
    company: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    imageLinks: string[];
}

export interface CartProductType {
    id: number;
    company: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    thumbnailImage: string;
}