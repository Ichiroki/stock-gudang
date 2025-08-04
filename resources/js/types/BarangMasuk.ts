export type BarangMasukType = {
    id: number
    reference_code: string
    date: string
    supplier_name: string
    description: string
    created_by: string
}

export interface BarangMasuk {
    barang_masuk: BarangMasukType[]
    product: {
        id: number
        name: string,
        unit_price: number
    }[]
}

export interface BarangMasukFormType {
    id: number
    reference_code: string
    date: string
    supplier_name: string
    description: string
    created_by: string
    details: {
        id: number,
        product_id: number,
        quantity: number,
        name?: string,
        unit_price: number
        subtotal: number
    }[]
}

export interface BarangMasukStateType {
    id: number
    reference_code: string
    date: string
    supplier_name: string
    description: string
    created_by: string
    details: {
        product: {
            id: number,
            name: string,
            unit_price: number
        }
    }[]
}

export default BarangMasuk
