export type ProductType = {
    id: number
    name: string
    code: string
    category: string
    units: string
    minimum_stock: number
}

export interface Products {
    products: ProductType[]
}

export interface Product {
    id: number,
    name: string,
    code: string,
    category: string,
    units: number,
    unit_price: number,
    minimum_stock: number
    products: Product[]
}

export interface ProductStateType {
    id: number,
    name: string,
    code: string,
    category: string,
    units: number,
    unit_price: number,
    minimum_stock: number
}

export interface ProductDetailType {
    id: number
    produk_id: number
    quantity: number
    unit_price: number
    subtotal: number
    produk: Products
}
