<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\BarangKeluarDetail;
use App\Models\BarangMasuk;
use App\Models\BarangMasukDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BarangController extends Controller
{
    public function storeMasuk(Request $request) {
        $validated = $request->validate( [
            "reference_code" => "required|string",
            "date" => "required|string",
            "supplier_name" => "required|string",
            "description" => "required|string",
            "created_by" => "required|integer",
            "product_details" => "required|array",
            "product_details.*.product_id" => "required|exists:produks,id",
            "product_details.*.quantity" => "required|integer",
            "product_details.*.unit_price" => "required|integer",
        ]);

        DB::beginTransaction();
        try {
            $master = BarangMasuk::create([
                'reference_code' => $validated['reference_code'],
                'date' => $validated['date'],
                'supplier_name' => $validated['supplier_name'],
                'description' => $validated['description'],
                'created_by' => $validated['created_by'],
            ]);

            foreach ($validated['product_details'] as $detail) {
                BarangMasukDetail::create([
                    'barang_masuk_id' => $master->id,
                    'produk_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'unit_price' => $detail['unit_price']
                ]);
            }

            return redirect()->back()->with(["code" => 201 ,"status" => "success"]);
        } catch (Exception $e) {
            return redirect()->back()->with(["code"=> 404 , "status" => "failed"]);
        }
    }

    public function showMasuk($id) {
        $barangMasuk = BarangMasuk::with([
            'details.product' => function($query) {
            $query->select('id', 'name', 'unit_price');
        }])
        ->find($id);

        if(!$barangMasuk) {
            return response()->json([
                'status' => "failed",
                'message' => 'BarangMasuk tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $barangMasuk], 200);
    }

    public function editMasuk($id) {
        $barangMasuk = BarangMasuk::findOrFail($id);
        return response()->json(["status" => "success", "data" => $barangMasuk], 200);
    }

    public function updateMasuk(Request $request, $id) {
        $validated = $request->validate( [
            "name" => "required|string",
            "code" => "required|string",
            "category" => "required|string",
            "units" => "required|string",
            "minimum_stock" => "required|integer"
        ]);

        $barangMasuk = BarangMasuk::findOrFail($id);
        $barangMasuk->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function deleteMasuk($id) {
        $barangMasuk = BarangMasuk::findOrFail($id);

        try {
            BarangMasukDetail::where('barang_masuk_id', '=', $barangMasuk->id)->delete();

            $barangMasuk->delete();

            return response()->json(['status' => 'success'], 200);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'failed', 'error' => $e->getMessage()], 404);
        }
    }

    public function storeKeluar(Request $request) {
        $validated = $request->validate( [
            "reference_code" => "required|string",
            "date" => "required|string",
            "supplier_name" => "required|string",
            "description" => "required|string",
            "created_by" => "required|integer",
            "product_details" => "required|array",
            "product_details.*.product_id" => "required|exists:produks,id",
            "product_details.*.quantity" => "required|integer",
            "product_details.*.unit_price" => "required|integer",
        ]);

        DB::beginTransaction();
        try {
            $master = BarangKeluar::create([
                'reference_code' => $validated['reference_code'],
                'date' => $validated['date'],
                'supplier_name' => $validated['supplier_name'],
                'description' => $validated['description'],
                'created_by' => $validated['created_by'],
            ]);

            foreach ($validated['product_details'] as $detail) {
                BarangKeluarDetail::create([
                    'barang_Keluar_id' => $master->id,
                    'produk_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'unit_price' => $detail['unit_price']
                ]);
            }

            return redirect()->back()->with(["code" => 201 ,"status" => "success"]);
        } catch (Exception $e) {
            return redirect()->back()->with(["code"=> 404 , "status" => "failed"]);
        }
    }

    public function showKeluar($id) {
        $barangKeluar = BarangKeluar::with([
            'details.product' => function($query) {
            $query->select('id', 'name', 'unit_price');
        }])
        ->find($id);

        if(!$barangKeluar) {
            return response()->json([
                'status' => "failed",
                'message' => 'BarangKeluar tidak ditemukan'
            ], 404);
        }

        return response()->json(['status' => 'success', 'data' => $barangKeluar], 200);
    }

    public function editKeluar($id) {
        $barangKeluar = BarangKeluar::findOrFail($id);
        return response()->json(["status" => "success", "data" => $barangKeluar], 200);
    }

    public function updateKeluar(Request $request, $id) {
        $validated = $request->validate( [
            "name" => "required|string",
            "code" => "required|string",
            "category" => "required|string",
            "units" => "required|string",
            "minimum_stock" => "required|integer"
        ]);

        $barangKeluar = BarangKeluar::findOrFail($id);
        $barangKeluar->update($validated);

        return response()->json(["status" => 'success'], 200);
    }

    public function deleteKeluar($id) {
        $barangKeluar = BarangKeluar::findOrFail($id);
        $barangKeluar->delete();

        return redirect()->back()->with(["code"=> 200, "status"=> "success"]);
    }
}
