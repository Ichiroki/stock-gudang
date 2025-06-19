type ProductType = {
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

export interface ProductDetailType {
    id: number
    produk_id: number
    quantity: number
    unit_price: number
    subtotal: number
    produk: Products
}
