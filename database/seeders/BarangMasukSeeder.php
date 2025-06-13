<?php

namespace Database\Seeders;

use App\Models\BarangMasuk;
use App\Models\BarangMasukDetail;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangMasukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BarangMasuk::create([
            "reference_code" => "BM-20250612-001",
            "date" => Carbon::now(),
            "supplier_name" => "PT. Sumber Makmur",
            "description" => "Barang datang untuk stok awal",
            "created_by" => "admin"
        ]);

        BarangMasuk::create([
            "reference_code" => "BM-20250612-002",
            "date" => Carbon::now(),
            "supplier_name" => "CV. Elektronik Jaya",
            "description" => "Pengadaan tambahan stok",
            "created_by" => "admin"
        ]);

        BarangMasukDetail::create([
            'barang_masuk_id' => 1,
            'produk_id' => 1,
            'quantity' => 20,
            'unit_price' => 15000,
            'subtotal' => 300000,
            'notes' => 'Masuk dalam kardus besar'
        ]);

        BarangMasukDetail::create([
            'barang_masuk_id' => 1,
            'produk_id' => 3,
            'quantity' => 10,
            'unit_price' => 35000,
            'subtotal' => 350000,
            'notes' => 'Dikemas Satuan'
        ]);

        BarangMasukDetail::create([
            'barang_masuk_id' => 2,
            'produk_id' => 2,
            'quantity' => 5,
            'unit_price' => 120000,
            'subtotal' => 600000,
            'notes' => 'Barang Fragile, hati-hati'
        ]);

        BarangMasukDetail::create([
            'barang_masuk_id' => 2,
            'produk_id' => 4,
            'quantity' => 8,
            'unit_price' => 90000,
            'subtotal' => 720000,
            'notes' => 'Tambahan stok'
        ]);
    }
}
