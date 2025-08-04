<?php

namespace App\Http\Controllers;

use App\Http\Requests\KategoriRequest;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index() {
        $kategori = Kategori::all();
        return response()->json(['data' => $kategori]);
    }

    public function store(KategoriRequest $request) {
        Kategori::create($request->validated());

        return response()->json(['status' => 'success', 'message' => 'Data telah ditambahkan'], 201);
    }

    public function show($id) {
        $kategori = Kategori::find($id);

        if(!$kategori) {
            return response()->json([
                'status' => "failed",
                'message' => ' tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $kategori], 200);
    }

    public function edit($id) {
        $kategori = Kategori::findOrFail($id);
        return response()->json(["status" => "success", "data" => $kategori], 200);
    }

    public function update(KategoriRequest $request, $id) {
        Kategori::findOrFail($id)->update($request->validated());

        return response()->json(["status" => 'success'], 200);
    }

    public function delete($id) {
        Kategori::findOrFail($id)->delete();

        return response()->json(["status" => 'success'], 200);
    }
}
