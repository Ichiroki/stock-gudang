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
        Schema::create('barang_keluar_masters', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code');
            $table->date('date');
            $table->string('recipient_name');
            $table->text('description')->nullable();
            $table->string('created_by');
            $table->timestamps();
        });

        Schema::create('barang_keluar_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('barang_keluar_id');
            $table->unsignedBigInteger('produk_id');
            $table->integer('quantity');
            $table->decimal('unit_price')->nullable();
            $table->decimal('subtotal')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();

            $table->foreign('barang_keluar_id')->references('id')->on('barang_keluar_masters');
            $table->foreign('produk_id')->references('id')->on('produks');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang_keluars');
    }
};
