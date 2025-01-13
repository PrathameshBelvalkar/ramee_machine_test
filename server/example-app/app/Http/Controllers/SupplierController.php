<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [],
            'message' => 'This is tset API'
        ], 200);
    }

    public function getAllSuppliers()
    {
        try {
            $suppliers = Supplier::all();
            return response()->json([
                'success' => true,
                'data' => $suppliers,
                'message' => 'All suppliers retrieved successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'Failed to retrieve suppliers'
            ], 500);
        }
    }
    public function getProductbySupplier($id)
    {
        try {
            $product = Product::with('supplier')->where('supplier_id', $id)->get();
            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'All suppliers and their products retrieved successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'Failed to retrieve suppliers and their products'
            ], 500);
        }
    }
    public function saveInvoice(Request $request)
    {
        DB::beginTransaction();
        try {
            $invoiceId = now()->timestamp;
            Invoice::insert([
                'invoice_id' => $invoiceId,
                'data' => json_encode($request->all()),
            ]);

            foreach ($request->all() as $item) {
                $product = Product::where('id', $item['id'])->first();

                if ($product) {
                    $newQuantity = max(0, $product->quantity - $item['quantity']);
                    Product::where('id', $item['id'])->update([
                        'quantity' => $newQuantity,
                        'updated_at' => now(),
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Invoice saved successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'Failed to save invoice',
            ], 500);
        }
    }
    public function getAllInvoices()
    {
        try {
            $invoices = Invoice::all();
            $invoices = $invoices->map(function ($invoice) {
                $invoice->data = json_decode($invoice->data);
                return $invoice;
            });
            return response()->json([
                'success' => true,
                'data' => $invoices,
                'message' => 'Invoices fetched successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'Failed to fetch invoices',
            ], 500);
        }
    }

}
