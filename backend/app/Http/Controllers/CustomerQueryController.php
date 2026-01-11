<?php

namespace App\Http\Controllers;

use App\Models\CustomerQuery;
use Illuminate\Http\Request;

class CustomerQueryController extends Controller
{
    // Store a new query (Public)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Map frontend "firstName" camelCase to database "first_name" snake_case
        $query = CustomerQuery::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        return response()->json([
            'message' => 'Query submitted successfully',
            'data' => $query
        ], 201);
    }

    // List all queries (Admin)
    public function index()
    {
        $queries = CustomerQuery::orderBy('created_at', 'desc')->get();
        return response()->json([
            'data' => $queries
        ]);
    }

    // Mark as read (optional, for future)
    public function markAsRead($id)
    {
        $query = CustomerQuery::findOrFail($id);
        $query->update(['is_read' => true]);
        return response()->json(['message' => 'Marked as read']);
    }

    // Delete query
    public function destroy($id)
    {
        $query = CustomerQuery::findOrFail($id);
        $query->delete();
        return response()->json(['message' => 'Query deleted successfully']);
    }
}
