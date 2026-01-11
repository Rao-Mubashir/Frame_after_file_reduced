<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\JsonResponse;

class SubCategoryController extends Controller
{
    public function show($id): JsonResponse
    {
        $subCategory = SubCategory::with('instances')->findOrFail($id);
        return response()->json($subCategory);
    }

    public function getInstances($id): JsonResponse
    {
        $instances = SubCategory::findOrFail($id)
            ->instances()
            ->where('is_active', true)
            ->get();
            
        return response()->json($instances);
    }
}
