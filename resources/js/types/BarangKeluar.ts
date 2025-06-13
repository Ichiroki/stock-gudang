
type BarangKeluarType = {
    id: number
    reference_code: string
    date: string
    recipient_name: string
    description: string
    created_by: string
}

interface BarangKeluar {
    barang_keluar: BarangKeluarType[]
}

export default BarangKeluar
