<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $fillable = [
        'name',
        'code',
        'category',
        'units',
        'unit_price',
        'minimum_stock',
    ];
}
