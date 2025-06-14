import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import StokBarang from '@/types/StokBarangType';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok Barang',
        href: '/stok-barang',
    },
];

export default function Dashboard({stok_barang}: StokBarang) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stok Barang" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Stok Barang +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Stok Barang
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                    <form>
                                        <div className='mb-3'>
                                            <Label>Produk</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Jumlah Stok</Label>
                                            <Input type="date"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Jumlah Minimum Stok</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Diubah terakhir oleh</Label>
                                            <Input type="text"></Input>
                                        </div>
                                    </form>
                                </DialogDescription>
                                <DialogFooter>
                                    <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                    <DialogClose>
                                        <Button className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                                <th className="px-4 py-2 text-left font-semibold">Jumlah Stok</th>
                                <th className="px-4 py-2 text-left font-semibold">Jumlah Minimum Stok</th>
                                <th className="px-4 py-2 text-left font-semibold">Diubah terakhir oleh</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {stok_barang.map((stok, index) => (
                                <tr key={stok.id} className="hover:bg-gray-50 hover:text-gray-900">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{stok.product.name}</td>
                                <td className="px-4 py-2">{stok.stock}</td>
                                <td className="px-4 py-2">{stok.minimum_stock}</td>
                                <td className="px-4 py-2">{stok.last_updated_by}</td>
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
