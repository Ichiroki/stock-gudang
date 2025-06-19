type BarangKeluarType = {
    id: number
    reference_code: string
    date: string
    recipient_name: string
    description: string
    created_by: string
}

export interface BarangKeluar {
    barang_keluar: BarangKeluarType[]
    product: {
        id: number
        name: string
        unit_price: number
    }[]
}

export interface BarangKeluarStateType {
    reference_code: string
    date: string
    recipient_name: string
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
