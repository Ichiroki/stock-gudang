<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate( [
            "name" => "required|string",
        ]);

        Kategori::create($validated);

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

    public function update(Request $request, $id) {
        $validated = $request->validate( [
            "name" => "required|string",
        ]);

        Kategori::findOrFail($id)->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function delete($id) {
        Kategori::findOrFail($id)->delete();

        return response()->json(["status" => 'success'], 200);
    }
}
