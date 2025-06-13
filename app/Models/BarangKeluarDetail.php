<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangKeluarDetail extends Model
{
    protected $table = "barang_keluar_details";

    protected $fillable = [
        'barang_keluar_id',
        'produk_id',
        'quantity',
        'unit_price',
        'subtotal',
        'notes',
    ];

    public function master()
    {
        return $this->belongsTo(BarangKeluar::class);
    }

    public function product()
    {
        return $this->belongsTo(Produk::class);
    }
}
