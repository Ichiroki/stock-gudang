import { Key, ReactNode } from "react"

export type KategoriType = {
    id: number
    name: string
}

export interface Kategori {
    name: ReactNode
    id: number | Key
    kategoris: KategoriType[]
}
