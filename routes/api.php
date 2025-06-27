<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\StokBarangController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Guest Mode

Route::middleware(['auth'])->group(function() {
    Route::middleware(['guest.auth'])->group(function() {
        Route::prefix('produk')->group(function() {
            Route::post('/store', [ProdukController::class, 'store'])->name('produk.store');

            Route::get('/{id}', [ProdukController::class, 'show'])->name('produk.edit');

            Route::get('/{id}/edit', [ProdukController::class, 'edit'])->name('produk.edit');
            Route::put('/{id}/update', [ProdukController::class, 'update'])->name('produk.update');

            Route::delete('/{id}/delete', [ProdukController::class, 'delete'])->name('produk.delete');
        });

        Route::prefix('barang-masuk')->group(function() {
            Route::post('/store', [BarangController::class, 'storeMasuk'])->name('barang-masuk.store');

            Route::get('/{id}', [BarangController::class, 'showMasuk'])->name('barang-masuk.show');

            Route::get('/{id}/edit', [BarangController::class, 'editMasuk'])->name('barang-masuk.edit');
            Route::put('/{id}/update', [BarangController::class, 'updateMasuk'])->name(name: 'barang-masuk.update');

            Route::delete('/{id}/delete', [BarangController::class, 'deleteMasuk'])->name('barang-masuk.delete');
        });

        Route::prefix('barang-keluar')->group(function() {
            Route::post('/store', [BarangController::class, 'storeKeluar'])->name('barang-keluar.store');

            Route::get('/{id}', [BarangController::class, 'showKeluar'])->name('barang-keluar.show');

            Route::get('/{id}/edit', [BarangController::class, 'editKeluar'])->name('barang-keluar.edit');
            Route::put('/{id}/update', [BarangController::class, 'updateKeluar'])->name('barang-keluar.update');

            Route::delete('/{id}/delete', [BarangController::class, 'deleteKeluar'])->name('barang-keluar.delete');
        });

        Route::prefix('stok-barang')->group(function() {
            Route::post('/store', [StokBarangController::class, 'store'])->name('stok-barang.store');

            Route::get('/{id}', [StokBarangController::class, 'show'])->name('stok-barang.show');

            Route::get('/{id}/edit', [StokBarangController::class, 'edit'])->name('stok-barang.edit');
            Route::put('/{id}/update', [StokBarangController::class, 'update'])->name('stok-barang.update');

            Route::delete('/{id}/delete', [StokBarangController::class, 'delete'])->name('stok-barang.delete');
        });

        Route::prefix('laporan')->group(function() {
            Route::post('/store', [LaporanController::class, 'store'])->name('laporan.store');

            Route::get('/{id}', [LaporanController::class, 'show'])->name('laporan.show');

            Route::get('/{id}/edit', [LaporanController::class, 'edit'])->name('laporan.edit');
            Route::put('/{id}/update', [LaporanController::class, 'update'])->name('laporan.update');

            Route::delete('/{id}/delete', [LaporanController::class, 'delete'])->name('laporan.delete');
        });


        Route::prefix('kategori')->group(function() {


            Route::post('/store', [KategoriController::class, 'store'])->name('kategori.store');

            Route::get('/{id}', [KategoriController::class, 'show'])->name('kategori.show');

            Route::get('/{id}/edit', [KategoriController::class, 'edit'])->name('kategori.edit');
            Route::put('/{id}/update', [KategoriController::class, 'update'])->name('kategori.update');

            Route::delete('/{id}/delete', [KategoriController::class, 'delete'])->name('kategori.delete');
        });
    });
});
