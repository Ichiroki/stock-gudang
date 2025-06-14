<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Exception;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
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

    // public function update(Request $request, $id) {
    //     $validated = $request->validate( [
    //         "name" => "required|string",
    //         "code" => "required|string",
    //         "category" => "required|string",
    //         "units" => "required|string",
    //         "minimum_stock" => "required|integer"
    //     ]);

    //     $produk = Produk::findOrFail($id);
    //     $produk->update($validated);

    //     return
    // }

    public function delete($id) {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return redirect()->back()->with(["code"=> 200, "status"=> "success"]);
    }
}
