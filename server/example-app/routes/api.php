<?php

use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('get-supplier', [SupplierController::class, 'getAllSuppliers']);
Route::get('get-product-by-supplier/{id}', [SupplierController::class, 'getProductbySupplier']);
Route::post('save-invoice', [SupplierController::class, 'saveInvoice']);
Route::get('get-invoice', [SupplierController::class, 'getAllInvoices']);
