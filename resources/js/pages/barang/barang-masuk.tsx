import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { addField, createHandleDetailChange, removeField } from '@/lib/handlers/useInputs';
import { createHandleChange, createHandleDelete, createHandleEditChange, createHandleSubmit, createHandleUpdate, createShow } from '@/lib/handlers/useHandlers';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import BarangMasuk, { BarangMasukStateType } from '@/types/BarangMasuk';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ProductDetailType } from '@/types/ProdukType';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barang Masuk',
        href: '/barang-masuk',
    },
];

export default function BarangMasukPage({barang_masuk, product}: BarangMasuk) {
    const [barangMasuk, setBarangMasuk] = useState<BarangMasukStateType | null>(null)
    const [formData, setFormData] = useState({
        reference_code: '',
        date: '',
        supplier_name: '',
        description: '',
        created_by: '',
        product_details: [{ product_id: 0, quantity: 1, unit_price: 0, subtotal: 0 }]
    })

    const [editFormData, setEditFormData] = useState({
        id: 0,
        reference_code: '',
        date: '',
        supplier_name: '',
        description: '',
        created_by: '',
        product_details: [{ id: 0, product_id: 0, quantity: 1, unit_price: 0, subtotal: 0 }]
    })

    const handleChange = createHandleChange(setFormData)
    const handleEditChange = createHandleEditChange(setEditFormData)
    const handleDetailChange = createHandleDetailChange(setFormData, () => product, 'product_details')
    const handleEditDetailChange = createHandleDetailChange(setEditFormData, () => product, 'product_details')

    const addProductField = () => addField(setFormData, 'product_details', {
        product_id: 0,
        quantity: 0,
        unit_price: 0,
        subtotal: 0,
    })

    const addEditProductField = () => addField(setEditFormData, 'product_details', {
        product_id: 0,
        quantity: 0,
        unit_price: 0,
        subtotal: 0,
    })

    const removeProductField = (index: number) => removeField(setFormData, 'product_details', index)
    const removeEditProductField = (index: number) => removeField(setEditFormData, 'product_details', index)

    const fetchBarangMasuk = async (id: number) => {
        try {
            await fetch(`/barang-masuk/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data[0]

                const product_details = data.details.map((detail: ProductDetailType) => ({
                    id: data.id,
                    product_id: detail.produk_id,
                    quantity: detail.quantity,
                    unit_price: detail.unit_price,
                    subtotal: detail.subtotal,
                    produk: detail.produk
                }))

                setEditFormData({
                    id: data.id,
                    reference_code: data.reference_code,
                    date: data.date,
                    supplier_name: data.supplier_name,
                    description: data.description,
                    created_by: data.created_by,
                    product_details: product_details
                })
            })
        } catch(e) {
            console.error(e)
        }
    }

    const showBarangMasuk = (id: number) => createShow<BarangMasukStateType | null>(setBarangMasuk, `/barang-masuk/${id}`, (data) => ({
        id: data.id,
        reference_code: data.reference_code,
        date: data.date,
        supplier_name: data.supplier_name,
        description: data.description,
        created_by: data.created_by,
        details: data.details
    }))

    const handleSubmit = createHandleSubmit("/barang-masuk/store", formData, "Data Barang Masuk berhasil diubah")
    const handleUpdate = createHandleUpdate(`/barang-masuk/${editFormData.id}/update`, editFormData, "Barang Masuk berhasil diubah")
    const handleDelete = (id: number) => createHandleDelete(`/barang-masuk/${id}/delete`, "Barang Masuk berhasil dihapus")

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer/>
            <Head title="Barang Masuk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Barang Masuk +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Barang Masuk
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                            <div className='mb-3'>
                                                <Label>Kode Referensi</Label>
                                                <Input type="text" name="reference_code" onChange={handleChange} value={formData.reference_code}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Tanggal</Label>
                                                <Input type="date" name="date" onChange={handleChange} value={formData.date}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Nama Supplier</Label>
                                                <Input type="text" name="supplier_name" onChange={handleChange} value={formData.supplier_name}></Input>
                                            </div>
                                            <div className='mb-3 flex flex-col'>
                                                <Label className='mb-1'>Deskripsi</Label>
                                                <textarea name="description" id="" className={cn(
                                                    "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                                )} value={formData.description} onChange={handleChange}></textarea>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Dibuat Oleh</Label>
                                                <Input type="text" name="created_by" onChange={handleChange} value={formData.created_by}></Input>
                                            </div>
                                            <div className='mb-3'>
                                                <Label>Detail Produk</Label>
                                                {formData.product_details.map((detail, i) => (
                                                    <div key={i} className="mb-3 border p-3 rounded-md">
                                                    <Label>Produk</Label>
                                                    <select
                                                        name="product_id"
                                                        value={formData.product_details[i].product_id}
                                                        onChange={(e) => handleDetailChange(i, e)}
                                                        className="w-full mt-1 mb-2 border rounded p-2"
                                                    >
                                                        <option value="">-- Pilih Produk --</option>
                                                        {product.map((p) => (
                                                        <option key={p.id} value={p.id}>
                                                            {p.name}
                                                        </option>
                                                        ))}
                                                    </select>

                                                    <Label>Quantity</Label>
                                                    <Input
                                                        name="quantity"
                                                        type="number"
                                                        value={formData.product_details[i].quantity}
                                                        onChange={(e) => handleDetailChange(i, e)}
                                                    />

                                                    <Label className="mt-2">Harga Satuan</Label>
                                                    <Input
                                                        name="unit_price"
                                                        type="number"
                                                        value={formData.product_details[i].unit_price}
                                                        onChange={(e) => handleDetailChange(i, e)}
                                                        readOnly
                                                    />

                                                    <Label className="mt-2">Harga Satuan</Label>
                                                    <Input
                                                        name="subtotal"
                                                        type="number"
                                                        value={formData.product_details[i].subtotal}
                                                        onChange={(e) => handleDetailChange(i, e)}
                                                        readOnly
                                                    />

                                                    {formData.product_details.length > 1 && (
                                                        <Button type="button" className="mt-2 bg-red-400" onClick={() => removeProductField(i)}>
                                                        Hapus Produk Ini
                                                        </Button>
                                                    )}
                                                    </div>
                                                ))}
                                            </div>
                                            <Button type="button" className="w-full mt-2 bg-yellow-400" onClick={addProductField}>
                                                + Tambah Produk
                                            </Button>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
                                        <DialogClose className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</DialogClose>
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
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Kode Referensi</th>
                                <th className="px-4 py-2 text-left font-semibold">Tanggal</th>
                                <th className="px-4 py-2 text-left font-semibold">Nama Supplier</th>
                                <th className="px-4 py-2 text-left font-semibold">Deskripsi</th>
                                <th className="px-4 py-2 text-left font-semibold">Dibuat Oleh</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {barang_masuk.map((barang, index) => (
                                <tr key={barang.id} className="hover:bg-gray-50 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{barang.reference_code}</td>
                                    <td className="px-4 py-2">{barang.date}</td>
                                    <td className="px-4 py-2">{barang.supplier_name}</td>
                                    <td className="px-4 py-2">{barang.description}</td>
                                    <td className="px-4 py-2">{barang.created_by}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2">
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={showBarangMasuk(barang.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-900 w-full px-3">
                                                Lihat
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    {barangMasuk && (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Label>Nama</Label>
                                                            <Input type="text" name="reference_code" defaultValue={barangMasuk.reference_code}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kode</Label>
                                                            <Input type="text" name="date" defaultValue={barangMasuk.date}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Kategori</Label>
                                                            <Input type="text" name="category" defaultValue={barangMasuk.supplier_name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Satuan</Label>
                                                            <Input type="text" name="units" defaultValue={barangMasuk.description}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Stok Minimum</Label>
                                                            <Input type="text" name="minimum_stock" defaultValue={barangMasuk.created_by}></Input>
                                                        </div>
                                                        <table className='w-full'>
                                                            <tr>
                                                                <th className='border-2 px-5 text-center'>#</th>
                                                                <th className='border-2 px-5 text-center'>Nama</th>
                                                                <th className='border-2 px-5 text-center'>Harga Unit</th>
                                                            </tr>
                                                            {barangMasuk.details.map((detail, i) =>
                                                                <tr key={i}>
                                                                    <td className='border-2 px-5 text-center'>{i + 1}</td>
                                                                    <td className='border-2 px-5 text-center'>{detail.product.name}</td>
                                                                    <td className='border-2 px-5 text-center'>{detail.product.unit_price}</td>
                                                                </tr>
                                                            )}
                                                        </table>
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
                                            <DialogTrigger className="cursor-pointer bg-yellow-400 hover:bg-transparent border rounded-md hover:border-yellow-400 transition text-gray-900 w-full px-3" onClick={() => fetchBarangMasuk(barang.id)}>
                                                Ubah
                                            </DialogTrigger>
                                            <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Ubah Barang Masuk
                                                </DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleUpdate}>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    <div className='mb-3'>
                                                        <Label>Kode Referensi</Label>
                                                        <Input type="text" name="reference_code" onChange={handleEditChange} value={editFormData.reference_code}></Input>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <Label>Tanggal</Label>
                                                        <Input type="date" name="date" onChange={handleEditChange} value={editFormData.date}></Input>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <Label>Nama Supplier</Label>
                                                        <Input type="text" name="supplier_name" onChange={handleEditChange} value={editFormData.supplier_name}></Input>
                                                    </div>
                                                    <div className='mb-3 flex flex-col'>
                                                        <Label className='mb-1'>Deskripsi</Label>
                                                        <textarea name="description" id="" className={cn(
                                                            "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                                        )} value={editFormData.description} onChange={handleEditChange}></textarea>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <Label>Dibuat Oleh</Label>
                                                        <Input type="text" name="created_by" onChange={handleEditChange} value={editFormData.created_by}></Input>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <Label>Detail Produk</Label>
                                                        {editFormData.product_details.map((detail, index) => (
                                                            <div key={index} className="mb-3 border p-3 rounded-md">
                                                            <Label>Produk</Label>
                                                            <select
                                                                name="product_id"
                                                                value={detail.product_id}
                                                                onChange={(e) => handleEditDetailChange(index, e)}
                                                                className="w-full mt-1 mb-2 border rounded p-2"
                                                            >
                                                                <option value="">-- Pilih Produk --</option>
                                                                {product.map((p) => (
                                                                <option key={p.id} value={p.id}>
                                                                    {p.name}
                                                                </option>
                                                                ))}
                                                            </select>

                                                            <Input
                                                                name="id"
                                                                type="hidden"
                                                                value={detail.id}
                                                                onChange={(e) => handleEditDetailChange(index, e)}
                                                            />

                                                            <Label>Quantity</Label>
                                                            <Input
                                                                name="quantity"
                                                                type="number"
                                                                value={detail.quantity}
                                                                onChange={(e) => handleEditDetailChange(index, e)}
                                                            />

                                                            <Label className="mt-2">Harga Satuan</Label>
                                                            <Input
                                                                name="unit_price"
                                                                type="number"
                                                                value={detail.unit_price}
                                                                onChange={(e) => handleEditDetailChange(index, e)}
                                                                readOnly
                                                            />

                                                            <Label className="mt-2">Subtotal</Label>
                                                            <Input
                                                                name="subtotal"
                                                                type="number"
                                                                value={detail.subtotal}
                                                                onChange={(e) => handleEditDetailChange(index, e)}
                                                                readOnly
                                                            />

                                                            {formData.product_details.length > 1 && (
                                                                <Button type="button" className="mt-2 bg-red-400" onClick={() => removeEditProductField(index)}>
                                                                Hapus Produk Ini
                                                                </Button>
                                                            )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Button type="button" className="w-full mt-2 bg-yellow-400" onClick={addEditProductField}>
                                                        + Edit Produk
                                                    </Button>
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type='button' className='cursor-pointer bg-rose-500 text-gray-50'>Tutup</Button>
                                                        </DialogClose>
                                                        <Button type='submit' className='w-full bg-green-400'>Kirim</Button>
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
                                                        Hapus Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleDelete(barang.id)}>
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
