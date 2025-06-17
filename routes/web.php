<?php

use App\Http\Controllers\{PagesController,
    ProdukController,
    BarangController,
    StokBarangController
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('produk')->group(function(){
        Route::get('/', [PagesController::class,'produk'])->name('produk');

        Route::post('/store', [ProdukController::class, 'store'])->name('produk.store');

        Route::get('/{id}', [ProdukController::class, 'show'])->name('produk.edit');

        Route::get('/{id}/edit', [ProdukController::class, 'edit'])->name('produk.edit');
        Route::put('/{id}/update', [ProdukController::class, 'update'])->name('produk.update');

        Route::delete('/{id}/delete', [ProdukController::class, 'delete'])->name('produk.delete');
    });

    Route::prefix('barang-masuk')->group(function() {
        Route::get('/', [PagesController::class, 'barangMasuk'])->name('barang-masuk');

        Route::post('/store', [BarangController::class, 'storeMasuk'])->name('barang-masuk.store');

        Route::get('/{id}', [BarangController::class, 'showMasuk'])->name('barang-masuk.show');

        Route::get('/{id}/edit', [BarangController::class, 'editMasuk'])->name('barang-masuk.edit');
        Route::put('/{id}/update', [BarangController::class, 'updateMasuk'])->name('barang-masuk.update');

        Route::delete('/{id}/delete', [BarangController::class, 'deleteMasuk'])->name('barang-masuk.delete');
    });

    Route::prefix('barang-keluar')->group(function() {
        Route::get('/', [PagesController::class, 'barangKeluar'])->name('barang-keluar');

        Route::post('/store', [BarangController::class, 'storeKeluar'])->name('barang-keluar.store');

        Route::get('/{id}', [BarangController::class, 'showKeluar'])->name('barang-keluar.show');

        Route::get('/{id}/edit', [BarangController::class, 'editKeluar'])->name('barang-keluar.edit');
        Route::put('/{id}/update', [BarangController::class, 'updateKeluar'])->name('barang-keluar.update');

        Route::delete('/{id}/delete', [BarangController::class, 'deleteKeluar'])->name('barang-keluar.delete');
    });

    Route::prefix('stok-barang')->group(function() {
        Route::get('/', [PagesController::class, 'stokBarang'])->name('stok-barang');

        Route::post('/store', [StokBarangController::class, 'store'])->name('stok-barang.store');

        Route::get('/{id}', [StokBarangController::class, 'show'])->name('stok-barang.show');

        Route::get('/{id}/edit', [StokBarangController::class, 'edit'])->name('stok-barang.edit');
        Route::put('/{id}/update', [StokBarangController::class, 'update'])->name('stok-barang.update');

        Route::delete('/{id}/delete', [StokBarangController::class, 'delete'])->name('stok-barang.delete');
    });


    Route::get('dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    Route::get('kategori', [PagesController::class, 'kategori'])->name('kategori');
    Route::get('laporan', [PagesController::class, 'laporan'])->name('laporan');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
