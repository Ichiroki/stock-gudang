type LaporanType = {
    id: number
    tipe: string
    quantity: number
    unit_price: string
    total: number
    reference_code: string
    created_by: number
    date: string
    description: string
    product: {
        name: string
    }
}

interface Laporan {
    laporans: LaporanType[]
    products: {
        id: number
        name: string
    }[]
}

export default Laporan
