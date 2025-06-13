<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produk_id');
            $table->enum('tipe', ['masuk', 'keluar', 'penyesuaian', 'retur']);
            $table->integer('quantity');
            $table->decimal('unit_price')->nullable();
            $table->decimal('total')->nullable();
            $table->string('reference_code')->nullable();
            $table->date('date');
            $table->string('created_by');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('produk_id')->references('id')->on('produks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};
