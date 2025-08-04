<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $fillable = [
        'name',
        'code',
        'category_id',
        'units',
        'unit_price',
        'minimum_stock',
    ];

    public function category() {
        return $this->belongsTo(Kategori::class, 'category_id', 'id');
    }
}
