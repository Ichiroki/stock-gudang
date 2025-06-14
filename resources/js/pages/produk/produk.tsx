import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Product from '@/types/ProdukType';
import { Head } from '@inertiajs/react';
import { SelectContent, SelectSeparator } from '@radix-ui/react-select';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/produk',
    },
];

export default function Produk({products}: Product) {
    console.log(products)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Produk +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Produk
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                    <form>
                                        <div className='mb-3'>
                                            <Label>Nama</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Kode</Label>
                                            <Input type="date"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Kategori</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Satuan</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Stok Minimum</Label>
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
                    <div className="relative md:w-1/4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
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
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Nama</th>
                                <th className="px-4 py-2 text-left font-semibold">Kode</th>
                                <th className="px-4 py-2 text-left font-semibold">Kategori</th>
                                <th className="px-4 py-2 text-left font-semibold">Satuan</th>
                                <th className="px-4 py-2 text-left font-semibold">Stok Minimum</th>
                                <th className="px-4 py-2 text-left font-semibold">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {products.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.code}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.units}</td>
                                    <td className="px-4 py-2">{product.minimum_stock}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2">
                                        {/* Edit */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3">
                                                Ubah
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    <form>
                                                        <div className='mb-3'>
                                                            <Label>Nama</Label>
                                                            <Input type="text"></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kode</Label>
                                                            <Input type="date"></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kategori</Label>
                                                            <Input type="text"></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Satuan</Label>
                                                            <Input type="text"></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
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
                                        {/* Edit */}
                                        {/* Delete */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-rose-400 hover:bg-transparent border rounded-md hover:border-rose-400 transition text-gray-900 w-full px-3">
                                                Hapus
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Hapus Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form action="">
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container flex items-center justify-center'>
                                                        <p>Apakah anda yakin ingin menghapus data ini ?</p>
                                                    </DialogDescription>
                                                    <DialogFooter className='flex flex-col-reverse'>
                                                        <DialogClose>
                                                            <Button className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</Button>
                                                        </DialogClose>
                                                        <Button type='submit' className='w-full bg-green-400'>Ya, Hapus data ini</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Delete */}
                                    </td>
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
