<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Exception;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function store(Request $request) {
        try {
            $validated = $request->validate( [
                "produk_id" => "required|exists:produks.id",
                "stock" => "required|integer",
                "minimum_stock" => "required|integer",
                "last_updated_by" => "required|string",
            ]);

            Laporan::create($validated);

            return redirect()->back()->with(["code" => 201 ,"status" => "success"]);
        } catch (Exception $e) {
            return redirect()->back()->with(["code"=> 404 , "status" => "failed"]);
        }
    }

    public function show($id) {
        $laporan = Laporan::with([
            'product' => function($query) {
            $query->select('id', 'name');
        }])
        ->find($id);

        if(!$laporan) {
            return response()->json([
                'status' => "failed",
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $laporan], 200);
    }

    public function edit($id) {
        $laporan = Laporan::findOrFail($id);
        return response()->json(["status" => "success", "data" => $laporan], 200);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate( [
            "produk_id" => "required|exists:produks.id",
            "stock" => "required|integer",
            "minimum_stock" => "required|integer",
            "last_updated_by" => "required|string",
        ]);

        $Laporan = Laporan::findOrFail($id);
        $Laporan->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function delete($id) {
        $Laporan = Laporan::findOrFail($id);
        $Laporan->delete();

        return redirect()->back()->with(["code"=> 200, "status"=> "success"]);
    }
}
