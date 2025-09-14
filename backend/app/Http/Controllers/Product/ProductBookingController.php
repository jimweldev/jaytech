<?php

namespace App\Http\Controllers\Product;

use App\Helpers\QueryHelper;
use App\Http\Controllers\Controller;
use App\Models\Product\ProductBooking;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class ProductBookingController extends Controller {
    /**
     * Display a paginated list of records with optional filtering and search.
     */
    public function index(Request $request) {
        $queryParams = $request->all();

        try {
            // Initialize the query builder
            $query = ProductBooking::query();

            // Define the default query type
            $type = 'paginate';
            // Apply query parameters
            QueryHelper::apply($query, $queryParams, $type);

            // Check if a search parameter is present in the request
            if ($request->has('search')) {
                $search = $request->input('search');
                // Apply search conditions to the query
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%')
                        ->orWhere('category', 'LIKE', '%'.$search.'%')
                        ->orWhere('brand', 'LIKE', '%'.$search.'%')
                        ->orWhere('description', 'LIKE', '%'.$search.'%');
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
        $record = ProductBooking::where('id', $id)
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
    public function store(Request $request) {
        try {
            // create a new record
            $record = ProductBooking::create($request->all());

            // Return the created record
            return response()->json($record, 201);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified record in storage.
     */
    public function update(Request $request, $id) {
        try {
            // Find the record by ID
            $record = ProductBooking::find($id);

            if (!$record) {
                // Return a 404 response if the record is not found
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            // Update the record
            $record->update($request->all());

            // Return the updated record
            return response()->json($record, 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified record from storage.
     */
    public function destroy($id) {
        try {
            // Find the record by ID
            $record = ProductBooking::find($id);

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
