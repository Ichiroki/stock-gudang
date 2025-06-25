import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { createGet, createHandleChange, createHandleDelete, createHandleEditChange, createHandleSubmit, createHandleUpdate, createShow } from '@/lib/handlers/useHandlers';
import { type BreadcrumbItem } from '@/types';
import StokBarang from '@/types/StokBarangType';
import { Head } from '@inertiajs/react';
import { Eraser, Eye, PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok Barang',
        href: '/stok-barang',
    },
];

interface StokBarangType {
    id: number
    stock: number
    minimum_stock: number
    last_updated_by: string
    product: {
        name: string
    }
}

export default function StokBarangDashboard({products}: StokBarang) {
    const [stok_barang, setStok_Barang] = useState<StokBarangType[]>([])
    const [showStokBarang, setShowStokBarang] = useState<StokBarangType | null>(null)

    const [formData, setFormData] = useState({
        product: 0,
        stock: 0,
        minimum_stock: 0,
        last_updated_by: '',
    })

    const [errorFormData, setErrorFormData] = useState({
        product: '',
        stock: '',
        minimum_stock: '',
        last_updated_by: '',
    })

    const [editFormData, setEditFormData] = useState({
        id: 0,
        product: 0,
        stock: 0,
        minimum_stock: 0,
        last_updated_by: '',
    })

    const handleChange = createHandleChange(setFormData)
    const handleEditChange = createHandleEditChange(setEditFormData)

    const getShowStokBarang = (id: number) => createShow<StokBarangType | null>(setShowStokBarang, `/stok-barang/${id}`, (data) => ({
        id: data.id,
        product_id: data.produk_id,
        stock: data.stock,
        minimum_stock: data.minimum_stock,
        last_updated_by: data.last_updated_by,
        product: {
            name: data.product.name
        }
    }))

    const handleGet = createGet("/data/stok-barang", setStok_Barang)
    const handleSubmit = createHandleSubmit("/stok-barang/store", formData, "Data Stok Barang berhasil diubah", setErrorFormData)
    const handleUpdate = (id: number) => createHandleUpdate(`/stok-barang/${id}/update`, editFormData, "Stok Barang berhasil diubah")
    const handleDelete = (id: number) => createHandleDelete(`/stok-barang/${id}/delete`, "Stok Barang berhasil dihapus")

    const fetchStokBarang = async (id: number) => {
        try {
            await fetch(`/stok-barang/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data

                setEditFormData({
                    id: data.id,
                    product: data.produk_id,
                    stock: data.stock,
                    minimum_stock: data.minimum_stock,
                    last_updated_by: data.last_updated_by,
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        handleGet()
    }, [])

    console.log(stok_barang)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer/>
            <Head title="Stok Barang" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:text-green-400 border rounded-xl hover:border-green-400 transition text-gray-50 w-full h-9">
                                Tambah Stok Barang +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Stok Barang
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                        <div className='mb-3'>
                                            <Label>Produk</Label>
                                            <select
                                                name="product"
                                                value={formData.product}
                                                onChange={handleChange}
                                                className="w-full mt-1 mb-2 border rounded p-2"
                                            >
                                                <option value="">-- Pilih Produk --</option>
                                                {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Stok</Label>
                                            <Input type="text" name="stock" onChange={handleChange} value={formData.stock}></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Minimum Stok</Label>
                                            <Input type="text" name="minimum_stock" onChange={handleChange} value={formData.minimum_stock}></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Diubah Oleh</Label>
                                            <Input type="text" name="last_updated_by" onChange={handleChange} value={formData.last_updated_by}></Input>
                                        </div>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose className='cursor-pointer text-gray-50 bg-rose-500 border py-2 md:py-1 px-3 text-sm rounded-md hover:bg-transparent hover:text-rose-500 hover:border-rose-500 transition'>
                                            Tutup
                                        </DialogClose>
                                        <Button type='submit' className='w-full cursor-pointer text-gray-50 bg-green-400 border hover:text-green-400 hover:border-green-400 hover:bg-transparent transition'>Kirim</Button>
                                    </DialogFooter>
                                </form>
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
                                <th className="px-4 py-2 text-left font-semibold">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {stok_barang.map((stok, index) => (
                                <tr key={stok.id} className="hover:bg-gray-200 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{stok.product.name}</td>
                                    <td className="px-4 py-2">{stok.stock}</td>
                                    <td className="px-4 py-2">{stok.minimum_stock}</td>
                                    <td className="px-4 py-2">{stok.last_updated_by}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2 h-[3.5rem]">
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={getShowStokBarang(stok.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-50 w-full px-3 h-full flex justify-center items-center group">
                                                <Eye className='text-gray-50 dark:text-gray-100 group-hover:text-green-500'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Stok Barang
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    {showStokBarang && (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Label>Produk</Label>
                                                            <Input type="text" name="product" readOnly defaultValue={showStokBarang?.product.name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok</Label>
                                                            <Input type="text" name="date" readOnly defaultValue={showStokBarang?.stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="category" readOnly defaultValue={showStokBarang?.minimum_stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Diubah Oleh</Label>
                                                            <Input type="text" name="units" readOnly defaultValue={showStokBarang?.last_updated_by}></Input>
                                                        </div>
                                                    </>
                                                    )}
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose className='cursor-pointer text-gray-50 bg-rose-500 border  py-1 px-3 text-sm rounded-md hover:bg-transparent hover:text-rose-500 hover:border-rose-500 transition'>
                                                        Tutup
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Show */}
                                        {/* Edit */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-50 w-full px-3 flex items-center justify-center h-full group" onClick={() => fetchStokBarang(stok.id)}>
                                                <PencilLine className='text-gray-50 dark:text-gray-100 group-hover:text-yellow-500'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdate(stok.id)}>
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                        <div className='mb-3'>
                                                            <Label>Produk</Label>
                                                            <select
                                                                name="product"
                                                                value={editFormData.product}
                                                                onChange={handleEditChange}
                                                                className="w-full mt-1 mb-2 border rounded p-2"
                                                            >
                                                                <option value="">-- Pilih Produk --</option>
                                                                {products.map((p, i) => (
                                                                <option key={i} value={p.id}>
                                                                    {p.name}
                                                                </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok</Label>
                                                            <Input type="text" name="stock" onChange={handleEditChange} value={editFormData.stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Minimum Stok</Label>
                                                            <Input type="text" name="minimum_stock" onChange={handleEditChange} value={editFormData.minimum_stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Diubah Oleh</Label>
                                                            <Input type="text" name="last_updated_by" onChange={handleEditChange} value={editFormData.last_updated_by}></Input>
                                                        </div>
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <Button type='submit' className='w-full cursor-pointer bg-green-400 border hover:text-green-400 hover:border-green-400 hover:bg-transparent transition'>Kirim</Button>
                                                        <DialogClose className='cursor-pointer text-gray-50 bg-rose-500 border  py-1 px-3 text-sm rounded-md hover:bg-transparent hover:text-rose-500 hover:border-rose-500 transition'>
                                                            Tutup
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Edit */}
                                        {/* Delete */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-rose-400 hover:bg-transparent border rounded-md hover:border-rose-400 transition text-gray-50 w-full flex items-center justify-center h-full px-3 group">
                                                <Eraser className='text-gray-50 dark:text-gray-100 group-hover:text-red-600'/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Hapus Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form action="" onSubmit={handleDelete(stok.id)}>
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container flex items-center justify-center'>
                                                        <p>Apakah anda yakin ingin menghapus data ini ?</p>
                                                    </DialogDescription>
                                                    <DialogFooter className='flex flex-col-reverse'>
                                                        <Button type='submit' className='w-full bg-green-400'>Ya, Hapus data ini</Button>
                                                        <DialogClose className='cursor-pointer text-gray-50 bg-rose-500 border  py-1 px-3 text-sm rounded-md hover:bg-transparent hover:text-rose-500 hover:border-rose-500 transition'>
                                                            Tutup
                                                        </DialogClose>
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
