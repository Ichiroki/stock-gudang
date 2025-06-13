<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function dashboard(){
        return Inertia::render('dashboard');
    }

    public function produk() {
        return Inertia::render('produk/produk');
    }

    public function barangMasuk() {
        return Inertia::render('barang/barang-masuk');
    }

    public function barangKeluar() {
        return Inertia::render('barang/barang-keluar');
    }

    public function stokBarang() {
        return Inertia::render('barang/stok-barang');
    }

    public function kategori() {
        return Inertia::render('barang/kategori');
    }

    public function laporan() {
        return Inertia::render('laporan');
    }
}
