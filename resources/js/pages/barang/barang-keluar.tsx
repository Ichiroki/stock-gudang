import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import BarangKeluar from '@/types/BarangKeluar';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barang Keluar',
        href: '/barang-keluar',
    },
];

interface BarangKeluarType {
    reference_code: string
    date: string
    supplier_name: string
    description: string
    created_by: string
    details: {
        product: {
            id: number,
            name: string,
            unit_price: number
        }
    }[]
}

export default function Dashboard({barang_keluar, product}: BarangKeluar) {

    const [barangKeluar, setBarangKeluar] = useState<BarangKeluarType | null>(null)
    console.log(barangKeluar)

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
    })

    const handleDetailChange = (i: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        const updated = [...formData.product_details]

        updated[i] = { ...updated[i], [e.target.name]: e.target.value }

        if(name == "product_id") {
            const selectedProduct = product.find(p => parseInt(p.id) === parseInt(value))
            if(selectedProduct) {
                updated[i].unit_price = selectedProduct.unit_price
            } else {
                updated[i].unit_price = 0
            }
        }

        const quantity = updated[i].quantity || 0
        const unit_price = updated[i].unit_price || 0
        updated[i].subtotal = quantity * unit_price

        setFormData({...formData, product_details: updated})
    }

    const addProductField = () => {
        setFormData({
            ...formData,
            product_details: [...formData.product_details, { product_id: 0, quantity: 1, unit_price: 0, subtotal: 0 }]
        })
    }

    const removeProductField = (index: number) => {
        const updated = [...formData.product_details];
        updated.splice(index, 1);
        setFormData({ ...formData, product_details: updated });
    };

    const fetchBarangMasuk = async (id: number) => {
        try {
            await fetch(`/barang-keluar/${id}/edit`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data
                setEditFormData({
                    id: data.id,
                    reference_code: data.reference_code,
                    date: data.date,
                    supplier_name: data.supplier_name,
                    description: data.description,
                    created_by: data.created_by
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
            router.post('/barang-keluar/store', formData, {
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
            const res = await axios.put(`/barang-keluar/${editFormData.id}/update`, {
                reference_code: editFormData.reference_code,
                date: editFormData.date,
                supplier_name: editFormData.supplier_name,
                description: editFormData.description,
                created_by: editFormData.created_by,
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

    const showBarangMasuk = async (id: number) => {
        try {
            await fetch(`/barang-keluar/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setBarangKeluar(res.data)
            })
        } catch(e) {
            console.error('njir error', e)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Masuk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative md:w-1/3 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Dialog>
                            <DialogTrigger className="cursor-pointer bg-green-400 hover:bg-transparent hover:border rounded-xl hover:border-green-400 transition text-gray-900 w-full h-full">
                                Tambah Barang Keluar +
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Barang Keluar
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                    <form>
                                        <div className='mb-3'>
                                            <Label>Nama</Label>
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
                                            <Label>Nama Penerima</Label>
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
                                        <div className='mb-3'>
                                            <Label>Dibuat Oleh</Label>
                                            <Input type="text"></Input>
                                        </div>
                                        <div className='mb-3'>
                                                <Label>Detail Produk</Label>
                                                {formData.product_details.map((detail, index) => (
                                                    <div key={index} className="mb-3 border p-3 rounded-md">
                                                    <Label>Produk</Label>
                                                    <select
                                                        name="product_id"
                                                        value={detail.product_id}
                                                        onChange={(e) => handleDetailChange(index, e)}
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
                                                        value={detail.quantity}
                                                        onChange={(e) => handleDetailChange(index, e)}
                                                    />

                                                    <Label className="mt-2">Harga Satuan</Label>
                                                    <Input
                                                        name="unit_price"
                                                        type="number"
                                                        value={detail.unit_price}
                                                        onChange={(e) => handleDetailChange(index, e)}
                                                        readOnly
                                                    />

                                                    <Label className="mt-2">Harga Satuan</Label>
                                                    <Input
                                                        name="subtotal"
                                                        type="number"
                                                        value={detail.subtotal}
                                                        onChange={(e) => handleDetailChange(index, e)}
                                                        readOnly
                                                    />

                                                    {formData.product_details.length > 1 && (
                                                        <Button type="button" className="mt-2 bg-red-400" onClick={() => removeProductField(index)}>
                                                        Hapus Produk Ini
                                                        </Button>
                                                    )}
                                                    </div>
                                                ))}
                                            </div>
                                            <Button type="button" className="w-full mt-2 bg-yellow-400" onClick={addProductField}>
                                                + Tambah Produk
                                            </Button>
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
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Kode Referensi</th>
                                <th className="px-4 py-2 text-left font-semibold">Tanggal</th>
                                <th className="px-4 py-2 text-left font-semibold">Nama Penerima</th>
                                <th className="px-4 py-2 text-left font-semibold">Deskripsi</th>
                                <th className="px-4 py-2 text-left font-semibold">Dibuat Oleh</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {barang_keluar.map((barang, index) => (
                                <tr key={barang.id} className="hover:bg-gray-50 hover:text-gray-900">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{barang.reference_code}</td>
                                    <td className="px-4 py-2">{barang.date}</td>
                                    <td className="px-4 py-2">{barang.recipient_name}</td>
                                    <td className="px-4 py-2">{barang.description}</td>
                                    <td className="px-4 py-2">{barang.created_by}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-2">
                                        {/* Show */}
                                        <Dialog>
                                            <DialogTrigger onClick={() => showBarangMasuk(barang.id)} className="cursor-pointer bg-green-400 hover:bg-transparent border rounded-md hover:border-green-400 transition text-gray-900 w-full px-3">
                                                Lihat
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Barang Masuk
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    {barangKeluar && (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Label>Kode Referensi</Label>
                                                            <Input type="text" name="reference_code" defaultValue={barangKeluar.reference_code}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Tanggal</Label>
                                                            <Input type="text" name="date" defaultValue={barangKeluar.date}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Nama Supplier</Label>
                                                            <Input type="text" name="category" defaultValue={barangKeluar.supplier_name}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Unit</Label>
                                                            <Input type="text" name="units" defaultValue={barangKeluar.description}></Input>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <Label>Dibuat Oleh</Label>
                                                            <Input type="text" name="minimum_stock" defaultValue={barangKeluar.created_by}></Input>
                                                        </div>
                                                        <table className='w-full'>
                                                            <tr>
                                                                <th className='border-2 px-5 text-center'>#</th>
                                                                <th className='border-2 px-5 text-center'>Nama</th>
                                                                <th className='border-2 px-5 text-center'>Harga Unit</th>
                                                            </tr>
                                                            {barangKeluar.details.map((detail, i) => (
                                                                <tr key={detail.product.id}>
                                                                    <td className='border-2 px-5 text-center'>{i}</td>
                                                                    <td className='border-2 px-5 text-center'>{detail.product.name}</td>
                                                                    <td className='border-2 px-5 text-center'>{detail.product.unit_price}</td>
                                                                </tr>
                                                            ))
                                                            }
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
                                                <DialogDescription className='overflow-auto h-64 md:h-96 scrollable-container'>
                                                    <form onSubmit={handleUpdate}>
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
                                                <form action="" onSubmit={() => handleDelete(barang.id)}>
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
