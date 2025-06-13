<?php

namespace Database\Seeders;

use App\Models\StokBarang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StokBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StokBarang::insert([
            [
                'produk_id' => 1,
                'stock' => 50,
                'minimum_stock' => 10,
                'last_updated_by' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produk_id' => 2,
                'stock' => 100,
                'minimum_stock' => 20,
                'last_updated_by' => 'gudang1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'produk_id' => 3,
                'stock' => 15,
                'minimum_stock' => 5,
                'last_updated_by' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
