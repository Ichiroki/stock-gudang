type BarangMasukType = {
    id: number
    reference_code: string
    date: string
    supplier_name: string
    description: string
    created_by: string
}

interface BarangMasuk {
    barang_masuk: BarangMasukType[]
    product: {
        id: string
        name: string,
        unit_price: number
    }[]
}

export default BarangMasuk
