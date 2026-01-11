<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AboutContentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactSettingsController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public settings endpoints
Route::get('/about/content', [AboutContentController::class, 'publicIndex']);
Route::get('/contact/settings', [ContactSettingsController::class, 'showPublic']);

// Public booking system endpoints
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/categories/{id}/sub-categories', [CategoryController::class, 'getSubCategories']);
Route::get('/sub-categories/{id}', [SubCategoryController::class, 'show']);
Route::get('/sub-categories/{id}/instances', [SubCategoryController::class, 'getInstances']);
Route::get('/bookings/available-slots', [BookingController::class, 'getAvailableSlots']);

// Booking creation (handles both authenticated and new users)
Route::post('/bookings', [BookingController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
    Route::post('/profile/update-password', [ProfileController::class, 'updatePassword']);

    // User bookings
    Route::get('/bookings/user', [BookingController::class, 'getUserBookings']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::post('/users', [AdminController::class, 'createUser']);
        Route::put('/users/{userId}/role', [AdminController::class, 'updateUserRole']);
        Route::post('/users/{userId}/reset-password', [AdminController::class, 'resetUserPassword']);
        Route::delete('/users/{userId}', [AdminController::class, 'deleteUser']);

        // Settings management
        Route::get('/about/content', [AboutContentController::class, 'adminIndex']);
        Route::put('/about/content', [AboutContentController::class, 'update']);
        Route::get('/contact/settings', [ContactSettingsController::class, 'show']);
        Route::put('/contact/settings', [ContactSettingsController::class, 'update']);

        // Services management
        Route::apiResource('/services', ServiceController::class);

        // Booking management
        Route::get('/bookings', [App\Http\Controllers\AdminController::class, 'bookings']);
        Route::delete('/bookings/{id}', [App\Http\Controllers\AdminController::class, 'deleteBooking']);

        // Customer Queries
        Route::get('/customer-queries', [App\Http\Controllers\CustomerQueryController::class, 'index']);
        Route::delete('/customer-queries/{id}', [App\Http\Controllers\CustomerQueryController::class, 'destroy']);
    });
});

// Public contact query endpoint
Route::post('/contact/query', [App\Http\Controllers\CustomerQueryController::class, 'store']);
