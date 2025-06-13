<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use App\Models\Produk;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('dashboard');
    }

    public function produk()
    {
        $products = Produk::all();

        return Inertia::render('produk/produk', ['products' => $products]);
    }

    public function barangMasuk()
    {
        $barang_masuk = BarangMasuk::all();
        return Inertia::render('barang/barang-masuk', ['barang_masuk'=> $barang_masuk]);
    }

    public function barangKeluar()
    {
        $barang_keluar = BarangKeluar::all();
        return Inertia::render('barang/barang-keluar', ['barang_keluar' => $barang_keluar]);
    }

    public function stokBarang()
    {
        return Inertia::render('barang/stok-barang');
    }

    public function kategori()
    {
        return Inertia::render('barang/kategori');
    }

    public function laporan()
    {
        return Inertia::render('laporan');
    }
}
