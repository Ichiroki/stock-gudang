<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kategori::insert([[
            'name' => 'Alat Tulis'
        ],
        [
            'name' => 'Kertas'
        ],
        [
            'name' => 'Elektronik'
        ],
        [
            'name' => 'Tinta Printer'
        ],
        [
            'name' => 'Perangkat'
        ],
        [
            'name' => 'Kertas'
        ]]
    );
    }
}
