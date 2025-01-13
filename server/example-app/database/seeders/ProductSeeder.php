<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            ['name' => 'Basmati Rice', 'cost' => '120', 'size' => '1kg', 'quantity' => '50', 'supplier_id' => 1],
            ['name' => 'Tur Dal', 'cost' => '150', 'size' => '1kg', 'quantity' => '30', 'supplier_id' => 2],
            ['name' => 'Chana Dal', 'cost' => '140', 'size' => '1kg', 'quantity' => '40', 'supplier_id' => 3],
            ['name' => 'Mustard Oil', 'cost' => '180', 'size' => '1L', 'quantity' => '25', 'supplier_id' => 4],
            ['name' => 'Wheat Flour', 'cost' => '50', 'size' => '1kg', 'quantity' => '60', 'supplier_id' => 1],
            ['name' => 'Groundnut Oil', 'cost' => '200', 'size' => '1L', 'quantity' => '20', 'supplier_id' => 2],
            ['name' => 'Jaggery', 'cost' => '60', 'size' => '1kg', 'quantity' => '35', 'supplier_id' => 3],
            ['name' => 'Coconut Oil', 'cost' => '220', 'size' => '1L', 'quantity' => '15', 'supplier_id' => 4],
            ['name' => 'Idli Rice', 'cost' => '100', 'size' => '1kg', 'quantity' => '50', 'supplier_id' => 1],
            ['name' => 'Sugar', 'cost' => '45', 'size' => '1kg', 'quantity' => '100', 'supplier_id' => 2],
            ['name' => 'Salt', 'cost' => '20', 'size' => '1kg', 'quantity' => '200', 'supplier_id' => 3],
            ['name' => 'Turmeric Powder', 'cost' => '120', 'size' => '500g', 'quantity' => '25', 'supplier_id' => 4],
            ['name' => 'Cumin Seeds', 'cost' => '150', 'size' => '500g', 'quantity' => '20', 'supplier_id' => 1],
            ['name' => 'Garam Masala', 'cost' => '200', 'size' => '500g', 'quantity' => '30', 'supplier_id' => 2],
            ['name' => 'Tea Leaves', 'cost' => '300', 'size' => '1kg', 'quantity' => '50', 'supplier_id' => 3],
            ['name' => 'Coffee Powder', 'cost' => '450', 'size' => '1kg', 'quantity' => '20', 'supplier_id' => 4],
            ['name' => 'Pickle', 'cost' => '90', 'size' => '500g', 'quantity' => '40', 'supplier_id' => 1],
            ['name' => 'Papad', 'cost' => '70', 'size' => '200g', 'quantity' => '50', 'supplier_id' => 2],
            ['name' => 'Dry Red Chilli', 'cost' => '160', 'size' => '500g', 'quantity' => '25', 'supplier_id' => 3],
            ['name' => 'Asafoetida', 'cost' => '500', 'size' => '250g', 'quantity' => '10', 'supplier_id' => 4],
        ]);
    }
}
