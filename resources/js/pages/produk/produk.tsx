import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eraser, Eye, PencilLine } from 'lucide-react';
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { createHandleChange, createHandleDelete, createHandleSubmit, createHandleUpdate, createShow } from '@/lib/handlers/useHandlers';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { SelectContent, SelectSeparator } from '@radix-ui/react-select';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Product, ProductStateType } from '@/types/ProdukType';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/produk',
    },
];


export default function Produk({products}: Product) {

    const [produk, setProduk] = useState<ProductStateType | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        category: '',
        units: '',
        unit_price: 0,
        minimum_stock: ''
    })

    const [editFormData, setEditFormData] = useState({
        id: 0,
        name: '',
        code: '',
        category: '',
        units: '',
        unit_price: 0,
        minimum_stock: ''
    })

    const fetchProduct = async (id: number) => {
        try {
            await fetch(`/produk/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data
                setEditFormData({
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    category: data.category,
                    units: data.units,
                    unit_price: data.unit_price,
                    minimum_stock: data.minimum_stock
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    const handleChange = createHandleChange(setFormData)
    const handleEditChange = createHandleChange(setEditFormData)

    const handleSubmit = createHandleSubmit('/produk/store', formData, "Data Produk berhasil ditambahkan")
    const handleUpdate = createHandleUpdate('/produk/store', editFormData, "Data Produk berhasil dirubah")
    const handleDelete = createHandleDelete('/produk/store', "Data Produk berhasil dihapus")

    const showProduct = (id: number) => createShow<ProductStateType | null>(setProduk, `/produk/${id}`, (data) => {
        return ({
            id: data.id,
            name: data.name,
            code: data.code,
            category: data.category,
            units: data.units,
            unit_price: data.unit_price,
            minimum_stock: data.minimum_stock
        });
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <ToastContainer/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-9">
                                Tambah Produk +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Produk
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                            <div className='mb-3'>
                                                <Label>Nama</Label>
                                                <Input type="text" name="name" value={formData.name} onChange={handleChange}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Kode</Label>
                                                <Input type="text" name="code" value={formData.code} onChange={handleChange}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Kategori</Label>
                                                <Input type="text" name="category" value={formData.category} onChange={handleChange}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Satuan</Label>
                                                <Input type="text" name="units" value={formData.units} onChange={handleChange}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Harga Unit</Label>
                                                <Input type="text" name="unit_price" value={formData.units} onChange={handleChange}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Stok Minimum</Label>
                                                <Input type="text" name="minimum_stock" value={formData.minimum_stock} onChange={handleChange}></Input>
                                            </div>
                                    </DialogDescription>
                                    <DialogFooter className='flex md:flex-row-reverse mt-3'>
                                        <DialogClose asChild>
                                            <Button className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</Button>
                                        </DialogClose>
                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                    </DialogFooter>
                                </form>
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
                        <table className="min-w-full divide-y divide-gray-200 text-sm table table-fixed">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Nama</th>
                                <th className="px-4 py-2 text-left font-semibold">Kode</th>
                                <th className="px-4 py-2 text-left font-semibold">Kategori</th>
                                <th className="px-4 py-2 text-left font-semibold">Satuan</th>
                                <th className="px-4 py-2 text-left font-semibold">Harga Unit</th>
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
                                    <td className="px-4 py-2">{product.unit_price}</td>
                                    <td className="px-4 py-2">{product.minimum_stock}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2 h-[3.5rem]">
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => showProduct(product.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-900 w-full px-3 h-full flex justify-center items-center group">
                                                <Eye className='text-[#eee] group-hover:text-green-500'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    {produk && (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Label>Nama</Label>
                                                            <Input type="text" name="name" defaultValue={produk.name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kode</Label>
                                                            <Input type="text" name="code" defaultValue={produk.code}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kategori</Label>
                                                            <Input type="text" name="category" defaultValue={produk.category}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Satuan</Label>
                                                            <Input type="text" name="units" defaultValue={produk.units}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Harga Unit</Label>
                                                            <Input type="text" name="units" defaultValue={produk.unit_price}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="minimum_stock" defaultValue={produk.minimum_stock}></Input>
                                                        </div>
                                                    </>
                                                    )}
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose className='cursor-pointer bg-rose-500 text-gray-50'>
                                                        Tutup
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Show */}
                                        {/* Edit */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => fetchProduct(product.id)} className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3 flex items-center justify-center h-full group">
                                                <PencilLine className='text-[#eee] group-hover:text-yellow-500'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdate}>
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                        <div className='mb-3'>
                                                            <Label>Nama</Label>
                                                            <Input type="text" name="name" onChange={handleEditChange} value={editFormData.name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kode</Label>
                                                            <Input type="text" name="code" onChange={handleEditChange} value={editFormData.code}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kategori</Label>
                                                            <Input type="text" name="category" onChange={handleEditChange} value={editFormData.category}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Satuan</Label>
                                                            <Input type="text" name="units" onChange={handleEditChange} value={editFormData.units}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="minimum_stock" onChange={handleEditChange} value={editFormData.minimum_stock}></Input>
                                                        </div>
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                                        <DialogClose className='cursor-pointer bg-rose-500 text-gray-50'>
                                                            Tutup
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Edit */}
                                        {/* Delete */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-rose-400 hover:bg-transparent border rounded-md hover:border-rose-400 transition text-gray-900 w-full flex items-center justify-center h-full px-3 group">
                                                <Eraser className='text-[#eee] group-hover:text-red-600'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Hapus Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={() => handleDelete(product.id)}>
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container flex items-center justify-center'>
                                                        Apakah anda yakin ingin menghapus data ini ?
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
