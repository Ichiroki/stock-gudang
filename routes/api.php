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
            Route::post('/store', [ProdukController::class, 'store'])->name('apiProduk.store');

            Route::get('/{id}', [ProdukController::class, 'show'])->name('apiProduk.show');

            Route::get('/{id}/edit', [ProdukController::class, 'edit'])->name('apiProduk.edit');
            Route::put('/{id}/update', [ProdukController::class, 'update'])->name('apiProduk.update');

            Route::delete('/{id}/delete', [ProdukController::class, 'delete'])->name('apiProduk.delete');
        });

        Route::prefix('barang-masuk')->group(function() {
            Route::post('/store', [BarangController::class, 'storeMasuk'])->name('apiBarang-masuk.store');

            Route::get('/{id}', [BarangController::class, 'showMasuk'])->name('apiBarang-masuk.show');

            Route::get('/{id}/edit', [BarangController::class, 'editMasuk'])->name('apiBarang-masuk.edit');
            Route::put('/{id}/update', [BarangController::class, 'updateMasuk'])->name(name: 'apiBarang-masuk.update');

            Route::delete('/{id}/delete', [BarangController::class, 'deleteMasuk'])->name('apiBarang-masuk.delete');
        });

        Route::prefix('barang-keluar')->group(function() {
            Route::post('/store', [BarangController::class, 'storeKeluar'])->name('apiBarang-keluar.store');

            Route::get('/{id}', [BarangController::class, 'showKeluar'])->name('apiBarang-keluar.show');

            Route::get('/{id}/edit', [BarangController::class, 'editKeluar'])->name('apiBarang-keluar.edit');
            Route::put('/{id}/update', [BarangController::class, 'updateKeluar'])->name('apiBarang-keluar.update');

            Route::delete('/{id}/delete', [BarangController::class, 'deleteKeluar'])->name('apiBarang-keluar.delete');
        });

        Route::prefix('stok-barang')->group(function() {
            Route::post('/store', [StokBarangController::class, 'store'])->name('apiStok-barang.store');

            Route::get('/{id}', [StokBarangController::class, 'show'])->name('apiStok-barang.show');

            Route::get('/{id}/edit', [StokBarangController::class, 'edit'])->name('apiStok-barang.edit');
            Route::put('/{id}/update', [StokBarangController::class, 'update'])->name('apiStok-barang.update');

            Route::delete('/{id}/delete', [StokBarangController::class, 'delete'])->name('apiStok-barang.delete');
        });

        Route::prefix('laporan')->group(function() {
            Route::post('/store', [LaporanController::class, 'store'])->name('apiLaporan.store');

            Route::get('/{id}', [LaporanController::class, 'show'])->name('apiLaporan.show');

            Route::get('/{id}/edit', [LaporanController::class, 'edit'])->name('apiLaporan.edit');
            Route::put('/{id}/update', [LaporanController::class, 'update'])->name('apiLaporan.update');

            Route::delete('/{id}/delete', [LaporanController::class, 'delete'])->name('apiLaporan.delete');
        });


        Route::prefix('kategori')->group(function() {


            Route::post('/store', [KategoriController::class, 'store'])->name('apiKategori.store');

            Route::get('/{id}', [KategoriController::class, 'show'])->name('apiKategori.show');

            Route::get('/{id}/edit', [KategoriController::class, 'edit'])->name('apiKategori.edit');
            Route::put('/{id}/update', [KategoriController::class, 'update'])->name('apiKategori.update');

            Route::delete('/{id}/delete', [KategoriController::class, 'delete'])->name('apiKategori.delete');
        });
    });
});
