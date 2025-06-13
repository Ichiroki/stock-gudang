<?php

use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    Route::get('produk', [PagesController::class, 'produk'])->name('produk');
    Route::get('barang-masuk', [PagesController::class, 'barangMasuk'])->name('barang-masuk');
    Route::get('barang-keluar', [PagesController::class, 'barangKeluar'])->name('barang-keluar');
    Route::get('stok-barang', [PagesController::class, 'stokBarang'])->name('stok-barang');
    Route::get('kategori', [PagesController::class, 'kategori'])->name('kategori');
    Route::get('laporan', [PagesController::class, 'laporan'])->name('laporan');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
