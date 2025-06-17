import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import StokBarang from '@/types/StokBarangType';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

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

export default function StokBarangDashboard({stok_barang, products}: StokBarang) {
    const [stokBarang, setStokBarang] = useState<StokBarangType | null>(null)

    const [formData, setFormData] = useState({
        product: 0,
        stock: 0,
        minimum_stock: 0,
        last_updated_by: '',
    })

    const [editFormData, setEditFormData] = useState({
        id: 0,
        product: 0,
        stock: 0,
        minimum_stock: 0,
        last_updated_by: '',
    })

    const fetchStokBarang = async (id: number) => {
        try {
            await fetch(`/stok-barang/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data
                setEditFormData({
                    id: data.id,
                    product: data.product,
                    stock: data.stock,
                    minimum_stock: data.minimum_stock,
                    last_updated_by: data.last_updated_by,
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            router.post('/stok-barang/store', formData, {
                onSuccess: (page) => {
                    const flash = page.props.flash
                    if(flash?.code == 201 && flash?.status == "success") {
                        return toast("barang-masuk berhasil disimpan")
                    }
                },
                onError: (page) => {
                    const flash = page.props.flash
                    if(flash?.code == 404 && flash?.status == "failed") {
                        return toast("barang-masuk gagal tersimpan")
                    }
                }
            })
        } catch(e) {
            console.error("error njir", e)
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/stok-barang/${editFormData.id}/update`, {
                product: editFormData.product,
                stock: editFormData.stock,
                minimum_stock: editFormData.minimum_stock,
                last_updated_by: editFormData.last_updated_by,
            })

            if(res.status == 200 && res.data.status == "success") {
                toast("barang-masuk berhasil diperbarui")
            }
        } catch(e) {
            console.error("error njir", e)
        }
    }

    const handleDelete = (id: number) => async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.delete(`/barang-masuk/${id}/delete`, {
            onSuccess: (page) => {
                const flash = page.props.flash;
                if (flash?.code === 200 && flash?.status === "success") {
                    return toast("barang-masuk berhasil dihapus");
                }
            },
            onError: (page) => {
                const flash = page.props.flash;
                if (flash?.code == 404 && flash?.status == "failed") {
                    return toast("barang-masuk gagal dihapus");
                }
            }
        });
    };

    const showStokBarang = async (id: number) => {
        try {
            await fetch(`/stok-barang/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setStokBarang(res.data)
            })
        } catch(e) {
            console.error('njir error', e)
        }
    }

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
                                <form onSubmit={handleSubmit}>
                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                        <div className='mb-3'>
                                            <Label>Produk</Label>
                                            <select
                                                name="product_id"
                                                value={formData.product}
                                                onChange={(e) => handleChange(index, e)}
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
                                            <Input type="date" name="date" onChange={handleChange} value={formData.date}></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Minimum Stok</Label>
                                            <Input type="text" name="supplier_name" onChange={handleChange} value={formData.supplier_name}></Input>
                                        </div>
                                        <div className='mb-3'>
                                            <Label>Diubah Oleh</Label>
                                            <Input type="text" name="created_by" onChange={handleChange} value={formData.created_by}></Input>
                                        </div>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                        <DialogClose>
                                            <Button className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</Button>
                                        </DialogClose>
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
                                <tr key={stok.id} className="hover:bg-gray-50 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{stok.product.name}</td>
                                    <td className="px-4 py-2">{stok.stock}</td>
                                    <td className="px-4 py-2">{stok.minimum_stock}</td>
                                    <td className="px-4 py-2">{stok.last_updated_by}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2">
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => showStokBarang(stok.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-900 w-full px-3">
                                                Lihat
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Stok Barang
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    {stokBarang && (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Label>Produk</Label>
                                                            <Input type="text" name="product" defaultValue={stokBarang?.product.name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok</Label>
                                                            <Input type="text" name="date" defaultValue={stokBarang?.stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="category" defaultValue={stokBarang?.minimum_stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Diubah Oleh</Label>
                                                            <Input type="text" name="units" defaultValue={stokBarang?.last_updated_by}></Input>
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
                                            <DialogTrigger className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3" onClick={() => fetchStokBarang(stok.id)}>
                                                Ubah
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    <form onSubmit={handleUpdate}>
                                                        <div className='mb-3'>
                                                            <Label>Produk</Label>
                                                            <Input type="text" name="product" onChange={handleEditChange} value={editFormData.product}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok</Label>
                                                            <Input type="date" name="stok" onChange={handleEditChange} value={editFormData.stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="minimum_stock" onChange={handleEditChange} value={editFormData.minimum_stock}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Diubah Oleh</Label>
                                                            <Input type="text" name="last_updated_by" onChange={handleEditChange} value={editFormData.last_updated_by}></Input>
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
                                                        Hapus Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form action="" onSubmit={() => handleDelete(stok.id)}>
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
