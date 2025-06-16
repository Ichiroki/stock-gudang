import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { SelectContent, SelectSeparator } from '@radix-ui/react-select';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/produk',
    },
];

interface Product {
    id: number,
    name: string,
    code: string,
    category: string,
    units: number,
    minimum_stock: number
}

export default function Produk({products}: Product) {

    const [produk, setProduk] = useState<Product | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        category: '',
        units: '',
        minimum_stock: ''
    })

    const [editFormData, setEditFormData] = useState({
        id: 0,
        name: '',
        code: '',
        category: '',
        units: '',
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
                    minimum_stock: data.minimum_stock
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            router.post('/produk/store', formData, {
                onSuccess: (page) => {
                    const flash = page.props.flash
                    if(flash?.code == 201 && flash?.status == "success") {
                        return toast("Produk berhasil disimpan")
                    }
                },
                onError: (page) => {
                    const flash = page.props.flash
                    if(flash?.code == 404 && flash?.status == "failed") {
                        return toast("Produk gagal tersimpan")
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
            const res = await axios.put(`/produk/${editFormData.id}/update`, {
                name: editFormData.name,
                code: editFormData.code,
                category: editFormData.category,
                units: editFormData.units,
                minimum_stock: editFormData.minimum_stock,
            })

            if(res.status == 200 && res.data.status == "success") {
                toast("Produk berhasil diperbarui")
            }
        } catch(e) {
            console.error("error njir", e)
        }
    }

    const handleDelete = (id: number) => async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.delete(`/produk/${id}/delete`, {
            onSuccess: (page) => {
                const flash = page.props.flash;
                if (flash?.code === 200 && flash?.status === "success") {
                    return toast("Produk berhasil dihapus");
                }
            },
            onError: (page) => {
                const flash = page.props.flash;
                if (flash?.code == 404 && flash?.status == "failed") {
                    return toast("Produk gagal dihapus");
                }
            }
        });
    };

    const showProduct = async (id: number) => {
        try {
            await fetch(`/produk/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setProduk(res.data)
            })
        } catch(e) {
            console.error('njir error', e)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <ToastContainer/>
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
                                                <Label>Stok Minimum</Label>
                                                <Input type="text" name="minimum_stock" value={formData.minimum_stock} onChange={handleChange}></Input>
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
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => showProduct(product.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-900 w-full px-3">
                                                Lihat
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Produk
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
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="minimum_stock" defaultValue={produk.minimum_stock}></Input>
                                                        </div>
                                                    </>
                                                    )}
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                                    <DialogClose className='cursor-pointer bg-rose-500 text-gray-50'>
                                                        Tutup
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Show */}
                                        {/* Edit */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => fetchProduct(product.id)} className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3">
                                                Ubah
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
                                            <DialogTrigger className="cursor-pointer bg-rose-400 hover:bg-transparent border rounded-md hover:border-rose-400 transition text-gray-900 w-full px-3">
                                                Hapus
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Hapus Produk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleDelete(product.id)}>
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
