<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Exception;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index() {
        $produk = Produk::paginate()->all();
        return response()->json(['data' => $produk]);
    }

    public function store(Request $request) {
        $validated = $request->validate( [
            "name" => "required|string",
            "code" => "required|string",
            "category" => "required|string",
            "units" => "required|string",
            "minimum_stock" => "required|integer"
        ]);

        try {
            Produk::create($validated);

            return redirect()->back()->with(["code" => 201 ,"status" => "success"]);
        } catch (Exception $e) {
            return redirect()->back()->with(["code"=> 404 , "status" => "failed"]);
        }
    }

    public function show($id) {
        $produk = Produk::find($id);

        if(!$produk) {
            return response()->json([
                'status' => "failed",
                'message' => 'Produk tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $produk], 200);
    }

    public function edit($id) {
        $produk = Produk::findOrFail($id);
        return response()->json(["status" => "success", "data" => $produk], 200);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate( [
            "name" => "required|string",
            "code" => "required|string",
            "category" => "required|string",
            "units" => "required|string",
            "minimum_stock" => "required|integer"
        ]);

        $produk = Produk::findOrFail($id);
        $produk->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function delete($id) {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return redirect()->back()->with(["code"=> 200, "status"=> "success"]);
    }
}
