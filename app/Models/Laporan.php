<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $fillable = [
        "produk_id",
        "tipe",
        "quantity",
        "unit_price",
        "total",
        "reference_code",
        "date",
        "created_by",
        "description",
    ];

    public function product() {
        return $this->belongsTo(Produk::class, "produk_id", "id");
    }

    // public function product() {
    //     return $this->belongsTo(Produk::class);
    // }
}
