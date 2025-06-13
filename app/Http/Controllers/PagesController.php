<?php

namespace App\Http\Controllers;

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
        return Inertia::render('produk/produk', ['products'=> $products]);
    }

    public function barangMasuk()
    {
        return Inertia::render('barang/barang-masuk');
    }

    public function barangKeluar()
    {
        return Inertia::render('barang/barang-keluar');
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
