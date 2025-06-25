import Pagination from "@/components/ui/pagination"
import { useState } from "react"

export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
    next_page_url: string | null
    prev_page_url: string | null
}

export function usePagination() {
    const [pagination, setPagination] = useState<Pagination>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        next_page_url: null,
        prev_page_url: null,
    })

    return { pagination, setPagination }
}
