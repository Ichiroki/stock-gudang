<?php

namespace Database\Seeders;

use App\Models\Laporan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LaporanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Laporan::insert([
            [
                'produk_id' => 1,
                'tipe' => 'masuk',
                'quantity' => 20,
                'unit_price' => 15000,
                'total' => 300000,
                'reference_code' => 'BM-20250612-001',
                'date' => '2025-06-12',
                'created_by' => 'admin',
                'description' => 'Barang masuk dari supplier A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produk_id' => 1,
                'tipe' => 'keluar',
                'quantity' => 10,
                'unit_price' => 15000,
                'total' => 150000,
                'reference_code' => 'BK-20250613-001',
                'date' => '2025-06-13',
                'created_by' => 'admin',
                'description' => 'Pengiriman ke cabang B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produk_id' => 2,
                'tipe' => 'penyesuaian',
                'quantity' => -2,
                'unit_price' => 20000,
                'total' => -40000,
                'reference_code' => null,
                'date' => '2025-06-14',
                'created_by' => 'gudang1',
                'description' => 'Penyesuaian karena barang rusak',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
