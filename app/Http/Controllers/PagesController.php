<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use App\Models\Kategori;
use App\Models\Laporan;
use App\Models\Produk;
use App\Models\StokBarang;
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
        $product = Produk::select(['id', 'name', "unit_price"])->get();
        $barang_masuk = BarangMasuk::all();
        return Inertia::render('barang/barang-masuk', ['barang_masuk'=> $barang_masuk, 'product' => $product]);
    }

    public function barangKeluar()
    {
        $barang_keluar = BarangKeluar::all();
        return Inertia::render('barang/barang-keluar', ['barang_keluar' => $barang_keluar]);
    }

    public function stokBarang()
    {
        $stok_barang = StokBarang::with('product')->get();
        return Inertia::render('barang/stok-barang', ['stok_barang' => $stok_barang]);
    }

    public function kategori()
    {
        $kategori = Kategori::all();
        return Inertia::render('barang/kategori', ['kategoris' => $kategori]);
    }

    public function laporan()
    {
        $laporans = Laporan::with('product')->get();
        return Inertia::render('laporan', ['laporans' => $laporans]);
    }
}
