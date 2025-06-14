import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import Laporan from '@/types/Laporan';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: '/laporan',
    },
];

export default function Dashboard({laporans}: Laporan) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Laporan +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Laporan
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                    <form>
                                        <div className='mb-3'>
                                            <Label>Produk</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Tipe</Label>
                                            <Input type="date"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Jumlah</Label>
                                            <Input type="date"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Harga Satuan</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Total</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Kode Referensi</Label>
                                            <Input type="date"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Tanggal</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Dibuat oleh</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3 flex flex-col'>
                                            <Label className='mb-1'>Deskripsi</Label>
                                            <textarea name="" id="" className={cn(
                                                "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                            )}></textarea>
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
