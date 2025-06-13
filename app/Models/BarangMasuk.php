<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangMasuk extends Model
{
    protected $fillable = [
        'reference_code',
        'date',
        'supplier_name',
        'description',
        'created_by',
    ];

    public function details()
    {
        return $this->hasMany(BarangMasukDetail::class);
    }
}
