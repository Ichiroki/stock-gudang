type StokBarangType = {
    id: number
    produk_id: number
    stock: number
    minimum_stock: number
    last_updated_by: string
    product: {
        name: string
    }
}

interface StokBarang {
    stok_barang : StokBarangType[]
    products: {
        id: number
        name: string
    }[]
}

export default StokBarang
