import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { createHandleChange, createHandleDelete, createHandleEditChange, createHandleSubmit, createHandleUpdate } from '@/lib/handlers/useHandlers';
import { type BreadcrumbItem } from '@/types';
import Kategori from '@/types/Kategori';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori',
        href: '/kategori',
    },
];

interface KategoriType {
    id?: number
    name: string
}

export default function KategoriDashboard({kategoris}: Kategori) {
    const [formData, setFormData] = useState<KategoriType>({
        name: ''
    })

    const [editFormData, setEditFormData] = useState<KategoriType>({
        id: 0,
        name: ''
    })

    const handleChange = createHandleChange(setFormData)
    const handleEditChange = createHandleEditChange(setEditFormData)

    const handleSubmit = createHandleSubmit("/kategori/store", formData, "Data Kategori berhasil diubah")
    const handleUpdate = (id: number) => createHandleUpdate(`/kategori/${id}/update`, editFormData, "Kategori berhasil diubah")
    const handleDelete = (id: number) => createHandleDelete(`/kategori/${id}/delete`, "Kategori berhasil dihapus")

    const fetchKategori = async (id: number) => {
        try {
            await fetch(`/kategori/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data

                setEditFormData({
                    id: data.id,
                    name: data.name,
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer/>
            <Head title="Kategori" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Kategori +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Kategori
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                            <div className='mb-3'>
                                                <Label>Nama Kategori</Label>
                                                <Input type="text" name="name" onChange={handleChange} value={formData.name}></Input>
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
                                <th className="px-4 py-2 text-left font-semibold">Nama</th>
                                <th className="px-4 py-2 text-left font-semibold">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {kategoris.map((kategori, index) => (
                                <tr key={kategori.id} className="hover:bg-gray-50 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{kategori.name}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2">
                                        {/* Edit */}
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3" onClick={() => fetchKategori(kategori.id)}>
                                                Ubah
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Ubah Kategori
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdate(kategori.id)}>
                                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                        <div className='mb-3'>
                                                            <Label>Nama</Label>
                                                            <Input type="text" name="name" onChange={handleEditChange} value={editFormData.name}></Input>
                                                        </div>
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                                        <DialogClose className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</DialogClose>
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
                                                        Hapus Kategori
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleDelete(kategori.id)}>
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
