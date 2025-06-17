<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangMasukDetail extends Model
{
    protected $table = "barang_masuk_details";

    protected $fillable = [
        'barang_masuk_id',
        'produk_id',
        'quantity',
        'unit_price',
        'subtotal',
        'notes',
    ];

    public function master()
    {
        return $this->belongsTo(BarangMasuk::class);
    }

    public function product()
    {
        return $this->belongsTo(Produk::class, 'produk_id', 'id');
    }
}
