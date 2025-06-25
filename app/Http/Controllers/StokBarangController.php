<?php

namespace App\Http\Controllers;

use App\Models\StokBarang;
use Exception;
use Illuminate\Http\Request;

class StokBarangController extends Controller
{
    public function index() {
        $stokBarang = StokBarang::with(['product' => function($query) {
            $query->select('id', 'name', 'unit_price');
        }])->get();
        return response()->json(['data' => $stokBarang]);
    }

    public function store(Request $request) {
        try {
            $validated = $request->validate( [
                "produk_id" => "required|exists:produks,id",
                "stock" => "required|integer",
                "minimum_stock" => "required|integer",
                "last_updated_by" => "required|string",
            ]);

            StokBarang::create($validated);

            return response()->json(['status' => 'success'], 201);
        } catch (Exception $e) {
            return response()->json(['status' => 'failed', 'error' => $e->getMessage() ], 404);
        }
    }

    public function show($id) {
        $StokBarang = StokBarang::with([
            'product' => function($query) {
            $query->select('id', 'name');
        }])
        ->find($id);

        if(!$StokBarang) {
            return response()->json([
                'status' => "failed",
                'message' => 'StokBarang tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $StokBarang], 200);
    }

    public function edit($id) {
        $StokBarang = StokBarang::findOrFail($id);
        return response()->json(["status" => "success", "data" => $StokBarang], 200);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate( [
            "produk_id" => "required|exists:produks,id",
            "stock" => "required|integer",
            "minimum_stock" => "required|integer",
            "last_updated_by" => "required|string",
        ]);

        $StokBarang = StokBarang::findOrFail($id);
        $StokBarang->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function delete($id) {
        $StokBarang = StokBarang::findOrFail($id);
        $StokBarang->delete();

        return response()->json(["status" => 'success'], 200);
    }
}
