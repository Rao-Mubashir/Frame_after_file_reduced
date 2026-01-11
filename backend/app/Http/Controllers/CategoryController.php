<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)->get();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::where('is_active', true)->findOrFail($id);
        return response()->json($category);
    }

    public function getSubCategories($id)
    {
        $category = Category::findOrFail($id);
        $subCategories = $category->subCategories()->where('is_active', true)->get();
        return response()->json($subCategories);
    }
}
