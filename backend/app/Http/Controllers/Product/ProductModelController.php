<?php

namespace App\Http\Controllers\Product;

use App\Helpers\QueryHelper;
use App\Http\Controllers\Controller;
use App\Models\Product\ProductModel;
use App\Models\Product\ProductModelServices;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Illuminate\Support\Facades\DB;


class ProductModelController extends Controller {
    /**
     * Display a paginated list of records with optional filtering and search.
     */
    public function index(Request $request) {
        $queryParams = $request->all();

        try {
            // Initialize the query builder
            $query = ProductModel::query();

            // Define the default query type
            $type = 'paginate';
            // Apply query parameters
            QueryHelper::apply($query, $queryParams, $type);
            // Eager load the customer relationship

            $query->with(['product', 'prices']);

            // Check if a search parameter is present in the request
            if ($request->has('search')) {
                $search = $request->input('search');
                // Apply search conditions to the query
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%')
                        ->orWhere('name', 'LIKE', '%'.$search.'%');
                });
            }

            // Get the total count of records matching the query
            $totalRecords = $query->count();

            // Retrieve pagination parameters from the request
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            // Apply limit and offset to the query
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            // Execute the query and get the records
            $records = $query->get();

            // Return the records and pagination info
            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $totalRecords,
                    'total_pages' => ceil($totalRecords / $limit),
                ],
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified record.
     */
    public function show($id) {
        // Find the record by ID
        $record = ProductModel::where('id', $id)
            ->first();

        if (!$record) {
            // Return a 404 response if the record is not found
            return response()->json([
                'message' => 'Record not found.',
            ], 404);
        }

        // Return the record
        return response()->json($record, 200);
    }

    /**
     * Store a newly created record in storage.
     */
    public function store(Request $request){
        // 1️⃣ Validate
        $validated = $request->validate([
            'product_id'  => 'required|integer|exists:products,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'variants'    => 'required|array',
            'variants.*.option.label' => 'required|string',
            'variants.*.price'        => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            // 2️⃣ Create product model
            $record = ProductModel::create([
                'product_id'  => $validated['product_id'],
                'name'        => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            // 3️⃣ Build price rows
            $prices = collect($validated['variants'])->map(function ($variant) use ($record) {
                return [
                    'product_model_id' => $record->id,
                    'name'             => $variant['option']['label'],
                    'price'            => $variant['price'],
                    'created_at'       => now(),
                    'updated_at'       => now(),
                ];
            })->all();

            ProductModelServices::insert($prices);

            DB::commit();
            return response()->json($record, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred',
                'error'   => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified record in storage.
     */
    public function update(Request $request, $id){
        try {
            DB::beginTransaction();

            // ✅ Validate incoming data (same rules as store)
            $validated = $request->validate([
                'product_id'  => 'required|integer|exists:products,id',
                'name'        => 'required|string|max:255',
                'description' => 'nullable|string',
                'variants'    => 'required|array|min:1',
                'variants.*.option.label' => 'required|string|max:255',
                'variants.*.price'        => 'required|numeric|min:0',
            ]);

            // ✅ Find the product model
            $record = ProductModel::find($id);
            if (!$record) {
                return response()->json(['message' => 'Record not found.'], 404);
            }

            // ✅ Update the product model fields
            $record->update([
                'product_id'  => $validated['product_id'],
                'name'        => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            // ✅ Remove old prices
            ProductModelServices::where('product_model_id', $record->id)->delete();

            // ✅ Insert new prices
            $prices = [];
            foreach ($validated['variants'] as $variant) {
                $prices[] = [
                    'product_model_id' => $record->id,
                    'name'  => $variant['option']['label'],
                    'price' => $variant['price'],
                    'form'  => 'default', // keep your default if needed
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            ProductModelServices::insert($prices);

            DB::commit();

            return response()->json($record->load('prices'), 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred',
                'error'   => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified record from storage.
     */
    public function destroy($id) {
        try {
            // Find the record by ID
            $record = ProductModel::find($id);

            if (!$record) {
                // Return a 404 response if the record is not found
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            // Delete the record
            $record->delete();

            // Return the deleted record
            return response()->json($record, 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
