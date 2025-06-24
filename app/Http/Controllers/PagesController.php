<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use App\Models\Kategori;
use App\Models\Laporan;
use App\Models\Produk;
use App\Models\StokBarang;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function dashboardChart() {
        $barangMasuk = DB::table('barang_masuk_details')
        ->join('barang_masuk_masters', 'barang_masuk_details.barang_masuk_id', '=', 'barang_masuk_masters.id')
        ->selectRaw('EXTRACT(MONTH FROM barang_masuk_masters.date) as month, SUM(quantity) as total')
        ->groupBy('month')
        ->get();

        $barangKeluar = DB::table('barang_keluar_details')
        ->join('barang_keluar_masters', 'barang_keluar_details.barang_keluar_id', '=', 'barang_keluar_masters.id')
        ->selectRaw('EXTRACT(MONTH FROM barang_keluar_masters.date) as month, SUM(quantity) as total')
        ->groupBy('month')
        ->get();

        return response()->json([
            'masuk' => $barangMasuk,
            'keluar' => $barangKeluar
        ]);
    }

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
        return Inertia::render('barang/barang-masuk', ['barang_masuk'=> $barang_masuk, 'products' => $product]);
    }

    public function barangKeluar()
    {
        $product = Produk::select(['id', 'name', "unit_price"])->get();
        $barang_keluar = BarangKeluar::all();
        return Inertia::render('barang/barang-keluar', ['barang_keluar' => $barang_keluar, 'product' => $product]);
    }

    public function stokBarang()
    {
        $products = Produk::select(['id', 'name'])->get();
        $stok_barang = StokBarang::with('product')->get();
        return Inertia::render('barang/stok-barang', ['stok_barang' => $stok_barang, 'products' => $products]);
    }

    public function kategori()
    {
        $kategori = Kategori::all();
        return Inertia::render('barang/kategori', ['kategoris' => $kategori]);
    }

    public function laporan()
    {
        $products = Produk::select(['id', 'name'])->get();
        $laporans = Laporan::with('product')->get();
        return Inertia::render('laporan', ['laporans' => $laporans, 'products' => $products]);
    }
}
