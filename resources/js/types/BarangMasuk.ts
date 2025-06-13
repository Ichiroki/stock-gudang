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
}

export default BarangMasuk
