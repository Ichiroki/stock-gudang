type ProductType = {
    id: number
    name: string
    code: string
    category: string
    units: string
    minimum_stock: number
}

interface Products {
    products: ProductType[]
}

export default Products
