<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Produk::create([
            'name' => 'Bolpoin Standard',
            'code' => 'BP-001',
            'category_id' => 1,
            'units' => 'Pcs',
            'unit_price' => 5.000,
            'minimum_stock' => 10,
        ]);

        Produk::create([
            'name' => 'Kertas A4 80gsm',
            'code' => 'KP-A480',
            'category_id' => 2,
            'units' => 'Rim',
            'unit_price' => 50.400,
            'minimum_stock' => 5,
        ]);

        Produk::create([
            'name' => 'Tinta Printer HP',
            'code' => 'TN-HP22',
            'category_id' => 4,
            'units' => 'Botol',
            'unit_price' => 32.800,
            'minimum_stock' => 3,
        ]);

        Produk::create([
            'name' => 'Kabel HDMI 1.5m',
            'code' => 'KB-HD15',
            'category_id' => 3,
            'units' => 'Unit',
            'unit_price' => 19.999,
            'minimum_stock' => 2,
        ]);

        Produk::create([
            'name' => 'Mouse Wireless',
            'code' => 'MS-WRL1',
            'category_id' => 5,
            'units' => 'Unit',
            'unit_price' => 159.999,
            'minimum_stock' => 4,
        ]);

        Produk::create([
            'name' => 'Amplop Coklat',
            'code' => 'AMP-COK',
            'category_id' => 1,
            'units' => 'Lembar',
            'unit_price' => 5.000,
            'minimum_stock' => 20,
        ]);

        Produk::create([
            'name' => 'Stapler Kenko',
            'code' => 'ST-KK30',
            'category_id' => 1,
            'units' => 'Unit',
            'unit_price' => 9.999,
            'minimum_stock' => 2,
        ]);

        Produk::create([
            'name' => 'Buku Nota Kecil',
            'code' => 'BK-NT01',
            'category_id' => 6,
            'units' => 'Buku',
            'unit_price' => 1.200,
            'minimum_stock' => 6,
        ]);

        Produk::create([
            'name' => 'Flashdisk 32GB',
            'code' => 'FD-32GB',
            'category_id' => 5,
            'units' => 'Unit',
            'unit_price' => 47.800,
            'minimum_stock' => 5,
        ]);

        Produk::create([
            'name' => 'Label Barcode',
            'code' => 'LB-BRC1',
            'category_id' => 7,
            'units' => 'Roll',
            'unit_price' => 3.920,
            'minimum_stock' => 10,
        ]);
    }
}
