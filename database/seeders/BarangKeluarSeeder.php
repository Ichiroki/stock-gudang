<?php

namespace Database\Seeders;

use App\Models\BarangKeluar;
use App\Models\BarangKeluarDetail;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangKeluarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $master = BarangKeluar::create([
            'reference_code' => 'BK-20250612-001',
            'date' => Carbon::now(),
            'recipient_name' => 'Gudang Cabang A',
            'description' => 'Pengiriman stok untuk cabang baru',
            'created_by' => 'admin',
        ]);

        BarangKeluarDetail::insert([
            [
                'barang_keluar_id' => $master->id,
                'produk_id' => 1,
                'quantity' => 10,
                'unit_price' => 15000,
                'subtotal' => 150000,
                'notes' => 'Untuk display awal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'barang_keluar_id' => $master->id,
                'produk_id' => 2,
                'quantity' => 5,
                'unit_price' => 45000,
                'subtotal' => 225000,
                'notes' => 'Stok buffer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
