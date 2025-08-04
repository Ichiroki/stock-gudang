interface PaginationProps {
    currentPage: number
    lastPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center gap-2 mt-4 justify-center">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
                Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                >
                {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
