<?php

use App\Http\Controllers\{PagesController, 
    ProdukController, 
    BarangController
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


    Route::get('dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    Route::get('produk', [PagesController::class, 'produk'])->name('produk');
    Route::get('barang-keluar', [PagesController::class, 'barangKeluar'])->name('barang-keluar');
    Route::get('stok-barang', [PagesController::class, 'stokBarang'])->name('stok-barang');
    Route::get('kategori', [PagesController::class, 'kategori'])->name('kategori');
    Route::get('laporan', [PagesController::class, 'laporan'])->name('laporan');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
