<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokBarang extends Model
{
    protected $fillable = [
        "produk_id",
        "stock",
        "minimum_stock",
        "last_updated_by",
    ];

    public function product() {
        return $this->belongsTo(Produk::class, "produk_id", "id");
    }
}
