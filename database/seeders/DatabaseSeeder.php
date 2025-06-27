<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kategori;
use App\Models\StokBarang;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        return $this->call([
            UserSeeder::class,
            KategoriSeeder::class,
            ProdukSeeder::class,
            BarangMasukSeeder::class,
            BarangKeluarSeeder::class,
            LaporanSeeder::class,
            StokBarangSeeder::class,
        ]);
    }
}
