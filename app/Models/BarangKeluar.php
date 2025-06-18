<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangKeluar extends Model
{
    protected $table = "barang_keluar_masters";

    protected $fillable = [
        'reference_code',
        'date',
        'recipient_name',
        'description',
        'created_by',
    ];

    public function details()
    {
        return $this->hasMany(BarangKeluarDetail::class);
    }
}
