<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdukRequest;
use App\Models\Produk;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProdukController extends Controller
{
    public function index() {
        $produk = Produk::with(['category'])->paginate(10);
        return response()->json($produk);
    }

    public function store(ProdukRequest $request) {
        $auth = Auth::user();
        try {
            if($auth->is_guest) {
                return response()->json(["code" => 302 ,"status" => "warning"]);
            } else {
                Produk::create($request->validated());
                return response()->json(["code" => 201 ,"status" => "success"]);
            }
        } catch (Exception $e) {
            return response()->json(["code" => 404 ,"status" => "failed", 'errors' => $e]);
        }
    }

    public function show($id) {
        $produk = Produk::with(['category' => function($query) {
            $query->select('id', 'name');
        }])->findOrFail($id);

        if(!$produk) {
            return response()->json([
                'status' => "failed",
                'message' => 'Produk tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $produk], 200);
    }

    public function edit($id) {
        $produk = Produk::with(['category' => function($query) {
            $query->select('id', 'name');
        }])->findOrFail($id);
        return response()->json(["status" => "success", "data" => $produk], 200);
    }

    public function update(ProdukRequest $request, $id) {
        try {
            $produk = Produk::findOrFail($id);
            $produk->update($request->validated());
            return response()->json(["status" => 'success', 'data' => $produk], 200);
        } catch(Exception $e) {
            return response()->json(["status" => 'success', 'error' => $e->getMessage()], 200);
        }
    }

    public function delete($id) {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return redirect()->back()->with(["code"=> 200, "status"=> "success"]);
    }
}
