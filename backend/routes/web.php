<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Catch-all route for React frontend (Handles client-side routing)
Route::get('{any}', function () {
    $path = public_path('index.html');
    if (!file_exists($path)) {
        return response("Frontend build (index.html) not found in public folder.", 404);
    }
    return file_get_contents($path);
})->where('any', '.*');

require __DIR__.'/auth.php';
