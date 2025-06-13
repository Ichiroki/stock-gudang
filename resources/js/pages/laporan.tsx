import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: '/laporan',
    },
];

export default function Dashboard({laporans}) {
    console.log(laporans)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/4 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Select>
                            <SelectTrigger>
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='nama'>
                                    Nama
                                </SelectItem>
                                <SelectSeparator/>
                                <SelectItem value='kategori'>
                                    Kategori
                                </SelectItem>
                                <SelectSeparator/>
                                <SelectItem value='stok'>
                                    Stok
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="relative w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Input></Input>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 text-sm overflow-auto">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Produk</th>
                                <th className="px-4 py-2 text-left font-semibold">Tipe</th>
                                <th className="px-4 py-2 text-left font-semibold">Jumlah</th>
                                <th className="px-4 py-2 text-left font-semibold">Harga Satuan</th>
                                <th className="px-4 py-2 text-left font-semibold">Total</th>
                                <th className="px-4 py-2 text-left font-semibold">Kode Referensi</th>
                                <th className="px-4 py-2 text-left font-semibold">Tanggal</th>
                                <th className="px-4 py-2 text-left font-semibold">Dibuat Oleh</th>
                                <th className="px-4 py-2 text-left font-semibold">Deskripsi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {laporans.map((laporan, index) => (
                                <tr key={laporan.id} className="hover:bg-gray-50 hover:text-gray-900">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{laporan.product.name}</td>
                                <td className="px-4 py-2">{laporan.tipe}</td>
                                <td className="px-4 py-2">{laporan.quantity}</td>
                                <td className="px-4 py-2">{laporan.unit_price}</td>
                                <td className="px-4 py-2">{laporan.total}</td>
                                <td className="px-4 py-2">{laporan.reference_code}</td>
                                <td className="px-4 py-2">{laporan.created_by}</td>
                                <td className="px-4 py-2">{laporan.date}</td>
                                <td className="px-4 py-2">{laporan.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* End of table */}
                </div>
            </div>
        </AppLayout>
    );
}
