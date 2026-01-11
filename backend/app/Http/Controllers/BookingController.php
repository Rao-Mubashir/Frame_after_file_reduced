<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\OpeningHour;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $rules = [
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'instance_id' => 'required|exists:instances,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ];

        // Add user fields validation only if not authenticated
        if (!Auth::guard('sanctum')->check()) {
            $rules['name'] = 'required|string|max:255';
            $rules['email'] = 'required|email|max:255';
            $rules['password'] = 'required|string|min:8';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user is authenticated
        $user = Auth::guard('sanctum')->user();
        
        // If not authenticated, create new user
        if (!$user) {
            // Check if email already exists
            $existingUser = User::where('email', $request->email)->first();
            
            if ($existingUser) {
                return response()->json(['error' => 'Email already registered. Please login.'], 409);
            }
            
            // Create new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
            ]);
            
            // Log in the new user
            Auth::login($user);
        }

        // Check for booking conflicts
        $conflict = Booking::where('instance_id', $request->instance_id)
            ->where('booking_date', $request->booking_date)
            ->where('status', '!=', 'cancelled')
            ->where(function($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function($q) use ($request) {
                          $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                      });
            })
            ->exists();

        if ($conflict) {
            return response()->json(['error' => 'This time slot is already booked.'], 409);
        }

        // Create booking
        $booking = Booking::create([
            'user_id' => $user->id,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'instance_id' => $request->instance_id,
            'booking_date' => $request->booking_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'confirmed',
            'notes' => $request->notes,
        ]);

        $booking->load(['category', 'subCategory', 'instance', 'user']);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking,
            'user' => $user,
        ], 201);
    }

    public function getAvailableSlots(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'instance_id' => 'required|exists:instances,id',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $date = Carbon::parse($request->date);
        $dayOfWeek = $date->format('l'); // Monday, Tuesday, etc.

        // Get opening hours for the day
        $openingHour = OpeningHour::where('day_of_week', $dayOfWeek)
            ->where('is_open', true)
            ->first();

        if (!$openingHour) {
            return response()->json(['slots' => []]);
        }

        // Generate time slots
        $slots = $this->generateTimeSlots(
            $openingHour->opening_time,
            $openingHour->closing_time
        );

        // Get booked slots
        $bookedSlots = Booking::where('instance_id', $request->instance_id)
            ->where('booking_date', $request->date)
            ->where('status', '!=', 'cancelled')
            ->get(['start_time', 'end_time']);

        // Filter out booked slots
        $availableSlots = array_filter($slots, function($slot) use ($bookedSlots) {
            foreach ($bookedSlots as $booked) {
                if ($slot['start'] === $booked->start_time->format('H:i')) {
                    return false;
                }
            }
            return true;
        });

        return response()->json([
            'slots' => array_values($availableSlots),
            'opening_hours' => [
                'open' => $openingHour->opening_time->format('H:i'),
                'close' => $openingHour->closing_time->format('H:i'),
            ]
        ]);
    }

    private function generateTimeSlots($openTime, $closeTime): array
    {
        $slots = [];
        $open = Carbon::parse($openTime);
        $close = Carbon::parse($closeTime);

        // Handle midnight crossover (e.g., 12 PM to 4 AM next day)
        if ($close->lt($open)) {
            $close->addDay();
        }

        $current = $open->copy();

        while ($current->lt($close)) {
            $end = $current->copy()->addHour();
            
            // Don't add slot if it would go past closing time
            if ($end->lte($close)) {
                $slots[] = [
                    'start' => $current->format('H:i'),
                    'end' => $end->format('H:i'),
                    'label' => $current->format('h:i A') . ' - ' . $end->format('h:i A'),
                ];
            }
            
            $current->addHour();
        }

        return $slots;
    }

    public function getUserBookings(): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $bookings = Booking::where('user_id', Auth::id())
            ->with(['category', 'subCategory', 'instance'])
            ->orderBy('booking_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return response()->json($bookings);
    }

    public function show($id): JsonResponse
    {
        $booking = Booking::with(['category', 'subCategory', 'instance', 'user'])->findOrFail($id);
        
        // Check if user owns this booking or is admin
        if (Auth::id() !== $booking->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($booking);
    }

    public function cancel($id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        // Check if user owns this booking or is admin
        if (Auth::id() !== $booking->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Booking cancelled successfully',
            'booking' => $booking,
        ]);
    }
}
